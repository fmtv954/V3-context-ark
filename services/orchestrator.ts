
import { Project, DocMetadata, DocStatus, ProjectStatus } from '../types';
import { updateProject } from './storage';
import { aiService } from './ai_service'; // Use new service
import { PLATFORM_TEMPLATES, DOC_TEMPLATES, PACKS } from '../constants';

const generatePlatformFiles = (project: Project): Record<string, string> => {
    const platforms = project.intake.targetPlatforms || [];
    const newFiles: Record<string, string> = {};

    platforms.forEach(platform => {
        if (PLATFORM_TEMPLATES[platform]) {
            let filename = `${platform}_rules.md`;
            
            switch (platform) {
                case 'cursor': filename = '.cursorrules'; break;
                case 'windsurf': filename = '.windsurfrules'; break;
                case 'bolt': filename = 'bolt_prompt.md'; break;
                case 'cline': filename = '.clinerules'; break;
                case 'replit': filename = '.replit.md'; break; // Or replit_agent_rules.md
                case 'lovable': filename = 'lovable_knowledge.md'; break;
                case 'continue': filename = '.continue/config.json'; break; // Conceptual path
                case 'copilot': filename = '.github/copilot-instructions.md'; break;
                case 'v0': filename = 'v0_system_prompt.md'; break;
                case 'blackbox': filename = 'blackbox_context.md'; break;
                case 'firebase': filename = 'idx_instructions.md'; break;
            }

            const path = `/platform/${platform}/${filename}`;
            newFiles[path] = PLATFORM_TEMPLATES[platform];
        }
    });
    return newFiles;
};

export const generateProjectKernel = async (project: Project): Promise<Project> => {
    const updatedProject = { ...project };
    
    try {
        // J1_INTAKE: Generate Kernel Draft
        const intakeJson = JSON.stringify(updatedProject.files['/intake.json']);
        const kernelPrompt = `
        Generate a 'project_kernel.json' structure based on the provided intake data.
        
        The JSON must have these top-level keys:
        - meta (name, pitch, description)
        - business (primaryGoal, differentiation)
        - users (primary, secondary, painPoints)
        - product (coreFeatures, userFlows)
        - tech (preferences, hardConstraints)
        - success (metrics)

        Return ONLY valid JSON.
        `;
        
        const kernelContent = await aiService.executeTask('J1_INTAKE', kernelPrompt, {'intake.json': intakeJson}, { jsonMode: true });
        updatedProject.files['/project_kernel.json'] = kernelContent;
        
        // J2_PLANNER: Generate Agents (Doc 00) - Needs High Reasoning
        const agentsPrompt = "Create a list of AI agents (Spec Architect, Dev Agent, QA Agent) and their roles for this project.";
        const agentsContent = await aiService.executeTask('J2_PLANNER', agentsPrompt, {'/project_kernel.json': kernelContent});
        updatedProject.files['/AGENTS.md'] = agentsContent;

        const platformFiles = generatePlatformFiles(updatedProject);
        updatedProject.files = { ...updatedProject.files, ...platformFiles };

        updatedProject.status = ProjectStatus.GENERATING;
        updateProject(updatedProject);
        return updatedProject;
    } catch (e) {
        console.error("Failed to generate kernel", e);
        throw e;
    }
};

export const regenerateDocument = async (project: Project, docId: string, instructions?: string): Promise<Project> => {
    const updatedProject = { ...project };
    const docIndex = updatedProject.docs.findIndex(d => d.id === docId);
    if (docIndex === -1) throw new Error("Doc not found");

    const doc = updatedProject.docs[docIndex];
    updatedProject.docs[docIndex] = { ...doc, status: DocStatus.GENERATING, isApproved: false };
    updateProject(updatedProject);

    try {
        const context: Record<string, string> = {
            '/project_kernel.json': updatedProject.files['/project_kernel.json'] || '{}',
            '/AGENTS.md': updatedProject.files['/AGENTS.md'] || ''
        };

        // Include dependencies
        doc.dependsOn.forEach(depId => {
            const depDoc = updatedProject.docs.find(d => d.id === depId);
            if (depDoc && updatedProject.files[`/docs/${depDoc.filename}`]) {
                context[`/docs/${depDoc.filename}`] = updatedProject.files[`/docs/${depDoc.filename}`];
            }
        });

        // Current content (for refinement)
        if (updatedProject.files[`/docs/${doc.filename}`]) {
            context['CURRENT_VERSION'] = updatedProject.files[`/docs/${doc.filename}`];
        }

        let prompt = `Regenerate ${doc.title}.`;
        if (instructions) {
            prompt += `\nSpecific feedback to address: ${instructions}`;
        } else {
            prompt += `\nImprove clarity, detail, and alignment with the project kernel.`;
        }

        // J4_REFINER: Specialized in editing/rewriting
        const content = await aiService.executeTask('J4_REFINER', prompt, context);

        updatedProject.files[`/docs/${doc.filename}`] = content;
        updatedProject.docs[docIndex] = { ...doc, status: DocStatus.COMPLETED, isApproved: false };
        
        updateProject(updatedProject);
        return updatedProject;

    } catch (error) {
        console.error("Regeneration failed", error);
        updatedProject.docs[docIndex] = { ...doc, status: DocStatus.ERROR };
        updateProject(updatedProject);
        throw error;
    }
};

