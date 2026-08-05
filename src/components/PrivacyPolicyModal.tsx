import React from 'react';
import { X, ShieldCheck, Lock, Eye } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-auto space-y-6 max-h-[85vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Privacy Policy & GDPR Compliance</h2>
            <p className="text-xs text-slate-400">Effective Date: August 2026 • Surya Prashanth Portfolio</p>
          </div>
        </div>

        <div className="prose prose-invert text-xs text-slate-300 space-y-4 leading-relaxed">
          <p>
            This website serves as the personal executive portfolio and professional networking portal of Surya Prashanth. We respect your privacy and adhere strictly to GDPR, CCPA, and global data privacy standards.
          </p>

          <h3 className="text-sm font-bold text-slate-100">1. Information We Collect</h3>
          <p>
            We collect information that you voluntarily submit through our visitor contact forms (e.g., First Name, Last Name, Email Address, Company, Designation) as well as anonymous technical metadata (IP address, country, device type, browser, pages visited) to understand audience engagement.
          </p>

          <h3 className="text-sm font-bold text-slate-100">2. Analytics & Cookies</h3>
          <p>
            We integrate Google Analytics 4 (GA4) and Microsoft Clarity for aggregate traffic analytics and UX heatmaps. These tools utilize privacy-centric first-party cookies only when consent is granted.
          </p>

          <h3 className="text-sm font-bold text-slate-100">3. How Your Data Is Used</h3>
          <p>
            Submitted contact information is used strictly by Surya Prashanth to establish professional communications, share resume updates, and respond to direct business inquiries. Your data is NEVER sold or rented to third-party advertisers.
          </p>

          <h3 className="text-sm font-bold text-slate-100">4. Data Subject Rights (GDPR / CCPA)</h3>
          <p>
            You retain the right to request access to, deletion of, or modification of any personal information provided to this site at any time. Simply email <span className="text-cyan-400 font-mono">surya.prashanth.kp@gmail.com</span> with your request.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
