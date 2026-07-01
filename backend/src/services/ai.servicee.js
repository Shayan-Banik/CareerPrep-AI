//! This file is for learning purpose
//* What did I make mistake in this file?

import { GoogleGenAI } from "@google/genai";
import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  recommendation: z.string(),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),

  title: z.string(),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview report.

Return ONLY valid JSON.

Do not use markdown.
Do not wrap response in backticks.

IMPORTANT:
Use EXACT field names only.

Required fields:
- matchScore
- technicalQuestions
- behavioralQuestions
- skillGaps
- strengths
- weaknesses
- recommendation
- preparationPlan
- title

Technical/Behavioral Question format:
[
  {
  "question": "string",
  "intention": "string",
  "answer": "string"
  }
]

Skill Gap format:
[
  {
  "skill": "string",
  "severity": "low | medium | high"
  }
]

Strengths format:
[
  "strength 1",
  "strength 2"
]

Weaknesses format:
[
  "weakness 1",
  "weakness 2"
]

Recommendation format:
"final recommendation string"

Preparation Plan format:
[
  {
  "day": number,
  "focus": "string",
  "tasks": ["task1", "task2"],
  ... upto 7 days
  }
]

title format:
"string"

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  function geminiSchema(schema) {
    try {
      return zodToJsonSchema(schema, {
        target: "openApi3",
        $refStrategy: "none",
      });
    } catch (error) {
      console.log("SCHEMA CONVERSION ERROR:");
      console.log(error);
      throw new Error("Failed to convert Zod schema for Gemini");
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: geminiSchema(interviewReportSchema),
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

    const parsedData = JSON.parse(cleanedText);

    const report = parsedData.interviewReport || parsedData;

    const normalizedData = {
      // matchScore: report.matchScore || report.overallMatchScore || 0,
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

      technicalQuestions:
        report.technicalQuestions?.map((q) => ({
          question: q.question || "",

          intention: q.intention || q.feedback || "Technical evaluation",

          answer: q.answer || "",
        })) || [],

      behavioralQuestions:
        report.behavioralQuestions?.map((q) => ({
          question: q.question || "",

          intention: q.intention || q.feedback || "Behavioral evaluation",

          answer: q.answer || "",
        })) || [],

      skillGaps:
        report.skillGaps?.map((gap) => ({
          skill: gap.skill || "",

          severity: gap.severity?.toLowerCase()?.trim() || "low",
        })) || [],

      strengths: report.strengths || [],

      weaknesses: report.weaknesses || [],

      recommendation: report.recommendation || "No recommendation provided",

      preparationPlan:
        report.preparationPlan?.map((plan, index) => ({
          day: typeof plan.day === "number" ? plan.day : index + 1,

          focus: plan.focus || plan.topic || "Interview Preparation",

          tasks: plan.tasks || [plan.type || "Practice interview preparation"],
        })) || [],

      title: report.title || report.appliedPosition || "Software Developer",
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
    console.log(error);
    throw error;
  }
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
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

  await browser.close();

  return pdfBuffer;
}

async function genarateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which will be converted to PDF using puppeteer and then parsed using ai to extract relevant information for interview report generation",
      ),
  });

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

  // const response = await ai.models.generateContent({
  //   model: "gemini-2.5-flash",
  //   contents: prompt,
  //   config: {
  //     responseMimeType: "application/json",
  //     responseSchema: zodToJsonSchema(resumePdfSchema),
  //     temperature: 0.3,
  //   },
  // });

  // const jsonContent = JSON.parse(response.text);

  // const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  // return pdfBuffer;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: geminiSchema(resumePdfSchema),
        temperature: 0.3,
      },
    });

    const jsonContent = JSON.parse(response.text);
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
    return pdfBuffer;
  } catch (error) {
    console.log("RESUME PDF GENERATION ERROR:");
    console.log(error);
    throw error;
  }
}

export { generateInterviewReport, genarateResumePdf };
