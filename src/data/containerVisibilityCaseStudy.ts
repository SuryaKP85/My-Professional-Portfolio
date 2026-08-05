import { Project } from '../types';

export const containerVisibilityCaseStudy: Project = {
  id: "proj-amber-road-container-visibility",
  title: "Container Visibility & Demurrage Management",
  subtitle: "Improving logistics visibility through intelligent cost management",
  category: "Logistics",
  company: "Amber Road (WiseTech Global)",
  summary: "Designed a new logistics capability that provided customers with real-time visibility into container movements, tracked available free days, proactively notified users before charges were incurred, and helped reduce unnecessary Demurrage and Detention costs.",
  executiveSummary: "Designed a new logistics capability within Amber Road (WiseTech Global) providing real-time visibility into container movements, tracking available free days, and proactively notifying logistics teams before charges are incurred—transforming Demurrage and Detention management from reactive invoice processing to proactive cost prevention.",
  problem: "Customers lacked timely visibility into shipping container locations, remaining free days, and fee thresholds. By the time carrier invoices arrived for Demurrage & Detention (D&D), it was too late to avoid heavy penalties.",
  solution: "Created an integrated container tracking capability that combines real-time container status, free-day countdown tracking, proactive alerts before penalties occur, and operational decision-support tools.",
  role: "Product Owner — Led product initiative from discovery through delivery, including user experience design, workflow modelling, wireframes, user stories, acceptance criteria, and cross-functional execution.",
  businessOutcome: "Eliminated reliance on manual spreadsheets, improved operational return planning, empowered logistics teams to prevent avoidable D&D costs before invoices arrived, and delivered stronger shipment visibility.",
  techStack: ["Amber Road Logistics Suite", "EDI & API Tracking", "Proactive Alert Engine", "Free-Day Rule Engine", "Logistics Dashboards", "Agile / Scrum"],
  futureVision: "Leveraging AI for predictive alerts on high-risk containers, intelligent return recommendations, automated wireframing, and natural language decision-support dashboards.",
  featured: true,
  image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000",
  metrics: [
    { label: "Cost Prevention", value: "Proactive" },
    { label: "Container Tracking", value: "Real-time" },
    { label: "Spreadsheet Reliance", value: "Eliminated" }
  ],
  sections: [
    {
      id: "sec-why-mattered",
      title: "Why This Project Mattered",
      summaryCallout: "This project wasn't about calculating Demurrage and Detention fees—it was about giving customers the visibility they needed to make better operational decisions before those costs were incurred.",
      type: "standard",
      content: [
        "International trade doesn't end when a shipment reaches its destination.",
        "Once a shipping container arrives, customers are responsible for unloading the goods and returning the empty container to the carrier within an agreed free period. If the container is returned late, carriers begin charging Demurrage and Detention (D&D) fees—costs that can quickly erode the profitability of a shipment.",
        "The problem wasn't that customers didn't understand these charges.",
        "The problem was that they didn't have timely visibility into where their containers were, how many free days remained, or when charges would begin.",
        "By the time an invoice arrived from the carrier or third-party logistics provider (3PL), it was already too late to avoid the cost.",
        "This project wasn't about calculating Demurrage and Detention fees. It was about giving customers the visibility they needed to make better operational decisions before those costs were incurred."
      ]
    },
    {
      id: "sec-exec-summary",
      title: "Executive Summary",
      summaryCallout: "Product Owner initiative at Amber Road (WiseTech Global) designing real-time container tracking, free-day tracking, and proactive notifications to reduce unnecessary Demurrage and Detention costs.",
      type: "standard",
      content: [
        "Project: Container Visibility & Demurrage Management",
        "Company: Amber Road (WiseTech Global)",
        "Product Module: Logistics",
        "Industry: Global Trade & Logistics",
        "Role: Product Owner",
        "Primary Objective: Design a new logistics capability that provided customers with real-time visibility into container movements, tracked available free days, proactively notified users before charges were incurred, and helped reduce unnecessary Demurrage and Detention costs."
      ]
    },
    {
      id: "sec-understanding-business",
      title: "Understanding the Business",
      summaryCallout: "While the financial impact of Demurrage & Detention was well understood, operational teams lacked centralized visibility into location, free days, and accumulating liability.",
      type: "standard",
      content: [
        "Every international shipment depends on shared assets.",
        "Shipping containers belong to carriers or third-party logistics providers, not the companies importing goods. Customers receive these containers with an agreed number of free days to unload the cargo and return the empty container.",
        "Failing to return containers on time results in Demurrage and Detention charges. For organizations managing hundreds or thousands of containers simultaneously, these charges can become significant operational costs.",
        "While the financial impact was well understood, the operational challenge remained visibility. Customers lacked a centralized way to understand:"
      ],
      bullets: [
        "Where containers were currently located",
        "How many free days remained",
        "Which containers were at risk of incurring charges",
        "How much potential liability was accumulating"
      ]
    },
    {
      id: "sec-understanding-customer",
      title: "Understanding the Customer",
      summaryCallout: "Despite operating sophisticated global supply chains, almost every organization was managing D&D using spreadsheets, emails, or manual calculations.",
      type: "standard",
      content: [
        "The feature supported multiple user groups across the logistics lifecycle, including Logistics Managers, Supply Chain Managers, Import Teams, Freight Forwarders, Customs Teams, and Transportation Planners.",
        "Although each group had different responsibilities, they all relied on accurate container information to coordinate transportation activities and avoid unnecessary costs.",
        "During customer interviews, one pattern quickly emerged: Almost every organization was managing Demurrage and Detention using spreadsheets, emails, or manual calculations.",
        "Despite operating sophisticated global supply chains, customers were relying on disconnected tools that rarely reflected real-time container status. As a result, calculations quickly became outdated, creating inaccurate forecasts and unexpected carrier invoices."
      ]
    },
    {
      id: "sec-customer-problem",
      title: "The Customer Problem",
      summaryCallout: "The business problem wasn't calculating fees—it was helping customers avoid them altogether before the container became an afterthought.",
      type: "problem",
      content: [
        "Customers generally focused on one milestone: Receiving their goods. Once products were unloaded, operational attention shifted elsewhere, and the container itself became an afterthought.",
        "Days or weeks later, customers would receive an invoice from the carrier detailing unexpected Demurrage and Detention charges. These weren't planned transportation costs—they were avoidable operational costs caused by limited visibility.",
        "The real business problem wasn't calculating fees. The business problem was helping customers avoid them altogether."
      ]
    },
    {
      id: "sec-product-vision",
      title: "Product Vision",
      summaryCallout: "Enable customers to manage containers proactively rather than reactively. The best operational decisions happen before the invoice arrives.",
      type: "strategy",
      content: [
        "The vision was straightforward: Enable customers to manage containers proactively rather than reactively.",
        "Instead of discovering charges after invoices arrived, the platform would provide continuous visibility into container status, remaining free days, and expected charges before financial penalties occurred.",
        "The product also created value for carriers and logistics providers by giving them better visibility into container ownership, expected returns, and anticipated revenue without relying on manual tracking processes.",
        "My objective wasn't simply to display container information. It was to help customers make better operational decisions before costs became unavoidable."
      ]
    },
    {
      id: "sec-discovery-research",
      title: "Discovery & Research",
      summaryCallout: "Rather than asking customers which reports they wanted, asking how they actually managed container returns revealed that customers didn't need another report—they needed actionable visibility.",
      type: "standard",
      content: [
        "The opportunity emerged through customer interviews, market research, and conversations with logistics professionals.",
        "Rather than asking customers which reports they wanted, I focused on understanding how they actually managed container returns. Most relied on Excel spreadsheets, email reminders, manual calculations, and individual knowledge.",
        "None of these approaches provided accurate, real-time visibility. As container volumes increased, manual processes became increasingly difficult to maintain.",
        "The product opportunity became clear: Customers didn't need another report. They needed actionable visibility."
      ]
    },
    {
      id: "sec-product-strategy",
      title: "Product Strategy & Proactive Alerts",
      summaryCallout: "Shifting the product from reporting history to influencing operational decisions through proactive warnings while users still had time to act.",
      type: "strategy",
      content: [
        "Rather than positioning the capability as a financial reporting tool, the product strategy focused on operational decision support. The objective was to help customers understand container locations, monitor available free days, anticipate future charges, plan container returns, and reduce unnecessary logistics costs.",
        "One capability became especially important: Proactive notifications before free days expired.",
        "Instead of simply informing customers about incurred charges, the product warned them while they still had time to act. This shifted the product from reporting history to influencing operational decisions."
      ]
    },
    {
      id: "sec-my-role",
      title: "My Role & Responsibilities",
      summaryCallout: "As Product Owner, led the initiative from discovery through delivery, working daily with Engineering to ensure the product reflected real customer workflows.",
      type: "standard",
      content: [
        "As Product Owner, I was responsible for leading the initiative from discovery through delivery.",
        "Key responsibilities included:"
      ],
      bullets: [
        "Customer discovery & interviews",
        "Product roadmap definition",
        "User experience design & wireframes",
        "Workflow modelling & story mapping",
        "User stories & acceptance criteria",
        "Customer validation & feedback loops",
        "Daily collaboration with Engineering",
        "Sprint planning & product demonstrations"
      ]
    },
    {
      id: "sec-key-decisions",
      title: "Key Product Decisions",
      summaryCallout: "The guiding principle throughout the project was simple: The best operational decisions happen before the invoice arrives.",
      type: "strategy",
      content: [
        "One of the most valuable product decisions was focusing on proactive visibility rather than retrospective reporting.",
        "Rather than designing dashboards that explained costs after they occurred, we prioritized features that helped customers avoid unnecessary charges altogether.",
        "The notification capability became one of the strongest examples of this philosophy: warning logistics teams beforehand to coordinate container returns while avoiding carrier penalties."
      ]
    },
    {
      id: "sec-collaboration",
      title: "Cross-functional Collaboration",
      summaryCallout: "Customer validation across countries, ports, and carriers ensured the product remained flexible enough to support diverse logistics environments.",
      type: "standard",
      content: [
        "Developing the product required close collaboration across Engineering, UX, QA, Customers, and Business Stakeholders.",
        "Customer validation played an especially important role because operational processes varied across countries, ports, and carriers.",
        "These conversations ensured the product remained flexible enough to support different logistics environments while maintaining a consistent user experience."
      ]
    },
    {
      id: "sec-product-capabilities",
      title: "Product Capabilities",
      summaryCallout: "Designed around one objective: Helping customers act before costs occurred.",
      type: "solution",
      content: [
        "The solution introduced capabilities focused on operational visibility rather than transaction processing:"
      ],
      bullets: [
        "Real-time container visibility",
        "Free-day tracking countdown",
        "Estimated Demurrage & Detention charges calculation",
        "Container lifecycle monitoring",
        "Proactive notifications before free days expire",
        "Operational dashboards and reporting",
        "Improved shipment visibility and logistics planning"
      ]
    },
    {
      id: "sec-tradeoffs",
      title: "Challenges & Trade-offs",
      summaryCallout: "Balancing standard workflows with configurable business rules to support different carrier free-day policies and regional logistics practices.",
      type: "tradeoffs",
      content: [
        "Although the underlying business problem was consistent, implementation required accommodating operational differences across regions.",
        "Challenges included different carrier free-day policies, port-specific operational processes, country-specific logistics practices, and varying customer workflows.",
        "Rather than creating separate products for every scenario, the platform balanced standard workflows with configurable business rules that supported different operational environments."
      ]
    },
    {
      id: "sec-business-impact",
      title: "Business Impact & Value Delivered",
      summaryCallout: "Shifted organizations from reacting to invoices toward proactively managing container returns.",
      type: "outcome",
      content: [
        "The product delivered measurable operational improvements without changing customers' logistics processes:",
        "• Better container visibility and operational reporting.",
        "• Greater customer confidence in tracking container return deadlines.",
        "• Reduced dependence on manual spreadsheets and offline tracking.",
        "• More proactive logistics decision-making.",
        "• Stronger overall operational efficiency across global trade teams."
      ]
    },
    {
      id: "sec-lessons-learned",
      title: "Lessons Learned",
      summaryCallout: "Customers rarely ask for visibility—they ask for fewer problems. Enterprise software should influence decisions, not simply record transactions.",
      type: "standard",
      content: [
        "This project reinforced an important Product Management lesson: Customers rarely ask for visibility—they ask for fewer problems.",
        "The real opportunity wasn't building a Demurrage and Detention feature. It was helping customers avoid unnecessary costs through better operational awareness.",
        "The experience also reinforced my belief that enterprise software should influence decisions—not simply record transactions. The best enterprise products help customers act before problems occur."
      ]
    },
    {
      id: "sec-building-today",
      title: "If I Were Building This Today (AI Vision)",
      summaryCallout: "AI would significantly improve discovery and operational decision support by providing predictive alerts and intelligent return recommendations.",
      type: "standard",
      content: [
        "If I were building this capability today, Artificial Intelligence would significantly improve both product discovery and operational decision support.",
        "During product discovery, AI could accelerate wireframe generation, workflow validation, customer journey visualization, edge-case identification, and dashboard prototyping.",
        "Within the product itself, AI could provide:"
      ],
      bullets: [
        "Predictive alerts for containers at risk of exceeding free days",
        "Estimated return recommendations based on historical transportation patterns",
        "Intelligent prioritization of containers requiring immediate action",
        "Natural language summaries explaining why specific shipments are at risk",
        "Decision-support dashboards that recommend the next best operational action"
      ]
    },
    {
      id: "sec-key-takeaways",
      title: "Key Takeaways & Product Philosophy",
      summaryCallout: "People don't wake up wanting another dashboard—they want fewer surprises. Great software helps businesses make better decisions.",
      type: "standard",
      content: [
        "My Product Philosophy: People don't wake up wanting another dashboard—they want fewer surprises.",
        "Every unnecessary cost usually begins as an operational problem that wasn't visible early enough.",
        "My goal as a Product Manager is to build products that surface the right information at the right time so customers can make confident decisions before problems become expensive.",
        "To me, that's what great enterprise software should do. It shouldn't just record business operations—it should help businesses make better decisions."
      ],
      keyTakeaways: [
        "Visibility creates better operational decisions.",
        "The most valuable logistics products help customers prevent costs rather than simply report them.",
        "Customer discovery often reveals that manual workarounds, such as spreadsheets and emails, hide significant product opportunities.",
        "Enterprise software should support proactive decision-making instead of reactive reporting.",
        "Great Product Management is about helping customers solve business problems before they become financial problems."
      ]
    }
  ]
};
