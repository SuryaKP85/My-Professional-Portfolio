import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  Building2,
  FileText,
  UserCheck,
  Briefcase,
  Compass,
  Bookmark,
  ChevronDown,
  Lightbulb
} from 'lucide-react';
import { Project, CaseStudySection } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [readingLevel, setReadingLevel] = useState<'all' | 'level1' | 'level2' | 'level3'>('all');
  
  // Track open/collapsed state for initiative accordions
  const [expandedInitiatives, setExpandedInitiatives] = useState<Record<string, boolean>>(() => {
    if (project?.initiatives) {
      const initial: Record<string, boolean> = {};
      project.initiatives.forEach(init => {
        initial[init.id] = init.defaultExpanded ?? false;
      });
      return initial;
    }
    return {};
  });

  const toggleInitiative = (id: string) => {
    setExpandedInitiatives(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Fallback sections for legacy project data if sections array is not provided
  const legacySections: CaseStudySection[] = [
    {
      id: 'sec-problem',
      title: 'The Core Enterprise Problem',
      summaryCallout: project.problem ? `${project.problem.slice(0, 140)}...` : 'Identifying critical operational and business bottlenecks.',
      content: project.problem,
      type: 'problem'
    },
    {
      id: 'sec-solution',
      title: 'Engineered Product Solution',
      summaryCallout: project.solution ? `${project.solution.slice(0, 140)}...` : 'Architecting customer-centric scalable software platform.',
      content: project.solution,
      type: 'solution'
    },
    {
      id: 'sec-role',
      title: 'Product Leadership & Strategic Ownership',
      summaryCallout: project.role || 'Defining product vision, aligning cross-functional teams, and driving execution.',
      content: project.role,
      type: 'strategy'
    },
    {
      id: 'sec-outcome',
      title: 'Quantified Business Outcome & Impact',
      summaryCallout: project.businessOutcome || 'Measurable customer value and tangible business metrics delivered.',
      content: project.businessOutcome,
      type: 'outcome'
    },
    {
      id: 'sec-vision',
      title: 'Future Product Vision & Roadmap',
      summaryCallout: project.futureVision || 'Strategic evolution and continuous product expansion.',
      content: project.futureVision,
      type: 'standard'
    }
  ];

  const displaySections = (project.sections && project.sections.length > 0) 
    ? project.sections 
    : legacySections;

  const renderSectionCard = (sec: CaseStudySection, idx: number) => {
    const showDetailedContent = readingLevel === 'all' || readingLevel === 'level3';

    return (
      <div 
        key={sec.id || idx} 
        className={`space-y-4 p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 transition-all ${
          readingLevel === 'level2' ? 'border-cyan-500/50 bg-slate-950/90' : ''
        }`}
      >
        {/* Section Title */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h4 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-mono font-bold">
              {idx + 1}
            </span>
            <span>{sec.title}</span>
          </h4>
          
          {sec.type && (
            <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              {sec.type}
            </span>
          )}
        </div>

        {/* Concise Section Summary Callout Box (Level 2 Reader Highlight) */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border-l-4 border-l-cyan-400 border-y border-r border-slate-800/80 shadow-md">
          <div className="flex items-start gap-3">
            <Bookmark className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                Section Key Takeaway (Level 2 Summary)
              </span>
              <p className="text-slate-200 text-xs sm:text-sm font-semibold leading-relaxed">
                {sec.summaryCallout}
              </p>
            </div>
          </div>
        </div>

        {/* Level 3 Detailed Content */}
        {showDetailedContent && (
          <div className="space-y-4 pt-2">
            {typeof sec.content === 'string' ? (
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {sec.content}
              </p>
            ) : Array.isArray(sec.content) ? (
              <div className="space-y-3">
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}

            {sec.bullets && sec.bullets.length > 0 && (
              <div className="space-y-2 pt-1">
                {sec.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            )}

            {sec.subsections && sec.subsections.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-slate-800/60">
                {sec.subsections.map((sub, subIdx) => (
                  <div key={subIdx} className="pl-4 border-l-2 border-slate-800 space-y-2">
                    <h5 className="text-sm font-bold text-slate-200">
                      {sub.title}
                    </h5>
                    {sub.summaryCallout && (
                      <p className="text-xs text-cyan-300 font-medium italic bg-cyan-950/20 p-2 rounded border border-cyan-800/30">
                        {sub.summaryCallout}
                      </p>
                    )}
                    {typeof sub.content === 'string' ? (
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {sub.content}
                      </p>
                    ) : Array.isArray(sub.content) ? (
                      <div className="space-y-2">
                        {sub.content.map((sp, spIdx) => (
                          <p key={spIdx} className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {sp}
                          </p>
                        ))}
                      </div>
                    ) : null}

                    {sub.bullets && sub.bullets.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {sub.bullets.map((sb, sbIdx) => (
                          <div key={sbIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{sb}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Card Box */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-left my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header Banner */}
        <div className="relative h-44 sm:h-56 shrink-0 overflow-hidden bg-slate-950 border-b border-slate-800">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-center filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-slate-300 hover:text-white border border-slate-700/80 transition-colors shadow-lg z-10"
            title="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 text-xs font-mono font-bold uppercase">
                  {project.category}
                </span>
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{project.company}</span>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="text-xs sm:text-sm font-semibold text-cyan-400">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Level Reading Control Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Reading Level Lens:</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setReadingLevel('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                readingLevel === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Complete View</span>
            </button>

            <button
              onClick={() => setReadingLevel('level1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                readingLevel === 'level1'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Level 1: Executive Summary & Key Metrics (60-sec read)"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Level 1: Recruiter (60s)</span>
            </button>

            <button
              onClick={() => setReadingLevel('level2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                readingLevel === 'level2'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Level 2: Section Titles & Section Summary Callout Boxes"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Level 2: Manager (Callouts)</span>
            </button>

            <button
              onClick={() => setReadingLevel('level3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                readingLevel === 'level3'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Level 3: Complete Uncondensed Narrative, Trade-offs & Strategy"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Level 3: Leader (Deep Dive)</span>
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto grow">
          
          {/* Metrics Bar - High impact at all reading levels */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 shadow-inner">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/50">
                <p className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
                  {m.value}
                </p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* Level 1 Banner: Executive Summary (Always Visible) */}
          <div className={`p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-800/60 transition-all ${
            readingLevel === 'level1' ? 'ring-2 ring-cyan-400 shadow-xl' : ''
          }`}>
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Executive Summary</span>
            </h4>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
              {project.executiveSummary || project.summary}
            </p>
          </div>

          {/* Technology Architecture Pills */}
          {project.techStack && project.techStack.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Technology & Methodology Architecture</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Render Case Study Content: Accordion Initiatives if present, else flat sections */}
          {project.initiatives && project.initiatives.length > 0 ? (
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Strategic Initiatives ({project.initiatives.length})</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allOpen: Record<string, boolean> = {};
                      project.initiatives?.forEach(i => allOpen[i.id] = true);
                      setExpandedInitiatives(allOpen);
                    }}
                    className="text-[11px] font-mono text-cyan-400 hover:underline px-2.5 py-1 rounded bg-slate-950 border border-slate-800"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={() => setExpandedInitiatives({})}
                    className="text-[11px] font-mono text-slate-400 hover:underline px-2.5 py-1 rounded bg-slate-950 border border-slate-800"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {project.initiatives.map((init, initIdx) => {
                const isExpanded = !!expandedInitiatives[init.id];
                return (
                  <div 
                    key={init.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl transition-all"
                  >
                    {/* Accordion Trigger Header */}
                    <button
                      onClick={() => toggleInitiative(init.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-slate-900 hover:bg-slate-850 transition-colors border-b border-slate-800/60 focus:outline-none"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/80">
                            Initiative {initIdx + 1}
                          </span>
                          {init.badge && (
                            <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                              {init.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                          {init.title}
                        </h4>
                        <p className="text-xs sm:text-sm font-semibold text-slate-400">
                          {init.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
                          {isExpanded ? 'Collapse' : 'Expand'}
                        </span>
                        <div className={`p-2.5 rounded-full bg-slate-950 border border-slate-800 text-cyan-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 bg-cyan-950 border-cyan-800' : ''}`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </button>

                    {/* Accordion Body */}
                    {isExpanded && (
                      <div className="p-5 sm:p-6 space-y-6 bg-slate-950/40 border-t border-slate-800/80 animate-in fade-in duration-200">
                        {init.sections.map((sec, secIdx) => renderSectionCard(sec, secIdx))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Legacy / Flat Sections View */
            <div className="space-y-8">
              {displaySections.map((sec, idx) => renderSectionCard(sec, idx))}
            </div>
          )}

          {/* Overall Business Impact Card (Always Visible at Bottom) */}
          {project.overallBusinessImpact && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                    Strategic Product Portfolio
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-100">
                    Overall Business Impact
                  </h4>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                {project.overallBusinessImpact.summary}
              </p>

              {/* Metrics Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 text-cyan-400 text-xs font-mono uppercase border-b border-slate-800">
                      <th className="p-3 sm:p-4 font-bold">Business Outcome</th>
                      <th className="p-3 sm:p-4 font-bold">Impact</th>
                      <th className="p-3 sm:p-4 font-bold hidden md:table-cell">Operational Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm text-slate-200">
                    {project.overallBusinessImpact.metricsTable.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 sm:p-4 font-semibold text-slate-100 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{row.outcome}</span>
                        </td>
                        <td className="p-3 sm:p-4 font-mono font-bold text-cyan-400 bg-cyan-950/20">
                          {row.impact}
                        </td>
                        <td className="p-3 sm:p-4 text-slate-400 hidden md:table-cell">
                          {row.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {project.overallBusinessImpact.foundationNote && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cyan-300 block mb-0.5">Strategic Foundation Principle</span>
                    <span>{project.overallBusinessImpact.foundationNote}</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-400 font-mono hidden sm:block">
            Preserving full product narrative & executive structure
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors ml-auto"
          >
            Close Case Study
          </button>
        </div>

      </div>

    </div>
  );
};
