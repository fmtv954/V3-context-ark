
import { GoogleGenAI } from "@google/genai";
import { AiTaskType, User, ModelConfig } from "../types";
import { ModelRouter } from "./model_router";
import { getCurrentUser } from "./auth";

const SYSTEM_PROMPT_BASE = `You are the Context Ark Spec Architect. 
Your goal is to generate professional, structured technical documentation.
Follow all templates strictly. Do not hallucinate facts outside the provided context.`;

class AiService {
    
    async executeTask(task: AiTaskType, prompt: string, contextFiles: Record<string, string> = {}, options: { jsonMode?: boolean } = {}): Promise<string> {
        const user = getCurrentUser();
        const tier = user?.tier || 'free';
        const modelConfig = ModelRouter.selectModel(task, tier);
        
        console.log(`[AI] Executing ${task} using ${modelConfig.name} (${modelConfig.provider})`);

        try {
            return await this.callProvider(modelConfig, prompt, contextFiles, user, options);
        } catch (error) {
            console.error(`[AI] Primary model failed. Trying fallback...`, error);
            const fallbackConfig = ModelRouter.getFallbackModel(task, tier);
            return await this.callProvider(fallbackConfig, prompt, contextFiles, user, options);
        }
    }

    private async callProvider(config: ModelConfig, prompt: string, contextFiles: Record<string, string>, user: User | null, options: { jsonMode?: boolean } = {}): Promise<string> {
        // Prepare Context
        const contextStr = Object.entries(contextFiles)
            .map(([name, content]) => `File: ${name}\nContent:\n${content}\n---\n`)
            .join('\n');
        
        const fullPrompt = `${SYSTEM_PROMPT_BASE}\n\nCONTEXT:\n${contextStr}\n\nTASK:\n${prompt}`;

        // GOOGLE (Gemini)
        if (config.provider === 'google') {
            // Use User key if BYOK, else use Env key
            const apiKey = user?.apiKeys?.gemini || process.env.API_KEY;
            
            if (!apiKey || apiKey === 'mock') {
                return this.mockResponse(config.name, options.jsonMode);
            }

            const ai = new GoogleGenAI({ apiKey });
            const requestConfig: any = {
                model: config.id,
                contents: fullPrompt,
            };

            if (options.jsonMode) {
                requestConfig.config = {
                    responseMimeType: "application/json"
                };
            }

            const response = await ai.models.generateContent(requestConfig);
            return response.text || '';
        }

        // OPENAI / ANTHROPIC / DEEPSEEK
        // Note: In a real Client-Side app, calling these directly exposes keys if not using a Proxy.
        // We assume the user has provided a BYOK key in Settings for this "Pro" flow.
        if (['openai', 'anthropic', 'deepseek'].includes(config.provider)) {
            const apiKey = user?.apiKeys?.[config.provider as keyof typeof user.apiKeys];
            
            if (!apiKey) {
                throw new Error(`Missing API Key for ${config.provider}. Please add it in Settings.`);
            }

            // Implement fetch calls here. For brevity in this demo, we'll simulate the call structure
            // or fallback to a mock if strictly client-side without a proxy.
            // REAL IMPLEMENTATION WOULD GO HERE:
            // await fetch('https://api.openai.com/v1/chat/completions', ...)
            
            console.warn(`[AI] Direct API call to ${config.provider} requires implementation/proxy. simulating success.`);
            return this.mockResponse(config.name, options.jsonMode);
        }

        return this.mockResponse("Unknown Provider", options.jsonMode);
    }

    private async mockResponse(modelName: string, jsonMode?: boolean): Promise<string> {
        await new Promise(r => setTimeout(r, 1500));
        
        if (jsonMode) {
            return JSON.stringify({
                projectName: "Mock Project",
                description: `This is a simulated JSON response from ${modelName} because no valid API key was found.`,
                targetAudience: "Demo Users",
                coreOffer: "Simulated Analysis",
                constraints: "No real AI call made.",
                techStackPrefs: "React, Node.js"
            });
        }

        return `[${modelName} Generated Content]\n\nThis is a simulated response because no valid API key was found for the selected provider.\n\nPlease add your API Key in Settings > API Config.`;
    }
}

export const aiService = new AiService();
