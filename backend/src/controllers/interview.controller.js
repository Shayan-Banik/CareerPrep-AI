import * as pdf from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import InterviewReport from "../models/interviewReport.model.js";


const generateInterViewReportController = async (req, res) => {
    try {
        
        const resumeContent = await (new pdf.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const { selfDescription, jobDescription } = req.body;

        const report = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        });

        const interviewReport = await InterviewReport.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...report,  

        });


        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const generateInterViewReportByIdController = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const interviewReport = await InterviewReport.findOne({ _id: interviewId, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        if (interviewReport.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        res.status(200).json({
            message: "Interview report retrieved successfully",
            interviewReport,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

 const getAllInterviewReportsController = async (req, res) => {
    try {
        const interviewReports = await InterviewReport.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

        res.status(200).json({
            message: "Interview reports fetched successfully",
            interviewReports,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {generateInterViewReportController, generateInterViewReportByIdController, getAllInterviewReportsController};
