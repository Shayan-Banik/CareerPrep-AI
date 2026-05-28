import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';

import router from './routes/auth.routes.js';
import InterviewRouter from './routes/interview.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Routes
app.use("/api/auth", router)
app.use("/api/interview", InterviewRouter);


app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});

export default app;