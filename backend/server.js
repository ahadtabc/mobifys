import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import connectDB from './src/config/db.js';
import configurePassport from './src/config/passport.js';
import { notFound, errorHandler } from './src/middlewares/errorMiddleware.js';

// Admin Routes
import adminAuthRoutes from './src/routes/admin/adminAuthRoutes.js';
import userManagementRoutes from './src/routes/admin/userManagementRoutes.js';

// User Routes
import userAuthRoutes from './src/routes/user/authRoutes.js';
import userProfileRoutes from './src/routes/user/profileRoutes.js';
import userAddressRoutes from './src/routes/user/addressRoutes.js';

dotenv.config();
connectDB();
configurePassport();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Mobifys API is running' });
});

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Mount Admin Routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/users', userManagementRoutes);

// Mount User Routes
app.use('/api/user/auth', userAuthRoutes);
app.use('/api/user/profile', userProfileRoutes);
app.use('/api/user/addresses', userAddressRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});