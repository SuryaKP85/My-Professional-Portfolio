import React, { useState } from 'react';
import { 
  Award, 
  Target, 
  Building2, 
  Truck, 
  Sparkles, 
  Cloud, 
  CheckCircle2, 
  Layers,
  Compass,
  Code2,
  Workflow
} from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsMatrixProps {
  categories: SkillCategory[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ categories }) => {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || 'cat-pm');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Target': return Target;
      case 'Building2': return Building2;
      case 'Truck': return Truck;
      case 'Sparkles': return Sparkles;
      case 'Cloud': return Cloud;
      default: return Award;
    }
  };

  const domainGroups = [
    {
      title: "Enterprise Domains",
      icon: Building2,
      tags: ["ERP", "Manufacturing", "Warehouse Management", "Supply Chain", "Logistics", "Procurement", "Order-to-Cash", "Inventory Management"]
    },
    {
      title: "Product Management",
      icon: Target,
      tags: ["Product Strategy", "Customer Discovery", "Roadmapping", "Prioritization", "Stakeholder Management", "Product Delivery", "Go-to-Market", "Customer Advisory Boards"]
    },
    {
      title: "Technology",
      icon: Code2,
      tags: ["REST APIs", "GraphQL", "SQL", "Microservices", "Azure", "Cloud SaaS", "Artificial Intelligence", "LLMs", "Workflow Automation"]
    }
  ];

  return (
    <section id="skills" className="py-20 relative bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Product Philosophy & Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            How I <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Build Products</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Over the past 16+ years, I've developed products across ERP, Manufacturing, Warehouse Management, Supply Chain, and Logistics by combining customer understanding, product strategy, and close collaboration with engineering teams.
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto italic">
            Every product I've worked on has been driven by the same belief that understanding how people work is the first step toward building products that truly make their work easier.
          </p>
          <p className="text-cyan-400/90 text-sm font-medium">
            Rather than focusing on individual features, I focus on simplifying complex business operations and helping customers work more efficiently.
          </p>
        </div>

        {/* Tab Buttons Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = getIcon(cat.iconName);
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display Box */}
        {categories.map((cat) => {
          if (cat.id !== activeTab) return null;
          const Icon = getIcon(cat.iconName);

          return (
            <div 
              key={cat.id}
              className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl text-left animate-in fade-in duration-300"
            >
              
              <div className="flex items-start sm:items-center gap-3.5 mb-8 pb-5 border-b border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{cat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{cat.description}</p>
                </div>
              </div>

              {/* Skills Items Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {cat.skills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="bg-slate-950/80 p-5 sm:p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Title & Badge */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{skill.name}</span>
                        </h4>
                        {skill.experience && (
                          <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                            {skill.experience}
                          </span>
                        )}
                      </div>

                      {/* How I Apply It */}
                      {skill.howIApplyIt && (
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {skill.howIApplyIt}
                        </p>
                      )}

                      {/* Philosophy Quote */}
                      {skill.philosophy && (
                        <div className="mt-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs italic text-cyan-200">
                          "{skill.philosophy}"
                        </div>
                      )}
                    </div>

                    {/* Key Areas / Frameworks */}
                    {(skill.keyAreas || skill.frameworks) && (
                      <div className="mt-5 pt-4 border-t border-slate-800/80">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          {skill.frameworks ? "Frameworks & Methods" : "Key Areas"}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {(skill.keyAreas || skill.frameworks)?.map((area, aIdx) => (
                            <span 
                              key={aIdx} 
                              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          );
        })}

        {/* Grouped Capability Sets */}
        <div className="mt-12 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800 text-left space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Core Capabilities & Domain Expertise
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {domainGroups.map((group, gIdx) => {
              const GroupIcon = group.icon;
              return (
                <div key={gIdx} className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-3 text-slate-200 font-semibold text-sm">
                    <GroupIcon className="w-4 h-4 text-cyan-400" />
                    <span>{group.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-800/80 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
