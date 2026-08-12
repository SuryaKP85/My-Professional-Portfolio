import React, { useRef, useState } from 'react';
import { 
  Download, 
  Briefcase, 
  Send, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Users, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Camera,
  Trash2,
  Upload,
  User,
  Check
} from 'lucide-react';
import { ProfileData } from '../types';

export const PRIMARY_PROFILE_IMAGE = '/images/profile/surya-profile.jpg';

interface HeroProps {
  profile: ProfileData;
  onNavigate: (sectionId: string) => void;
  onOpenAIChat: () => void;
  onUpdateProfile?: (updatedProfile: ProfileData) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate, onOpenAIChat, onUpdateProfile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setStatusMsg('File is too large (Max 8MB). Please choose a smaller image.');
      setTimeout(() => setStatusMsg(null), 4000);
      return;
    }

    setUploading(true);
    setStatusMsg('Processing profile image...');

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Url = reader.result as string;
      try {
        const res = await fetch('/api/profile/photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photoUrl: base64Url })
        });
        const data = await res.json();
        if (data.success && onUpdateProfile) {
          onUpdateProfile({ ...profile, photoUrl: base64Url });
          setStatusMsg('Profile picture updated successfully!');
        } else {
          setStatusMsg('Failed to save profile picture.');
        }
      } catch (err) {
        setStatusMsg('Network error uploading photo.');
      } finally {
        setUploading(false);
        setTimeout(() => setStatusMsg(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = async () => {
    setUploading(true);
    setStatusMsg('Resetting photo...');
    const defaultPhoto = '/surya_headshot.jpg';

    try {
      const res = await fetch('/api/profile/photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoUrl: defaultPhoto })
      });
      const data = await res.json();
      if (data.success && onUpdateProfile) {
        onUpdateProfile({ ...profile, photoUrl: defaultPhoto });
        setStatusMsg('Profile picture reset to default headshot!');
      }
    } catch (err) {
      setStatusMsg('Failed to reset photo.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      
      {/* Parallax Radial Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Dedicated Profile Photo Management Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-900/95 border border-cyan-500/30 shadow-2xl shadow-cyan-950/30 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-md shrink-0 bg-slate-950">
              <img 
                src={profile.photoUrl || '/surya_headshot.jpg'} 
                alt="Profile Headshot" 
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = '/surya_headshot.jpg'; }}
              />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Executive Profile Photo Manager</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Upload a new photo or remove/reset to default anytime. Changes save live instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{uploading ? 'Processing...' : 'Upload Photo'}</span>
            </button>

            <button
              type="button"
              disabled={uploading}
              onClick={handleRemovePhoto}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950/80 hover:border-rose-700 text-slate-200 hover:text-rose-200 border border-slate-700 font-bold text-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 text-slate-400 hover:text-rose-400" />
              <span>Remove Photo</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Executive Hero Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Executive Identity & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg shadow-cyan-950/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-slate-200 tracking-wide">
                Available for Enterprise Product Management Roles
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            {/* Name & Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.1]">
                SURYA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">PRASHANTH</span>
              </h1>
              <p className="mt-3 text-lg sm:text-2xl font-semibold text-cyan-300/90 tracking-wide">
                Enterprise Product Manager
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
                <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md">ERP</span>
                <span className="text-cyan-500">•</span>
                <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md">Manufacturing</span>
                <span className="text-cyan-500">•</span>
                <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md">Supply Chain</span>
                <span className="text-cyan-500">•</span>
                <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md">Warehouse Management</span>
                <span className="text-cyan-500">•</span>
                <span className="px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-md text-cyan-300">AI Product Strategy</span>
              </div>
            </div>

            {/* Hero Summary */}
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>I build products that remove unnecessary effort from complex business operations.</p>
              <p>For over 16 years, I've worked across ERP, Manufacturing, Warehouse Management, Supply Chain, and Logistics, partnering with customers, engineering teams, and business stakeholders to deliver products that solve real operational challenges.</p>
              <p>My experience spans product strategy, customer discovery, roadmap planning, stakeholder management, and end-to-end product delivery, with a growing focus on applying AI to make enterprise software more intuitive, efficient, and effective.</p>
            </div>

            {/* CTA Buttons + Quick Photo Upload Button */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              
              {/* View Portfolio Button */}
              <button
                onClick={() => onNavigate('portfolio')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Briefcase className="w-4 h-4" />
                <span>View Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Download Resume Button */}
              <button
                onClick={() => onNavigate('resume')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm transition-all shadow-md"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              {/* Upload / Change Profile Photo Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/80 hover:border-cyan-500 font-bold text-sm transition-all shadow-lg shadow-cyan-950/40"
                title="Upload or change your profile picture"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Upload Profile Photo</span>
              </button>

              {/* Let's Connect Button */}
              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm transition-all shadow-md"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Let's Connect</span>
              </button>

            </div>

          </div>

          {/* Right Column: Interactive Profile Picture Card with Upload/Remove Controls */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Outer Decorative Gradient Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none" />

              <div className="relative bg-slate-900/90 border border-slate-800/90 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
                
                {/* Image Frame */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
                  {!imgError ? (
                    <img 
                      src={profile.photoUrl || PRIMARY_PROFILE_IMAGE} 
                      alt="Surya Prashanth – Product Manager"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    /* Intentional Professional Placeholder (No fake AI faces) */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-slate-950 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                        <User className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-100">Profile Photo</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                          Replace with Surya's professional photograph
                        </p>
                      </div>
                      <p className="text-[10px] text-cyan-400/80 font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        /public/images/profile/surya-profile.jpg
                      </p>
                    </div>
                  )}

                  {/* Dark Gradient Bottom Tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Executive Badge */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/80 text-[11px] font-bold text-cyan-300 flex items-center gap-1.5 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verified Executive</span>
                  </div>
                </div>

                {/* Status Message Notification */}
                {statusMsg && (
                  <div className="p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-800 text-cyan-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{statusMsg}</span>
                  </div>
                )}

                {/* Profile Picture Action Toolbar */}
                <div className="space-y-2">
                  <p className="text-[11px] font-medium text-slate-400 text-center">
                    Manage Executive Headshot
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    
                    {/* Upload Photo Button */}
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                      title="Upload a new profile picture from your device"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Updating...' : 'Upload Photo'}</span>
                    </button>

                    {/* Remove Photo Button */}
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={handleRemovePhoto}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-rose-950/80 hover:border-rose-700 text-slate-300 hover:text-rose-200 border border-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                      title="Remove custom photo and reset to default headshot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>

                  </div>

                  {/* Hidden File Input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Statistics - 4 Cards */}
        <div className="mt-16 pt-10 border-t border-slate-800/80">
          <h2 className="sr-only">Key Statistics & Profile Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all text-left flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  16+ Years Experience
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Building enterprise software across ERP, Manufacturing, Warehouse Management, Supply Chain and Logistics.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all text-left flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  Customer-Centric Product Leadership
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Transforming customer challenges into scalable product strategies and practical software solutions.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all text-left flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  Enterprise Platform Expertise
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Delivering cloud-based enterprise SaaS products that remove unnecessary effort from complex business operations.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all text-left flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  AI-Enabled Product Innovation
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Applying AI to enhance enterprise workflows, product development, and customer experiences.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Featured Expertise Section */}
        <div className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Featured Expertise
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Proven product leadership capabilities across complex enterprise operational domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Product Strategy */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 text-left group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                Product Strategy
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Defining product vision, prioritizing roadmaps, and aligning business goals with customer needs.
              </p>
            </div>

            {/* Customer Discovery */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 text-left group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                Customer Discovery
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Understanding customer problems through research, feedback, and continuous collaboration.
              </p>
            </div>

            {/* Enterprise Software */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 text-left group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                Enterprise Software
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Deep expertise across ERP, Manufacturing, Warehouse Management, Supply Chain, and Logistics.
              </p>
            </div>

            {/* AI Product Innovation */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 text-left group">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                AI Product Innovation
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Exploring practical AI applications that improve enterprise software and product development.
              </p>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => onNavigate('about')}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 text-xs font-medium transition-colors group"
          >
            <span>Explore Professional Journey</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
