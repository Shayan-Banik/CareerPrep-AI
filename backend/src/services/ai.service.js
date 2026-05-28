// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";
// dotenv.config();
// import { z } from "zod";
// import { zodToJsonSchema } from "zod-to-json-schema"; //forn normalizing ai response and validating it against schema

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const interviewReportSchema = z.object({
//   matchScore: z
//     .number()
//     .describe(
//       "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
//     ),
//   technicalQuestions: z
//     .array(
//       z.object({
//         question: z
//           .string()
//           .describe("The technical question can be asked in the interview"),
//         intention: z
//           .string()
//           .describe("The intention of interviewer behind asking this question"),
//         answer: z
//           .string()
//           .describe(
//             "How to answer this question, what points to cover, what approach to take etc.",
//           ),
//       }),
//     )
//     .describe(
//       "Technical questions that can be asked in the interview along with their intention and how to answer them",
//     ),
//   behavioralQuestions: z
//     .array(
//       z.object({
//         question: z
//           .string()
//           .describe("The technical question can be asked in the interview"),
//         intention: z
//           .string()
//           .describe("The intention of interviewer behind asking this question"),
//         answer: z
//           .string()
//           .describe(
//             "How to answer this question, what points to cover, what approach to take etc.",
//           ),
//       }),
//     )
//     .describe(
//       "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
//     ),
//   skillGaps: z
//     .array(
//       z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z
//           .enum(["low", "medium", "high"])
//           .describe(
//             "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
//           ),
//       }),
//     )
//     .describe(
//       "List of skill gaps in the candidate's profile along with their severity",
//     ),
//   preparationPlan: z
//     .array(
//       z.object({
//         day: z
//           .number()
//           .describe("The day number in the preparation plan, starting from 1"),
//         focus: z
//           .string()
//           .describe(
//             "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
//           ),
//         tasks: z
//           .array(z.string())
//           .describe(
//             "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
//           ),
//       }),
//     )
//     .describe(
//       "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
//     ),
//   title: z
//     .string()
//     .describe(
//       "The title of the job for which the interview report is generated",
//     ),
// });

// async function generateInterviewReport({
//   resume,
//   selfDescription,
//   jobDescription,
// }) {
//   const prompt = `
//             Generate an interview report for a candidate with the following details:
//             - Return ONLY valid JSON.

// Do not use markdown.
// Do not wrap response in \`\`\`.

//             - Follow interviewReportSchema exactly
//             - Candidate name, appliedPosition and provide overall match score
//             - provide technicalQuestions(question, intention, answer), behavioralQuestions(question, intention, answer), skillGaps(skill, severity), based on the candidate's profile and job
//             description
//             - Strengths and weaknesses should be based on the candidate's profile and job description, and should be specific and actionable

//             - preparationPlan(day, focus, tasks) should be detailed and actionable, providing specific tasks for each day that the candidate can follow to improve their chances in the interview
//             - Keep recommendation concise
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
// `;

//   const response = await ai.models.generateContent({
//     // model: "gemini-3-flash-preview",
//     model: "gemini-2.5-flash",
//     contents: prompt,
//     config: {
//       responseMimeType: "application/json",
//       // responseSchema: zodToJsonSchema(interviewReportSchema),
//     },
//   });

//   console.log(response.text);
//   const parsedData = JSON.parse(response.text);

//   const validatedData = interviewReportSchema.safeParse(parsedData.interviewReport);

//   if (!validatedData.success) {
//     console.log(validatedData.error.errors);
//     console.log(validatedData.error.issues);
//     throw new Error("Invalid AI response");
//   }

//   return validatedData.data;
// }

// export default generateInterviewReport;

import { GoogleGenAI } from "@google/genai";
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
{
  "question": "string",
  "intention": "string",
  "answer": "string"
}

Skill Gap format:
{
  "skill": "string",
  "severity": "low | medium | high"
}

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
{
  "day": number,
  "focus": "string",
  "tasks": ["task1", "task2"]
}

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    console.log("RAW AI RESPONSE:");
    console.log(response.text);

    const parsedData = JSON.parse(response.text);

    const report = parsedData.interviewReport || parsedData;

    const normalizedData = {
      matchScore: report.matchScore || report.overallMatchScore || 0,

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



export default generateInterviewReport;
