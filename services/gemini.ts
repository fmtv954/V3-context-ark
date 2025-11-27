
// DEPRECATED: Use ai_service.ts for all calls.
// Keeping this file to prevent breakage of legacy imports if any exist, 
// but re-exporting from the new service.

import { aiService } from "./ai_service";
export { aiService };

// Updated helper for intake analysis using JSON mode
export const analyzeRawInput = async (text: string) => {
    const prompt = `
    Analyze the following raw project notes and extract structured data.
    
    Input Text:
    "${text}"

    Return a JSON object with the following keys exactly:
    - projectName: inferred name or "Untitled Project"
    - description: summary of the idea (2-3 sentences)
    - targetAudience: who is this for?
    - coreOffer: what is the main value proposition?
    - constraints: any timeline, budget, or non-functional constraints mentioned
    - techStackPrefs: any mentioned technologies (e.g. "Next.js", "Python")

    Do not include any markdown formatting like \`\`\`json. Return raw JSON only.
    `;

    try {
        const response = await aiService.executeTask('J1_INTAKE', prompt, {}, { jsonMode: true });
        // Sanitize if the model still adds markdown fences despite instructions (common safety net)
        const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
    } catch (e) {
        console.error("Intake Analysis Failed:", e);
        return {
            description: text, // Fallback to raw text
            constraints: "AI extraction failed. Please refine manually."
        };
    }
};

export const getExpertSuggestion = async (field: string, context: any) => {
    return await aiService.executeTask('J3_WRITER', `Suggest a short, professional value for the field "${field}" based on this project context: ${JSON.stringify(context)}`);
};
