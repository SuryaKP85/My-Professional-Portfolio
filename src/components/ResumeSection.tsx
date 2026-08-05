import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { ProfileData, ExperienceItem, Certification, EducationItem } from '../types';

interface ResumeSectionProps {
  profile: ProfileData;
  experiences: ExperienceItem[];
  certifications: Certification[];
  education?: EducationItem[];
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ profile, experiences, certifications, education }) => {
  const [activeTab, setActiveTab] = useState<'formatted' | 'document'>('formatted');

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generates formatted text blob download or triggers print view
    const element = document.createElement('a');
    const resumeText = `
===================================================================
SURYA PRASHANTH - EXECUTIVE RESUME
${profile.title}
Email: ${profile.email} | Location: ${profile.location}
LinkedIn: ${profile.linkedIn} | GitHub: ${profile.github}
===================================================================

EXECUTIVE SUMMARY
-----------------
${profile.executiveSummary}

PROFESSIONAL EXPERIENCE
----------------------
${experiences.map(e => `
COMPANY: ${e.company} (${e.period})
ROLE: ${e.role} | LOCATION: ${e.location}
IMPACT: ${e.businessImpact}
PRODUCTS: ${e.productsOwned.join(', ')}
ACHIEVEMENTS:
${e.majorAchievements.map(a => `  - ${a}`).join('\n')}
TECHNOLOGIES: ${e.technologies.join(', ')}
`).join('\n')}

CERTIFICATIONS
--------------
${certifications.map(c => `- ${c.title} (${c.issuer})`).join('\n')}

EDUCATION
---------
${(education || []).map(e => `- ${e.degree}, ${e.institution}`).join('\n')}
`;

    const file = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Surya_Prashanth_Executive_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="resume" className="py-20 relative bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Resume</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vitae</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Download or view the comprehensive executive resume tailored for senior leadership and product advisory roles.
          </p>

          {/* Action Bar Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 print:hidden">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print Resume</span>
            </button>

            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('formatted')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'formatted' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                Interactive View
              </button>
              <button
                onClick={() => setActiveTab('document')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'document' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                Document Preview
              </button>
            </div>
          </div>
        </div>

        {/* Printable & Screen Resume Sheet */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-left max-w-4xl mx-auto print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
          
          {/* Document Header */}
          <div className="border-b border-slate-800 pb-6 mb-8 print:border-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-100 print:text-black tracking-tight">
                  SURYA PRASHANTH
                </h1>
                <p className="text-sm font-bold text-cyan-400 print:text-slate-800 mt-1">
                  {profile.title} | {profile.subtitle}
                </p>
              </div>

              <div className="text-xs text-slate-300 print:text-black space-y-1">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 print:hidden" />
                  <span>{profile.email}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 print:hidden" />
                  <span>{profile.location}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400 print:hidden" />
                  <span>{profile.linkedIn}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-cyan-400 print:text-black uppercase tracking-widest mb-2 border-b border-slate-800 pb-1 print:border-black">
              Executive Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-900 leading-relaxed">
              {profile.executiveSummary}
            </p>
          </div>

          {/* Key Leadership Highlights */}
          <div className="mb-8 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 print:bg-slate-100 print:border-slate-300">
            <h3 className="text-xs font-bold text-cyan-400 print:text-black uppercase tracking-widest mb-3">
              Core Competencies & Impact
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300 print:text-black">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 print:hidden shrink-0" />
                <span>$1.2B+ Enterprise Value Created</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 print:hidden shrink-0" />
                <span>20+ Years Global Product Leadership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 print:hidden shrink-0" />
                <span>Cloud ERP & Multi-Site WMS Platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 print:hidden shrink-0" />
                <span>Agentic AI & Predictive Analytics</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-8 space-y-6">
            <h3 className="text-xs font-bold text-cyan-400 print:text-black uppercase tracking-widest border-b border-slate-800 pb-1 print:border-black">
              Professional Experience
            </h3>

            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-sm">
                  <span className="text-slate-100 print:text-black">{exp.role} — <span className="text-cyan-400 print:text-slate-800">{exp.company}</span></span>
                  <span className="text-xs text-slate-400 print:text-slate-700 font-mono">{exp.period}</span>
                </div>

                <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="list-disc list-inside text-xs text-slate-300 print:text-black space-y-1 pl-1">
                  {exp.majorAchievements.map((ach, idx) => (
                    <li key={idx} className="leading-relaxed">{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications & Education */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 print:text-black uppercase tracking-widest border-b border-slate-800 pb-1 print:border-black mb-3">
              Certifications & Education
            </h3>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 print:text-slate-800 uppercase tracking-wider">Certifications</p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-300 print:text-black">
                {certifications.map((c) => (
                  <div key={c.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 print:border-slate-300">
                    <p className="font-bold text-slate-100 print:text-black">{c.title}</p>
                    <p className="text-[11px] text-cyan-400 print:text-slate-700">{c.issuer}</p>
                  </div>
                ))}
              </div>
            </div>

            {education && education.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-semibold text-slate-400 print:text-slate-800 uppercase tracking-wider">Education</p>
                <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-300 print:text-black">
                  {education.map((e) => (
                    <div key={e.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 print:border-slate-300">
                      <p className="font-bold text-slate-100 print:text-black">{e.degree}</p>
                      <p className="text-[11px] text-cyan-400 print:text-slate-700">{e.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
