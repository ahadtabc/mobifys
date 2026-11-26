import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { env } from './config/env.js';
import configurePassport from './config/passport.js';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

configurePassport();

const app = express();

// Core middleware
app.disable('x-powered-by');
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser(env.cookieSecret));
app.use(passport.initialize());

// Static files & API routes
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api', apiRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
