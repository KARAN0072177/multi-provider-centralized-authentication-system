import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/auth.routes.mjs";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// basic route for testing
app.get("/", (req, res) => {
  res.send("API running");
});

// routes will be mounted here

app.use("/api/auth", authRoutes);  // registration route

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});