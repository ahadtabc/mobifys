import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Allow the React app to call this API and send cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON bodies, form bodies, and cookies
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Health check — proves the server is alive
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "Mobifys API is running" });
});

// Unknown route -> 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Central error handler — every thrown error lands here
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;