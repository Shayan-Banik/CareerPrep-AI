import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InterviewContext } from "../store/interview.context.jsx";
import { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePdf } from "../services/interview.api.js";


export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();

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

    const getResumePdf = async (interviewReportId) => {
        setLoading(true);
        // let response = null;
        try {
            let response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        } else {
            getAllReports();
        }
    }, [interviewId]);

    return { loading, report, reports, generateReport, getReportById, getAllReports, getResumePdf };    
};