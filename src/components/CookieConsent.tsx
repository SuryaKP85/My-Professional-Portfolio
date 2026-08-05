import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, Cookie, X } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacyPolicy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacyPolicy }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('surya_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('surya_cookie_consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('surya_cookie_consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm sm:max-w-md bg-slate-900/95 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-xl text-left text-xs animate-in slide-in-from-bottom-5 duration-300">
      
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
          <Cookie className="w-4 h-4" />
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
            <span>Privacy & Analytics Consent (GDPR)</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </h4>

          <p className="text-slate-300 text-[11px] leading-relaxed">
            We use Google Analytics 4 & Microsoft Clarity cookies to optimize executive UX performance and track site visits anonymously.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] shadow-sm transition-colors"
            >
              Accept All
            </button>

            <button
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] transition-colors"
            >
              Essential Only
            </button>

            <button
              onClick={onOpenPrivacyPolicy}
              className="text-cyan-400 hover:underline text-[11px] ml-auto font-medium"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
