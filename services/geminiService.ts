
import { GoogleGenAI, Type } from "@google/genai";
import { StudentProfile } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder check. In a real environment, the key would be set.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || 'MISSING_API_KEY' });

const resumeAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        technicalSkills: {
            type: Type.ARRAY,
            description: "List of technical skills extracted from the resume.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the skill, e.g., 'React', 'Python'."},
                    proficiency: { type: Type.STRING, description: "Estimated proficiency: 'Beginner', 'Intermediate', 'Advanced', or 'Expert'." }
                },
                required: ["name", "proficiency"]
            }
        },
        softSkills: {
            type: Type.ARRAY,
            description: "List of soft skills like 'Teamwork', 'Communication'.",
            items: { type: Type.STRING }
        },
        personalitySnapshot: {
            type: Type.STRING,
            description: "A brief, one-sentence summary of the candidate's likely personality traits based on the resume's tone and content."
        },
        careerReadinessScore: {
            type: Type.INTEGER,
            description: "A score from 0 to 100 indicating career readiness for a tech role."
        },
        topCareerMatches: {
            type: Type.ARRAY,
            description: "Top 3 most suitable career paths for the student.",
            items: {
                type: Type.OBJECT,
                properties: {
                    role: { type: Type.STRING, description: "The job title, e.g., 'Frontend Developer'."},
                    description: { type: Type.STRING, description: "A brief explanation of why this role is a good fit."},
                    matchPercentage: { type: Type.INTEGER, description: "A percentage score (0-100) indicating how good the match is." }
                },
                required: ["role", "description", "matchPercentage"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "A list of critical skills missing for the top recommended career path.",
            items: { type: Type.STRING }
        },
        suggestedCourses: {
            type: Type.ARRAY,
            description: "A list of 3-5 online courses to help bridge the skill gaps.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the course."},
                    platform: { type: Type.STRING, description: "The platform offering the course, e.g., 'Coursera', 'NPTEL'."},
                    url: { type: Type.STRING, description: "A sample URL for the course." }
                },
                required: ["name", "platform", "url"]
            }
        }
    },
    required: ["technicalSkills", "softSkills", "personalitySnapshot", "careerReadinessScore", "topCareerMatches", "skillGaps", "suggestedCourses"]
};

export const analyzeResume = async (resumeText: string): Promise<StudentProfile> => {
    if (!API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }
    
    const prompt = `
    Analyze the following resume of a BPUT (Biju Patnaik University of Technology) student.
    Based on the content, generate a comprehensive career profile. The student is looking for internships and entry-level jobs in the tech industry.

    - Extract all technical and soft skills. Estimate proficiency for technical skills.
    - Provide a concise personality snapshot.
    - Calculate a 'Career Readiness Score' out of 100.
    - Suggest the top 3 career matches with a match percentage and a brief justification.
    - For the #1 career match, identify the key skill gaps.
    - Recommend specific online courses from platforms like NPTEL, Coursera, or Udemy to fill these gaps.

    Resume Content:
    ---
    ${resumeText}
    ---

    Provide the output strictly in the specified JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: resumeAnalysisSchema,
                temperature: 0.2,
            },
        });

        const jsonText = response.text.trim();
        const parsedProfile: StudentProfile = JSON.parse(jsonText);
        return parsedProfile;

    } catch (error) {
        console.error("Error analyzing resume with Gemini API:", error);
        throw new Error("Failed to get analysis from AI. Please check the resume content and try again.");
    }
};
