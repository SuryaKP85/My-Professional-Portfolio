import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createResumePDF() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard clean sans-serif font (Helvetica / HelveticaBold matches Calibri/Arial in standard PDF viewers)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Page 1 setup (Letter size: 612 x 792 points)
  let page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();
  const margin = 45;
  let y = height - margin;

  const primaryColor = rgb(0.12, 0.12, 0.12); // Clean dark charcoal text
  const headingColor = rgb(0, 0, 0);          // Pure black headings

  function drawSectionHeading(text) {
    page.drawText(text.toUpperCase(), {
      x: margin,
      y: y,
      size: 12,
      font: fontBold,
      color: headingColor,
    });
    y -= 15;
  }

  function drawWrappedText(text, fontSize = 10.5, font = fontRegular, color = primaryColor, xPos = margin, maxW = width - margin * 2) {
    const words = text.split(' ');
    let line = '';
    const lineSpacing = fontSize + 4; // 14.5pt line spacing for 10.5pt font

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? ' ' : '') + words[i];
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > maxW && line !== '') {
        page.drawText(line, { x: xPos, y, size: fontSize, font, color });
        y -= lineSpacing;
        line = words[i];
      } else {
        line = testLine;
      }
    }

    if (line) {
      page.drawText(line, { x: xPos, y, size: fontSize, font, color });
      y -= lineSpacing;
    }
  }

  // --- HEADER ---
  const nameText = "SURYA PRASANTH";
  const nameWidth = fontBold.widthOfTextAtSize(nameText, 20);
  page.drawText(nameText, {
    x: (width - nameWidth) / 2,
    y: y,
    size: 20,
    font: fontBold,
    color: headingColor,
  });
  y -= 18;

  const titleText = "Product Manager | ERP | Supply Chain | WMS | AI-Powered";
  const titleWidth = fontBold.widthOfTextAtSize(titleText, 10.5);
  page.drawText(titleText, {
    x: (width - titleWidth) / 2,
    y: y,
    size: 10.5,
    font: fontBold,
    color: primaryColor,
  });
  y -= 14;

  const contactText1 = "+91 9632588005 | surya.prashanth.kp@hotmail.com";
  const contact1Width = fontRegular.widthOfTextAtSize(contactText1, 9.5);
  page.drawText(contactText1, {
    x: (width - contact1Width) / 2,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 13;

  const contactText2 = "LinkedIn: linkedin.com/in/suryaprashanth";
  const contact2Width = fontRegular.widthOfTextAtSize(contactText2, 9.5);
  page.drawText(contactText2, {
    x: (width - contact2Width) / 2,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 13;

  const contactText3 = "GitHub: github.com/SuryaKP85";
  const contact3Width = fontRegular.widthOfTextAtSize(contactText3, 9.5);
  page.drawText(contactText3, {
    x: (width - contact3Width) / 2,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 13;

  const contactText4 = "Website: www.suryaprashanth.in";
  const contact4Width = fontRegular.widthOfTextAtSize(contactText4, 9.5);
  page.drawText(contactText4, {
    x: (width - contact4Width) / 2,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 16;

  // --- PROFESSIONAL SUMMARY ---
  drawSectionHeading("Professional Summary");
  drawWrappedText(
    "An accomplished Product Management Professional with a proven track record in Product Strategy, User Research, Stakeholder Management & GTM. I bring forth a wealth of experience in steering triumphant product endeavors from inception to fruition with an overall 16yrs experience in SCM, WMS, Customer Centric Solutions and Distribution domains.",
    10.5,
    fontRegular
  );
  y -= 10;

  // --- CORE SKILLS ---
  drawSectionHeading("Core Skills");
  drawWrappedText(
    "Product Strategy, Road mapping, GTM Strategy, Agile/Scrum, OKRs/KPIs, Stakeholder Management, Manufacturing ERP, BOM, Costing, SCM, WMS, TMS, Trade Compliance, REST APIs, Microservices, EDI, AI Product Development, Figma, AI Wireframing, Vibe Coding.",
    10.5,
    fontRegular
  );
  y -= 10;

  // --- TOOLS ---
  drawSectionHeading("Tools");
  drawWrappedText(
    "Jira, Confluence, Figma, SQL, Swagger, Postman, GitHub, CI/CD, Cursor AI, Claude, ChatGPT, Gemini, Perplexity, NotebookLM.",
    10.5,
    fontRegular
  );
  y -= 10;

  // --- PROFESSIONAL EXPERIENCE (PAGE 1) ---
  drawSectionHeading("Professional Experience");

  const page1Experiences = [
    {
      companyRole: "Product Manager | iRely Soft Services Ltd | 2026 – Present",
      bullets: [
        "Lead Manufacturing ERP initiatives across CTRM, Agriculture, and Petroleum products.",
        "Manage a cross-functional team of 14 across Dev, QA, and BA functions.",
        "Translate business requirements into epics/user stories; own end-to-end delivery, risk management, and stakeholder communication.",
        "Defined AI-assisted engineering standards, cutting development turnaround time by ~50% while improving code quality."
      ]
    },
    {
      companyRole: "Lead Product Owner | Epicor Software Ltd | 2019 – 2025",
      bullets: [
        "Spearheaded redesign of a legacy WMS (Warehouse Management System) into a mobile-first product for Android and iOS.",
        "Contributed to EVA, an AI-powered engagement product, driving a ~15% increase in customer interaction.",
        "Led enterprise API integration initiatives across platforms.",
        "Managed and mentored a team of Product Owners on backlog grooming and stakeholder communication."
      ]
    }
  ];

  for (const exp of page1Experiences) {
    page.drawText(exp.companyRole, {
      x: margin,
      y: y,
      size: 11,
      font: fontBold,
      color: headingColor,
    });
    y -= 14;

    for (const bullet of exp.bullets) {
      page.drawText("• ", { x: margin + 6, y, size: 10.5, font: fontBold, color: primaryColor });
      drawWrappedText(bullet, 10.5, fontRegular, primaryColor, margin + 18, width - (margin + 18) - margin);
    }
    y -= 6;
  }

  // ================= PAGE 2 =================
  page = pdfDoc.addPage([612, 792]);
  y = height - margin;

  // Header on Page 2
  page.drawText("SURYA PRASANTH — Executive Resume (Page 2)", {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: headingColor,
  });
  y -= 6;
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });
  y -= 18;

  drawSectionHeading("Professional Experience (Continued)");

  const page2Experiences = [
    {
      companyRole: "Product Owner | Amber Road Software Pvt Ltd (WiseTech Global) | 2015 – 2019",
      bullets: [
        "Owned end-to-end product lifecycle (discovery, requirements, prototyping, delivery) for SCM and Trade Compliance products.",
        "Served as SME for SCM solutions; conducted market research and client demos to validate product-market fit.",
        "Authored epics and user stories to guide development priorities.",
        "Led EDI integration and GAP analysis."
      ]
    },
    {
      companyRole: "Client Manager | GTNexus Software Ltd (Infor) | 2010 – 2015",
      bullets: [
        "Liaised between enterprise customers and internal teams on technical/functional design specs for Apparel and 3PL portfolios.",
        "Led EDI integration delivery for Ocean and Air Transportation messaging.",
        "Applied Six Sigma methods to reduce manual intervention in EDI failures by ~80%.",
        "Built and led a support team improving post-implementation customer experience."
      ]
    },
    {
      companyRole: "Tech Support Engineer | HP Global Soft (P) Ltd | 2007 – 2010",
      bullets: [
        "Managing resolution of client issues for USA, Canada, Australia and New Zealand and APAC Regions",
        "Providing assistance for RAID 0, RAID 1 issues",
        "Expedite client issues with usage of tools such as Intel RAID Matrix and AMD RAID Xpert"
      ]
    }
  ];

  for (const exp of page2Experiences) {
    page.drawText(exp.companyRole, {
      x: margin,
      y: y,
      size: 11,
      font: fontBold,
      color: headingColor,
    });
    y -= 14;

    for (const bullet of exp.bullets) {
      page.drawText("• ", { x: margin + 6, y, size: 10.5, font: fontBold, color: primaryColor });
      drawWrappedText(bullet, 10.5, fontRegular, primaryColor, margin + 18, width - (margin + 18) - margin);
    }
    y -= 8;
  }

  // --- KEY PROJECTS ---
  drawSectionHeading("Key Projects");
  drawWrappedText(
    "ERP Modernization | AI Engineering Productivity Initiative | Enterprise API Integration Program | WMS Mobile Modernization | Field Service Management | AI Assistances | Supplier Integration",
    10.5,
    fontRegular
  );
  y -= 10;

  // --- CERTIFICATIONS ---
  drawSectionHeading("Certifications");
  drawWrappedText(
    "CSPO | Six Sigma Black Belt (CSSBB) | Microsoft Certified Professional (MCP) | SAP R/3 SD 4.7",
    10.5,
    fontRegular
  );
  y -= 10;

  // --- EDUCATION ---
  drawSectionHeading("Education");
  drawWrappedText("MBA, Visvesvaraya Technological University", 10.5, fontRegular);
  drawWrappedText("BBA, Annamalai University", 10.5, fontRegular);

  // Save PDF
  const pdfBytes = await pdfDoc.save();

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pdfNames = [
    'KPSurya_Product Manager.pdf',
    'KPSurya_Product_Manager.pdf',
    'Surya_Prashanth_Executive_Resume.pdf',
    'resume.pdf'
  ];

  for (const pdfName of pdfNames) {
    fs.writeFileSync(path.join(publicDir, pdfName), pdfBytes);
  }
  console.log(`Successfully generated PDF resume at: ${path.join(publicDir, 'KPSurya_Product Manager.pdf')}`);

  const distDir = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    for (const pdfName of pdfNames) {
      fs.writeFileSync(path.join(distDir, pdfName), pdfBytes);
    }
  }
}

createResumePDF().catch(console.error);
