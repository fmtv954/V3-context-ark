
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Edit3, CheckCircle, RotateCcw, Save, X, Coins } from 'lucide-react';
import { COST_PER_REGEN } from '../constants';

interface MarkdownViewerProps {
  content: string;
  isApproved?: boolean;
  onApprove?: () => void;
  onRegenerate?: (instructions?: string) => void;
  onSave?: (newContent: string) => void;
  userCredits?: number;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ 
    content, 
    isApproved, 
    onApprove, 
    onRegenerate, 
    onSave,
    userCredits = 0
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [regenInstructions, setRegenInstructions] = useState('');
  const [showRegenInput, setShowRegenInput] = useState(false);

  useEffect(() => {
    setEditContent(content);
    setIsEditing(false);
    setShowRegenInput(false);
  }, [content]);

  const handleSave = () => {
      if (onSave) {
          onSave(editContent);
          setIsEditing(false);
      }
  };

  const handleRegenSubmit = () => {
      if (onRegenerate) {
          onRegenerate(regenInstructions);
          setShowRegenInput(false);
          setRegenInstructions('');
      }
  }

  if (!content) {
    return (
        <div className="h-full flex items-center justify-center text-bolt-muted">
            <p>Select a file to view content</p>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-full relative">
        {/* Spec Cockpit Toolbar */}
        <div className="h-14 border-b border-bolt-border bg-bolt-bg/95 backdrop-blur flex items-center justify-between px-6 shrink-0 z-10">
            <div className="flex items-center gap-2">
                {isApproved ? (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle size={12} /> Approved
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-3 py-1 bg-bolt-border/30 border border-bolt-border rounded-full text-bolt-muted text-xs font-bold uppercase tracking-wider">
                        Draft
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
                {!isEditing && !showRegenInput && (
                    <>
                        {!isApproved && onApprove && (
                            <button onClick={onApprove} className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-green-500/10 text-green-500 transition-colors text-sm font-medium">
                                <CheckCircle size={16} /> Approve
                            </button>
                        )}
                        
                        {onRegenerate && (
                            <button 
                                onClick={() => setShowRegenInput(true)}
                                disabled={userCredits < COST_PER_REGEN}
                                className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-bolt-accent/10 text-bolt-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                                title={userCredits < COST_PER_REGEN ? "Insufficient credits" : "Regenerate with AI"}
                            >
                                <RotateCcw size={16} /> Regen ({COST_PER_REGEN} <Coins size={12}/>)
                            </button>
                        )}

                        {onSave && (
                            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-bolt-border text-bolt-muted hover:text-white transition-colors text-sm font-medium">
                                <Edit3 size={16} /> Edit
                            </button>
                        )}
                    </>
                )}

                {isEditing && (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-sm hover:text-white text-bolt-muted">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-1.5 bg-bolt-accent text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">
                            <Save size={16} /> Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Regen Input Overlay */}
        {showRegenInput && (
            <div className="absolute top-14 left-0 right-0 bg-bolt-sidebar border-b border-bolt-border p-4 shadow-xl z-20 animate-in slide-in-from-top-2">
                <div className="max-w-3xl mx-auto">
                    <label className="block text-xs font-bold text-bolt-muted uppercase mb-2">Refinement Instructions (Optional)</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={regenInstructions}
                            onChange={(e) => setRegenInstructions(e.target.value)}
                            placeholder="e.g. Make the tone more professional, or add a section about caching..."
                            className="flex-1 bg-bolt-bg border border-bolt-border rounded px-3 py-2 text-sm text-white focus:border-bolt-accent focus:outline-none"
                            autoFocus
                        />
                        <button onClick={() => setShowRegenInput(false)} className="p-2 text-bolt-muted hover:text-white"><X size={18}/></button>
                        <button onClick={handleRegenSubmit} className="px-4 py-2 bg-bolt-accent text-white rounded text-sm font-medium hover:bg-blue-600">
                            Run Refiner
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 pb-20">
            {isEditing ? (
                <textarea 
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-full min-h-[60vh] bg-bolt-bg/50 border border-bolt-border rounded-lg p-6 text-white font-mono text-sm leading-relaxed focus:outline-none focus:border-bolt-accent resize-none"
                />
            ) : (
                <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                        components={{
                            code({node, inline, className, children, ...props}: any) {
                                return (
                                    <code className={`${className} bg-bolt-border/50 rounded px-1 py-0.5 text-bolt-accent`} {...props}>
                                        {children}
                                    </code>
                                )
                            },
                            pre({node, children, ...props}: any) {
                                return (
                                    <pre className="bg-bolt-sidebar p-4 rounded-lg overflow-x-auto border border-bolt-border my-4" {...props}>
                                        {children}
                                    </pre>
                                )
                            },
                            h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-bolt-border" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-white mt-8 mb-4" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-medium text-white mt-6 mb-3" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 my-4 text-bolt-text" {...props} />,
                            li: ({node, ...props}) => <li className="ml-4" {...props} />,
                            p: ({node, ...props}) => <p className="leading-7 my-4 text-bolt-text" {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-bolt-accent pl-4 italic text-bolt-muted my-4" {...props} />,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    </div>
  );
};
