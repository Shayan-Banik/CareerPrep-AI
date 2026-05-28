import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { generateInterViewReportByIdController, generateInterViewReportController, getAllInterviewReportsController } from '../controllers/interview.controller.js';
import upload from "../middleware/file.middleware.js";

const InterviewRouter = express.Router();

// Generate description for interview report on the basis of resume pdf, self-description and job description

InterviewRouter.post("/",  authMiddleware, upload.single("resume"), generateInterViewReportController);

InterviewRouter.get("/report/:interviewId", authMiddleware, generateInterViewReportByIdController);

InterviewRouter.get("/", authMiddleware, getAllInterviewReportsController);

export default InterviewRouter;