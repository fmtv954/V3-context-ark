import React, { useEffect, useState } from 'react';
import { getAllProjectsAdmin } from '../services/storage';
import { Project, ProjectStatus } from '../types';
import { Shield, Users, Database, Activity, Search, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

export const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (user?.tier !== 'admin') {
        navigate('/dashboard');
        return;
    }
    setProjects(getAllProjectsAdmin());
  }, [navigate, user]);

  // Stats
  const totalUsers = new Set(projects.map(p => p.userId)).size;
  const totalDocs = projects.reduce((acc, p) => acc + p.docs.filter(d => d.status === 'COMPLETED').length, 0);
  const storageUsed = JSON.stringify(projects).length;

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Shield className="text-bolt-accent" size={24} />
                <h1 className="text-3xl font-bold text-white">God Mode (Admin)</h1>
            </div>
            <p className="text-bolt-muted">System-wide visibility and control.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-bolt-sidebar border border-bolt-border rounded-xl p-6">
            <div className="flex items-center gap-3 text-bolt-muted mb-2">
                <Users size={18} /> Total Users
            </div>
            <div className="text-3xl font-bold text-white">{totalUsers}</div>
        </div>
        <div className="bg-bolt-sidebar border border-bolt-border rounded-xl p-6">
            <div className="flex items-center gap-3 text-bolt-muted mb-2">
                <Activity size={18} /> Active Projects
            </div>
            <div className="text-3xl font-bold text-white">{projects.length}</div>
        </div>
        <div className="bg-bolt-sidebar border border-bolt-border rounded-xl p-6">
            <div className="flex items-center gap-3 text-bolt-muted mb-2">
                <Database size={18} /> Docs Generated
            </div>
            <div className="text-3xl font-bold text-white">{totalDocs}</div>
        </div>
        <div className="bg-bolt-sidebar border border-bolt-border rounded-xl p-6">
            <div className="flex items-center gap-3 text-bolt-muted mb-2">
                <AlertTriangle size={18} /> Storage Load
            </div>
            <div className="text-3xl font-bold text-white">{(storageUsed / 1024 / 1024).toFixed(2)} MB</div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-bolt-sidebar border border-bolt-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-bolt-border flex items-center justify-between">
            <h3 className="font-bold text-white">Global Project List</h3>
            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bolt-muted" />
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="bg-bolt-bg border border-bolt-border rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:border-bolt-accent focus:outline-none"
                />
            </div>
        </div>
        <table className="w-full text-sm text-left">
            <thead className="bg-bolt-bg text-bolt-muted uppercase text-xs font-bold">
                <tr>
                    <th className="px-6 py-4">Project Name</th>
                    <th className="px-6 py-4">User ID</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Docs</th>
                    <th className="px-6 py-4">Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-bolt-border">
                {projects.map(p => (
                    <tr key={p.id} className="hover:bg-bolt-bg/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                        <td className="px-6 py-4 text-bolt-muted font-mono text-xs">{p.userId.substring(0, 8)}...</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${p.status === 'READY' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-400'}`}>
                                {p.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-white">{Math.round(p.progress)}%</td>
                        <td className="px-6 py-4 text-bolt-muted">{new Date(p.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                            <button 
                                onClick={() => navigate(`/workspace/${p.id}`)}
                                className="p-1.5 hover:bg-bolt-accent/20 rounded text-bolt-accent transition-colors" 
                                title="Ghost View"
                            >
                                <Eye size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-red-500/20 rounded text-red-500 transition-colors" title="Force Delete">
                                <Trash2 size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

    </div>
  );
};