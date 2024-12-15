import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoute from "../backend/routes/todo.route.js";
import userRoute from "../backend/routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.MONGODB_URI;

console.log("PORT:", process.env.PORT);
console.log("DB_URI:", process.env.MONGODB_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET_KEY);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers you want to allow here.
  })
);

// Database connection code
(async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

// routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
