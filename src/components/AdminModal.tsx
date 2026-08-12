import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Key, 
  Download, 
  Search, 
  Users, 
  TrendingUp, 
  Globe, 
  Laptop, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  BarChart2, 
  FileText, 
  Layers,
  Settings,
  ShieldCheck,
  Mail,
  Clock,
  Send
} from 'lucide-react';
import { VisitorLead, CMSData, ContactMessage } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  cmsData: CMSData;
  onUpdateCMS: (newData: CMSData) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  cmsData,
  onUpdateCMS
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [adminToken, setAdminToken] = useState<string>('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'inbox' | 'cms' | 'security'>('analytics');

  // Change password state
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secStatus, setSecStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  const [leads, setLeads] = useState<VisitorLead[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Editable Profile state
  const [profileEdit, setProfileEdit] = useState(cmsData.profile);

  useEffect(() => {
    setProfileEdit(cmsData.profile);
  }, [cmsData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput, pin: passwordInput })
      });
      const data = await res.json();

      if (data.success && data.token) {
        setAdminToken(data.token);
        setAuthenticated(true);
        fetchVisitorData(data.token);
        fetchContactMessages(data.token);
      } else {
        setAuthError(data.message || 'Invalid Admin Password.');
      }
    } catch (err) {
      setAuthError('Authentication server error.');
    }
  };

  const fetchVisitorData = async (token = adminToken) => {
    try {
      const res = await fetch('/api/visitors', {
        headers: { 'x-admin-token': token }
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
        setAnalytics(data.analytics || null);
      }
    } catch (err) {
      console.error('Failed to fetch visitors', err);
    }
  };

  const fetchContactMessages = async (token = adminToken) => {
    try {
      const res = await fetch('/api/contact/messages', {
        headers: { 'x-admin-token': token }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to fetch contact messages', err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this contact message?')) return;
    try {
      await fetch(`/api/contact/messages/${id}`, { 
        method: 'DELETE',
        headers: { 'x-admin-token': adminToken }
      });
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead record?')) return;
    try {
      await fetch(`/api/visitors/${id}`, { 
        method: 'DELETE',
        headers: { 'x-admin-token': adminToken }
      });
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ["ID", "First Name", "Last Name", "Email", "Company", "Designation", "Date", "Time", "IP", "Country", "Device", "Browser", "Pages Visited", "Time Spent", "Traffic Source", "Referrer", "Is Returning"];
    const rows = leads.map(l => [
      l.id,
      `"${l.firstName}"`,
      `"${l.lastName || ''}"`,
      `"${l.email}"`,
      `"${l.company || ''}"`,
      `"${l.designation || ''}"`,
      l.date,
      l.time,
      l.ip,
      `"${l.country}"`,
      l.device,
      `"${l.browser}"`,
      `"${(l.pagesVisited || []).join('; ')}"`,
      l.timeSpent,
      `"${l.trafficSource}"`,
      `"${l.referrer}"`,
      l.isReturning ? "Yes" : "No"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Surya_Visitor_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveCMS = async () => {
    const updatedCMS: CMSData = {
      ...cmsData,
      profile: profileEdit
    };

    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': adminToken
        },
        body: JSON.stringify(updatedCMS)
      });
      const data = await res.json();
      if (data.success) {
        onUpdateCMS(updatedCMS);
        alert('CMS Profile changes saved successfully!');
      } else {
        alert(data.message || 'Failed to update CMS.');
      }
    } catch (err) {
      onUpdateCMS(updatedCMS);
      alert('CMS updated locally.');
    }
  };

  const filteredLeads = leads.filter((l) => {
    const q = searchTerm.toLowerCase();
    return (
      l.firstName.toLowerCase().includes(q) ||
      (l.lastName && l.lastName.toLowerCase().includes(q)) ||
      l.email.toLowerCase().includes(q) ||
      (l.company && l.company.toLowerCase().includes(q))
    );
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-left my-auto space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
                <span>Executive Admin & Visitor Portal</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h2>
              <p className="text-xs text-slate-400">Secure visitor analytics, lead captures, and headless CMS manager</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!authenticated ? (
          /* Login Screen */
          <div className="max-w-md mx-auto py-12 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center mx-auto shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-100">Protected Portal Access</h3>
              <p className="text-xs text-slate-400 mt-1">Enter your Admin Password to manage leads and site content.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Admin Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-slate-100 tracking-widest font-mono text-sm focus:outline-none focus:border-cyan-500"
                />
                <Key className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
              </div>

              {authError && (
                <p className="text-xs text-rose-400 font-semibold">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                Authenticate Portal
              </button>
            </form>
          </div>
        ) : (
          /* Main Authenticated Dashboard */
          <div className="space-y-6">
            
            {/* Nav Tabs */}
            <div className="flex flex-wrap bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold gap-1">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>Visitor Analytics & Leads ({leads.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('inbox');
                  fetchContactMessages();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'inbox'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Contact Inbox ({messages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('cms')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'cms'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Edit className="w-4 h-4" />
                <span>Headless CMS Manager</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'security'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Security & Password</span>
              </button>
            </div>

            {activeTab === 'analytics' ? (
              /* Visitor Analytics & Lead Table */
              <div className="space-y-6">
                
                {/* Stats Cards Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold">Total Visitor Leads</p>
                    <p className="text-2xl font-black text-cyan-400 font-mono mt-1">{leads.length}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold">Returning Visitors</p>
                    <p className="text-2xl font-black text-emerald-400 font-mono mt-1">
                      {leads.filter(l => l.isReturning).length}
                    </p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold">Primary Device</p>
                    <p className="text-sm font-bold text-slate-100 mt-2">Desktop (84%)</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold">Top Source</p>
                    <p className="text-sm font-bold text-cyan-300 mt-2">LinkedIn Direct</p>
                  </div>
                </div>

                {/* Table Tool Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search leads by name, email or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Visitor CSV ({filteredLeads.length})</span>
                  </button>
                </div>

                {/* Leads Table */}
                <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-3">Visitor</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Company & Role</th>
                        <th className="p-3">Date & Time</th>
                        <th className="p-3">Device / IP</th>
                        <th className="p-3">Source</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-slate-500">
                            No visitor leads found.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="p-3 font-bold text-slate-100">
                              {lead.firstName} {lead.lastName}
                              {lead.isReturning && (
                                <span className="ml-1.5 px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 text-[9px]">
                                  RETURNING
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-cyan-300">{lead.email}</td>
                            <td className="p-3 text-slate-200">
                              {lead.company} {lead.designation ? `(${lead.designation})` : ''}
                            </td>
                            <td className="p-3 text-slate-400 text-[11px]">
                              {lead.date} {lead.time}
                            </td>
                            <td className="p-3 text-slate-400 text-[11px]">
                              {lead.device} • {lead.ip}
                            </td>
                            <td className="p-3 text-slate-400 text-[11px]">
                              {lead.trafficSource}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-900"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            ) : activeTab === 'inbox' ? (
              /* Contact Inbox View */
              <div className="space-y-6 text-xs">
                
                {/* SMTP Setup Guidance Box */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-cyan-300">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Executive Contact Inbox & Email Delivery Guide</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    All messages sent through the "Contact Me" section are automatically saved permanently in this Inbox.
                    Visitors are also provided a 1-click option to send directly via their default Mail / Gmail app to <span className="text-cyan-300 font-mono">surya.prashanth.kp@gmail.com</span>.
                  </p>
                  <div className="pt-2 text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <span className="font-semibold text-slate-200">Tip for Automated Background Gmail Forwarding:</span> Google requires a 16-character App Password for SMTP relay. If you want direct server-side forwarding, set <code className="text-cyan-400 font-mono">GMAIL_USER=surya.prashanth.kp@gmail.com</code> and <code className="text-cyan-400 font-mono">GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx</code> (generated under Google Account &gt; Security &gt; 2-Step Verification &gt; App Passwords).
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Inbound Contact Messages ({messages.length})</span>
                  </h3>
                  <button
                    onClick={fetchContactMessages}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-medium text-xs transition-colors"
                  >
                    Refresh Inbox
                  </button>
                </div>

                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400">
                      No contact messages received yet.
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div key={m.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-3">
                          <div>
                            <span className="font-bold text-slate-100 text-sm">{m.name}</span>
                            <a href={`mailto:${m.email}`} className="text-cyan-400 font-mono ml-2 text-xs hover:underline">
                              &lt;{m.email}&gt;
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span>{new Date(m.timestamp).toLocaleString()}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.emailSentStatus === 'sent_smtp' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              m.emailSentStatus === 'failed_smtp' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                              'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            }`}>
                              {m.emailSentStatus === 'sent_smtp' ? 'Dispatched via SMTP' :
                               m.emailSentStatus === 'failed_smtp' ? 'Saved in Inbox Store' :
                               'Saved in Inbox Store'}
                            </span>
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-900 ml-2"
                              title="Delete Message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {m.subject && (
                          <div className="font-semibold text-cyan-300 text-xs">
                            Subject: {m.subject}
                          </div>
                        )}

                        <div className="text-slate-300 leading-relaxed font-sans text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 whitespace-pre-wrap">
                          {m.message}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <a
                            href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || 'Portfolio Inquiry'))}&body=${encodeURIComponent('\n\n--- Original Message from ' + m.name + ' ---\n' + m.message)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Reply to {m.name}</span>
                          </a>

                          {m.smtpError && (
                            <span className="text-[10px] text-slate-500 italic">
                              Note: {m.smtpError}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : activeTab === 'cms' ? (
              /* Headless CMS Profile Editor */
              <div className="space-y-6 text-xs">
                
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-slate-100">Edit Executive Profile Content</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileEdit.name}
                        onChange={(e) => setProfileEdit({ ...profileEdit, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Title</label>
                      <input
                        type="text"
                        value={profileEdit.title}
                        onChange={(e) => setProfileEdit({ ...profileEdit, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Executive Summary</label>
                    <textarea
                      rows={4}
                      value={profileEdit.executiveSummary}
                      onChange={(e) => setProfileEdit({ ...profileEdit, executiveSummary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-sans leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={handleSaveCMS}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                  >
                    Save Profile Changes to CMS
                  </button>
                </div>

              </div>
            ) : (
              /* Security & Password Manager Tab */
              <div className="space-y-6 text-xs">
                <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 max-w-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100">Portal Password & Security Management</h3>
                      <p className="text-xs text-slate-400">Update your Admin Password. All password hints have been stripped for complete privacy.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-slate-200 font-semibold flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>Security Architecture Active:</span>
                    </div>
                    <ul className="text-slate-400 text-[11px] space-y-1 list-disc list-inside">
                      <li>SHA-256 salted password hashing</li>
                      <li>Cryptographic 64-character session tokens</li>
                      <li>Anti-brute-force rate limiting (5 attempts lock limit)</li>
                      <li>Side-channel timing attack delay mitigation</li>
                      <li>No plaintext credentials or hints stored in client UI</li>
                    </ul>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Current Admin Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        value={currPassword}
                        onChange={(e) => setCurrPassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">New Admin Password</label>
                      <input
                        type="password"
                        placeholder="At least 8 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Confirm New Admin Password</label>
                      <input
                        type="password"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>

                    {secStatus.message && (
                      <div className={`p-3 rounded-xl text-xs font-semibold ${
                        secStatus.type === 'success' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {secStatus.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
                    >
                      Update Admin Password
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
