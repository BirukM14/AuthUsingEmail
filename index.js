import express from "express";
import cors from 'cors';  // If you are using ESM (ECMAScript modules)
import dotenv from "dotenv";
import { connectDB } from './db/ConnectDB.js';
import cookieParser from "cookie-parser";
import authroute from './routes/authroute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use("/api/auth", authroute);

// Start server
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
