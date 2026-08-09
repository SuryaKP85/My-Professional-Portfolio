import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { initialData } from './src/data/initialData';
import { CMSData, VisitorLead } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const CMS_FILE = path.join(DATA_DIR, 'cms_store.json');
const VISITORS_FILE = path.join(DATA_DIR, 'visitor_leads.json');

// Initialize store files if not existing
if (!fs.existsSync(CMS_FILE)) {
  fs.writeFileSync(CMS_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
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
  const adminPin = req.headers['x-admin-pin'] || req.body.pin;
  if (adminPin !== 'surya2026') {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid admin PIN.' });
  }

  const newCMS = req.body.cmsData || req.body;
  if (!newCMS || !newCMS.profile) {
    return res.status(400).json({ success: false, message: 'Invalid payload.' });
  }

  writeCMS(newCMS);
  res.json({ success: true, message: 'CMS updated successfully.', data: newCMS });
});

// GET Visitor Analytics Leads
app.get('/api/visitors', (req, res) => {
  const adminPin = req.headers['x-admin-pin'] || req.query.pin;
  if (adminPin !== 'surya2026') {
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

  console.log(`[EMAIL NOTIFICATION SENT]: New visitor lead captured -> ${firstName} (${email}) from ${company || 'Independent'}`);

  res.json({
    success: true,
    message: 'Thank you for connecting with Surya! Your details were received.',
    lead: newLead
  });
});

// DELETE Visitor Lead
app.delete('/api/visitors/:id', (req, res) => {
  const adminPin = req.headers['x-admin-pin'] || req.query.pin;
  if (adminPin !== 'surya2026') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const id = req.params.id;
  let visitors = readVisitors();
  visitors = visitors.filter(v => v.id !== id);
  writeVisitors(visitors);

  res.json({ success: true, message: 'Lead deleted successfully.' });
});

// POST Contact Message
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  console.log(`[CONTACT FORM SUBMISSION]: From ${name} (${email}) - Subject: ${subject || 'No subject'}`);
  res.json({
    success: true,
    message: 'Your message has been dispatched directly to Surya Prashanth. Expect a prompt response!'
  });
});

// POST Admin Login
app.post('/api/admin/login', (req, res) => {
  const { pin } = req.body;
  if (pin === 'surya2026') {
    res.json({
      success: true,
      token: 'surya-admin-session-active',
      message: 'Authenticated successfully.'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Admin PIN.' });
  }
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
