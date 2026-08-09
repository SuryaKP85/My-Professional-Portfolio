import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  MapPin, 
  Globe, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { ProfileData } from '../types';

interface ContactSectionProps {
  profile: ProfileData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Transmitting message to Surya...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: 'Your message was delivered successfully! Surya will get back to you shortly.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Transmission failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Please try emailing directly at ' + profile.email });
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Send className="w-3.5 h-3.5" />
            <span>Executive Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Let's Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Next Enterprise Future</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Open to Vice President / Head of Product leadership roles, board advisory engagements, and keynotes.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Direct Channels & Radar Location Box */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>Direct Contact Channels</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Email */}
                <a 
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[11px] font-semibold">Official Email</p>
                    <p className="text-slate-100 font-medium group-hover:text-cyan-300 transition-colors">{profile.email}</p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a 
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[11px] font-semibold">LinkedIn Profile</p>
                    <p className="text-slate-100 font-medium group-hover:text-cyan-300 transition-colors">linkedin.com/in/suryaprashanth</p>
                  </div>
                </a>

                {/* GitHub */}
                <a 
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[11px] font-semibold">GitHub Code & Open Standards</p>
                    <p className="text-slate-100 font-medium group-hover:text-cyan-300 transition-colors">github.com/SuryaKP85</p>
                  </div>
                </a>

              </div>
            </div>

            {/* Interactive Regional Radar Map Box */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Primary Location & Availability</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-800">
                  Global Remote Ready
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative">
                <p className="text-sm font-bold text-slate-100">{profile.location}</p>
                <p className="text-xs text-slate-400 mt-0.5">Pacific Time (UTC-7/UTC-8) | Flexible Global Hours</p>

                {/* Animated Radar Pulse Visualizer */}
                <div className="mt-4 h-24 rounded-xl bg-slate-900/80 border border-slate-800/80 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute w-20 h-20 rounded-full border border-cyan-500/30 animate-ping" />
                  <div className="absolute w-12 h-12 rounded-full border border-cyan-400/50 animate-pulse" />
                  <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80" />
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-cyan-400">
                    SEATTLE RADAR ACTIVE
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            
            <div>
              <h3 className="text-xl font-bold text-slate-100">Send Executive Inquiry</h3>
              <p className="text-xs text-slate-400 mt-1">Direct message reaches Surya's priority inbox.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Business Email *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. s.jenkins@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subject / Inquiry Type</label>
                <input 
                  type="text" 
                  placeholder="e.g. Executive Product Leadership Opportunity / Advisory Role"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Message *</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Share details regarding the strategic initiative, executive role, or product consultation..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              {/* Status Alert */}
              {status.type !== 'idle' && (
                <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  status.type === 'success' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' :
                  status.type === 'error' ? 'bg-rose-950/80 text-rose-300 border border-rose-800' :
                  'bg-slate-950 text-cyan-300 border border-cyan-800'
                }`}>
                  {status.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {status.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{status.type === 'loading' ? 'Dispatching Message...' : 'Transmit Executive Inquiry'}</span>
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
