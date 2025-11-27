import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingNav: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bolt-bg/80 backdrop-blur-md border-b border-bolt-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="w-8 h-8 bg-bolt-accent rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-bolt-accent/20">
            <Layers size={20} />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Context Ark</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-bolt-muted">
          <a href="/#problem" className="hover:text-white transition-colors">The Problem</a>
          <a href="/#solution" className="hover:text-white transition-colors">How It Works</a>
          <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-bolt-text hover:text-white transition-colors">
            Log In
          </Link>
          <Link 
            to="/new" 
            className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all transform hover:scale-105"
          >
            Start Building <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
};