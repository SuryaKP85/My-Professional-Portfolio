import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { initialData } from './src/data/initialData';
import { CMSData, VisitorLead, ContactMessage } from './src/types';

const app = express();
const PORT = 3000;

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const CMS_FILE = path.join(DATA_DIR, 'cms_store.json');
const VISITORS_FILE = path.join(DATA_DIR, 'visitor_leads.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'contact_messages.json');
const ADMIN_CONFIG_FILE = path.join(DATA_DIR, 'admin_config.json');

// --- SECURE ADMIN PASSWORD & SESSION ENGINE ---
function hashPassword(pwd: string): string {
  return crypto.createHash('sha256').update(pwd + '_surya_secure_salt_2026').digest('hex');
}

const DEFAULT_ADMIN_PASSWORD = 'Burno@2026!';

// Always ensure initial config or reset to requested password
const initialConfig = {
  passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
  updatedAt: new Date().toISOString()
};
fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(initialConfig, null, 2), 'utf-8');

function getAdminPasswordHash(): string {
  try {
    const raw = fs.readFileSync(ADMIN_CONFIG_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed.passwordHash || hashPassword(DEFAULT_ADMIN_PASSWORD);
  } catch (err) {
    return hashPassword(DEFAULT_ADMIN_PASSWORD);
  }
}

function setAdminPassword(newPassword: string): void {
  const newConfig = {
    passwordHash: hashPassword(newPassword),
    updatedAt: new Date().toISOString()
  };
  fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(newConfig, null, 2), 'utf-8');
}

// Active Admin Session Tokens Store
const activeSessions = new Map<string, { createdAt: number; ip: string }>();

// Anti-Brute-Force Rate Limiter
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remainingSecs: number } {
  const attempt = failedAttempts.get(ip);
  if (!attempt) return { allowed: true, remainingSecs: 0 };
  if (attempt.lockedUntil > Date.now()) {
    return { allowed: false, remainingSecs: Math.ceil((attempt.lockedUntil - Date.now()) / 1000) };
  }
  return { allowed: true, remainingSecs: 0 };
}

function recordFailedAttempt(ip: string) {
  const attempt = failedAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  attempt.count += 1;
  if (attempt.count >= 5) {
    attempt.lockedUntil = Date.now() + 15 * 60 * 1000; // 15-minute lock
  }
  failedAttempts.set(ip, attempt);
}

function clearFailedAttempts(ip: string) {
  failedAttempts.delete(ip);
}

function verifyAdminAuth(req: express.Request): boolean {
  const token = (req.headers['x-admin-token'] || req.headers['x-admin-pin'] || req.query.token || req.query.pin) as string;
  if (!token || typeof token !== 'string') return false;

  // 1. Check active session token
  if (activeSessions.has(token)) {
    const session = activeSessions.get(token)!;
    if (Date.now() - session.createdAt < 12 * 60 * 60 * 1000) {
      return true;
    } else {
      activeSessions.delete(token);
    }
  }

  // 2. Check if provided token equals current hashed password
  const currentHash = getAdminPasswordHash();
  if (hashPassword(token) === currentHash) {
    return true;
  }

  return false;
}

// Initialize store files if not existing
if (!fs.existsSync(CMS_FILE)) {
  fs.writeFileSync(CMS_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
}

if (!fs.existsSync(MESSAGES_FILE)) {
  const seedMessages: ContactMessage[] = [
    {
      id: "msg-welcome-1",
      name: "Executive Inquiry System",
      email: "surya.prashanth.kp@gmail.com",
      subject: "Welcome to your Executive Contact Inbox",
      message: "This system stores all incoming contact inquiries and test emails submitted through your portfolio site. Any email sent via the Contact Form is permanently logged here in your Admin Dashboard and dispatched via Nodemailer SMTP if configured.",
      timestamp: new Date().toISOString(),
      emailSentStatus: "stored_only"
    }
  ];
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(seedMessages, null, 2), 'utf-8');
}

