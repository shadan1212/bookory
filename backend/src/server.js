import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import bookRoutes from "./routes/book.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: "https://bookory-1.onrender.com",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
// console.log(process.env.CLIENT_URL);
// Routes
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
  connectDB();
});
