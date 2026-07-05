import axios from "axios";

const api = axios.create({
    baseURL: "https://careerprep-ai-yg5u.onrender.com",
    withCredentials: true,
});

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile, resume }) => {

    const file = resumeFile || resume;
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", file);
    console.log("FormData contents:", file);
    try {
        const response = await api.post("/api/interview/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
};

export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(`/api/interview/report/${interviewId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching interview report:", error);
        throw error;
    }
};

export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/api/interview");
        return response.data;
    } catch (error) {
        console.error("Error fetching interview reports:", error);
        throw error;
    }
};

export  const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data;
};