// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path"
import authRoutes from './routes/auth-routes.js'; // Notice the .js extension!
import userRoutes from './routes/user-routes.js'; 
import requestRoutes from './routes/request-routes.js'; 
import messageRoutes from './routes/messageRoutes.js'; // <-- 1. Import 
import dealRoutes from './routes/deal-routes.js';                 // <-- Add this
import notificationRoutes from './routes/notificationRoutes.js'; // <-- Add this
import documentRoutes from './routes/document-routes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Business Nexus API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);         // <-- Add this
app.use('/api/requests', requestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/deals', dealRoutes);                 // <-- Add this
app.use('/api/notifications', notificationRoutes);
app.use('/api/documents', documentRoutes);



const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));