export const generateBatch = async (project: Project, batchIndex: number, onUpdate: (p: Project) => void) => {
    let currentProject = { ...project };
    
    const packDefinition = PACKS[currentProject.packId] || PACKS['vibe_mvp'];
    const allowedDocs = new Set(packDefinition.core_docs);

    const docsToGenerate = currentProject.docs.filter(
        d => d.batchIndex === batchIndex && d.status === DocStatus.PENDING
    );

    if (docsToGenerate.length === 0) return currentProject;

    for (const doc of docsToGenerate) {
        
        // FILTER: If doc is not in the selected pack, mark as skipped
        if (!allowedDocs.has(doc.id)) {
             currentProject.docs = currentProject.docs.map(d => 
                d.id === doc.id ? { ...d, status: DocStatus.SKIPPED } : d
            );
            updateProject(currentProject);
            onUpdate(currentProject);
            continue;
        }

        currentProject.docs = currentProject.docs.map(d => 
            d.id === doc.id ? { ...d, status: DocStatus.GENERATING } : d
        );
        onUpdate(currentProject);

        try {
            const context: Record<string, string> = {
                '/project_kernel.json': currentProject.files['/project_kernel.json'] || '{}',
                '/AGENTS.md': currentProject.files['/AGENTS.md'] || ''
            };

            doc.dependsOn.forEach(depId => {
                const depDoc = currentProject.docs.find(d => d.id === depId);
                if (depDoc && currentProject.files[`/docs/${depDoc.filename}`]) {
                    context[`/docs/${depDoc.filename}`] = currentProject.files[`/docs/${depDoc.filename}`];
                }
            });

            // Inject Template if available (SDD Principle)
            const template = DOC_TEMPLATES[doc.id];
            let instruction = `Write ${doc.title}.`;
            if (template) {
                instruction = `Fill this template:\n\n${template}\n\nUse context to fill placeholders.`;
            }

            // J3_WRITER: High quality writing for docs
            const content = await aiService.executeTask(
                'J3_WRITER',
                instruction,
                context
            );

            currentProject.files[`/docs/${doc.filename}`] = content;
            
            currentProject.docs = currentProject.docs.map(d => 
                d.id === doc.id ? { ...d, status: DocStatus.COMPLETED } : d
            );
            
            const total = currentProject.docs.length;
            const completed = currentProject.docs.filter(d => d.status === DocStatus.COMPLETED || d.status === DocStatus.SKIPPED).length;
            currentProject.progress = Math.round((completed / total) * 100);

            updateProject(currentProject);
            onUpdate(currentProject);

        } catch (error) {
            console.error(`Failed to generate ${doc.filename}`, error);
             currentProject.docs = currentProject.docs.map(d => 
                d.id === doc.id ? { ...d, status: DocStatus.ERROR } : d
            );
            onUpdate(currentProject);
        }
    }
    
    return currentProject;
};

export const generateAllCoreDocs = async (project: Project, onUpdate: (p: Project) => void) => {
    let currentProject = { ...project };
    
    // Run Batches 0 to 5 sequentially
    for (let i = 0; i <= 5; i++) {
        console.log(`Running Batch ${i} in Turbo Mode...`);
        currentProject = await generateBatch(currentProject, i, onUpdate);
    }
    
    currentProject.status = ProjectStatus.READY;
    updateProject(currentProject);
    onUpdate(currentProject);
    return currentProject;
}