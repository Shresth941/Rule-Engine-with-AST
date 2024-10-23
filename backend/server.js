import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import ruleRoutes from './routes/rules.js';
import dotenv from 'dotenv';

dotenv.config();
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/rules', ruleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
