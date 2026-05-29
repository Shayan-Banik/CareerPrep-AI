import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { generateInterViewReportByIdController, generateInterViewReportController, generateResumePdfController, getAllInterviewReportsController } from '../controllers/interview.controller.js';
import upload from "../middleware/file.middleware.js";

const InterviewRouter = express.Router();

// Generate description for interview report on the basis of resume pdf, self-description and job description

InterviewRouter.post("/",  authMiddleware, upload.single("resume"), generateInterViewReportController);

InterviewRouter.get("/report/:interviewId", authMiddleware, generateInterViewReportByIdController);

InterviewRouter.get("/", authMiddleware, getAllInterviewReportsController);

InterviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware, generateResumePdfController);

export default InterviewRouter;