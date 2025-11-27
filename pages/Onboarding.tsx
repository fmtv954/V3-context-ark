
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/storage';
import { analyzeRawInput, getExpertSuggestion } from '../services/gemini';
import { IntakeData, PlatformType } from '../types';
import { PROJECT_TEMPLATES } from '../constants';
import { ArrowRight, Bot, Rocket, Sparkles, Edit3, CheckCircle, Loader2, BrainCircuit, Terminal, Code, Code2, Heart, Box, Flame, Github, LayoutTemplate, ShoppingCart, MessagesSquare, Zap, Shield } from 'lucide-react';

type Step = 'DUMP' | 'ANALYZING' | 'REFINE' | 'SUMMARY';

const INITIAL_INTAKE: IntakeData = {
  projectName: '',
  description: '',
  targetAudience: '',
  coreOffer: '',
  constraints: '',
  techStackPrefs: '',
  targetPlatforms: ['cursor'],
  packId: 'vibe_mvp' // Default
};

// Define fields explicitly to control render order and prevent rendering random AI keys
const INTAKE_FIELDS: (keyof IntakeData)[] = [
    'projectName',
    'description',
    'targetAudience',
    'coreOffer',
    'constraints',
    'techStackPrefs'
];

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState<Step>('DUMP');
  const [rawNotes, setRawNotes] = useState('');
  const [intake, setIntake] = useState<IntakeData>(INITIAL_INTAKE);
  const [loadingSuggestion, setLoadingSuggestion] = useState<string | null>(null);
  const navigate = useNavigate();

  // Step 1 -> 2: Analyze
  const handleAnalyze = async () => {
    if (!rawNotes.trim()) return;
    setStep('ANALYZING');
    
    try {
        // If no API key, we mock a delay for UI demo purposes, or the service will fail gracefully
        const extracted = await analyzeRawInput(rawNotes);
        setIntake(prev => ({ ...prev, ...extracted }));
        setStep('REFINE');
    } catch (e) {
        console.error(e);
        // Fallback to manual entry if AI fails
        setStep('REFINE');
    }
  };

  // Template Selection Handler
  const handleTemplateSelect = (templateId: string) => {
      const template = PROJECT_TEMPLATES.find(t => t.id === templateId);
      if (template) {
          setIntake(prev => ({ ...prev, ...template.intakeData }));
          setStep('REFINE');
      }
  };

  // Step 2: Refine - Helper to get suggestion
  const handleSuggestion = async (field: keyof IntakeData) => {
    setLoadingSuggestion(field);
    try {
        const suggestion = await getExpertSuggestion(field, intake);
        if (suggestion) {
            setIntake(prev => ({ ...prev, [field]: suggestion }));
        }
    } catch (e) {
        console.error(e);
    } finally {
        setLoadingSuggestion(null);
    }
  };

  const updateIntake = (field: keyof IntakeData, value: any) => {
    setIntake(prev => ({ ...prev, [field]: value }));
  };

  const togglePlatform = (platform: PlatformType) => {
      const current = intake.targetPlatforms || [];
      if (current.includes(platform)) {
          updateIntake('targetPlatforms', current.filter(p => p !== platform));
      } else {
          updateIntake('targetPlatforms', [...current, platform]);
      }
  }

  // Step 3 -> Finish
  const handleFinish = () => {
    const project = createProject(intake);
    navigate(`/workspace/${project.id}`);
  };

  // Safe render helper for summary view
  const renderValue = (val: any) => {
      if (typeof val === 'string') return val;
      if (typeof val === 'object') return JSON.stringify(val);
      return String(val);
  };

  // Icon helper for templates
  const getTemplateIcon = (id: string) => {
      switch(id) {
          case 'saas-mvp': return <LayoutTemplate size={20} />;
          case 'e-commerce': return <ShoppingCart size={20} />;
          case 'ai-agent': return <Bot size={20} />;
          default: return <Sparkles size={20} />;
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] max-w-4xl mx-auto px-6 py-10">
      
      {/* Progress / Header */}
      <div className="w-full mb-10 text-center">
         <h1 className="text-3xl font-bold text-white mb-3">
            {step === 'DUMP' && "Brain Dump"}
            {step === 'ANALYZING' && "Consulting the Spec Architect..."}
            {step === 'REFINE' && "Refine the Blueprint"}
            {step === 'SUMMARY' && "Plan Approval"}
         </h1>
         <p className="text-bolt-muted">
            {step === 'DUMP' && "Don't worry about structure. Paste emails, rough notes, or just ramble about your idea."}
            {step === 'ANALYZING' && "Extracting requirements, identifying gaps, and preparing suggestions."}
            {step === 'REFINE' && "Review what we found. Use the AI to fill in the gaps."}
            {step === 'SUMMARY' && "Review the final intake plan before we generate the project kernel."}
         </p>
      </div>

      <div className="w-full">
        
        {/* VIEW: BRAIN DUMP */}
        {step === 'DUMP' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="bg-bolt-sidebar border border-bolt-border rounded-2xl p-6 shadow-2xl">
                    <textarea 
                        value={rawNotes}
                        onChange={(e) => setRawNotes(e.target.value)}
                        className="w-full bg-bolt-bg/50 border border-bolt-border rounded-xl px-6 py-6 text-white text-lg leading-relaxed focus:outline-none focus:border-bolt-accent transition-colors min-h-[250px] resize-none placeholder:text-bolt-border"
                        placeholder="e.g. I want to build a SaaS for dog walkers. It needs a mobile app for walkers and a dashboard for owners. We want to use React Native. It should track GPS in real-time. The main problem is trust..."
                    />
                    <div className="flex justify-end mt-6">
                        <button 
                            onClick={handleAnalyze}
                            disabled={!rawNotes.trim()}
                            className="bg-bolt-accent hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-bolt-accent/20 hover:scale-105"
                        >
                            <Sparkles size={18} /> Analyze Notes
                        </button>
                    </div>
                </div>

                {/* Templates Section */}
                <div>
                    <h3 className="text-sm font-bold text-bolt-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Sparkles size={14} /> Or Start with a Blueprint
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {PROJECT_TEMPLATES.map(template => (
                            <div 
                                key={template.id}
                                onClick={() => handleTemplateSelect(template.id)}
                                className="bg-bolt-sidebar border border-bolt-border hover:border-bolt-accent hover:bg-bolt-accent/5 cursor-pointer rounded-xl p-5 transition-all group flex flex-col h-full"
                            >
                                <div className="flex items-center gap-3 mb-3 text-white group-hover:text-bolt-accent transition-colors">
                                    <div className="p-2 bg-bolt-bg rounded-lg border border-bolt-border group-hover:border-bolt-accent/30">
                                        {getTemplateIcon(template.id)}
                                    </div>
                                    <span className="font-bold">{template.name}</span>
                                </div>
                                <p className="text-xs text-bolt-muted leading-relaxed flex-1">
                                    {template.description}
                                </p>
                                <div className="mt-4 text-xs font-bold text-bolt-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Use Template <ArrowRight size={12} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* VIEW: ANALYZING LOADING */}
        {step === 'ANALYZING' && (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-bolt-border rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-bolt-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-bolt-accent">
                        <BrainCircuit size={32} />
                    </div>
                </div>
                <div className="space-y-2 text-center">
                    <p className="text-white font-medium animate-pulse">Parsing entities...</p>
                    <p className="text-bolt-muted text-sm">Mapping constraints...</p>
                    <p className="text-bolt-muted text-sm">Identifying tech stack candidates...</p>
                </div>
            </div>
        )}

        {/* VIEW: REFINE FORM */}
        {step === 'REFINE' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="col-span-full bg-bolt-accent/10 border border-bolt-accent/20 rounded-lg p-4 flex items-start gap-3 mb-2">
                    <Bot className="text-bolt-accent shrink-0 mt-1" size={20} />
                    <div>
                        <p className="text-sm text-white font-medium">I've extracted what I could from your notes.</p>
                        <p className="text-xs text-bolt-muted">Review the fields below. If something is missing, click "Suggest" and I'll provide an expert recommendation based on your project goals.</p>
                    </div>
                </div>

                {INTAKE_FIELDS.map((field) => {
                    const label = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    const isEmpty = !intake[field];
                    
                    return (
                        <div key={field} className={`${field === 'description' || field === 'techStackPrefs' ? 'col-span-full' : ''} bg-bolt-sidebar border ${isEmpty ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-bolt-border'} rounded-xl p-5 transition-all focus-within:border-bolt-accent`}>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold text-bolt-muted uppercase tracking-wider">{label}</label>
                                {loadingSuggestion === field ? (
                                    <Loader2 size={14} className="animate-spin text-bolt-accent" />
                                ) : (
                                    <button 
                                        onClick={() => handleSuggestion(field)}
                                        className="text-xs flex items-center gap-1 text-bolt-accent hover:text-white transition-colors"
                                        title="Get AI Suggestion"
                                    >
                                        <Sparkles size={12} /> Suggest
                                    </button>
                                )}
                            </div>
                            
                            {field === 'description' || field === 'techStackPrefs' || field === 'coreOffer' ? (
                                <textarea 
                                    value={intake[field] as string}
                                    onChange={(e) => updateIntake(field, e.target.value)}
                                    className="w-full bg-transparent border-none text-white focus:ring-0 p-0 resize-none h-24 placeholder:text-bolt-border/50 text-sm leading-relaxed"
                                    placeholder={`Enter ${label}...`}
                                />
                            ) : (
                                <input 
                                    type="text"
                                    value={intake[field] as string}
                                    onChange={(e) => updateIntake(field, e.target.value)}
                                    className="w-full bg-transparent border-none text-white focus:ring-0 p-0 placeholder:text-bolt-border/50 text-sm font-medium"
                                    placeholder={`Enter ${label}...`}
                                />
                            )}
                            
                            {isEmpty && (
                                <div className="mt-2 text-[10px] text-yellow-500 flex items-center gap-1">
                                    <Edit3 size={10} /> Needs input or suggestion
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Platform Selector */}
                <div className="col-span-full bg-bolt-sidebar border border-bolt-border rounded-xl p-5">
                    <label className="text-xs font-bold text-bolt-muted uppercase tracking-wider mb-3 block">Target Platform</label>
                    <p className="text-xs text-bolt-muted mb-4">We will generate specialized rules and context files for your chosen AI IDE.</p>
                    <div className="flex flex-wrap gap-3">
                        {[
                            {id: 'cursor', label: 'Cursor', icon: Terminal},
                            {id: 'windsurf', label: 'Windsurf', icon: Code2},
                            {id: 'bolt', label: 'Bolt.new', icon: Sparkles},
                            {id: 'replit', label: 'Replit', icon: Terminal},
                            {id: 'lovable', label: 'Lovable', icon: Heart},
                            {id: 'cline', label: 'Cline', icon: Terminal},
                            {id: 'continue', label: 'Continue', icon: Terminal},
                            {id: 'copilot', label: 'GitHub Copilot', icon: Github},
                            {id: 'blackbox', label: 'Blackbox', icon: Box},
                            {id: 'firebase', label: 'Firebase IDX', icon: Flame},
                            {id: 'v0', label: 'v0.dev', icon: Code},
                        ].map(p => {
                            const isSelected = intake.targetPlatforms.includes(p.id as PlatformType);
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => togglePlatform(p.id as PlatformType)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${isSelected ? 'bg-bolt-accent text-white border-bolt-accent' : 'bg-bolt-bg border-bolt-border text-bolt-muted hover:text-white'}`}
                                >
                                    <p.icon size={16} /> {p.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="col-span-full flex justify-end mt-4 gap-4">
                    <button onClick={() => setStep('DUMP')} className="text-bolt-muted hover:text-white text-sm">Back to Notes</button>
                    <button 
                        onClick={() => setStep('SUMMARY')}
                        className="bg-bolt-text text-bolt-bg hover:bg-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                    >
                        Review Plan <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        )}

        {/* VIEW: SUMMARY / APPROVAL */}
        {step === 'SUMMARY' && (
            <div className="bg-bolt-sidebar border border-bolt-border rounded-2xl p-8 max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-bolt-border">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                        <CheckCircle size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Ready to Initialize?</h2>
                        <p className="text-bolt-muted">We have everything we need to generate the Project Kernel.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Pack Selection */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div 
                            onClick={() => updateIntake('packId', 'vibe_mvp')}
                            className={`border rounded-xl p-4 cursor-pointer transition-all ${intake.packId === 'vibe_mvp' ? 'bg-bolt-accent/10 border-bolt-accent' : 'bg-bolt-bg border-bolt-border opacity-50 hover:opacity-100'}`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={18} className={intake.packId === 'vibe_mvp' ? 'text-bolt-accent' : 'text-bolt-muted'} />
                                <span className="font-bold text-sm text-white">Core Build (MVP)</span>
                            </div>
                            <p className="text-xs text-bolt-muted">30 essential docs. Speed & focus.</p>
                        </div>
                        <div 
                            onClick={() => updateIntake('packId', 'pro_builder')}
                            className={`border rounded-xl p-4 cursor-pointer transition-all ${intake.packId === 'pro_builder' ? 'bg-purple-500/10 border-purple-500' : 'bg-bolt-bg border-bolt-border opacity-50 hover:opacity-100'}`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Shield size={18} className={intake.packId === 'pro_builder' ? 'text-purple-500' : 'text-bolt-muted'} />
                                <span className="font-bold text-sm text-white">Pro Builder</span>
                            </div>
                            <p className="text-xs text-bolt-muted">102 docs. Full architecture & ops.</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-bolt-muted uppercase mb-1">Project Identity</h3>
                        <p className="text-lg font-medium text-white">{renderValue(intake.projectName)}</p>
                        <p className="text-sm text-bolt-muted">{renderValue(intake.description)}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <h3 className="text-xs font-bold text-bolt-muted uppercase mb-1">Target Audience</h3>
                            <p className="text-sm text-white">{renderValue(intake.targetAudience)}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-bolt-muted uppercase mb-1">Constraints</h3>
                            <p className="text-sm text-white">{renderValue(intake.constraints)}</p>
                        </div>
                    </div>

                    <div className="bg-bolt-bg rounded-lg p-4 border border-bolt-border">
                        <h3 className="text-xs font-bold text-bolt-muted uppercase mb-2">Tech Stack Strategy</h3>
                        <p className="text-sm text-bolt-accent font-mono">{renderValue(intake.techStackPrefs)}</p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {intake.targetPlatforms.map(p => (
                            <span key={p} className="text-[10px] px-2 py-1 rounded bg-bolt-border text-bolt-muted uppercase font-bold">{p}</span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between mt-10 pt-6 border-t border-bolt-border">
                    <button onClick={() => setStep('REFINE')} className="text-bolt-muted hover:text-white flex items-center gap-2">
                         Edit Details
                    </button>
                    <button 
                        onClick={handleFinish}
                        className="bg-bolt-accent hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-bolt-accent/20 hover:scale-105"
                    >
                        Approve & Launch <Rocket size={18} />
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};