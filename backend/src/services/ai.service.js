import { GoogleGenAI } from "@google/genai";
import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string().min(1),
      intention: z.string().min(1),
      answer: z.string().min(1),
    }),
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string().min(1),
      intention: z.string().min(1),
      answer: z.string().min(1),
    }),
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string().min(1, "Skill name cannot be empty"),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  strengths: z.array(z.string().min(1)),

  weaknesses: z.array(z.string().min(1)),

  recommendation: z.string().min(1),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string().min(1),
      tasks: z.array(z.string().min(1)),
    }),
  ),

  title: z.string().min(1),
});

// Hand-written Gemini-compatible schema (OpenAPI subset).
// zodToJsonSchema was producing broken output for nested object arrays,
// causing Gemini to ignore structure entirely and echo field names as values.
const GEMINI_INTERVIEW_REPORT_SCHEMA = {
  type: "object",
  properties: {
    matchScore: { type: "number" },
    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: { type: "string" },
          severity: { type: "string", enum: ["low", "medium", "high"] },
        },
        required: ["skill", "severity"],
      },
    },
    strengths: {
      type: "array",
      items: { type: "string" },
    },
    weaknesses: {
      type: "array",
      items: { type: "string" },
    },
    recommendation: { type: "string" },
    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: { type: "number" },
          focus: { type: "string" },
          tasks: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    title: { type: "string" },
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "strengths",
    "weaknesses",
    "recommendation",
    "preparationPlan",
    "title",
  ],
};

const GEMINI_RESUME_HTML_SCHEMA = {
  type: "object",
  properties: {
    html: { type: "string" },
  },
  required: ["html"],
};

// Detects the "schema collapsed to flat strings" failure mode before it
// ever reaches Mongoose, so we fail fast with a clear error instead of
// silently saving garbage or crashing deep in a validator.
function looksStructurallyValid(report) {
  const isArrayOfObjects = (arr) =>
    Array.isArray(arr) && arr.every((item) => item && typeof item === "object" && !Array.isArray(item));

  if (!isArrayOfObjects(report.technicalQuestions)) return false;
  if (!isArrayOfObjects(report.behavioralQuestions)) return false;
  if (!isArrayOfObjects(report.skillGaps)) return false;
  if (!isArrayOfObjects(report.preparationPlan)) return false;

  return true;
}

async function callGeminiForReport(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: GEMINI_INTERVIEW_REPORT_SCHEMA,
      temperature: 0.3,
    },
  });

  const rawText = response.text;
  console.log("RAW AI RESPONSE:");
  console.log(rawText);

  const cleanedText = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/`/g, "")
    .trim();

  return JSON.parse(cleanedText);
}

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview report.

Return ONLY valid JSON matching the provided schema exactly.

Do not use markdown.
Do not wrap response in backticks.
Do not return placeholder text, field names as values, or example strings — every value must be real, specific content generated from the resume, self description, and job description below.
Do not include empty strings, null values, or padding entries anywhere in the response.

- technicalQuestions and behavioralQuestions: max 5 items each, each item is an object with question, intention, and answer.
- skillGaps: max 5 items, each item is an object with skill and severity ("low" | "medium" | "high").
- strengths / weaknesses: max 5 items each, plain strings, no empty strings.
- recommendation: a single final recommendation string.
- preparationPlan: up to 7 day objects, each with day (number), focus (string), and tasks (array of strings).
- title: a short string, e.g. the role being interviewed for.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  try {
    let parsedData = await callGeminiForReport(prompt);
    let report = parsedData.interviewReport || parsedData;

    // Retry once if Gemini returns the "flattened schema keys" failure mode
    if (!looksStructurallyValid(report)) {
      console.log("STRUCTURAL VALIDATION FAILED — retrying Gemini call once");
      parsedData = await callGeminiForReport(prompt);
      report = parsedData.interviewReport || parsedData;

      if (!looksStructurallyValid(report)) {
        throw new Error("Gemini returned malformed structure twice in a row");
      }
    }

    const normalizedData = {
      matchScore:
        typeof report.matchScore === "number"
          ? report.matchScore <= 1
            ? Math.round(report.matchScore * 100)
            : Math.round(report.matchScore)
          : typeof report.overallMatchScore === "number"
            ? report.overallMatchScore <= 1
              ? Math.round(report.overallMatchScore * 100)
              : Math.round(report.overallMatchScore)
            : 0,

      technicalQuestions: (report.technicalQuestions || [])
        .map((q) => ({
          question: (q.question || "").trim(),
          intention: (q.intention || q.feedback || "Technical evaluation").trim(),
          answer: (q.answer || "").trim(),
        }))
        .filter((q) => q.question.length > 0 && q.answer.length > 0),

      behavioralQuestions: (report.behavioralQuestions || [])
        .map((q) => ({
          question: (q.question || "").trim(),
          intention: (q.intention || q.feedback || "Behavioral evaluation").trim(),
          answer: (q.answer || "").trim(),
        }))
        .filter((q) => q.question.length > 0 && q.answer.length > 0),

      skillGaps: (report.skillGaps || [])
        .map((gap) => ({
          skill: (gap.skill || "").trim(),
          severity: gap.severity?.toLowerCase()?.trim() || "low",
        }))
        .filter((gap) => gap.skill.length > 0)
        .slice(0, 10),

      strengths: (report.strengths || [])
        .map((s) => (s || "").trim())
        .filter(Boolean)
        .slice(0, 10),

      weaknesses: (report.weaknesses || [])
        .map((s) => (s || "").trim())
        .filter(Boolean)
        .slice(0, 10),

      recommendation: (report.recommendation || "No recommendation provided").trim(),

      preparationPlan: (report.preparationPlan || [])
        .map((plan, index) => ({
          day: typeof plan.day === "number" ? plan.day : index + 1,
          focus: (plan.focus || plan.topic || "Interview Preparation").trim(),
          tasks: (plan.tasks || [plan.type || "Practice interview preparation"])
            .map((t) => (t || "").trim())
            .filter(Boolean),
        }))
        .filter((plan) => plan.tasks.length > 0)
        .slice(0, 7),

      title: (report.title || report.appliedPosition || "Software Developer").trim(),
    };

    console.log("NORMALIZED DATA:");
    console.log(normalizedData);

    const validatedData = interviewReportSchema.safeParse(normalizedData);

    if (!validatedData.success) {
      console.log("VALIDATION ERRORS:");
      console.log(validatedData.error.issues);
      throw new Error("Invalid AI response");
    }

    return validatedData.data;
  } catch (error) {
    console.log("GENERATE INTERVIEW REPORT ERROR:");
    console.log(error);
    throw error;
  }
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });

    return pdfBuffer;
  } catch (error) {
    console.log("PDF GENERATION ERROR:");
    console.log(error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function genarateResumePdf({ resume, selfDescription, jobDescription }) {
  const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF not more than 2 pages. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: GEMINI_RESUME_HTML_SCHEMA,
        temperature: 0.3,
      },
    });

    const jsonContent = JSON.parse(response.text);

    if (!jsonContent.html || typeof jsonContent.html !== "string") {
      throw new Error("AI did not return valid HTML content");
    }

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

    return pdfBuffer;
  } catch (error) {
    console.log("RESUME PDF GENERATION ERROR:");
    console.log(error);
    throw error;
  }
}

export { generateInterviewReport, genarateResumePdf };