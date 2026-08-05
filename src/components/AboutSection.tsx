import React from 'react';
import { 
  Compass, 
  Lightbulb, 
  Users, 
  Target, 
  BookOpen, 
  Heart, 
  Briefcase,
  CheckCircle,
  Layers
} from 'lucide-react';
import { ProfileData } from '../types';

interface AboutSectionProps {
  profile: ProfileData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const cards = [
    {
      icon: Compass,
      title: "Product Philosophy",
      subtitle: "Building products by understanding how customers work.",
      tag: "PHILOSOPHY",
      paragraphs: [
        "I believe Product Management is about simplifying complexity.",
        "Enterprise software often supports critical business processes, but over time those processes become fragmented by manual work, disconnected systems, and unnecessary complexity.",
        "My role as a Product Manager is to understand how people actually work, identify the friction in those workflows, and build products that make those operations simpler, more intuitive, and more efficient.",
        "Technology is only valuable when it helps customers accomplish their work with less effort and greater confidence."
      ]
    },
    {
      icon: Users,
      title: "Collaboration & Leadership",
      subtitle: "Building alignment across people, teams, and ideas.",
      tag: "COLLABORATION",
      paragraphs: [
        "Building great products has never been an individual effort.",
        "Throughout my career, I've worked alongside Engineering, UX, QA, Customer Success, Professional Services, Sales, and business stakeholders to align diverse perspectives around a shared product vision.",
        "I believe the Product Manager's responsibility is to create clarity, facilitate meaningful conversations, make informed trade-offs, and help teams stay focused on solving the right customer problems.",
        "The best outcomes come from collaboration, trust, and shared ownership rather than hierarchy."
      ]
    },
    {
      icon: Lightbulb,
      title: "Product Mindset",
      subtitle: "Balancing customer value with business outcomes.",
      tag: "MINDSET",
      paragraphs: [
        "Every product decision starts with one question:",
        "\"What problem are we trying to solve?\"",
        "I enjoy breaking down complex business operations into smaller, manageable product opportunities that improve customer workflows without adding unnecessary complexity.",
        "Whether prioritizing a roadmap, defining a feature, or reviewing customer feedback, I focus on balancing customer value, business objectives, and technical feasibility to deliver products that solve real problems rather than simply adding more functionality."
      ]
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      subtitle: "Always learning. Always improving.",
      tag: "LEARNING",
      paragraphs: [
        "Enterprise software is constantly evolving, and so is Product Management.",
        "I invest time in learning emerging technologies, Artificial Intelligence, enterprise architecture, customer research techniques, and modern product practices—not because they're new, but because they offer better ways to solve customer problems.",
        "My curiosity is driven by a simple question:",
        "\"Can this help simplify the way our customers work?\"",
        "If the answer is yes, it's worth exploring."
      ]
    }
  ];

  return (
    <section id="about" className="py-20 relative bg-slate-950/60 border-t border-slate-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Product Management Perspective</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Surya Prashanth</span>
          </h2>
          <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3 pt-2">
            <p>
              For over 16 years, I've worked as a Product Manager building products that remove unnecessary effort from complex business operations.
            </p>
            <p>
              Across ERP, Manufacturing, Warehouse Management, Supply Chain, and Logistics, I've partnered with customers, engineering teams, and business stakeholders to transform operational challenges into practical, scalable software solutions.
            </p>
            <p>
              Every product I've worked on has been driven by the same belief that understanding how people work is the first step toward building products that truly make their work easier.
            </p>
          </div>
        </div>

        {/* Professional Snapshot */}
        <div className="mb-16 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-cyan-400" />
                <span>Professional Snapshot</span>
              </h3>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60">
                PRODUCT MANAGER
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              
              {/* Box 1: Experience & Role */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Experience & Role</p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">PM Experience:</span>
                    <span className="text-slate-100 font-bold">16+ Years</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Current Role:</span>
                    <span className="text-cyan-300 font-bold">Product Manager</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Domain Depth:</span>
                    <span className="text-emerald-400 font-bold">Enterprise Software</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Industries & Product Domains */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Industries & Domains</p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400 block mb-1">Industries:</span>
                    <p className="text-slate-200 font-medium">Manufacturing, Distribution, Supply Chain, Warehouse Management, Global Trade, Enterprise SaaS</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-slate-400 block mb-1">Product Domains:</span>
                    <p className="text-cyan-300 font-medium">ERP, WMS, Supply Chain, Manufacturing, Logistics, AI-enabled Products</p>
                  </div>
                </div>
              </div>

              {/* Box 3: Core Strengths */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Core Strengths</p>
                <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Product Strategy & Roadmaps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Customer Discovery & Feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Stakeholder Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Cross-functional Collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Agile Delivery & AI Integration</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* 4 Thoughtful Product Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {cards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/60 p-7 rounded-2xl border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400/80 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40 uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs font-semibold text-cyan-400/90 mt-1 mb-4">
                    {item.subtitle}
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* What Drives Me */}
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800/80 text-left relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
              <Heart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Motivation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              What Drives Me
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Throughout my career, I've been motivated by solving operational challenges that have a meaningful impact on the people who use enterprise software every day.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether improving warehouse operations, streamlining manufacturing processes, modernizing ERP platforms, or enhancing supply chain workflows, I enjoy turning complexity into clarity.
            </p>
            <p className="text-cyan-300 font-semibold text-sm sm:text-base pt-2">
              That is what continues to drive my work as a Product Manager.
            </p>
            <ul className="space-y-1.5 text-sm text-slate-300 pt-1 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>Not building more features.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>Not following technology trends.</span>
              </li>
              <li className="flex items-center gap-2 text-slate-100 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>But building products that help businesses operate more effectively and help people do their jobs with greater confidence.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

