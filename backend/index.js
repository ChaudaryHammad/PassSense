import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "config/.env",
});
import cookieParser from "cookie-parser";
import { connectDB } from "./database/connection.js";
import authRoute from "./routes/auth.route.js";

const PORT = process.env.PORT || 8000;
import cors from "cors";
//initialize express
const app = express();
//top level middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: "https://pass-sense-frontend.vercel.app",
    credentials: true,
  }
));


app.get("/", (req, res) => {
  res.send("Hello World");
})
//routes
app.use("/api/auth", authRoute);


//listen to port
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on ${PORT}`);
});
