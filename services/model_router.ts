
import { MODEL_ROSTER, TASK_ROUTING } from '../constants';
import { AiTaskType, ModelConfig, UserTier } from '../types';

export class ModelRouter {
    static selectModel(task: AiTaskType, tier: UserTier = 'free'): ModelConfig {
        const routing = TASK_ROUTING[task] || TASK_ROUTING['J3_WRITER'];
        const assignment = routing[tier] || routing['free'];
        
        let config = MODEL_ROSTER[assignment.primary];
        
        // Fallback if config not found (shouldn't happen if constants are synced)
        if (!config) {
            console.warn(`Primary model ${assignment.primary} not found for ${task}, falling back to ${assignment.fallback}`);
            config = MODEL_ROSTER[assignment.fallback] || MODEL_ROSTER['gemini-flash'];
        }

        return config;
    }

    static getFallbackModel(task: AiTaskType, tier: UserTier = 'free'): ModelConfig {
        const routing = TASK_ROUTING[task] || TASK_ROUTING['J3_WRITER'];
        const assignment = routing[tier] || routing['free'];
        return MODEL_ROSTER[assignment.fallback] || MODEL_ROSTER['gemini-flash'];
    }
}