if (!fs.existsSync(VISITORS_FILE)) {
  const seedLeads: VisitorLead[] = [
    {
      id: "lead-1",
      firstName: "Michael",
      lastName: "Chen",
      email: "m.chen@enterprise-tech.com",
      company: "Enterprise Tech Partners",
      designation: "VP of Talent & Executive Recruiting",
      date: "2026-08-02",
      time: "14:32:05",
      ip: "198.51.100.42",
      country: "United States",
      device: "Desktop",
      browser: "Chrome 128",
      pagesVisited: ["/home", "/career-journey", "/product-portfolio"],
      timeSpent: "3m 45s",
      trafficSource: "LinkedIn",
      referrer: "https://www.linkedin.com/in/suryaprashanth",
      isReturning: false
    },
    {
      id: "lead-2",
      firstName: "Sarah",
      lastName: "Jenkins",
      email: "sjenkins@global-supply.org",
      company: "Global Supply Chain Group",
      designation: "Chief Operating Officer",
      date: "2026-08-01",
      time: "09:15:22",
      ip: "203.0.113.88",
      country: "United Kingdom",
      device: "Desktop",
      browser: "Safari 18",
      pagesVisited: ["/home", "/about", "/skills", "/contact"],
      timeSpent: "5m 12s",
      trafficSource: "Direct",
      referrer: "Direct Bookmark",
      isReturning: true
    }
  ];
  fs.writeFileSync(VISITORS_FILE, JSON.stringify(seedLeads, null, 2), 'utf-8');
}

