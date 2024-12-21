import express from 'express';
require('dotenv').config();
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/user';
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();


// Allow requests from your frontend origin
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use the user routes
app.use('/api/users', userRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
