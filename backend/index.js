import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/connection.js";
import authRoute from "./routes/auth.route.js";
import passportRoute from "./routes/passport.route.js";
import cors from "cors";
const app = express();


if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "config/.env",
  });
}

const corsConfig = {
  origin: process.env.Client_URL,
  credentials: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};

app.options("", cors(corsConfig));
app.use(cors(corsConfig));

// Load environment variables only if not in production


connectDB();
const PORT = process.env.PORT || 8000;

// Initialize express



// Top level middleware
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send(process.env.Client_URL);
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/passport", passportRoute);

// Listen to port
app.listen(PORT, () => {

  console.log(`Server started on ${PORT}`);
});
