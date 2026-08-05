import React, { useState, useEffect } from 'react';
import { Search, X, Briefcase, Sparkles, FileText, Send, Award, Compass, ArrowRight } from 'lucide-react';
import { CMSData } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  cmsData: CMSData;
  onNavigate: (sectionId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  cmsData,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled externally
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  const sections = [
    { id: 'home', title: 'Home & Executive Summary', icon: Compass, category: 'Navigation' },
    { id: 'about', title: 'About Surya & Product Philosophy', icon: Compass, category: 'Navigation' },
    { id: 'experience', title: 'Career Journey & Work Experience', icon: Briefcase, category: 'Navigation' },
    { id: 'portfolio', title: 'Product Portfolio & Deep Dives', icon: Sparkles, category: 'Navigation' },
    { id: 'skills', title: 'How I Build Products & Core Capabilities', icon: Award, category: 'Navigation' },
    { id: 'resume', title: 'Executive Resume & Download', icon: FileText, category: 'Navigation' },
    { id: 'contact', title: 'Contact Surya & Book Advisory Call', icon: Send, category: 'Navigation' },
  ];

  const filteredSections = sections.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) || 
    s.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = cmsData.projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-left">
        
        {/* Search Bar Input */}
        <div className="relative p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search experience, skills, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="px-2 py-1 text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4 text-xs">
          
          {/* Quick Section Shortcuts */}
          <div>
            <p className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Sections & Navigation
            </p>
            <div className="space-y-1">
              {filteredSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSelect(sec.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{sec.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matching Products */}
          {filteredProjects.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Matching Product Transformations
              </p>
              <div className="space-y-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect('portfolio')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <div>
                        <p className="font-semibold text-slate-100">{p.title}</p>
                        <p className="text-[10px] text-slate-400">{p.category} • {p.company}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
          <span>Navigate with mouse or arrow keys</span>
          <span>Surya Prashanth Portfolio Search</span>
        </div>

      </div>

    </div>
  );
};
