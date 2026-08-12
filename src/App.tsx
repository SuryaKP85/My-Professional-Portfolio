import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CareerJourney } from './components/CareerJourney';
import { ProductPortfolio } from './components/ProductPortfolio';
import { SkillsMatrix } from './components/SkillsMatrix';
import { CertificationsSection } from './components/CertificationsSection';
import { ResumeSection } from './components/ResumeSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIChatWidget } from './components/AIChatWidget';
import { VisitorModal } from './components/VisitorModal';
import { AdminModal } from './components/AdminModal';
import { CommandPalette } from './components/CommandPalette';
import { CookieConsent } from './components/CookieConsent';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { initialData } from './data/initialData';
import { CMSData } from './types';
import { MessageSquare, ArrowUp, Send } from 'lucide-react';

export default function App() {
  const [cmsData, setCmsData] = useState<CMSData>(initialData);
  const [activeSection, setActiveSection] = useState('home');

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Fetch live CMS data from backend
    fetch('/api/cms')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCmsData(data.data);
        }
      })
      .catch(() => {
        // Fallback to client-side initialData
      });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Intersection observer for active section detection
      const sections = ['home', 'about', 'experience', 'portfolio', 'skills', 'certifications', 'resume', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Dynamic SEO JSON-LD Structured Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": cmsData.profile.name,
          "jobTitle": cmsData.profile.title,
          "worksFor": {
            "@type": "Organization",
            "name": "Nexus Enterprise Cloud Systems"
          },
          "url": "https://ais-dev-duh55xpw5ledfn2e7toiy7-939424068670.asia-southeast1.run.app",
          "sameAs": [
            cmsData.profile.linkedIn,
            cmsData.profile.github
          ],
          "knowsAbout": [
            "Enterprise Resource Planning (ERP)",
            "Supply Chain Management",
            "Warehouse Management Systems (WMS)",
            "Artificial Intelligence",
            "Product Strategy"
          ]
        })
      }} />

      {/* Main Glass Navigation */}
      <Navbar
        profile={cmsData.profile}
        activeSection={activeSection}
        setActiveSection={handleNavigate}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAIChat={() => setAiChatOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main View Sections */}
      <main>
        <Hero 
          profile={cmsData.profile} 
          onNavigate={handleNavigate} 
          onOpenAIChat={() => setAiChatOpen(true)}
          onUpdateProfile={(updatedProfile) => setCmsData(prev => ({ ...prev, profile: updatedProfile }))} 
        />

        <AboutSection profile={cmsData.profile} />

        <CareerJourney experiences={cmsData.experiences} />

        <ProductPortfolio projects={cmsData.projects} />

        <SkillsMatrix categories={cmsData.skillCategories} />

        <CertificationsSection 
          certifications={cmsData.certifications} 
          education={cmsData.education} 
        />

        <ResumeSection 
          profile={cmsData.profile} 
          experiences={cmsData.experiences} 
          certifications={cmsData.certifications} 
          education={cmsData.education} 
        />

        <ContactSection profile={cmsData.profile} />
      </main>

      {/* Footer */}
      <Footer 
        profile={cmsData.profile} 
        onNavigate={handleNavigate} 
        onOpenPrivacyPolicy={() => setPrivacyModalOpen(true)} 
      />

      {/* Floating Action Controls */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col items-start gap-3">
        {/* Floating "Let's Talk" Button */}
        <button
          onClick={() => handleNavigate('contact')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-slate-700/80 shadow-xl backdrop-blur-md text-xs font-bold transition-all hover:scale-105"
        >
          <Send className="w-3.5 h-3.5 text-emerald-400" />
          <span>Let's Talk</span>
        </button>

        {/* Back to Top Floating Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 shadow-xl backdrop-blur-md transition-all hover:scale-110"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 text-cyan-400" />
          </button>
        )}
      </div>

      {/* Timed / Exit Intent Visitor Lead Capture Modal */}
      <VisitorModal />

      {/* Admin & Visitor Analytics Portal Modal */}
      <AdminModal 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)} 
        cmsData={cmsData} 
        onUpdateCMS={setCmsData} 
      />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
        cmsData={cmsData} 
        onNavigate={handleNavigate} 
      />

      {/* GDPR Cookie Consent Banner */}
      <CookieConsent onOpenPrivacyPolicy={() => setPrivacyModalOpen(true)} />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal 
        isOpen={privacyModalOpen} 
        onClose={() => setPrivacyModalOpen(false)} 
      />

    </div>
  );
}
