import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../services/auth';
import { Layers, ArrowRight, Loader2, LogIn } from 'lucide-react';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email);
      } else {
        await signup(email, name);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-bolt-bg relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bolt-accent/10 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-0" />

        <div className="bg-bolt-sidebar border border-bolt-border p-8 rounded-2xl w-full max-w-md shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-bolt-accent rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-bolt-accent/20">
                    <Layers size={24} />
                </div>
                <h1 className="text-2xl font-bold text-white">Welcome to Context Ark</h1>
                <p className="text-bolt-muted text-sm mt-2">The AI Spec Engine for Pro Builders</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label className="block text-xs font-bold text-bolt-muted uppercase mb-1">Full Name</label>
                        <input 
                            type="text" 
                            required 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-bolt-bg border border-bolt-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bolt-accent transition-colors"
                            placeholder="Elon Musk"
                        />
                    </div>
                )}
                
                <div>
                    <label className="block text-xs font-bold text-bolt-muted uppercase mb-1">Email Address</label>
                    <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-bolt-bg border border-bolt-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bolt-accent transition-colors"
                        placeholder="founder@startup.com"
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-xs bg-red-500/10 p-2 rounded border border-red-500/20">
                        {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-bolt-accent hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-bolt-accent/20 flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : (
                        isLogin ? <>Login <LogIn size={18} /></> : <>Create Account <ArrowRight size={18} /></>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center pt-6 border-t border-bolt-border">
                <p className="text-bolt-muted text-sm">
                    {isLogin ? "New to Context Ark? " : "Already have an account? "}
                    <button 
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="text-bolt-accent hover:underline font-medium"
                    >
                        {isLogin ? "Create Account" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    </div>
  );
};