import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/connection.js";
import authRoute from "./routes/auth.route.js";
import passportRoute from "./routes/passport.route.js";
import cors from "cors";

// Load environment variables only if not in production
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "config/.env",
  });
}

const PORT = process.env.PORT || 8000;

// Initialize express
const app = express();

// Top level middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Test route
app.get("/", (req, res) => {
  res.send('hello world');
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/passport", passportRoute);

// Listen to port
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on ${PORT}`);
});
