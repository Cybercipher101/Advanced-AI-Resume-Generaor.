import { GoogleGenAI } from '@google/genai';

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getGeminiATSFeedback = async (resumeContent: string) => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Review this resume section for ATS compliance and suggest immediate improvements:\n\n${resumeContent}`,
        config: {
            systemInstruction: "You are an expert ATS (Applicant Tracking System) parser and career coach. Review the provided resume content. Instantly identify any issues (e.g., vague bullet points, missing action verbs, passive voice, lack of metrics) and provide 2-3 bullet points of highly actionable, concise feedback. Do not be overly polite; be direct and analytical.",
            temperature: 0.3,
        }
    });
    return response.text;
};

export const generateResumeData = async (userProfile: string) => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a structured JSON resume based on the following user info:\n\n${userProfile}`,
        config: {
            systemInstruction: "You are an expert resume writer. Generate a highly professional, ATS-compliant resume in JSON format. The JSON must follow this exact structure: { \"personalInfo\": { \"name\": \"\", \"email\": \"\", \"phone\": \"\", \"summary\": \"\" }, \"experience\": [{ \"title\": \"\", \"company\": \"\", \"date\": \"\", \"description\": [] }], \"education\": [{ \"degree\": \"\", \"school\": \"\", \"date\": \"\" }], \"skills\": [] }. Return ONLY valid JSON.",
            temperature: 0.2,
            responseMimeType: "application/json"
        }
    });
    return response.text;
}
