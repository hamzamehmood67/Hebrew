import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

// Test database connection
prisma.$connect()
  .then(() => console.log('Successfully connected to database'))
  .catch((error) => console.error('Failed to connect to database:', error));

app.use(cors(corsOptions));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all stories
app.get('/api/stories', async (req, res) => {
  console.log('Received request for stories with level:', req.query.level);
  try {
    const level = req.query.level;
    console.log('Querying database for stories...');
    const stories = await prisma.story.findMany({
      where: level ? { level } : undefined,
      include: {
        questions: true,
        vocabulary: true,
      },
    });
    console.log(`Found ${stories.length} stories:`, stories);
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});