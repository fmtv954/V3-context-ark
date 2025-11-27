import React, { useEffect, useState } from 'react';
import { Project, DocStatus } from '../types';
import { BATCHES, ENCOURAGING_MESSAGES } from '../constants';
import { Database, Layers, ArrowDown, CheckCircle, Loader2, CircleDashed, Sparkles, Bot, Lock } from 'lucide-react';

interface DependencyGraphProps {
  project: Project;
  activeBatch: number;
  isProcessing: boolean;
}

export const DependencyGraph: React.FC<DependencyGraphProps> = ({ project, activeBatch, isProcessing }) => {
  const [message, setMessage] = useState(ENCOURAGING_MESSAGES[0]);
  
  // Animation loop for messages
  useEffect(() => {
    if (!isProcessing) return;
    
    const interval = setInterval(() => {
      const randomMsg = ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
      setMessage(randomMsg);
    }, 3000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const hasKernel = !!project.files['/project_kernel.json'];

  const getBatchStatus = (batchIndex: number) => {
    const docs = project.docs.filter(d => d.batchIndex === batchIndex);
    if (docs.length === 0) return 'LOCKED';
    
    const allComplete = docs.every(d => d.status === DocStatus.COMPLETED);
    const anyGenerating = docs.some(d => d.status === DocStatus.GENERATING);
    const anyError = docs.some(d => d.status === DocStatus.ERROR);

    if (allComplete) return 'COMPLETED';
    if (anyGenerating) return 'GENERATING';
    if (anyError) return 'ERROR';
    
    // Check if previous batch is done to see if this is "READY" or "LOCKED"
    if (batchIndex === 0) return hasKernel ? 'READY' : 'LOCKED';
    
    const prevBatchDocs = project.docs.filter(d => d.batchIndex === batchIndex - 1);
    const prevComplete = prevBatchDocs.length > 0 && prevBatchDocs.every(d => d.status === DocStatus.COMPLETED);
    
    return prevComplete ? 'READY' : 'LOCKED';
  };

  return (
    <div className="w-full h-full bg-bolt-bg flex flex-col items-center justify-start overflow-y-auto relative p-8">
      
      {/* Live Feed Header */}
      <div className="w-full max-w-2xl mb-10 text-center relative z-10">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${isProcessing ? 'bg-bolt-accent/10 border-bolt-accent text-bolt-accent shadow-[0_0_20px_rgba(0,144,255,0.2)]' : 'bg-bolt-sidebar border-bolt-border text-bolt-muted'}`}>
            {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Bot size={16} />}
            <span className="text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-300 key={message}">
                {isProcessing ? message : "Spec Architect Ready"}
            </span>
        </div>
      </div>

      <div className="relative w-full max-w-md flex flex-col items-center gap-8 pb-20">
        
        {/* Connection Line Layer */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-bolt-border -z-0"></div>

        {/* Kernel Node */}
        <div className={`relative z-10 w-full p-6 rounded-xl border-2 transition-all duration-500 flex flex-col items-center text-center bg-bolt-sidebar group
            ${hasKernel 
                ? 'border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                : isProcessing && !hasKernel 
                    ? 'border-bolt-accent shadow-[0_0_15px_rgba(0,144,255,0.3)] animate-pulse' 
                    : 'border-bolt-border'
            }`}
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${hasKernel ? 'bg-green-500 text-white' : 'bg-bolt-bg border border-bolt-border text-bolt-muted'}`}>
                <Database size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Project Kernel</h3>
            <p className="text-sm text-bolt-muted mt-1">The Brain & Intake Data</p>
            {hasKernel && <div className="absolute -right-2 -top-2 bg-green-500 text-white rounded-full p-1"><CheckCircle size={14} /></div>}
        </div>

        {/* Batches */}
        {BATCHES.map((batch, i) => {
            const status = getBatchStatus(batch.index);
            const isActive = activeBatch === batch.index && isProcessing;
            const isCompleted = status === 'COMPLETED';
            const isLocked = status === 'LOCKED';

            return (
                <React.Fragment key={batch.index}>
                    {/* Arrow Connection */}
                    <div className="relative z-10 bg-bolt-bg p-1 rounded-full border border-bolt-border text-bolt-muted">
                        <ArrowDown size={16} className={isActive ? 'animate-bounce text-bolt-accent' : ''} />
                    </div>

                    <div className={`relative z-10 w-full p-5 rounded-xl border transition-all duration-500 flex items-center gap-4 bg-bolt-sidebar
                        ${isActive 
                            ? 'border-bolt-accent shadow-[0_0_20px_rgba(0,144,255,0.2)] scale-105' 
                            : isCompleted 
                                ? 'border-green-500/30' 
                                : 'border-bolt-border opacity-90'
                        }
                        ${isLocked ? 'opacity-50 grayscale' : ''}
                    `}>
                        {/* Batch Icon */}
                        <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border transition-all
                            ${isCompleted ? 'bg-green-500/10 border-green-500/50 text-green-500' : 
                              isActive ? 'bg-bolt-accent/10 border-bolt-accent text-bolt-accent' : 
                              'bg-bolt-bg border-bolt-border text-bolt-muted'}
                        `}>
                            {isCompleted ? <CheckCircle size={20} /> : 
                             isActive ? <Loader2 size={20} className="animate-spin" /> : 
                             isLocked ? <Lock size={18} /> :
                             <Layers size={20} />
                            }
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <h4 className={`font-semibold text-sm ${isActive ? 'text-bolt-accent' : 'text-white'}`}>
                                    Batch {batch.index + 1}: {batch.name}
                                </h4>
                            </div>
                            <p className="text-xs text-bolt-muted truncate">{batch.description}</p>
                            
                            {/* Progress Bar for Batch */}
                            {(isActive || isCompleted) && (
                                <div className="mt-2 w-full h-1 bg-bolt-bg rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-bolt-accent animate-pulse'}`} 
                                        style={{ width: isCompleted ? '100%' : '60%' }} 
                                    />
                                </div>
                            )}
                        </div>

                        {isActive && (
                            <div className="absolute -right-1 -top-1">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bolt-accent opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-bolt-accent"></span>
                                </span>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            );
        })}
        
        {/* End Node */}
        <div className="relative z-10 mt-2">
            <div className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest flex items-center gap-2
                ${project.progress === 100 ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20' : 'bg-bolt-sidebar border-bolt-border text-bolt-muted'}
            `}>
                {project.progress === 100 ? <Sparkles size={14} /> : <CircleDashed size={14} />}
                {project.progress === 100 ? "Spec Pack Ready" : "Pack Incomplete"}
            </div>
        </div>

      </div>
    </div>
  );
};
