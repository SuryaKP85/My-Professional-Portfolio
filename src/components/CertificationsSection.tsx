import React from 'react';
import { Award, FileBadge, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Certification, EducationItem } from '../types';

interface CertificationsSectionProps {
  certifications: Certification[];
  education?: EducationItem[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, education }) => {
  return (
    <section id="certifications" className="py-16 relative bg-slate-950/80 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Executive Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Education</span>
          </h2>
        </div>

        {/* Certifications Subheading */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <FileBadge className="w-5 h-5 text-amber-400" />
            <span>Professional Certifications</span>
          </h3>
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 text-left mb-12">
          {certifications.map((cert) => (
            <div 
              key={cert.id}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-200 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                    <FileBadge className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-cyan-400 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    {cert.issueDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-xs font-semibold text-cyan-400 mt-1 mb-3">
                  {cert.issuer}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Competencies
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsVerified.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Education Subheading */}
        {education && education.length > 0 && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Academic Education</span>
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {education.map((edu) => (
                <div 
                  key={edu.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 flex items-center justify-center font-bold mb-4">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-100">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-semibold text-cyan-400 mt-1 mb-2">
                      {edu.institution}
                    </p>
                    {edu.description && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
