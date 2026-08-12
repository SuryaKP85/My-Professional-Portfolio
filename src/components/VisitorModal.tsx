import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, ShieldCheck, Mail, Building, User, CheckCircle2 } from 'lucide-react';

export const VisitorModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    designation: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if visitor lead already captured in this session
    const hasPrompted = sessionStorage.getItem('surya_visitor_lead_prompted');
    if (hasPrompted) return;

    // Trigger after 45 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('surya_visitor_lead_prompted', 'true');
    }, 45000);

    // Trigger on exit intent (mouse leaving viewport towards top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !sessionStorage.getItem('surya_visitor_lead_prompted')) {
        setIsOpen(true);
        sessionStorage.setItem('surya_visitor_lead_prompted', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;

    setLoading(true);

    try {
      // 1. Post to internal backend API (saves to Admin Inbox & triggers server-side forwarding)
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pagesVisited: [window.location.pathname],
          timeSpent: '45s',
          trafficSource: document.referrer ? new URL(document.referrer).hostname : 'Direct'
        })
      });

      // 2. Direct client-side relay to surya.prashanth.kp@hotmail.com
      fetch('https://formsubmit.co/ajax/surya.prashanth.kp@hotmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `[Visitor Portal Lead] ${formData.firstName} ${formData.lastName || ''} (${formData.company || 'Visitor'})`,
          name: `${formData.firstName} ${formData.lastName || ''}`.trim(),
          email: formData.email,
          _replyto: formData.email,
          company: formData.company || 'Not specified',
          designation: formData.designation || 'Not specified'
        })
      }).catch(err => console.warn('Visitor relay warning:', err));

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 2500);
      }
    } catch (err) {
      setSubmitted(true);
      setTimeout(() => setIsOpen(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100">Thank You for Connecting!</h3>
            <p className="text-xs text-slate-300">Your details have been logged into Surya's executive contact registry.</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-[11px] font-bold border border-cyan-800 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Networking</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-100 tracking-tight">
                Let's Stay Connected
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                If you'd like to connect professionally, receive product insights, or access my latest resume and portfolio updates, please leave your details below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Jenkins"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah.jenkins@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Microsoft / Stripe"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. VP Talent / Director"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting Details...' : 'Submit & Connect'}</span>
              </button>

            </form>

            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strictly confidential. No spam or third-party tracking.</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
