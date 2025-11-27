
import React from 'react';
import { Bot, Play, Check, AlertTriangle, Coins, Zap } from 'lucide-react';
import { BATCHES, COST_PER_REGEN } from '../constants';
import { Project, DocStatus } from '../types';

interface SpecArchitectProps {
    project: Project;
    activeBatch: number;
    isProcessing: boolean;
    hasKernel: boolean;
    userCredits: number;
    onInitializeKernel: () => void;
    onGenerateBatch: (index: number) => void;
    onGenerateCoreDocs?: () => void; // New prop
}

export const SpecArchitect: React.FC<SpecArchitectProps> = ({
    project,
    activeBatch,
    isProcessing,
    hasKernel,
    userCredits,
    onInitializeKernel,
    onGenerateBatch,
    onGenerateCoreDocs
}) => {
    const completedDocs = project.docs.filter(d => d.status === DocStatus.COMPLETED || d.status === DocStatus.SKIPPED).length;
    const totalDocs = project.docs.length;
    const overallProgress = Math.round((completedDocs / totalDocs) * 100);

    return (
        <div className="w-80 bg-bolt-sidebar border-l border-bolt-border flex flex-col h-full">
            <div className="p-4 border-b border-bolt-border bg-bolt-sidebar flex items-center justify-between shrink-0">
                <h3 className="font-bold flex items-center gap-2 text-sm">
                    <Bot size={18} className="text-bolt-accent" />
                    Spec Architect
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-medium bg-bolt-bg px-2 py-1 rounded-full border border-bolt-border text-bolt-muted" title="Regen Credits">
                    <Coins size={12} className="text-yellow-500" />
                    {userCredits}
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Step 0: Kernel */}
                <div className={`p-4 rounded-lg border ${hasKernel ? 'border-green-500/30 bg-green-500/5' : 'border-bolt-border bg-bolt-bg'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">0. Project Kernel</h4>
                        {hasKernel ? <Check size={16} className="text-green-500"/> : null}
                    </div>
                    <p className="text-xs text-bolt-muted mb-4">
                        Generate the project brain (intake, kernel, agents) before creating docs.
                    </p>
                    {!hasKernel && (
                        <button 
                            onClick={onInitializeKernel}
                            disabled={isProcessing}
                            className="w-full bg-bolt-accent hover:bg-blue-600 disabled:opacity-50 text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-2"
                        >
                           {isProcessing ? 'Thinking...' : 'Initialize Kernel'}
                        </button>
                    )}
                </div>

                {/* Turbo Button - Core Docs */}
                {hasKernel && overallProgress < 10 && onGenerateCoreDocs && (
                    <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm text-blue-400">Turbo Mode</h4>
                            <Zap size={14} className="text-blue-400" />
                        </div>
                        <p className="text-xs text-bolt-muted mb-3">
                            Auto-generate all {project.packId === 'vibe_mvp' ? '30 Core' : 'Spec'} docs in sequence.
                        </p>
                        <button 
                            onClick={onGenerateCoreDocs}
                            disabled={isProcessing}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                           {isProcessing ? 'Architecting...' : 'Generate Core Docs'}
                        </button>
                    </div>
                )}

                {/* Doc Batches */}
                {BATCHES.map((batch) => {
                    const batchDocs = project.docs.filter(d => d.batchIndex === batch.index);
                    const completedCount = batchDocs.filter(d => d.status === DocStatus.COMPLETED || d.status === DocStatus.SKIPPED).length;
                    const totalCount = batchDocs.length;
                    const isComplete = totalCount > 0 && completedCount === totalCount;
                    const isCurrent = activeBatch === batch.index;

                    // Simple dependency check
                    const isDisabled = !hasKernel || isProcessing || (batch.index > 0 && project.docs.some(d => d.batchIndex < batch.index && (d.status !== DocStatus.COMPLETED && d.status !== DocStatus.SKIPPED)));

                    return (
                        <div key={batch.index} className={`p-4 rounded-lg border transition-all ${isCurrent ? 'border-bolt-accent bg-bolt-accent/5' : 'border-bolt-border bg-bolt-bg'}`}>
                             <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-sm">Batch {batch.index + 1}: {batch.name}</h4>
                                {isComplete && <Check size={14} className="text-green-500"/>}
                            </div>
                            <p className="text-xs text-bolt-muted mb-3">{batch.description}</p>
                            
                            <div className="flex items-center justify-between text-xs text-bolt-muted mb-3">
                                <span>{completedCount}/{totalCount} Docs</span>
                                {isCurrent && <span className="text-bolt-accent animate-pulse">Generating...</span>}
                            </div>

                            {!isComplete && (
                                 <button 
                                    onClick={() => onGenerateBatch(batch.index)}
                                    disabled={isDisabled}
                                    className={`w-full py-2 rounded text-xs font-bold flex items-center justify-center gap-2 transition-colors ${isDisabled ? 'bg-bolt-border text-bolt-muted cursor-not-allowed' : 'bg-bolt-bg border border-bolt-accent text-bolt-accent hover:bg-bolt-accent hover:text-white'}`}
                                >
                                    <Play size={12} /> Generate Batch
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
            
            {/* API Key Warning */}
            {!process.env.API_KEY && (
                 <div className="p-4 bg-yellow-500/10 border-t border-yellow-500/20 text-yellow-500 text-xs flex items-start gap-2 shrink-0">
                    <AlertTriangle size={16} className="shrink-0" />
                    <p>No Gemini API Key found. Generation will fail or use mock data if implemented.</p>
                 </div>
            )}
        </div>
    );
};