// Helper to read/write JSON
function readCMS(): CMSData {
  try {
    const raw = fs.readFileSync(CMS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return initialData;
  }
}

function writeCMS(data: CMSData) {
  fs.writeFileSync(CMS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function readVisitors(): VisitorLead[] {
  try {
    const raw = fs.readFileSync(VISITORS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function writeVisitors(data: VisitorLead[]) {
  fs.writeFileSync(VISITORS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function readMessages(): ContactMessage[] {
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function writeMessages(data: ContactMessage[]) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Mail Transporter setup
function formatSmtpError(err: any): string {
  const raw = err?.message || String(err);
  if (raw.includes('534-5.7.9') || raw.includes('Application-specific password required') || raw.includes('534')) {
    return 'Gmail authentication rejected: Google requires a 16-character App Password when 2FA is active (Google Account Settings > Security > App Passwords). Standard account passwords are not allowed for SMTP.';
  }
  if (raw.includes('Invalid login') || raw.includes('535') || raw.includes('BadCredentials')) {
    return 'SMTP authentication failed: Invalid username or password/App Password.';
  }
  return raw;
}

function getMailTransporter() {
  const host = process.env.SMTP_HOST || (process.env.GMAIL_USER ? 'smtp.gmail.com' : null);
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
  }
  return null;
}

// Gemini AI Client setup
let genAI: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      genAI = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
  }
  return genAI;
}

// ---------------- API ROUTES ----------------

// GET CMS Data
app.get('/api/cms', (req, res) => {
  const data = readCMS();
  res.json({ success: true, data });
});

// POST CMS Data
app.post('/api/cms', (req, res) => {
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid or expired admin credentials.' });
  }

  const newCMS = req.body.cmsData || req.body;
  if (!newCMS || !newCMS.profile) {
    return res.status(400).json({ success: false, message: 'Invalid payload.' });
  }

  writeCMS(newCMS);
  res.json({ success: true, message: 'CMS updated successfully.', data: newCMS });
});

// POST Update Profile Photo
app.post('/api/profile/photo', (req, res) => {
  const { photoUrl } = req.body;
  if (photoUrl === undefined) {
    return res.status(400).json({ success: false, message: 'photoUrl is required.' });
  }

  const cms = readCMS();
  cms.profile.photoUrl = photoUrl || '/surya_headshot.jpg';
  writeCMS(cms);

  res.json({
    success: true,
    message: photoUrl ? 'Profile picture updated successfully.' : 'Profile picture reset to default.',
    photoUrl: cms.profile.photoUrl,
    cmsData: cms
  });
});

// GET Visitor Analytics Leads
app.get('/api/visitors', (req, res) => {
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const visitors = readVisitors();
  
  // Aggregated stats
  const totalLeads = visitors.length;
  const returningCount = visitors.filter(v => v.isReturning).length;
  const deviceCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};
  const sourceCounts: Record<string, number> = {};

  visitors.forEach(v => {
    deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1;
    countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
    sourceCounts[v.trafficSource] = (sourceCounts[v.trafficSource] || 0) + 1;
  });

  res.json({
    success: true,
    leads: visitors,
    analytics: {
      totalLeads,
      returningCount,
      deviceCounts,
      countryCounts,
      sourceCounts
    }
  });
});

// POST Visitor Lead Capture
app.post('/api/visitors', (req, res) => {
  const { firstName, lastName, email, company, designation, pagesVisited, timeSpent, trafficSource } = req.body;

  if (!firstName || !email) {
    return res.status(400).json({ success: false, message: 'First name and email are required.' });
  }

  const visitors = readVisitors();
  const now = new Date();
  
  // Extract client details
  const userAgent = req.headers['user-agent'] || 'Unknown Browser';
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '127.0.0.1';
  
  let device = 'Desktop';
  if (/mobile/i.test(userAgent)) device = 'Mobile';
  else if (/ipad|tablet/i.test(userAgent)) device = 'Tablet';

  let browser = 'Chrome';
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
  else if (/firefox/i.test(userAgent)) browser = 'Firefox';
  else if (/edg/i.test(userAgent)) browser = 'Edge';

  const isReturning = visitors.some(v => v.email.toLowerCase() === email.toLowerCase());

  const newLead: VisitorLead = {
    id: 'lead-' + Date.now(),
    firstName,
    lastName: lastName || '',
    email,
    company: company || 'Not specified',
    designation: designation || 'Not specified',
    date: now.toISOString().split('T')[0],
    time: now.toTimeString().split(' ')[0],
    ip,
    country: 'United States', // In real prod, derived via IP geo
    device,
    browser,
    pagesVisited: pagesVisited || ['/home'],
    timeSpent: timeSpent || '45s',
    trafficSource: trafficSource || 'Direct',
    referrer: req.headers.referer || 'Direct',
    isReturning
  };

  visitors.unshift(newLead);
  writeVisitors(visitors);

  // Auto-forward captured lead entry to surya.prashanth.kp@hotmail.com and surya.prashanth.kp@gmail.com
  const forwardTargets = ['surya.prashanth.kp@hotmail.com', 'surya.prashanth.kp@gmail.com'];
  
  // 1. Forward via SMTP if configured
  const transporter = getMailTransporter();
  if (transporter) {
    transporter.sendMail({
      from: process.env.SMTP_FROM || `"Portfolio Visitor Lead" <${email}>`,
      to: forwardTargets.join(','),
      subject: `[Visitor Lead Captured] ${firstName} ${lastName || ''} (${company || 'Independent'})`,
      text: `New Visitor Lead Captured:\n\nName: ${firstName} ${lastName || ''}\nEmail: ${email}\nCompany: ${company || 'Not specified'}\nDesignation: ${designation || 'Not specified'}\nTime: ${now.toLocaleString()}\nTraffic Source: ${trafficSource || 'Direct'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0f172a; background: #f8fafc; border-radius: 8px;">
          <h2 style="color: #0891b2;">New Visitor Lead Capture</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || 'Not specified'}</p>
          <p><strong>Designation:</strong> ${designation || 'Not specified'}</p>
          <p><strong>Captured At:</strong> ${now.toLocaleString()}</p>
          <p><strong>Traffic Source:</strong> ${trafficSource || 'Direct'}</p>
        </div>
      `
    }).catch(err => console.warn('[SMTP VISITOR FORWARD NOTICE]:', err.message));
  }

  // 2. Forward via FormSubmit.co HTTP relay to Hotmail
  fetch('https://formsubmit.co/ajax/surya.prashanth.kp@hotmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      _subject: `[Visitor Portal Lead] ${firstName} ${lastName || ''} - ${company || 'Visitor'}`,
      name: `${firstName} ${lastName || ''}`.trim(),
      email: email,
      company: company || 'Not specified',
      designation: designation || 'Not specified',
      time: now.toLocaleString(),
      trafficSource: trafficSource || 'Direct'
    })
  }).catch(err => console.warn('[FORMSUBMIT VISITOR FORWARD NOTICE]:', err.message));

  console.log(`[EMAIL FORWARD SENT]: New visitor lead captured and forwarded to surya.prashanth.kp@hotmail.com -> ${firstName} (${email})`);

  res.json({
    success: true,
    message: 'Thank you for connecting with Surya! Your details were received.',
    lead: newLead
  });
});

// DELETE Visitor Lead
app.delete('/api/visitors/:id', (req, res) => {
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const id = req.params.id;
  let visitors = readVisitors();
  visitors = visitors.filter(v => v.id !== id);
  writeVisitors(visitors);

  res.json({ success: true, message: 'Lead deleted successfully.' });
});

// GET Contact Messages (Admin)
app.get('/api/contact/messages', (req, res) => {
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const messages = readMessages();
  res.json({
    success: true,
    messages,
    count: messages.length
  });
});

// DELETE Contact Message (Admin)
app.delete('/api/contact/messages/:id', (req, res) => {
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const id = req.params.id;
  let messages = readMessages();
  messages = messages.filter(m => m.id !== id);
  writeMessages(messages);

  res.json({ success: true, message: 'Message deleted successfully.' });
});

// POST Contact Message
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  const now = new Date();
  const msgId = 'msg-' + Date.now();
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '127.0.0.1';

  let emailSentStatus: 'sent_smtp' | 'stored_only' | 'failed_smtp' = 'stored_only';
  let smtpError = '';

  const transporter = getMailTransporter();
  const targetEmail = process.env.SMTP_TO || 'surya.prashanth.kp@hotmail.com, surya.prashanth.kp@gmail.com';

  // Always attempt FormSubmit.co HTTP relay to surya.prashanth.kp@hotmail.com
  fetch('https://formsubmit.co/ajax/surya.prashanth.kp@hotmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      _subject: `[Portfolio Contact] ${subject || 'Executive Message'} from ${name}`,
      name,
      email,
      _replyto: email,
      message
    })
  }).catch(err => console.warn('[FORMSUBMIT CONTACT FORWARD NOTICE]:', err.message));

  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"${name}" <${email}>`,
        to: targetEmail,
        replyTo: email,
        subject: subject ? `[Portfolio Inquiry] ${subject}` : `[Portfolio Inquiry] New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'None'}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #0f172a; background-color: #f8fafc; border-radius: 8px;">
            <h2 style="color: #0891b2; margin-top: 0;">New Portfolio Executive Contact Submission</h2>
            <p style="font-size: 14px;"><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
            <p style="font-size: 14px;"><strong>Subject:</strong> ${subject || 'No subject'}</p>
            <p style="font-size: 14px;"><strong>Received At:</strong> ${now.toLocaleString()}</p>
            <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;" />
            <h3 style="font-size: 16px; color: #334155;">Message Content:</h3>
            <div style="background: #ffffff; padding: 18px; border-left: 4px solid #0891b2; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 15px; line-height: 1.6;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
        `
      });
      emailSentStatus = 'sent_smtp';
      console.log(`[EMAIL DISPATCHED VIA SMTP]: Target=${targetEmail}, Sender=${email}`);
    } catch (err: any) {
      emailSentStatus = 'failed_smtp';
      smtpError = formatSmtpError(err);
      console.warn(`[SMTP NOTICE]: Direct email dispatch returned error: ${smtpError}. Message stored securely in Executive Inbox.`);
    }
  } else {
    console.log(`[CONTACT FORM SUBMISSION]: Logged to Admin Inbox store. (SMTP not active - add SMTP_USER & SMTP_PASS to .env for direct email inbox relay)`);
  }

  const newMsg: ContactMessage = {
    id: msgId,
    name,
    email,
    subject: subject || 'No subject',
    message,
    timestamp: now.toISOString(),
    ip,
    emailSentStatus,
    smtpError: smtpError || undefined
  };

  const messages = readMessages();
  messages.unshift(newMsg);
  writeMessages(messages);

  res.json({
    success: true,
    message: emailSentStatus === 'sent_smtp'
      ? 'Your email was transmitted successfully via SMTP to Surya Prashanth!'
      : emailSentStatus === 'failed_smtp'
      ? `Your message was captured and saved to Surya's Executive Inbox! (Note: ${smtpError})`
      : 'Your message has been delivered to Surya\'s Executive Inbox and logged securely. You can also view it anytime in the Admin Dashboard.',
    emailSentStatus,
    smtpError: smtpError || undefined,
    data: newMsg
  });
});

