
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, updateProject } from '../services/storage';
import { generateBatch, generateProjectKernel, regenerateDocument, generateAllCoreDocs } from '../services/orchestrator';
import { getCurrentUser, updateUserCredits } from '../services/auth';
import { Project, DocStatus } from '../types';
import { COST_PER_REGEN } from '../constants';
import { FileTree } from '../components/FileTree';
import { MarkdownViewer } from '../components/MarkdownViewer';
import { DependencyGraph } from '../components/DependencyGraph';
import { SpecArchitect } from '../components/SpecArchitect';

export const Workspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeBatch, setActiveBatch] = useState<number>(-1);
  const [user, setUser] = useState(getCurrentUser());

  const loadProject = useCallback(() => {
     if (id) {
      const p = getProject(id);
      if (p) {
        setProject(p);
        // IMPORTANT: Default to Graph View (selectedFile = null) unless user explicitly clicked
        // This matches request: "default view flow chart"
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    loadProject();
    setUser(getCurrentUser());
  }, [loadProject]);

  const refreshUser = () => {
      setUser(getCurrentUser());
  }

  const handleInitializeKernel = async () => {
    if (!project) return;
    setIsProcessing(true);
    try {
        const updated = await generateProjectKernel(project);
        setProject(updated);
        setSelectedFile(null); // Force graph view to show progress
    } catch (e) {
        alert("Failed to generate kernel. Check console/API Key.");
    } finally {
        setIsProcessing(false);
    }
  };

  const handleGenerateBatch = async (batchIndex: number) => {
    if (!project) return;
    if (batchIndex > 0 && !project.files['/project_kernel.json']) {
        alert("Please initialize the Kernel first.");
        return;
    }

    setActiveBatch(batchIndex);
    setIsProcessing(true);
    setSelectedFile(null); // Force graph view

    try {
        await generateBatch(project, batchIndex, (updatedProject) => {
            setProject(updatedProject);
        });
    } catch (e) {
        console.error("Batch error", e);
    } finally {
        setIsProcessing(false);
        setActiveBatch(-1);
    }
  };

  const handleGenerateCoreDocs = async () => {
      if (!project) return;
      if (!project.files['/project_kernel.json']) {
          alert("Please initialize the Kernel first.");
          return;
      }
      
      setIsProcessing(true);
      setSelectedFile(null);
      setActiveBatch(0); // Just visual indicator

      try {
          await generateAllCoreDocs(project, (updatedProject) => {
              setProject(updatedProject);
              // Update visual active batch as we progress
              const firstPending = updatedProject.docs.find(d => d.status === DocStatus.PENDING || d.status === DocStatus.GENERATING);
              if (firstPending) {
                  setActiveBatch(firstPending.batchIndex);
              }
          });
      } catch (e) {
          console.error("Core Docs Error", e);
      } finally {
          setIsProcessing(false);
          setActiveBatch(-1);
      }
  }

  // Doc Action Handlers
  const handleApproveDoc = () => {
      if (!project || !selectedFile) return;
      
      const filename = selectedFile.replace('/docs/', '');
      const docIndex = project.docs.findIndex(d => d.filename === filename);
      
      if (docIndex > -1) {
          const updatedDocs = [...project.docs];
          updatedDocs[docIndex] = { ...updatedDocs[docIndex], isApproved: true };
          const updatedProject = { ...project, docs: updatedDocs };
          
          updateProject(updatedProject);
          setProject(updatedProject);
      }
  };

  const handleSaveDoc = (newContent: string) => {
      if (!project || !selectedFile) return;
      const updatedProject = { ...project };
      updatedProject.files[selectedFile] = newContent;
      updateProject(updatedProject);
      setProject(updatedProject);
  };

  const handleRegenerateDoc = async (instructions?: string) => {
      if (!project || !selectedFile || !user) return;
      
      if (user.credits < COST_PER_REGEN) {
          alert("Insufficient credits. Please upgrade or buy a pack.");
          return;
      }

      const filename = selectedFile.replace('/docs/', '');
      const doc = project.docs.find(d => d.filename === filename);
      if (!doc) return;

      setIsProcessing(true);
      try {
          // Deduct Credits
          updateUserCredits(user.id, user.credits - COST_PER_REGEN);
          refreshUser();

          const updatedProject = await regenerateDocument(project, doc.id, instructions);
          setProject(updatedProject);
      } catch (e) {
          alert("Regeneration failed. Credits have not been refunded (mock logic).");
      } finally {
          setIsProcessing(false);
      }
  };

  if (!project) return <div className="p-10 text-center">Loading Workspace...</div>;

  const hasKernel = !!project.files['/project_kernel.json'];
  const selectedDoc = selectedFile ? project.docs.find(d => d.filename === selectedFile.replace('/docs/', '')) : null;

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Sidebar: File Tree */}
      <div className="w-64 bg-bolt-sidebar border-r border-bolt-border flex flex-col">
         <div className="p-4 border-b border-bolt-border">
            <h2 className="font-bold text-sm truncate">{project.name}</h2>
            <div className="text-xs text-bolt-muted mt-1 flex items-center gap-1">
                {project.progress}% Spec Completion
            </div>
            <div className="w-full bg-bolt-bg h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-bolt-accent h-full transition-all duration-500" style={{width: `${project.progress}%`}} />
            </div>
         </div>
         <div className="flex-1 overflow-hidden">
            <FileTree 
                files={project.files} 
                docs={project.docs} 
                selectedFile={selectedFile} 
                onSelectFile={setSelectedFile} 
            />
         </div>
      </div>

      {/* Main Area: Editor or Graph */}
      <div className="flex-1 bg-bolt-bg flex flex-col min-w-0">
        <div className="h-9 border-b border-bolt-border flex items-center px-4 bg-bolt-bg select-none justify-between">
            <span className="text-sm text-bolt-muted font-mono">{selectedFile || 'Project Overview'}</span>
            {selectedFile && (
                <button onClick={() => setSelectedFile(null)} className="text-xs text-bolt-accent hover:underline">
                    View Graph
                </button>
            )}
        </div>
        <div className="flex-1 overflow-hidden relative">
            {selectedFile ? (
                 <MarkdownViewer 
                    content={project.files[selectedFile] || ''} 
                    isApproved={selectedDoc?.isApproved}
                    onApprove={handleApproveDoc}
                    onSave={handleSaveDoc}
                    onRegenerate={handleRegenerateDoc}
                    userCredits={user?.credits || 0}
                 />
            ) : (
                <DependencyGraph 
                    project={project} 
                    activeBatch={activeBatch} 
                    isProcessing={isProcessing} 
                />
            )}
        </div>
      </div>

      {/* Right Panel: Spec Architect Agent / Controls */}
      <SpecArchitect 
        project={project}
        activeBatch={activeBatch}
        isProcessing={isProcessing}
        hasKernel={hasKernel}
        userCredits={user?.credits || 0}
        onInitializeKernel={handleInitializeKernel}
        onGenerateBatch={handleGenerateBatch}
        onGenerateCoreDocs={handleGenerateCoreDocs}
      />
    </div>
  );
};