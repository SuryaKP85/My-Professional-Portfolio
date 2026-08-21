import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Briefcase, 
  Award, 
  GraduationCap, 
  Code, 
  Wrench, 
  Layers, 
  Copy, 
  Check, 
  Sparkles,
  Printer,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ProfileData, ExperienceItem, Certification, EducationItem } from '../types';

interface ResumeSectionProps {
  profile: ProfileData;
  experiences: ExperienceItem[];
  certifications: Certification[];
  education?: EducationItem[];
}

export const ResumeSection: React.FC<Partial<ResumeSectionProps>> = () => {
  const [activeView, setActiveView] = useState<'formatted' | 'document'>('formatted');
  const [copied, setCopied] = useState(false);

  const resumePdfUrl = "/KPSurya_Product Manager.pdf";

  // Data directly extracted from uploaded PDF resume
  const resumeData = {
    name: "SURYA PRASANTH",
    title: "Product Manager | ERP | Supply Chain | WMS | AI-Powered",
    phone: "+91 9632588005",
    email: "surya.prashanth.kp@hotmail.com",
    linkedIn: "https://linkedin.com/in/suryaprashanth",
    github: "https://github.com/SuryaKP85",
    summary: "An accomplished Product Management Professional with a proven track record in Product Strategy, User Research, Stakeholder Management & GTM. I bring forth a wealth of experience in steering triumphant product endeavors from inception to fruition with an overall 16yrs experience in SCM, WMS, Customer Centric Solutions and Distribution domains.",
    coreSkills: [
      "Product Strategy", "Road mapping", "GTM Strategy", "Agile/Scrum", "OKRs/KPIs", 
      "Stakeholder Management", "Manufacturing ERP", "BOM", "Costing", "SCM", "WMS", 
      "TMS", "Trade Compliance", "REST APIs", "Microservices", "EDI", 
      "AI Product Development", "Figma", "AI Wireframing", "Vibe Coding"
    ],
    tools: [
      "Jira", "Confluence", "Figma", "SQL", "Swagger", "Postman", "GitHub", 
      "CI/CD", "Cursor AI", "Claude", "ChatGPT", "Gemini", "Perplexity", "NotebookLM"
    ],
    experiences: [
      {
        company: "iRely Soft Services Ltd",
        role: "Product Manager",
        period: "2026 – Present",
        bullets: [
          "Lead Manufacturing ERP initiatives across CTRM, Agriculture, and Petroleum products.",
          "Manage a cross-functional team of 14 across Dev, QA, and BA functions.",
          "Translate business requirements into epics/user stories; own end-to-end delivery, risk management, and stakeholder communication.",
          "Own delivery, risk management, and stakeholder communication.",
          "Defined AI-assisted engineering standards, cutting development turnaround time by ~50% while improving code quality."
        ]
      },
      {
        company: "Epicor Software Ltd",
        role: "Lead Product Owner",
        period: "2019 – 2025",
        bullets: [
          "Spearheaded redesign of a legacy WMS (Warehouse Management System) into a mobile-first product for Android and iOS.",
          "Contributed to EVA, an AI-powered engagement product, driving a ~15% increase in customer interaction.",
          "Led enterprise API integration initiatives across platforms.",
          "Managed and mentored a team of Product Owners on backlog grooming and stakeholder communication."
        ]
      },
      {
        company: "Amber Road Software Pvt Ltd (WiseTech Global)",
        role: "Product Owner",
        period: "2015 – 2019",
        bullets: [
          "Owned end-to-end product lifecycle (discovery, requirements, prototyping, delivery) for SCM and Trade Compliance products.",
          "Served as SME for SCM solutions; conducted market research and client demos to validate product-market fit.",
          "Authored epics and user stories to guide development priorities.",
          "Led EDI integration and GAP analysis."
        ]
      },
      {
        company: "GTNexus Software Ltd (Infor)",
        role: "Client Manager",
        period: "2010 – 2015",
        bullets: [
          "Liaised between enterprise customers and internal teams on technical/functional design specs for Apparel and 3PL portfolios.",
          "Led EDI integration delivery for Ocean and Air Transportation messaging.",
          "Applied Six Sigma methods to reduce manual intervention in EDI failures by ~80%.",
          "Built and led a support team improving post-implementation customer experience."
        ]
      },
      {
        company: "HP Global Soft (P) Ltd",
        role: "Tech Support Engineer",
        period: "2007 – 2010",
        bullets: [
          "Managing resolution of client issues for USA, Canada, Australia and New Zealand and APAC Regions",
          "Providing assistance for RAID 0, RAID 1 issues",
          "Expedite client issues with usage of tools such as Intel RAID Matrix and AMD RAID Xpert"
        ]
      }
    ],
    keyProjects: [
      "ERP Modernization", "AI Engineering Productivity Initiative", "Enterprise API Integration Program", 
      "WMS Mobile Modernization", "Field Service Management", "AI Assistances", "Supplier Integration"
    ],
    certifications: [
      "CSPO", "Six Sigma Black Belt (CSSBB)", "Microsoft Certified Professional (MCP)", "SAP R/3 SD 4.7"
    ],
    education: [
      { degree: "MBA", institution: "Visvesvaraya Technological University" },
      { degree: "BBA", institution: "Annamalai University" }
    ]
  };

  const plainTextResume = `${resumeData.name}
${resumeData.title}
Phone: ${resumeData.phone} | Email: ${resumeData.email}
LinkedIn: ${resumeData.linkedIn} | GitHub: ${resumeData.github}

PROFESSIONAL SUMMARY
${resumeData.summary}

CORE SKILLS
${resumeData.coreSkills.join(', ')}

TOOLS
${resumeData.tools.join(', ')}

PROFESSIONAL EXPERIENCE
${resumeData.experiences.map(e => `
${e.role} | ${e.company} | ${e.period}
${e.bullets.map(b => `• ${b}`).join('\n')}
`).join('\n')}

KEY PROJECTS
${resumeData.keyProjects.join(' | ')}

CERTIFICATIONS
${resumeData.certifications.join(' | ')}

EDUCATION
${resumeData.education.map(e => `${e.degree}, ${e.institution}`).join('\n')}
`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = (e: React.MouseEvent) => {
    // Direct static download
  };

  return (
    <section id="resume" className="py-20 relative bg-slate-950 border-t border-slate-800/80">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase shadow-sm">
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive Executive Resume</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vitae</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            16+ Years of Product Leadership across ERP, Supply Chain, WMS, and AI-Driven Platforms.
          </p>

          {/* Contact Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-300">
            <a 
              href={`mailto:${resumeData.email}`}
              className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{resumeData.email}</span>
            </a>

            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{resumeData.phone}</span>
            </div>

            <a 
              href={resumeData.linkedIn}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 text-cyan-400 hover:text-cyan-300 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a 
              href={resumeData.github}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Primary Action Buttons & View Mode Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80 max-w-4xl mx-auto">
            
            {/* Download & New Tab Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={resumePdfUrl}
                download="KPSurya_Product Manager.pdf"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href={resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-xs sm:text-sm transition-all"
              >
                <ExternalLink className="w-4 h-4 text-cyan-400" />
                <span>Open PDF in New Tab</span>
              </a>
            </div>

            {/* Layout Toggle Buttons */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl shadow-inner">
              <button
                onClick={() => setActiveView('formatted')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'formatted'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive View</span>
              </button>

              <button
                onClick={() => setActiveView('document')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'document'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>ATS Text Document</span>
              </button>
            </div>

          </div>
        </div>

        {/* View Mode: Interactive Visual Layout */}
        {activeView === 'formatted' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            
            {/* Professional Summary Box */}
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Professional Summary</span>
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {resumeData.summary}
              </p>
            </div>

            {/* Core Skills & Tools Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Core Skills */}
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span>Core Skills & Domain Expertise</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.coreSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  <span>Tools & AI Stack</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.tools.map((tool, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-medium hover:border-cyan-500/50 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Professional Experience Section */}
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Professional Experience</span>
              </h3>

              <div className="space-y-8">
                {resumeData.experiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-cyan-500/30 hover:border-cyan-400 transition-colors space-y-3">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-base font-bold text-slate-100">{exp.role}</h4>
                        <p className="text-xs font-semibold text-cyan-400">{exp.company}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 self-start sm:self-auto">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 pt-1 text-xs sm:text-sm text-slate-300">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Projects */}
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Key Projects</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.keyProjects.map((proj, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium hover:border-cyan-500/40 transition-colors"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications & Education Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Certifications */}
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Certifications</span>
                </h3>
                <div className="space-y-2.5">
                  {resumeData.certifications.map((cert, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs font-semibold text-slate-200">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>Education</span>
                </h3>
                <div className="space-y-3">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <p className="text-xs font-bold text-slate-100">{edu.degree}</p>
                      <p className="text-[11px] text-cyan-400 font-medium mt-0.5">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* View Mode: ATS Plain Text Document View */}
        {activeView === 'document' && (
          <div className="max-w-4xl mx-auto space-y-4">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="font-mono text-slate-400">ATS Plain Text Format</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

            {/* Plain Document Text Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto shadow-2xl">
              <pre className="whitespace-pre-wrap font-mono">
                {plainTextResume}
              </pre>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
