import React from 'react';
import { LandingNav } from '../components/LandingNav';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Code2, Database, FileText, Layers, ShieldCheck, Sparkles, Terminal, Zap, LayoutTemplate, ChevronRight, Clock, Rocket, Check, Infinity, Coins } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-bolt-bg text-bolt-text font-sans selection:bg-bolt-accent selection:text-white">
      <LandingNav />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-bolt-accent/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bolt-border/30 border border-bolt-border text-xs font-medium text-bolt-accent mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles size={12} />
            <span>Now supporting rules for 11+ AI Platforms</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Don't let AI guess.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bolt-accent to-blue-400">Give it a Brain.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-bolt-muted max-w-3xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Turn your idea into a <span className="text-white font-semibold">102-doc Spec Pack</span> in one run. <br/>
            The missing link between your brain and Cursor/Windsurf.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link 
              to="/new" 
              className="w-full md:w-auto bg-bolt-accent hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_40px_rgba(0,144,255,0.3)] hover:shadow-[0_0_60px_rgba(0,144,255,0.5)] hover:-translate-y-1"
            >
              Enter Slow Lab (Free) <Clock size={20} />
            </Link>
            <Link 
              to="/pricing" 
              className="w-full md:w-auto bg-bolt-sidebar hover:bg-bolt-border border border-bolt-border text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
            >
              Get Fast Pass <Rocket size={20} />
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-8 border-t border-bolt-border/30 max-w-6xl mx-auto">
            <p className="text-sm text-bolt-muted mb-6 uppercase tracking-widest font-semibold">The Operating System for</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
               {[
                 'Cursor', 'Windsurf', 'Bolt.new', 'Replit', 'Lovable', 
                 'Cline', 'Continue', 'GitHub Copilot', 'Blackbox', 'Firebase IDX', 'v0.dev'
               ].map(name => (
                 <div key={name} className="flex items-center gap-2 text-white font-semibold text-lg">
                    <Terminal size={20} className="text-bolt-accent" /> {name}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-bolt-sidebar border-y border-bolt-border relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The "80% Done" Trap</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Context Rot</h3>
                    <p className="text-bolt-muted">You're 200 prompts deep. The AI forgot your auth schema. It hallucinates imports. You spend more time debugging than building.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
                    <LayoutTemplate size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Spaghetti Architecture</h3>
                    <p className="text-bolt-muted">One-shot prompting leads to flat files, no separation of concerns, and "Vibe Code" that works once but breaks tomorrow.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Wasted Tokens & Time</h3>
                    <p className="text-bolt-muted">Re-explaining your project to every new chat session burns money and kills momentum.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual: Code vs Spec */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-bolt-accent/20 to-purple-500/20 blur-3xl -z-10"></div>
                <div className="bg-bolt-bg border border-bolt-border rounded-2xl p-1 shadow-2xl">
                    <div className="bg-bolt-sidebar rounded-xl overflow-hidden border border-bolt-border">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-bolt-border bg-bolt-bg">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="ml-4 text-xs text-bolt-muted font-mono">terminal — context-ark</div>
                        </div>
                        <div className="p-6 font-mono text-sm space-y-4">
                            <div className="text-green-400">$ context-ark generate --pro --target=cursor,windsurf,lovable</div>
                            <div className="text-bolt-muted">
                                > Analyzing brain dump... <br/>
                                > Generating Project Kernel... <span className="text-green-500">Done</span><br/>
                                > Creating 102 Spec Docs... <span className="text-green-500">Done</span><br/>
                                > Generating .cursorrules... <span className="text-green-500">Done</span><br/>
                                > Generating .windsurfrules... <span className="text-green-500">Done</span><br/>
                                > Generating Lovable Knowledge... <span className="text-green-500">Done</span>
                            </div>
                            <div className="text-white border-l-2 border-bolt-accent pl-4 py-2 bg-bolt-accent/5">
                                "Your project is ready. I have defined the DB schema, API routes, Auth flow, and UI components. Open your editor to start building."
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION (Updated Tier Structure) */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start Free. Upgrade for Speed.</h2>
                <p className="text-xl text-bolt-muted max-w-2xl mx-auto">
                    We don't gate the engine. We gate the speed.
                </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                
                {/* FREE TIER */}
                <div className="bg-bolt-sidebar border border-bolt-border rounded-2xl p-6 flex flex-col hover:border-bolt-muted transition-all">
                    <div className="mb-4">
                        <div className="text-bolt-muted font-bold text-sm uppercase tracking-wider mb-1">Slow Lab Mode</div>
                        <div className="text-3xl font-bold text-white">$0 <span className="text-sm font-normal text-bolt-muted">/ mo</span></div>
                    </div>
                    <p className="text-sm text-bolt-muted mb-6 h-10">Perfect if you want to see the system work and don't mind waiting.</p>
                    
                    <Link to="/new" className="w-full bg-bolt-bg border border-bolt-border hover:bg-bolt-border text-white py-2 rounded-lg font-bold text-sm text-center transition-colors mb-6">
                        Join Queue
                    </Link>

                    <div className="space-y-3 text-sm text-bolt-muted flex-1">
                        <div className="flex items-start gap-2">
                            <Clock size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                            <span>20-40 min wait time</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>1 Project / month</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>5 Regen Credits</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>OpenRouter Free Models</span>
                        </div>
                    </div>
                </div>

                {/* STARTER TIER - IMPULSE BUY */}
                <div className="bg-bolt-sidebar border-2 border-blue-500/30 rounded-2xl p-6 flex flex-col relative shadow-lg shadow-blue-500/10 transform md:-translate-y-4">
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        FAST PASS
                    </div>
                    <div className="mb-4">
                        <div className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-1">Starter</div>
                        <div className="text-3xl font-bold text-white">$9 <span className="text-sm font-normal text-bolt-muted">one-time</span></div>
                    </div>
                    <p className="text-sm text-bolt-muted mb-6 h-10">Skip the line. Get your actual project spec pack for the price of lunch.</p>
                    
                    <Link to="/pricing" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-bold text-sm text-center transition-colors mb-6 shadow-lg shadow-blue-600/20">
                        Get Fast Pass
                    </Link>

                    <div className="space-y-3 text-sm text-bolt-text flex-1">
                        <div className="flex items-start gap-2">
                            <Zap size={16} className="text-blue-400 shrink-0 mt-0.5" />
                            <span>2-5 min run time</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-white shrink-0 mt-0.5" />
                            <span>1 Full 102-Doc Build</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-white shrink-0 mt-0.5" />
                            <span>25 Regen Credits</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-white shrink-0 mt-0.5" />
                            <span>DeepSeek Engine</span>
                        </div>
                    </div>
                </div>

                {/* PRO TIER - RECURRING */}
                <div className="bg-bolt-sidebar border border-purple-500/30 rounded-2xl p-6 flex flex-col hover:border-purple-500 transition-all">
                    <div className="mb-4">
                        <div className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-1">Pro Builder</div>
                        <div className="text-3xl font-bold text-white">$29 <span className="text-sm font-normal text-bolt-muted">/ mo</span></div>
                    </div>
                    <p className="text-sm text-bolt-muted mb-6 h-10">For serious indie builders shipping multiple products.</p>
                    
                    <Link to="/pricing" className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg font-bold text-sm text-center transition-colors mb-6">
                        Go Pro
                    </Link>

                    <div className="space-y-3 text-sm text-bolt-muted flex-1">
                        <div className="flex items-start gap-2">
                            <Zap size={16} className="text-purple-400 shrink-0 mt-0.5" />
                            <span>Priority Queue (1 min)</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>3 Projects / month</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>100 Regen Credits / mo</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>GPT-5.1 / Claude Engine</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>Save Project Templates</span>
                        </div>
                    </div>
                </div>

                {/* DEV TIER - AGENCY */}
                <div className="bg-bolt-sidebar border border-bolt-border rounded-2xl p-6 flex flex-col hover:border-white transition-all opacity-80 hover:opacity-100">
                    <div className="mb-4">
                        <div className="text-white font-bold text-sm uppercase tracking-wider mb-1">Agency / Dev</div>
                        <div className="text-3xl font-bold text-white">$79 <span className="text-sm font-normal text-bolt-muted">/ mo</span></div>
                    </div>
                    <p className="text-sm text-bolt-muted mb-6 h-10">Unlimited building with your own API keys. Extreme power.</p>
                    
                    <Link to="/pricing" className="w-full bg-bolt-bg border border-bolt-border hover:bg-white hover:text-black text-white py-2 rounded-lg font-bold text-sm text-center transition-colors mb-6">
                        Contact Sales
                    </Link>

                    <div className="space-y-3 text-sm text-bolt-muted flex-1">
                        <div className="flex items-start gap-2">
                            <Infinity size={16} className="text-white shrink-0 mt-0.5" />
                            <span>Unlimited BYOK Mode</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>10 Hosted Projects / mo</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>500 Regen Credits</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check size={16} className="text-bolt-text shrink-0 mt-0.5" />
                            <span>All Top-Tier Models</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* CREDIT PACKS */}
            <div className="mt-16 pt-12 border-t border-bolt-border/30 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Need more refinement?</h3>
                <p className="text-bolt-muted mb-8">Add regen credits to any paid plan. Never get stuck.</p>
                
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        { creds: 25, price: 7 },
                        { creds: 50, price: 12 },
                        { creds: 100, price: 19, tag: 'Best Seller' },
                        { creds: 500, price: 69 },
                        { creds: 1000, price: 99 }
                    ].map((pack, i) => (
                        <div key={i} className={`bg-bolt-bg border ${pack.tag ? 'border-bolt-accent' : 'border-bolt-border'} rounded-lg px-6 py-4 flex flex-col items-center min-w-[140px] relative`}>
                            {pack.tag && <div className="absolute -top-3 bg-bolt-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{pack.tag}</div>}
                            <div className="text-2xl font-bold text-white mb-1">{pack.creds}</div>
                            <div className="text-xs text-bolt-muted uppercase font-bold">Credits</div>
                            <div className="mt-3 text-sm font-medium text-white bg-bolt-sidebar px-3 py-1 rounded border border-bolt-border">${pack.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bolt-bg to-bolt-sidebar -z-10"></div>
        <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                Build the right thing,<br/> the first time.
            </h2>
            <p className="text-xl text-bolt-muted mb-10 max-w-2xl mx-auto">
                Join thousands of "Vibe Coders" who stopped wrestling with prompts and started shipping production-ready software.
            </p>
            <Link 
              to="/new" 
              className="inline-flex bg-white text-black px-10 py-5 rounded-xl font-bold text-xl items-center gap-3 hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl"
            >
              Enter The Lab (Free) <ArrowRight size={24} />
            </Link>
            <p className="mt-6 text-sm text-bolt-muted">No credit card required for Slow Mode.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-bolt-border py-12 bg-bolt-sidebar text-center text-bolt-muted text-sm">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <Layers size={16} /> Context Ark
        </div>
        <p>&copy; {new Date().getFullYear()} Context Ark. Built for the AI Coding Era.</p>
      </footer>
    </div>
  );
};