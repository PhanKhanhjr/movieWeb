import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load .env từ thư mục cha (gốc)
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import connectDB from "./config/db.js";
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Cho phép CORS
app.use(cookieParser());

// Routes

app.use(userRoutes);
app.use(authRoutes);

// Khởi động server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
