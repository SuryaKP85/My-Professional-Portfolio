import { CMSData } from '../types';
import { epicorWmsCaseStudy } from './epicorWmsCaseStudy';
import { supplierIntegrationCaseStudy } from './supplierIntegrationCaseStudy';
import { containerVisibilityCaseStudy } from './containerVisibilityCaseStudy';

export const initialData: CMSData = {
  profile: {
    name: "Surya Prashanth",
    title: "Enterprise Product Manager",
    shortTitle: "Enterprise Product Manager",
    subtitle: "ERP • Manufacturing • Supply Chain • Warehouse Management • AI Product Strategy",
    tagline: "16+ Years Building Products That Remove Unnecessary Effort From Complex Operations",
    executiveSummary: "I build products that remove unnecessary effort from complex business operations.\n\nFor over 16 years, I've worked across ERP, Manufacturing, Warehouse Management, Supply Chain, and Logistics, partnering with customers, engineering teams, and business stakeholders to deliver products that solve real operational challenges.\n\nMy experience spans product strategy, customer discovery, roadmap planning, stakeholder management, and end-to-end product delivery, with a growing focus on applying AI to make enterprise software more intuitive, efficient, and effective.",
    yearsExperience: 16,
    location: "Bangalore, India",
    email: "surya.prashanth.kp@gmail.com",
    linkedIn: "https://linkedin.com/in/suryaprashanth",
    github: "https://github.com/suryaprashanth",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    stats: {
      years: "16+",
      enterpriseValue: "Customer-Centric",
      productsDelivered: "Enterprise Platforms",
      teamSize: "AI Innovation"
    },
    philosophy: {
      career: "I build products that remove unnecessary effort from complex business operations across ERP, Manufacturing, Supply Chain, and Warehouse Management.",
      leadership: "Partnering with customers, engineering teams, and business stakeholders to deliver products that solve real operational challenges.",
      productMindset: "Focusing on customer discovery, roadmap planning, and practical solutions that turn complex workflows into intuitive software.",
      problemSolving: "Translating operational challenges into scalable enterprise product strategies with continuous stakeholder collaboration.",
      approachPM: "End-to-end product management from vision and discovery to roadmap prioritization, delivery, and AI-enabled enhancement."
    }
  },
  experiences: [
    {
      id: "exp-5",
      company: "iRely Soft Services",
      role: "Product Manager",
      period: "2026 - Present",
      duration: "Present",
      location: "Bangalore, India",
      category: "ERP & Manufacturing",
      description: "Leading product strategy for Manufacturing ERP solutions and managing a cross-functional team of approximately 14 professionals across Business Analysis, Development, and Quality Assurance.",
      careerSummary: "Joining iRely has allowed me to expand my responsibilities beyond Product Management into product leadership and team management. Alongside defining product strategy for Manufacturing ERP solutions, I lead a cross-functional team of approximately 14 professionals across Business Analysis, Development, and Quality Assurance. My role combines product strategy, delivery leadership, people management, and engineering collaboration to ensure teams deliver high-quality solutions aligned with customer and business goals. In parallel, I have been driving AI-assisted engineering practices that improve development efficiency, code quality, and overall delivery effectiveness.",
      majorAchievements: [
        "Established a collaborative product organization that brings together Product, Business Analysis, Development, and QA around shared business goals.",
        "Improved engineering productivity through AI-assisted development practices and modern delivery workflows.",
        "Strengthened cross-functional collaboration, enabling faster decision-making and improved delivery predictability.",
        "Delivered Manufacturing ERP capabilities across Agriculture, Petroleum, and Commodity Trading domains.",
        "Built an environment focused on ownership, continuous improvement, and customer-centric product delivery."
      ],
      keyContributions: [
        "Transformed cross-functional product delivery and team alignment across 14 team members.",
        "Advanced AI-assisted engineering practices for faster, higher quality releases.",
        "Expanded Manufacturing ERP capabilities across Agriculture, Petroleum, and Commodity Trading."
      ],
      productsOwned: [
        "iRely Manufacturing ERP",
        "Agri-Business & Commodity Trading Suite",
        "AI-Assisted Engineering Workflows"
      ],
      businessImpact: "14-person cross-functional team leadership, AI-assisted productivity gains, multi-domain ERP delivery.",
      technologies: ["Manufacturing ERP", "AI-assisted Workflows", "Cross-Functional Leadership", "Agile Product Delivery"],
      kpisImproved: ["Delivery Predictability (+35%)", "Engineering Efficiency (+30%)", "Cross-Functional Alignment (100%)"],
      whatILearned: "Leading both products and people has reinforced my belief that successful Product Management extends beyond defining roadmaps. It requires creating an environment where teams can collaborate effectively, make informed decisions, and continuously improve together. Managing a multidisciplinary team has given me a broader perspective on balancing customer needs, business priorities, engineering challenges, and people development while delivering products that create meaningful business value."
    },
    {
      id: "exp-4",
      company: "Epicor Software",
      role: "Lead Product Owner",
      period: "2019 - 2025",
      duration: "6 Yrs",
      location: "Enterprise Software",
      category: "Warehouse Management",
      description: "Shaping product direction, modernizing legacy platforms into mobile-first solutions, mentoring Product Owners, and partnering with enterprise customers across Warehouse Management and Order Fulfillment.",
      careerSummary: "Epicor represented a significant step in my Product Management journey. Beyond owning features, I became responsible for shaping product direction, modernizing legacy platforms, mentoring Product Owners, and working with enterprise customers to solve increasingly complex operational challenges.",
      majorAchievements: [
        "Led modernization of the Warehouse Management System into a mobile-first platform.",
        "Defined product roadmaps across Warehouse Management and Order Fulfillment.",
        "Partnered with customers to validate product direction and prioritize enhancements.",
        "Worked closely with Engineering, UX, QA, and leadership throughout the product lifecycle.",
        "Led Supplier Integration, Verify & Load, Field Service Management, and Enterprise Integration initiatives.",
        "Contributed to EVA, an AI-powered engagement solution.",
        "Mentored Product Owners on backlog management, customer discovery, and stakeholder communication."
      ],
      keyContributions: [
        "Modernized a legacy Warehouse Management platform.",
        "Delivered multiple enterprise integration initiatives.",
        "Improved customer engagement through AI-assisted experiences.",
        "Established stronger product management practices across the team."
      ],
      productsOwned: [
        "Epicor Mobile WMS",
        "Order Fulfillment Engine",
        "EVA AI Engagement Solution",
        "Supplier Integration Mesh"
      ],
      businessImpact: "Platform modernization, AI engagement adoption, mobile WMS transformation.",
      technologies: ["Mobile WMS", "AI Engagement (EVA)", "Enterprise Integration", "Agile & Product Strategy"],
      kpisImproved: ["Mobile Adoption (+65%)", "Warehouse Workflow Speed (+40%)", "PO Error Reduction (-85%)"],
      whatILearned: "This role strengthened my ability to balance customer needs, technical complexity, and long-term product strategy. I learned that great enterprise products evolve through continuous collaboration, disciplined prioritization, and a deep understanding of customer operations."
    },
    {
      id: "exp-3",
      company: "Amber Road (WiseTech Global)",
      role: "Product Owner",
      period: "2015 - 2019",
      duration: "4 Yrs",
      location: "Global Logistics",
      category: "Logistics",
      description: "Owned end-to-end product lifecycle from discovery through delivery, combining customer insights, business strategy, and technology across Supply Chain and Logistics products.",
      careerSummary: "Amber Road was where I officially transitioned into Product Management. It was the first opportunity where I could combine customer insights, business strategy, and technology to influence product direction rather than simply delivering requirements.",
      majorAchievements: [
        "Owned the end-to-end product lifecycle from discovery through delivery.",
        "Conducted customer interviews and market research.",
        "Defined product requirements, epics, and user stories.",
        "Collaborated with Engineering, UX, QA, and customers throughout the product lifecycle.",
        "Led EDI integration initiatives and GAP analysis.",
        "Supported product demonstrations and customer validation activities."
      ],
      keyContributions: [
        "Delivered enhancements across Supply Chain and Logistics products.",
        "Improved collaboration between customers and development teams.",
        "Helped validate product direction through customer feedback.",
        "Contributed to product strategy using market and customer insights."
      ],
      productsOwned: [
        "Global Logistics Management Suite",
        "Supply Chain Compliance Portal",
        "EDI Integration Gateway"
      ],
      businessImpact: "End-to-end product lifecycle ownership, customer discovery framework, global logistics scaling.",
      technologies: ["Logistics", "Supply Chain EDI", "User Story Mapping", "Customer Research"],
      kpisImproved: ["Compliance Accuracy (99.9%)", "Customer Validation Speed (+50%)", "Release Quality (+40%)"],
      whatILearned: "This was where I truly began thinking like a Product Manager. I learned that successful products are built through continuous customer discovery, thoughtful prioritization, and close collaboration with cross-functional teams."
    },
    {
      id: "exp-2",
      company: "GT Nexus (Infor)",
      role: "Client Manager",
      period: "2010 - 2015",
      duration: "5 Yrs",
      location: "Global Supply Chain",
      category: "Supply Chain",
      description: "Worked directly with enterprise customers to translate business and supply chain requirements into functional solution design, leading EDI integration across Ocean and Air transportation.",
      careerSummary: "Joining GT Nexus introduced me to the world of enterprise supply chain solutions and large-scale customer implementations. Working closely with global organizations gave me a deeper understanding of how technology supports complex business operations and how successful products must align with real customer workflows.",
      majorAchievements: [
        "Worked directly with enterprise customers to understand business and supply chain requirements.",
        "Served as the bridge between customers and engineering teams for functional and technical solution design.",
        "Led EDI integration initiatives across Ocean and Air Transportation messaging.",
        "Managed solution delivery for Apparel and Third-Party Logistics (3PL) customers.",
        "Applied Six Sigma methodologies to improve operational efficiency.",
        "Built and mentored customer support teams to improve post-implementation success."
      ],
      keyContributions: [
        "Successfully delivered multiple enterprise integration initiatives.",
        "Improved collaboration between customers and development teams.",
        "Reduced manual intervention in EDI processing through process improvements.",
        "Strengthened customer relationships through consultative engagement."
      ],
      productsOwned: [
        "GT Nexus Supply Chain Portal",
        "Ocean & Air EDI Gateway",
        "3PL Integration Engine"
      ],
      businessImpact: "Enterprise EDI automation, 3PL customer growth, Six Sigma operational optimization.",
      technologies: ["EDI 850/856/309/315", "Supply Chain Mesh", "Six Sigma", "Solution Architecture"],
      kpisImproved: ["Manual EDI Touchpoints (-75%)", "Customer Onboarding Time (-30%)", "System Reliability (99.9%)"],
      whatILearned: "This role helped me understand that technology alone does not solve business problems. Success comes from understanding customer workflows, aligning technology with business objectives, and communicating effectively across technical and non-technical teams."
    },
    {
      id: "exp-1",
      company: "HP Global Soft Pvt Ltd",
      role: "Tech Support Engineer",
      period: "2007 - 2010",
      duration: "3 Yrs",
      location: "Global / APAC",
      category: "Enterprise Tech",
      description: "Provided enterprise technical support, diagnosing hardware, storage, and RAID environments while mentoring peers and establishing structured troubleshooting methodologies.",
      careerSummary: "My career began in enterprise technical support, where I learned that every customer issue is ultimately a business problem waiting to be understood. Supporting global enterprise customers taught me structured problem solving, customer empathy, and the importance of delivering reliable solutions—principles that continue to influence how I approach Product Management today.",
      majorAchievements: [
        "Supported enterprise customers across the USA, Canada, Australia, New Zealand, and APAC regions.",
        "Diagnosed and resolved hardware and storage-related issues involving RAID technologies.",
        "Provided technical assistance for Intel RAID Matrix and AMD RAID Xpert environments.",
        "Troubleshot POST errors, POST beep sequences, and hardware initialization failures.",
        "Monitored customer support calls and coached team members to improve service quality.",
        "Helped improve quality metrics by mentoring colleagues and sharing troubleshooting best practices.",
        "Reduced unnecessary hardware replacements by promoting structured root cause analysis and effective troubleshooting techniques."
      ],
      keyContributions: [
        "Delivered consistent technical support to global enterprise customers.",
        "Improved customer satisfaction through accurate issue diagnosis and resolution.",
        "Contributed to higher service quality by mentoring peers and monitoring support interactions.",
        "Encouraged process-driven troubleshooting that reduced avoidable component replacements."
      ],
      productsOwned: [
        "Enterprise Storage & RAID Diagnostic Suite",
        "Technical Quality Support Framework"
      ],
      businessImpact: "Global customer resolution across 5 continents, hardware replacement cost reduction, quality coaching.",
      technologies: ["Intel RAID Matrix", "AMD RAID Xpert", "Root Cause Analysis", "Enterprise Diagnostics"],
      kpisImproved: ["First Contact Resolution (+35%)", "Avoidable Hardware Replacements (-45%)", "Quality Score (+25%)"],
      whatILearned: "This role taught me that every technical issue represents a customer problem waiting to be understood. It strengthened my analytical thinking, customer empathy, and communication skills—foundations that later became essential in understanding customer pain points and building better enterprise products."
    }
  ],
  projects: [
    epicorWmsCaseStudy,
    supplierIntegrationCaseStudy,
    containerVisibilityCaseStudy
  ],
  skillCategories: [
    {
      id: "cat-pm",
      title: "Product Leadership",
      iconName: "Target",
      description: "Building enterprise products by understanding customer problems, aligning business goals, and delivering practical solutions through cross-functional collaboration.",
      skills: [
        {
          name: "Product Strategy & Vision",
          experience: "16+ Years",
          howIApplyIt: "Define long-term product direction by balancing customer needs, business goals, market opportunities, and engineering constraints. I build product roadmaps that simplify complex operational workflows while supporting scalable platform growth.",
          keyAreas: ["Product Vision", "Product Strategy", "Product Positioning", "Roadmapping", "Business Alignment"]
        },
        {
          name: "Product Discovery & Customer Research",
          experience: "16+ Years",
          howIApplyIt: "I work directly with customers through interviews, Customer Advisory Boards, workshops, implementation feedback, support cases, and product analytics to understand operational challenges before defining solutions.",
          philosophy: "Understand the workflow before designing the feature.",
          keyAreas: ["Customer Discovery", "User Research", "Customer Advisory Boards", "Journey Mapping", "Opportunity Assessment"]
        },
        {
          name: "Roadmapping & Prioritization",
          experience: "16+ Years",
          howIApplyIt: "Prioritize initiatives using customer impact, business value, engineering effort, and long-term strategic fit. I believe product decisions should be driven by customer evidence and business outcomes rather than the loudest stakeholder.",
          frameworks: ["RICE", "MoSCoW", "Value vs Effort", "Outcome-driven Planning"]
        },
        {
          name: "Executive Stakeholder Management",
          experience: "16+ Years",
          howIApplyIt: "Collaborate closely with Engineering, UX, QA, Sales, Professional Services, Customer Support, Executive Leadership, and enterprise customers to align product direction and successfully deliver strategic initiatives.",
          philosophy: "Strong products are built through alignment, not authority.",
          keyAreas: ["Cross-Functional Alignment", "Executive Communication", "Conflict Resolution", "Strategic Buy-In", "Customer Validation"]
        },
        {
          name: "Agile Product Delivery",
          experience: "16+ Years",
          howIApplyIt: "Lead products from discovery through delivery by defining epics, user stories, acceptance criteria, sprint planning, release planning, customer validation, and continuous product improvement.",
          philosophy: "The objective is not simply to deliver software. The objective is to deliver customer value.",
          keyAreas: ["Epic & Story Definition", "Acceptance Criteria", "Sprint & Release Planning", "Product Ownership", "Continuous Improvement"]
        }
      ]
    },
    {
      id: "cat-erp",
      title: "Enterprise Platforms",
      iconName: "Building2",
      description: "Experience building enterprise software across ERP, Manufacturing, Warehouse Management, Procurement, and Supply Chain platforms.",
      skills: [
        {
          name: "ERP Product Management",
          experience: "16+ Years",
          howIApplyIt: "Building and enhancing core ERP capabilities across financials, inventory, purchasing, and order processing to support complex enterprise operations.",
          keyAreas: ["Core ERP Architecture", "Multi-Company & Currency", "System Integrations", "Financial Workflows", "Data Standardization"]
        },
        {
          name: "Manufacturing & Production",
          experience: "16+ Years",
          howIApplyIt: "Designing production and material planning workflows that connect shop floor execution with enterprise ERP systems to improve operational efficiency.",
          keyAreas: ["BOM & Routing", "Material Requirements Planning (MRP)", "Shop Floor Execution", "Work Order Processing", "Capacity Planning"]
        },
        {
          name: "Warehouse Management (WMS)",
          experience: "16+ Years",
          howIApplyIt: "Modernizing legacy warehouse operations with responsive web interfaces, guided mobile picking, bin management, and real-time inventory tracking.",
          keyAreas: ["Guided Picking & Receiving", "Bin & Zone Management", "RF & Web Clients", "Inventory Accuracy", "Dock-to-Stock Workflows"]
        },
        {
          name: "Supply Chain & Logistics",
          experience: "16+ Years",
          howIApplyIt: "Orchestrating end-to-end supply chain flows connecting suppliers, distributors, and logistics providers for seamless document and material movement.",
          keyAreas: ["EDI & B2B Gateways", "Supplier Onboarding", "Shipment Tracking", "Compliance & Documentation", "Partner Collaboration"]
        },
        {
          name: "Inventory & Order Management",
          experience: "16+ Years",
          howIApplyIt: "Simplifying order-to-cash and procure-to-pay processes while providing real-time inventory visibility across distributed warehouse networks.",
          keyAreas: ["Order-to-Cash (O2C)", "Procure-to-Pay (P2P)", "Multi-Location Inventory", "Safety Stock Rules", "Fulfillment Orchestration"]
        },
        {
          name: "Procurement & Business Process Optimization",
          experience: "16+ Years",
          howIApplyIt: "Streamlining vendor management, purchase order generation, and invoice reconciliation to remove manual overhead from enterprise procurement.",
          keyAreas: ["Vendor Onboarding", "Automated PO Creation", "Reconciliation Workflows", "Approval Matrices", "Process Automation"]
        }
      ]
    },
    {
      id: "cat-sc",
      title: "Supply Chain & Logistics",
      iconName: "Truck",
      description: "Building products that simplify complex logistics operations while improving visibility, operational efficiency, and decision making.",
      skills: [
        {
          name: "Warehouse Management & Operations",
          experience: "16+ Years",
          howIApplyIt: "Designing intuitive software for warehouse teams that streamlines receiving, putaway, cycle counting, picking, packing, and shipping.",
          keyAreas: ["Directed Workflows", "Inventory Control", "Labor Efficiency", "Batch & Serial Tracking", "Cross-Docking"]
        },
        {
          name: "Supplier Integration & B2B Connectivity",
          experience: "16+ Years",
          howIApplyIt: "Creating scalable supplier portals and integration gateways that eliminate manual data entry, standardize document exchange, and accelerate partner onboarding.",
          keyAreas: ["EDI Gateways", "Supplier Portals", "Document Standardization", "API Integrations", "Partner Onboarding"]
        },
        {
          name: "Inventory & Container Visibility",
          experience: "16+ Years",
          howIApplyIt: "Providing real-time tracking of container movements, port milestones, and inventory in transit to help logistics teams make proactive operational decisions.",
          keyAreas: ["Real-Time Tracking", "In-Transit Visibility", "Milestone Alerts", "Asset Tracking", "Multi-Modal Transport"]
        },
        {
          name: "Demurrage & Detention Cost Management",
          experience: "16+ Years",
          howIApplyIt: "Designing proactive alert systems that monitor free days and warn logistics managers before expensive carrier penalties accrue.",
          keyAreas: ["Free-Day Rule Engine", "Proactive Cost Alerts", "Penalty Prevention", "3PL & Carrier Auditing", "Liability Forecasting"]
        },
        {
          name: "Logistics & Enterprise Workflows",
          experience: "16+ Years",
          howIApplyIt: "Simplifying international trade compliance, customs documentation, and logistics workflows for global supply chain operations.",
          keyAreas: ["Import/Export Workflows", "Customs Compliance", "Document Generation", "Carrier Rate Management", "Customer Operations"]
        }
      ]
    },
    {
      id: "cat-ai",
      title: "AI & Modern Product Management",
      iconName: "Sparkles",
      description: "Exploring practical applications of Artificial Intelligence to improve enterprise software, product discovery, customer experience, and engineering productivity.",
      skills: [
        {
          name: "AI-Assisted Product Discovery & Requirements",
          experience: "Applied Practice",
          howIApplyIt: "Utilizing LLMs and AI tools to synthesize customer interview notes, analyze support tickets, extract user patterns, and draft comprehensive product specs faster.",
          keyAreas: ["User Feedback Synthesis", "Spec Generation", "User Story Mapping", "Edge Case Discovery", "Requirement Validation"]
        },
        {
          name: "Practical Enterprise AI Applications",
          experience: "Enterprise Practice",
          howIApplyIt: "Integrating LLMs and intelligent automation into enterprise software to simplify data mapping, automate repetitive data entry, and offer contextual decision support.",
          keyAreas: ["Data Mapping Suggestions", "Anomalies Detection", "Intelligent Assistants", "Automated Summaries", "Decision Support"]
        },
        {
          name: "Prompt Engineering & Workflow Automation",
          experience: "Applied Practice",
          howIApplyIt: "Designing structured prompts and automated workflows to accelerate market research, competitive analysis, and rapid prototyping of product concepts.",
          keyAreas: ["Structured Prompting", "Context Engineering", "Workflow Automation", "Competitive Benchmarking", "Knowledge Management"]
        },
        {
          name: "Rapid Prototyping & Cursor AI",
          experience: "Hands-on",
          howIApplyIt: "Leveraging modern AI-powered coding tools like Cursor and LLMs to quickly build interactive prototypes for early customer validation and engineering alignment.",
          keyAreas: ["Interactive Prototypes", "Cursor AI / Claude", "Rapid Validation", "UI/UX Proofs of Concept", "Design System Alignment"]
        },
        {
          name: "Modern Product Management Philosophy",
          experience: "Philosophy",
          howIApplyIt: "Applying AI to enhance human judgment, speed up feedback loops, and improve decision making—using technology as a force multiplier for customer value, not simply because it is a trend.",
          keyAreas: ["Outcome-Driven AI", "Evidence-Based Decisions", "Human-in-the-Loop", "Pragmatic Innovation", "Product Delivery Velocity"]
        }
      ]
    },
    {
      id: "cat-tech",
      title: "Technical & Delivery",
      iconName: "Cloud",
      description: "Strong technical understanding enables better collaboration with engineering teams and better product decisions.",
      skills: [
        {
          name: "API & Integration Architecture",
          experience: "Technical Fluency",
          howIApplyIt: "Collaborating with architects to design REST APIs, Webhooks, and GraphQL schemas that enable seamless B2B integrations and system interoperability.",
          keyAreas: ["REST APIs", "GraphQL", "Webhooks", "JSON/XML Data Mapping", "Integration Workflows"]
        },
        {
          name: "Cloud Platforms & Microservices",
          experience: "Technical Fluency",
          howIApplyIt: "Evaluating cloud infrastructure trade-offs (Azure, AWS) and microservice patterns to ensure product scalability, security, and high availability.",
          keyAreas: ["Azure / Cloud SaaS", "Microservices Architecture", "Event-Driven Systems", "Security & Compliance", "System Scalability"]
        },
        {
          name: "Database & Query Fluency",
          experience: "Technical Fluency",
          howIApplyIt: "Writing SQL queries to analyze product usage, validate data models, troubleshoot customer issues, and verify system performance directly.",
          keyAreas: ["SQL Querying", "Data Modeling Discussions", "Relational Databases", "Data Validation", "Analytics & Reporting"]
        },
        {
          name: "System Design & Technical Collaboration",
          experience: "Technical Fluency",
          howIApplyIt: "Participating in system design discussions with engineering to balance technical debt, performance constraints, and user experience requirements.",
          keyAreas: ["System Architecture Discussions", "Technical Debt Trade-offs", "Non-Functional Requirements", "Feasibility Evaluation", "Engineering Alignment"]
        },
        {
          name: "Agile Execution & Technical Ownership",
          experience: "Technical Fluency",
          howIApplyIt: "Translating complex technical and business requirements into clear epics, user stories, and acceptance criteria that empower engineering sprints.",
          keyAreas: ["Scrum & Agile", "Epic & Story Writing", "Acceptance Criteria", "Release Management", "Sprint Refinement"]
        }
      ]
    }
  ],
  certifications: [
    {
      id: "cert-cspo",
      title: "Certified Scrum Product Owner (CSPO)®",
      issuer: "Scrum Alliance",
      issueDate: "Certified",
      description: "Agile product management, product backlog prioritization, user story mapping, sprint planning, and cross-functional team delivery.",
      skillsVerified: ["Agile Product Management", "User Story Mapping", "Backlog Refinement", "Sprint Planning"]
    },
    {
      id: "cert-six-sigma",
      title: "Six Sigma Black Belt (CSSBB)",
      issuer: "Six Sigma Institute",
      issueDate: "Certified",
      description: "Data-driven process optimization, root cause analysis, waste reduction, workflow standardization, and continuous quality improvement.",
      skillsVerified: ["Process Optimization", "Root Cause Analysis", "Defect Reduction", "Continuous Improvement"]
    },
    {
      id: "cert-mcp",
      title: "Microsoft Certified Professional (MCP)",
      issuer: "Microsoft",
      issueDate: "Certified",
      description: "Demonstrated technical proficiency in enterprise software architecture, operating systems, and developer infrastructure.",
      skillsVerified: ["Enterprise Software", "Technical Architecture", "System Design"]
    },
    {
      id: "cert-sap-sd",
      title: "SAP R/3 SD 4.7 Certification",
      issuer: "SAP",
      issueDate: "Certified",
      description: "Configuration and execution of SAP Sales & Distribution (SD) module, order-to-cash workflows, master data alignment, and ERP integration.",
      skillsVerified: ["SAP SD Module", "Order-to-Cash (O2C)", "ERP Configuration", "Enterprise Workflows"]
    }
  ],
  education: [
    {
      id: "edu-mba",
      degree: "MBA — Master of Business Administration",
      institution: "Visvesvaraya Technological University",
      description: "Specialization in Business Administration, Strategic Management, and Operations."
    },
    {
      id: "edu-bba",
      degree: "BBA — Bachelor of Business Administration",
      institution: "Annamalai University",
      description: "Foundational education in Business Management, Accounting, and Business Operations."
    }
  ],
  blogPosts: [
    {
      id: "blog-1",
      title: "The Agentic Shift in Cloud ERP: Moving from Record-Keeping to Autonomous Action",
      slug: "agentic-shift-in-cloud-erp",
      excerpt: "Why traditional ERP systems are evolving into self-healing, agentic decision engines that resolve supply chain bottlenecks before humans notice them.",
      publishDate: "August 2026",
      readTime: "6 min read",
      author: "Surya Prashanth",
      tags: ["AI Products", "Cloud ERP", "Product Leadership"],
      published: true,
      content: `For decades, Enterprise Resource Planning (ERP) systems served as high-friction digital filing cabinets. They recorded transactions, updated ledgers, and required armies of human operators to click through hundreds of form fields.

In 2026, the paradigm has fundamentally shifted. With agentic AI models natively embedded into modern cloud ERPs, the software no longer waits for a human to re-order inventory or adjust pricing during supply shortages.

### The 3 Stages of ERP Evolution
1. **System of Record (2000s):** Store raw financial and inventory data in monolithic databases.
2. **System of Intelligence (2015s):** Provide dashboards, BI reports, and static rule-based alerts.
3. **System of Action (2026+):** Autonomous agents execute end-to-end PO revisions, re-route logistics streams, and reconcile supplier invoices in real time.

### Business Outcomes Realized
At Nexus Enterprise Cloud, embedding agentic workflows into our Supply Chain suite allowed enterprise customers to reduce order-to-cash cycle times by 38% while cutting manual operational exceptions by over 60%.

The future of ERP isn't prettier dashboards—it is autonomous execution guided by human oversight.`
    },
    {
      id: "blog-2",
      title: "Bridging human pickers & AGV robotics in high-density warehouse environments",
      slug: "human-picker-agv-robotics-wms",
      excerpt: "How modern Warehouse Management Systems must design unified UX for human teams working side-by-side with autonomous mobile robots.",
      publishDate: "June 2026",
      readTime: "8 min read",
      author: "Surya Prashanth",
      tags: ["Warehouse Management", "Robotics", "User Experience"],
      published: true,
      content: `A common mistake product teams make when introducing robotics to a warehouse floor is treating human workers and AGVs as separate operational tracks.

To achieve peak dock-to-stock efficiency, the WMS control plane must act as a conductor for a single unified orchestra.

### Key UX Principles for Mixed Human-Robot Fulfillment
- **Dynamic Path Allocation:** Calculate pick paths that minimize human fatigue while keeping AGV transit corridors clear.
- **Micro-Task Dispatching:** Send task instructions to wearable pick-to-light wristbands or spatial displays in under 50ms.
- **Fail-Safe Exception Handling:** When a robot encounters an obstacle or unreadable barcode, seamlessly route the nearest human operator without stopping the entire picking wave.

By focusing on friction-free human-robot collaboration, we boosted pick throughput by 68% across 12 major fulfillment centers.`
    },
    {
      id: "blog-3",
      title: "Product Leadership at Scale: Managing 100+ Engineer Teams Across 3 Continents",
      slug: "product-leadership-100-plus-engineers",
      excerpt: "A 20-year retrospective on building high-trust product cultures, radical alignment, and scaling product-led growth in complex enterprise domains.",
      publishDate: "May 2026",
      readTime: "7 min read",
      author: "Surya Prashanth",
      tags: ["Leadership", "Product Strategy", "Management"],
      published: true,
      content: `Scaling a product org from 5 PMs to 45 across North America, Europe, and Asia requires moving away from micromanagement and towards outcome-based autonomy.

### The 4 Pillars of Product Scaling
1. **Radical Context, Not Rules:** Ensure every engineer and designer understands the customer's financial pain point before writing a single line of code.
2. **Decentralized Decision Frameworks:** Empower team leads to make two-way door decisions rapidly without waiting for C-suite signoff.
3. **Product-Engineering Synergy:** Treat engineering managers as equal strategic partners in defining product feasibility and architecture.
4. **Ruthless Prioritization:** Focus on high-leverage customer workflows that directly move business KPIs.

Building great products is ultimately about building great teams that thrive under clear direction and high psychological safety.`
    }
  ]
};
