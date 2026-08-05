import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Building2, 
  Layers, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProductPortfolioProps {
  projects: Project[];
}

export const ProductPortfolio: React.FC<ProductPortfolioProps> = ({ projects }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filters = ['ALL', 'AI Products', 'Warehouse Management', 'ERP', 'Supply Chain'];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    return p.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  return (
    <section id="portfolio" className="py-20 relative bg-slate-950/70 border-t border-slate-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Innovation Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Product Portfolio</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            High-impact software platforms, autonomous warehouse systems, and AI supply chain engines designed and scaled to market.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === f
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                
                {/* Project Image Header */}
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-slate-700/80 text-xs font-mono font-bold">
                      {project.category}
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-[11px] font-bold">
                      ★ FEATURED PRODUCT
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1 font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {project.company}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4">
                  
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-xs font-semibold text-cyan-400 mt-1">
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Metrics Badges */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-xs font-bold text-cyan-300 font-mono">{m.value}</p>
                        <p className="text-[10px] text-slate-400">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[11px] text-slate-400 font-mono self-center">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                </div>

              </div>

              {/* Card Footer Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setActiveProject(project)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-semibold text-slate-200 transition-all duration-200"
                >
                  <span>View Product Deep Dive</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep Dive Modal */}
      <ProjectModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />

    </section>
  );
};
