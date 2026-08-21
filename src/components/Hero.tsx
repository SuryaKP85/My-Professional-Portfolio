import React from 'react';
import { 
  Download, 
  Briefcase, 
  Send, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Users, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onNavigate 
}) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      
      {/* Parallax Radial Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Executive Hero Header */}
        <div className="max-w-4xl space-y-6 text-left">
          
          {/* Status Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg shadow-cyan-950/30">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-slate-200 tracking-wide">
              Available for Enterprise Product Management Roles
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Name & Headline */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.1]">
              SURYA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">PRASHANTH</span>
            </h1>
            <p className="mt-3 text-lg sm:text-2xl font-semibold text-cyan-300/90 tracking-wide">
              Enterprise Product Manager
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md">ERP</span>
              <span className="text-cyan-500">•</span>
              <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md">Manufacturing</span>
              <span className="text-cyan-500">•</span>
              <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md">Supply Chain</span>
              <span className="text-cyan-500">•</span>
              <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md">Warehouse Management</span>
              <span className="text-cyan-500">•</span>
              <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md text-cyan-300">AI Product Strategy</span>
            </div>
          </div>

          {/* Hero Summary */}
          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>I build products that remove unnecessary effort from complex business operations.</p>
            <p>For over 16 years, I've worked across ERP, Manufacturing, Warehouse Management, Supply Chain, and Logistics, partnering with customers, engineering teams, and business stakeholders to deliver products that solve real operational challenges.</p>
            <p>My experience spans product strategy, customer discovery, roadmap planning, stakeholder management, and end-to-end product delivery, with a growing focus on applying AI to make enterprise software more intuitive, efficient, and effective.</p>
          </div>

          {/* Clean Executive CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            
            {/* View Portfolio Button */}
            <button
              onClick={() => onNavigate('portfolio')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Briefcase className="w-4 h-4" />
              <span>View Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Download Resume Button */}
            <button
              onClick={() => onNavigate('resume')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </button>

            {/* Let's Connect Button */}
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm transition-all shadow-md"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Let's Connect</span>
            </button>

          </div>

        </div>

        {/* Statistics - 4 Cards */}
        <div className="mt-16 pt-10 border-t border-slate-800/80">
          <h2 className="sr-only">Key Statistics & Profile Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all text-left flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  16+ Years Experience
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Building enterprise software across ERP, Manufacturing, Warehouse Management, Supply Chain and Logistics.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all text-left flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  Customer-Centric Product Leadership
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Transforming customer challenges into scalable product strategies and practical software solutions.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all text-left flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  Enterprise Platform Expertise
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Delivering cloud-based enterprise SaaS products that remove unnecessary effort from complex business operations.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all text-left flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  AI-Enabled Product Innovation
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Applying AI to enhance enterprise workflows, product development, and customer experiences.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Featured Expertise Section */}
        <div className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Featured Expertise
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Proven product leadership capabilities across complex enterprise operational domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Product Strategy */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 text-left group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                Product Strategy
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Defining product vision, prioritizing roadmaps, and aligning business goals with customer needs.
              </p>
            </div>

            {/* Customer Discovery */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 text-left group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                Customer Discovery
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Understanding customer problems through research, feedback, and continuous collaboration.
              </p>
            </div>

            {/* Enterprise Software */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 text-left group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                Enterprise Software
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Deep expertise across ERP, Manufacturing, Warehouse Management, Supply Chain, and Logistics.
              </p>
            </div>

            {/* AI Product Innovation */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 text-left group">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                AI Product Innovation
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Exploring practical AI applications that improve enterprise software and product development.
              </p>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => onNavigate('about')}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 text-xs font-medium transition-colors group"
          >
            <span>Explore Professional Journey</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
