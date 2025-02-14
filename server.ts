import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import db from "./dbConfig";
import userRoutes from "./routes/userRoutes";

import adminEventRoutes from "./routes/vms-6";
import userEventRoutes from "./routes/vms7"; 

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Use Express built-in JSON parser

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to VMS...");
});

app.use("/user", userRoutes);
app.use("/api/admin/events", adminEventRoutes);
app.use("/api/users/events", userEventRoutes);


app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

db.on("open", () => {
  console.log("MongoDB Connected, Starting Server...");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

db.on("error", (err: Error) => {
  console.error("MongoDB Connection Error:", err);
});
