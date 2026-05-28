import { useContext } from "react";
import { InterviewContext } from "../store/interview.context.jsx";
import { generateInterviewReport, getInterviewReportById, getAllInterviewReports } from "../services/interview.api.js";


export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({jobDescription, selfDescription, resume}) => {
        setLoading(true);
        try {
            const data = await generateInterviewReport({jobDescription, selfDescription, resume});
            setReport(data.interviewReport);
            return data.interviewReport;
        } catch (err) {
            console.error("Failed to generate report:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
        setLoading(true);
        try {
            const data = await getInterviewReportById(interviewId);
            setReport(data.interviewReport);
            return data.interviewReport;
        } catch (err) {
            console.error("Failed to fetch report:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getAllReports = async () => {
        setLoading(true);
        try {
            const data = await getAllInterviewReports();
            setReports(data.interviewReports);
            return data.interviewReports;
        } catch (err) {
            console.error("Failed to fetch reports:", err);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { loading, report, reports, generateReport, getReportById, getAllReports };    
};