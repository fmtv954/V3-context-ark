import React, { useEffect, useState } from 'react';
import { Layers, Github, LogOut, Shield, Settings } from 'lucide-react';
import { getCurrentUser, logout } from '../services/auth';
import { User } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';
import { SettingsModal } from './SettingsModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bolt-bg text-bolt-text font-sans selection:bg-bolt-accent selection:text-white flex flex-col">
      <header className="h-14 border-b border-bolt-border flex items-center justify-between px-6 bg-bolt-sidebar z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-8 h-8 bg-bolt-accent rounded-lg flex items-center justify-center text-white font-bold">
                <Layers size={20} />
            </div>
            <h1 className="font-semibold text-lg tracking-tight">Context Ark</h1>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 text-sm text-bolt-muted">
                 <a href="#" className="hover:text-bolt-text transition-colors">Documentation</a>
                 {user?.tier === 'admin' && (
                     <a onClick={() => navigate('/admin')} className="hover:text-bolt-text text-red-400 cursor-pointer transition-colors flex items-center gap-1 font-bold">
                        <Shield size={14} /> Admin
                     </a>
                 )}
            </div>

            {user && (
                <div className="flex items-center gap-3 pl-6 border-l border-bolt-border">
                    <button 
                        onClick={() => setIsSettingsOpen(true)}
                        className="text-bolt-muted hover:text-white transition-colors mr-2"
                        title="API Settings"
                    >
                        <Settings size={18} />
                    </button>

                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-white leading-tight">{user.name}</span>
                        <span className="text-[10px] text-bolt-muted leading-tight uppercase">{user.tier} Plan</span>
                    </div>
                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full bg-bolt-bg border border-bolt-border" />
                    <button 
                        onClick={handleLogout}
                        className="ml-2 text-bolt-muted hover:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            )}
        </div>
      </header>
      <main className="flex-1 overflow-hidden flex flex-col relative">
        {children}
      </main>
      
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};