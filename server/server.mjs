import "./config/env.mjs";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/auth.routes.mjs";
import userRoutes from "./routes/user.routes.mjs";
import googleRoutes from "./routes/google.routes.mjs";
import githubRoutes from "./routes/github.routes.mjs";
import microsoftRoutes from "./routes/microsoft.routes.mjs";

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

app.use("/api/auth", authRoutes);  // registration route and email verification route and login route
app.use("/api/user", userRoutes);  // protected route for user profile
app.use("/api/auth", googleRoutes); // Google OAuth routes 
app.use("/api/auth", githubRoutes); // GitHub OAuth routes
app.use("/api/auth", microsoftRoutes); // Microsoft OAuth routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});