// POST Test Email Dispatch
app.post('/api/contact/test-email', async (req, res) => {
  const { recipientEmail } = req.body;
  const targetEmail = recipientEmail || process.env.SMTP_TO || 'surya.prashanth.kp@gmail.com';
  const now = new Date();

  console.log(`[TEST EMAIL DISPATCH REQUESTED] to: ${targetEmail}`);

  const transporter = getMailTransporter();

  const testMsg: ContactMessage = {
    id: 'test-msg-' + Date.now(),
    name: 'Portfolio System Tester',
    email: targetEmail,
    subject: 'Executive Portfolio Test Email Check',
    message: `This is a test notification generated at ${now.toLocaleString()} to verify contact form transmission to ${targetEmail}.`,
    timestamp: now.toISOString(),
    emailSentStatus: transporter ? 'stored_only' : 'stored_only'
  };

  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Surya Portfolio" <noreply@suryaprashanth.com>`,
        to: targetEmail,
        subject: `[TEST VERIFICATION] Surya Prashanth Portfolio Email Check`,
        text: `Hello Surya,\n\nThis is a test verification email from your portfolio server executed at ${now.toLocaleString()}.\n\nIf you received this email in your inbox, your SMTP configuration is 100% active and working!`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #0f172a; background-color: #f8fafc; border-radius: 8px;">
            <h2 style="color: #10b981;">SMTP Email Delivery Test Verified</h2>
            <p><strong>Recipient:</strong> ${targetEmail}</p>
            <p><strong>Timestamp:</strong> ${now.toLocaleString()}</p>
            <div style="background: #ffffff; padding: 16px; border-left: 4px solid #10b981; border-radius: 6px; margin-top: 16px;">
              <p style="margin: 0;">This email confirms that your server's outbound email pipeline is configured and active.</p>
            </div>
          </div>
        `
      });
      testMsg.emailSentStatus = 'sent_smtp';
      console.log(`[TEST EMAIL SUCCESS]: Dispatched via SMTP to ${targetEmail}`);
    } catch (err: any) {
      testMsg.emailSentStatus = 'failed_smtp';
      testMsg.smtpError = formatSmtpError(err);
      console.warn(`[TEST EMAIL SMTP NOTICE]: ${testMsg.smtpError}`);
    }
  }

  const messages = readMessages();
  messages.unshift(testMsg);
  writeMessages(messages);

  res.json({
    success: true,
    emailSentStatus: testMsg.emailSentStatus,
    targetEmail,
    message: testMsg.emailSentStatus === 'sent_smtp'
      ? `Test email dispatched via SMTP to ${targetEmail}. Check your inbox!`
      : `Test message saved to Executive Inbox store. (Outbound SMTP requires SMTP_USER and SMTP_PASS environment variables or Gmail App Password).`,
    smtpError: testMsg.smtpError
  });
});

// POST Admin Login
app.post('/api/admin/login', async (req, res) => {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '127.0.0.1';
  const { pin, password } = req.body;
  const pwdInput = password || pin;

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      success: false,
      message: `Too many failed login attempts. Access temporarily locked for ${Math.ceil(rateCheck.remainingSecs / 60)} minute(s).`
    });
  }

  if (!pwdInput) {
    return res.status(400).json({ success: false, message: 'Admin Password is required.' });
  }

  const currentHash = getAdminPasswordHash();
  const inputHash = hashPassword(pwdInput);

  if (inputHash === currentHash) {
    clearFailedAttempts(ip);
    const sessionToken = 'sess_' + crypto.randomBytes(32).toString('hex');
    activeSessions.set(sessionToken, { createdAt: Date.now(), ip });

    return res.json({
      success: true,
      token: sessionToken,
      message: 'Authenticated successfully.'
    });
  } else {
    recordFailedAttempt(ip);
    // Add 400ms delay to mitigate timing side-channel attacks
    await new Promise(r => setTimeout(r, 400));
    return res.status(401).json({ success: false, message: 'Invalid Admin Password.' });
  }
});

// POST Admin Change Password
app.post('/api/admin/change-password', (req, res) => {
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized session.' });
  }

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Current password and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ success: false, message: 'New password must be at least 8 characters long.' });
  }

  const currentHash = getAdminPasswordHash();
  if (hashPassword(currentPassword) !== currentHash) {
    return res.status(401).json({ success: false, message: 'Current password verification failed.' });
  }

  setAdminPassword(newPassword);

  // Invalidate previous session tokens and create new session token
  activeSessions.clear();
  const newToken = 'sess_' + crypto.randomBytes(32).toString('hex');
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '127.0.0.1';
  activeSessions.set(newToken, { createdAt: Date.now(), ip });

  res.json({
    success: true,
    token: newToken,
    message: 'Admin Password updated successfully! Active sessions refreshed.'
  });
});

// POST AI Profile Chatbot
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: 'Message prompt required.' });
  }

  const ai = getGenAI();
  const cms = readCMS();

  // Create detailed background prompt for Gemini AI
  const systemPrompt = `You are Surya Prashanth's AI Executive Assistant on his personal portfolio platform.
Your job is to answer questions from recruiters, executives, C-suite leaders, and partners about Surya Prashanth.

Here is Surya's official profile information:
- Name: ${cms.profile.name}
- Current Title: ${cms.profile.title} (${cms.profile.shortTitle})
- Core Expertise: ${cms.profile.subtitle}
- Experience: ${cms.profile.yearsExperience}+ Years in Enterprise Tech & Product Leadership
- Executive Summary: ${cms.profile.executiveSummary}
- Key Metrics: ${JSON.stringify(cms.profile.stats)}
- Location: ${cms.profile.location}
- Email: ${cms.profile.email}
- LinkedIn: ${cms.profile.linkedIn}
- GitHub: ${cms.profile.github}

Career Philosophy & Mindset:
- Career: "${cms.profile.philosophy.career}"
- Leadership: "${cms.profile.philosophy.leadership}"
- Product Mindset: "${cms.profile.philosophy.productMindset}"
- Problem Solving: "${cms.profile.philosophy.problemSolving}"

Work History Highlights:
${cms.experiences.map(e => `- ${e.company} (${e.period}, ${e.role}): ${e.description} Key Impact: ${e.businessImpact}`).join('\n')}

Key Projects & Products:
${cms.projects.map(p => `- ${p.title} (${p.category}): ${p.summary} Outcomes: ${p.businessOutcome}`).join('\n')}

Core Skill Categories:
${cms.skillCategories.map(c => `- ${c.title}: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

Certifications:
${cms.certifications.map(c => `- ${c.title} by ${c.issuer} (${c.issueDate})`).join('\n')}

Instructions for AI Response:
1. Speak professionally, concisely, and warmly as Surya's AI Executive Representative.
2. Answer questions strictly based on Surya's profile and experience above.
3. If asked why a company should hire Surya, highlight his 16+ years of domain authority in ERP, Manufacturing, Supply Chain, Warehouse Management, and AI product innovation.
4. Keep answers formatted nicely with bullet points where appropriate.
5. Never invent false claims or work experience not listed above.
6. Always encourage recruiters to use the "Contact Me" section or book a call via email (${cms.profile.email}).`;

  if (!ai) {
    // Fallback answer if API key isn't provided
    return res.json({
      success: true,
      text: `Surya Prashanth is an Enterprise Product Manager with 16+ years of experience building software across ERP, Manufacturing, Warehouse Management, Supply Chain, and AI Product Strategy. He builds enterprise software that simplifies complex operations. You can connect with him directly at ${cms.profile.email}.`
    });
  }

  try {
    const formattedContents = [];
    
    // Convert history if provided
    if (Array.isArray(history)) {
      for (const h of history) {
        if (h.text && h.role) {
          formattedContents.push({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.text }]
          });
        }
      }
    }

    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    });

    res.json({
      success: true,
      text: response.text || "Surya is an executive product manager with 20+ years leading ERP, Supply Chain, WMS, and AI solutions."
    });
  } catch (err: any) {
    console.error('Gemini Chat Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI response.',
      text: `Surya Prashanth is a Senior Product Manager & AI Strategist with 20+ years of experience in ERP, Supply Chain, and Autonomous WMS. Reach him directly at ${cms.profile.email}.`
    });
  }
});

// Explicit endpoints for PDF downloading and viewing
app.get('/api/download-resume', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'KPSurya_Product Manager.pdf');
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'KPSurya_Product Manager.pdf');
  } else {
    const fallbackPath = path.join(process.cwd(), 'public', 'Surya_Prashanth_Executive_Resume.pdf');
    if (fs.existsSync(fallbackPath)) {
      res.download(fallbackPath, 'KPSurya_Product Manager.pdf');
    } else {
      res.status(404).send('PDF not found');
    }
  }
});

app.get(['/KPSurya_Product%20Manager.pdf', '/KPSurya_Product_Manager.pdf', '/Surya_Prashanth_Executive_Resume.pdf', '/resume.pdf'], (req, res) => {
  let filePath = path.join(process.cwd(), 'public', 'KPSurya_Product Manager.pdf');
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'public', 'Surya_Prashanth_Executive_Resume.pdf');
  }
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="KPSurya_Product Manager.pdf"');
    res.sendFile(filePath);
  } else {
    res.status(404).send('PDF not found');
  }
});

// Serve public directory static files
app.use(express.static(path.join(process.cwd(), 'public')));

// ---------------- SERVER INITIALIZATION ----------------

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
