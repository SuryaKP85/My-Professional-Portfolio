import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Award,
  Filter,
  Lightbulb,
  Sparkles,
  Target,
  Globe
} from 'lucide-react';
import { ExperienceItem } from '../types';

interface CareerJourneyProps {
  experiences: ExperienceItem[];
}

export const CareerJourney: React.FC<CareerJourneyProps> = ({ experiences }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-5': true,
    'exp-4': true,
    'exp-3': true,
    'exp-2': true,
    'exp-1': true
  });

  const categories = ['ALL', 'ERP & Manufacturing', 'Warehouse Management', 'Logistics', 'Supply Chain', 'Enterprise Tech'];

  const filteredExperiences = experiences.filter((exp) => {
    if (selectedCategory === 'ALL') return true;
    return exp.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="py-20 relative bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Progression & Leadership Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Journey</span>
          </h2>
        </div>

        {/* Introductory Story Section */}
        <div className="max-w-4xl mx-auto mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 shrink-0 hidden sm:block">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 sm:hidden" />
                <span>Evolving Enterprise Perspective</span>
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Every role in my career has added a new perspective on enterprise software from solving technical issues and working directly with customers to leading product strategy and AI-enabled innovation. Together, these experiences have shaped how I approach Product Management today: by understanding customer problems deeply, collaborating across teams, and building products that remove unnecessary effort from complex business operations.
              </p>
            </div>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 font-medium mr-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filter Domain:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-800/80 ml-4 sm:ml-8 lg:ml-12 space-y-10 text-left">
          {filteredExperiences.map((exp) => {
            const isExpanded = expandedIds[exp.id] ?? true;
            return (
              <div key={exp.id} className="relative pl-6 sm:pl-10 group">
                
                {/* Timeline Dot Node */}
                <div className="absolute -left-[17px] top-2.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                </div>

                {/* Company Card */}
                <div className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all shadow-xl">
                  
                  {/* Card Header Top */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap mb-1.5">
                        <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase">
                          {exp.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {exp.period} ({exp.duration})
                        </span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-400">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                      >
                        <span>{isExpanded ? 'Collapse' : 'Expand Details'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
                      </button>
                    </div>
                  </div>

                  {/* Career Summary */}
                  <div className="mt-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Career Summary</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {exp.careerSummary || exp.description}
                    </p>
                  </div>

                  {/* Expandable Deep Dive Body */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6 animate-in fade-in duration-200">
                      
                      {/* Products Owned */}
                      {exp.productsOwned && exp.productsOwned.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Layers className="w-4 h-4" />
                            <span>Products & Initiatives Owned</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.productsOwned.map((prod, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium text-slate-200"
                              >
                                {prod}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Responsibilities */}
                      {exp.majorAchievements && exp.majorAchievements.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Target className="w-4 h-4" />
                            <span>Key Responsibilities & Scope</span>
                          </h4>
                          <div className="space-y-2">
                            {exp.majorAchievements.map((ach, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                <span className="leading-relaxed">{ach}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Contributions */}
                      {exp.keyContributions && exp.keyContributions.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Award className="w-4 h-4" />
                            <span>Key Contributions</span>
                          </h4>
                          <div className="space-y-2">
                            {exp.keyContributions.map((contrib, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span className="leading-relaxed">{contrib}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dedicated Key Industry Partnerships Subsection (GT Nexus / or any exp with industryPartnerships) */}
                      {exp.industryPartnerships && (
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-cyan-900/40 shadow-inner space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800/80 text-cyan-400">
                              <Globe className="w-4 h-4" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-100 tracking-wide">
                              Key Industry Partnerships
                            </h4>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {exp.industryPartnerships.description}
                          </p>

                          <div className="grid sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80">
                            <div className="space-y-1.5 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80">
                              <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
                                Global Ocean Carriers
                              </span>
                              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                {exp.industryPartnerships.oceanCarriers.join(' • ')}
                              </p>
                            </div>

                            <div className="space-y-1.5 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80">
                              <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
                                3PL Logistics Providers
                              </span>
                              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                {exp.industryPartnerships.logisticsProviders.join(' • ')}
                              </p>
                            </div>

                            <div className="space-y-1.5 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80">
                              <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
                                Enterprise Customers
                              </span>
                              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                {exp.industryPartnerships.enterpriseCustomers.join(' • ')}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* What I Learned */}
                      {exp.whatILearned && (
                        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 relative">
                          <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                            <span>What I Learned</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                            "{exp.whatILearned}"
                          </p>
                        </div>
                      )}

                      {/* Technologies & Methods */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Technologies & Domain Methods</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech, idx) => (
                              <span key={idx} className="px-2.5 py-1 bg-slate-900 border border-slate-700/80 text-slate-300 text-[11px] font-mono rounded-md">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

