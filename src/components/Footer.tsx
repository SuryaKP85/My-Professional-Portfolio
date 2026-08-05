import React from 'react';
import { ChevronUp, ShieldCheck, Mail, Linkedin, Github, Compass, Heart } from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
  onNavigate: (sectionId: string) => void;
  onOpenPrivacyPolicy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate, onOpenPrivacyPolicy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 font-bold flex items-center justify-center text-base shadow-md shadow-cyan-500/20">
                S
              </div>
              <span className="font-extrabold text-slate-100 text-lg tracking-tight">
                SURYA PRASHANTH
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Enterprise Product Manager with over 16 years of experience building enterprise software across ERP, Manufacturing, Warehouse Management, Supply Chain, and Logistics.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href={`mailto:${profile.email}`} 
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href={profile.linkedIn} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={profile.github} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">Navigation</p>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-cyan-400 transition-colors">Home & Executive Summary</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">About & Leadership Mindset</button></li>
              <li><button onClick={() => onNavigate('experience')} className="hover:text-cyan-400 transition-colors">Career Journey (20+ Yrs)</button></li>
              <li><button onClick={() => onNavigate('portfolio')} className="hover:text-cyan-400 transition-colors">Product Portfolio & Transformations</button></li>
              <li><button onClick={() => onNavigate('skills')} className="hover:text-cyan-400 transition-colors">How I Build Products</button></li>
              <li><button onClick={() => onNavigate('resume')} className="hover:text-cyan-400 transition-colors">Executive Resume</button></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">Executive Office</p>
            <p className="text-slate-300">Bangalore, India</p>
            <p className="text-slate-400">Direct: {profile.email}</p>
            
            <div className="pt-2">
              <button
                onClick={onOpenPrivacyPolicy}
                className="text-cyan-400 hover:underline font-medium text-xs flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy Policy & GDPR Statement</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Surya Prashanth. All rights reserved. Enterprise Executive Portfolio.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SEO & Accessibility Score 98+
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
