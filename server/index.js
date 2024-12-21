import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import verificationRoutes from './routes/verification.js';
import storiesRoutes from './routes/stories.js';
import { authenticateToken } from './middleware/auth.js';
import path from 'path';
import { connectDB } from './utils/db.js';
import validateEnv from './utils/validateEnv.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js';

dotenv.config();

// Validate environment variables
const env = validateEnv();

const app = express();
const port = env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5175', 'http://localhost:5174', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

// Force HTTPS and www in production
if (env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    // Check for HTTPS
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
    next();
  });
}

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/stories', storiesRoutes);  // No authentication required for stories

// Protected routes
app.use('/api/*', authenticateToken);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      error: 'Database operation failed',
      details: err.message
    });
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      details: err.message
    });
  }
  
  res.status(500).json({
    error: 'Internal server error',
    details: env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Try to start server with fallback ports
    const tryPort = async (attemptPort) => {
      try {
        await new Promise((resolve, reject) => {
          const server = app.listen(attemptPort)
            .once('listening', () => {
              console.log(`
🚀 Server is running on port ${attemptPort}
🌍 Environment: ${env.NODE_ENV}
📝 API Documentation: ${env.NODE_ENV === 'development' ? `http://localhost:${attemptPort}/api-docs` : 'https://easilystudyhebrew.com/api-docs'}
              `);
              resolve();
            })
            .once('error', (err) => {
              if (err.code === 'EADDRINUSE') {
                console.log(`Port ${attemptPort} is busy, trying next port...`);
                reject(err);
              } else {
                reject(err);
              }
            });
        });
      } catch (err) {
        if (err.code === 'EADDRINUSE' && attemptPort < port + 10) {
          // Try next port
          return tryPort(attemptPort + 1);
        }
        throw err;
      }
    };

    await tryPort(port);
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

startServer();