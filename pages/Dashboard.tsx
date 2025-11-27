import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/storage';
import { Project, ProjectStatus } from '../types';
import { Plus, FolderOpen, Clock, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.DRAFT: return 'bg-gray-600';
      case ProjectStatus.GENERATING: return 'bg-blue-600 animate-pulse';
      case ProjectStatus.READY: return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const renderDescription = (desc: any) => {
      if (typeof desc === 'string') return desc;
      if (typeof desc === 'object') return JSON.stringify(desc);
      return '';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
            <p className="text-bolt-muted">Manage your spec packs and documentation workspaces.</p>
        </div>
        <Link to="/new" className="bg-bolt-accent hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-all shadow-lg shadow-bolt-accent/20">
          <Plus size={18} /> New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-bolt-border rounded-xl">
                <p className="text-bolt-muted mb-4">No projects yet. Start building your vision.</p>
                <Link to="/new" className="text-bolt-accent hover:underline">Start a new project</Link>
            </div>
        )}

        {projects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => navigate(`/workspace/${project.id}`)}
            className="bg-bolt-sidebar border border-bolt-border rounded-xl p-6 hover:border-bolt-accent/50 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-bolt-border to-bolt-bg flex items-center justify-center group-hover:from-bolt-accent group-hover:to-blue-600 transition-all text-white">
                    <FolderOpen size={20} />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${getStatusColor(project.status)}`}>
                    {project.status}
                </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 truncate">{project.name}</h3>
            <p className="text-bolt-muted text-sm line-clamp-2 mb-6 h-10">
              {renderDescription(project.intake.description)}
            </p>

            <div className="flex items-center justify-between text-xs text-bolt-muted pt-4 border-t border-bolt-border">
                <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(project.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                    <Zap size={12} className={project.progress === 100 ? 'text-green-500' : 'text-bolt-accent'} />
                    {project.progress}% Complete
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};