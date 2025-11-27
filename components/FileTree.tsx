
import React from 'react';
import { FileText, Folder, CheckCircle, CircleDashed, AlertCircle, Loader2, Database, Bot, Terminal, Lock, Ban } from 'lucide-react';
import { DocMetadata, DocStatus } from '../types';

interface FileTreeProps {
  files: Record<string, string>;
  docs: DocMetadata[];
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ files, docs, selectedFile, onSelectFile }) => {
  
  const getStatusIcon = (doc: DocMetadata) => {
    switch(doc.status) {
        case DocStatus.COMPLETED: 
            // Green check if approved, gray check if just generated
            return doc.isApproved ? <CheckCircle size={14} className="text-green-500" /> : <CheckCircle size={14} className="text-bolt-muted" />;
        case DocStatus.GENERATING: return <Loader2 size={14} className="text-bolt-accent animate-spin" />;
        case DocStatus.ERROR: return <AlertCircle size={14} className="text-red-500" />;
        case DocStatus.SKIPPED: return <Ban size={14} className="text-bolt-border" />;
        default: return <CircleDashed size={14} className="text-bolt-muted" />;
    }
  };

  const platformFiles = Object.keys(files).filter(f => f.startsWith('/platform/'));

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      <div className="px-4 py-3 text-xs font-semibold text-bolt-muted uppercase tracking-wider">
        Project Files
      </div>

      {/* Kernel Files */}
      <div className="mb-4">
        <div className="px-4 py-1 text-xs text-bolt-muted flex items-center gap-2">
            <Folder size={12} /> root
        </div>
        {['/intake.json', '/project_kernel.json', '/AGENTS.md'].map(path => {
            const exists = !!files[path];
            if (!exists) return null;
            
            let Icon = FileText;
            if (path.includes('kernel')) Icon = Database;
            if (path.includes('AGENTS')) Icon = Bot;

            return (
                <div 
                    key={path}
                    onClick={() => onSelectFile(path)}
                    className={`px-6 py-1.5 text-sm cursor-pointer flex items-center gap-2 transition-colors ${selectedFile === path ? 'bg-bolt-accent/10 text-bolt-accent border-r-2 border-bolt-accent' : 'text-bolt-muted hover:text-bolt-text hover:bg-bolt-border/30'}`}
                >
                    <Icon size={14} />
                    <span className="truncate">{path.substring(1)}</span>
                </div>
            );
        })}
      </div>

      {/* Platform Rules (Added) */}
      {platformFiles.length > 0 && (
        <div className="mb-4">
            <div className="px-4 py-1 text-xs text-bolt-muted flex items-center gap-2 uppercase tracking-wider">
                <Terminal size={12} /> Platform Rules
            </div>
            {platformFiles.map(path => (
                <div 
                    key={path}
                    onClick={() => onSelectFile(path)}
                    className={`px-6 py-1.5 text-sm cursor-pointer flex items-center gap-2 transition-colors ${selectedFile === path ? 'bg-bolt-accent/10 text-bolt-accent border-r-2 border-bolt-accent' : 'text-bolt-muted hover:text-bolt-text hover:bg-bolt-border/30'}`}
                >
                    <FileText size={14} className="text-purple-400" />
                    <span className="truncate">{path.split('/').pop()}</span>
                </div>
            ))}
        </div>
      )}

      {/* Generated Docs */}
      <div>
        <div className="px-4 py-1 text-xs text-bolt-muted flex items-center gap-2">
            <Folder size={12} /> docs
        </div>
        {docs.map(doc => {
            const path = `/docs/${doc.filename}`;
            const isSkipped = doc.status === DocStatus.SKIPPED;
            return (
                <div 
                    key={doc.id}
                    onClick={() => !isSkipped && onSelectFile(path)}
                    className={`px-6 py-1.5 text-sm flex items-center gap-2 transition-colors group ${selectedFile === path ? 'bg-bolt-accent/10 text-bolt-accent border-r-2 border-bolt-accent' : isSkipped ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer text-bolt-muted hover:text-bolt-text hover:bg-bolt-border/30'}`}
                    title={isSkipped ? "Skipped in this Pack" : doc.title}
                >
                   <div className="flex-shrink-0" title={doc.isApproved ? "Approved" : doc.status}>
                     {getStatusIcon(doc)}
                   </div>
                   <span className={`truncate flex-1 ${doc.isApproved ? 'text-white font-medium' : ''}`}>{doc.filename}</span>
                   {doc.isApproved && <Lock size={10} className="text-green-500 opacity-50" />}
                </div>
            )
        })}
      </div>
    </div>
  );
};