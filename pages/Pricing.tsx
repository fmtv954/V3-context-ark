import React from 'react';
import { LandingNav } from '../components/LandingNav';
import { Link } from 'react-router-dom';
import { Check, Zap, Clock, Database, FileText, ShieldCheck, ArrowRight } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-bolt-bg text-bolt-text font-sans">
      <LandingNav />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            You aren't buying docs.<br/>
            <span className="text-bolt-accent">You're buying a Senior Engineer.</span>
          </h1>
          <p className="text-xl text-bolt-muted">
            Most builders spend 20+ hours prompting just to get a broken MVP. 
            Context Ark generates the complete, conflict-free spec pack in minutes.
          </p>
        </div>

        {/* THE OFFER STACK */}
        <div className="bg-bolt-sidebar border border-bolt-border rounded-3xl p-8 md:p-12 mb-20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-bolt-border pb-4">The Core Engine (Included in ALL Tiers)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400"><Database size={20}/></div>
                        <div>
                            <h3 className="font-bold text-white">The Project Kernel</h3>
                            <p className="text-sm text-bolt-muted">Structured JSON brain that prevents hallucinations.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400"><FileText size={20}/></div>
                        <div>
                            <h3 className="font-bold text-white">102-Doc Spec Pack</h3>
                            <p className="text-sm text-bolt-muted">Vision, Architecture, DB Schema, API Routes, and more.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-green-500/10 p-2 rounded-lg text-green-400"><ShieldCheck size={20}/></div>
                        <div>
                            <h3 className="font-bold text-white">Platform Rules Engine</h3>
                            <p className="text-sm text-bolt-muted">Auto-generated .cursorrules and .windsurfrules.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-400"><Zap size={20}/></div>
                        <div>
                            <h3 className="font-bold text-white">Branch & Merge Editor</h3>
                            <p className="text-sm text-bolt-muted">Edit sections without breaking the whole document.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-pink-500/10 p-2 rounded-lg text-pink-400"><Clock size={20}/></div>
                        <div>
                            <h3 className="font-bold text-white">Smart Regen History</h3>
                            <p className="text-sm text-bolt-muted">Rewind changes if the AI goes off track.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* TIERS (Detailed) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Starter */}
            <div className="bg-bolt-bg border-2 border-blue-600 rounded-2xl p-8 flex flex-col relative shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white font-bold px-4 py-1 rounded-full text-sm">MOST POPULAR START</div>
                <h3 className="text-2xl font-bold text-white mb-2">Starter / Fast Pass</h3>
                <div className="text-4xl font-bold text-white mb-4">$9 <span className="text-lg font-normal text-bolt-muted">one-time</span></div>
                <p className="text-bolt-muted text-sm mb-8">Get your actual project spec pack for the price of lunch. No subscription.</p>
                
                <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-blue-500"/> 1 Full Project (102 Docs)</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-blue-500"/> 2-5 min Priority Queue</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-blue-500"/> 25 Regen Credits</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-blue-500"/> DeepSeek Engine</li>
                </ul>
                
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all">Buy Fast Pass</button>
            </div>

            {/* Pro */}
            <div className="bg-bolt-sidebar border border-bolt-border rounded-2xl p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">Pro Builder</h3>
                <div className="text-4xl font-bold text-white mb-4">$29 <span className="text-lg font-normal text-bolt-muted">/ mo</span></div>
                <p className="text-bolt-muted text-sm mb-8">For serious builders shipping multiple products per month.</p>
                
                <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-purple-500"/> 3 Projects / month</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-purple-500"/> 1 min Priority Queue</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-purple-500"/> 100 Regen Credits / mo</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-purple-500"/> GPT-5.1 / Claude Engine</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-purple-500"/> Save Project Templates</li>
                </ul>
                
                <button className="w-full bg-bolt-bg border border-bolt-border hover:bg-purple-600 hover:border-purple-600 text-white py-3 rounded-xl font-bold transition-all">Subscribe Pro</button>
            </div>

            {/* Agency */}
            <div className="bg-bolt-sidebar border border-bolt-border rounded-2xl p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">Agency / Dev</h3>
                <div className="text-4xl font-bold text-white mb-4">$79 <span className="text-lg font-normal text-bolt-muted">/ mo</span></div>
                <p className="text-bolt-muted text-sm mb-8">Unlimited power for teams and heavy users.</p>
                
                <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-green-500"/> 10 Hosted Projects / mo</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-green-500"/> Unlimited BYOK Mode</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-green-500"/> 500 Regen Credits</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-green-500"/> Top-Tier Model Access</li>
                    <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-green-500"/> Team Features (Soon)</li>
                </ul>
                
                <button className="w-full bg-bolt-bg border border-bolt-border hover:bg-green-600 hover:border-green-600 text-white py-3 rounded-xl font-bold transition-all">Contact Sales</button>
            </div>
        </div>

        {/* FAQ / Close */}
        <div className="text-center max-w-2xl mx-auto pb-20">
            <h3 className="text-2xl font-bold text-white mb-4">Not ready to commit?</h3>
            <p className="text-bolt-muted mb-8">
                You can always use the <strong>Slow Lab Mode</strong> for free. It generates the full 102-doc pack, but runs on our spare capacity (20-40 min wait).
            </p>
            <Link to="/new" className="text-bolt-accent hover:text-white underline">Try Free Mode Now</Link>
        </div>

      </div>
    </div>
  );
};