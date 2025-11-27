
import React, { useState, useEffect } from 'react';
import { X, Key, CheckCircle, AlertTriangle, Save } from 'lucide-react';
import { User } from '../types';
import { getCurrentUser } from '../services/auth';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [keys, setKeys] = useState({ gemini: '', openai: '', anthropic: '' });
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isOpen) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      if (currentUser?.apiKeys) {
        setKeys({
            gemini: currentUser.apiKeys.gemini || '',
            openai: currentUser.apiKeys.openai || '',
            anthropic: currentUser.apiKeys.anthropic || ''
        });
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!user) return;
    
    const updatedUser = {
        ...user,
        apiKeys: keys
    };
    
    localStorage.setItem('context_ark_user', JSON.stringify(updatedUser));
    
    const usersDb = JSON.parse(localStorage.getItem('context_ark_users_db') || '[]');
    const updatedDb = usersDb.map((u: User) => u.id === user.id ? updatedUser : u);
    localStorage.setItem('context_ark_users_db', JSON.stringify(updatedDb));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    window.location.reload(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-bolt-sidebar border border-bolt-border w-full max-w-md rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-bolt-border">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Key size={20} className="text-bolt-accent" /> Multi-Model API Config
            </h2>
            <button onClick={onClose} className="text-bolt-muted hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="bg-bolt-bg p-4 rounded-lg border border-bolt-border">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-yellow-500"/> Bring Your Own Keys (BYOK)
                </h3>
                <p className="text-xs text-bolt-muted leading-relaxed">
                    Add keys to enable the <strong>Pro Router</strong>. 
                    Tasks like Planning (J2) and Critiques (J5) perform best with Claude/GPT-4o.
                </p>
            </div>

            <div>
                <label className="block text-xs font-bold text-bolt-muted uppercase mb-2">Gemini API Key (Google)</label>
                <input 
                    type="password" 
                    value={keys.gemini}
                    onChange={(e) => setKeys({...keys, gemini: e.target.value})}
                    placeholder="AIzaSy..."
                    className="w-full bg-bolt-bg border border-bolt-border rounded-lg px-4 py-3 text-white focus:border-bolt-accent focus:outline-none font-mono text-sm"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-bolt-muted uppercase mb-2">OpenAI API Key</label>
                <input 
                    type="password" 
                    value={keys.openai}
                    onChange={(e) => setKeys({...keys, openai: e.target.value})}
                    placeholder="sk-..."
                    className="w-full bg-bolt-bg border border-bolt-border rounded-lg px-4 py-3 text-white focus:border-bolt-accent focus:outline-none font-mono text-sm"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-bolt-muted uppercase mb-2">Anthropic API Key</label>
                <input 
                    type="password" 
                    value={keys.anthropic}
                    onChange={(e) => setKeys({...keys, anthropic: e.target.value})}
                    placeholder="sk-ant-..."
                    className="w-full bg-bolt-bg border border-bolt-border rounded-lg px-4 py-3 text-white focus:border-bolt-accent focus:outline-none font-mono text-sm"
                />
            </div>
        </div>

        <div className="p-6 border-t border-bolt-border flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm text-bolt-muted hover:text-white transition-colors">
                Cancel
            </button>
            <button 
                onClick={handleSave}
                className="bg-bolt-accent hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all"
            >
                {saved ? <CheckCircle size={16} /> : <Save size={16} />}
                {saved ? 'Saved!' : 'Save Config'}
            </button>
        </div>

      </div>
    </div>
  );
};
