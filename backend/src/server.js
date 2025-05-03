import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
  connectDB();
});
