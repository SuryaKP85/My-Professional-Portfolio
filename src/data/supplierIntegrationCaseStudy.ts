import { Project } from '../types';

export const supplierIntegrationCaseStudy: Project = {
  id: "proj-epicor-supplier-integration",
  title: "Supplier Integration Platform",
  subtitle: "Simplifying supplier connectivity through scalable enterprise integrations",
  category: "Supply Chain",
  company: "Epicor Software",
  summary: "Designed a scalable Supplier Integration platform that simplified supplier onboarding, standardized integrations, and enabled customers to connect with suppliers more efficiently while reducing implementation complexity.",
  executiveSummary: "Designed a scalable Supplier Integration platform for Epicor Prophet 21 ERP that simplified supplier onboarding, standardized integrations, and enabled enterprise distribution customers to connect with suppliers more efficiently while reducing implementation complexity.",
  problem: "Supplier onboarding and ERP integration was a slow, manual, and resource-intensive process requiring custom data mapping, repeated configuration, and high implementation effort for every supplier.",
  solution: "Created a scalable platform capability with standardized integration patterns, reusable business mappings, and configurable workflows that simplified supplier connectivity and reduced onboarding effort.",
  role: "Lead Product Owner / Product Manager — Led product direction from discovery through delivery, product vision, roadmap, epic creation, backlog prioritization, and cross-functional alignment across engineering, services, and support.",
  businessOutcome: "Transformed supplier connectivity from custom projects into a reusable platform capability, significantly reducing implementation effort, accelerating supplier onboarding, and creating a scalable foundation.",
  techStack: ["Epicor Prophet 21", "Supplier EDI / APIs", "Standardized Workflows", "Integration Platform", "Configurable Mapping", "Agile / Scrum"],
  futureVision: "Applying AI to automatically suggest data mappings, detect document inconsistencies, recommend configuration based on previous onboarding, and enable guided self-service supplier onboarding.",
  featured: true,
  image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1000",
  metrics: [
    { label: "Supplier Onboarding", value: "Standardized" },
    { label: "Implementation Effort", value: "Significantly Reduced" },
    { label: "Platform Scalability", value: "High" }
  ],
  sections: [
    {
      id: "sec-why-mattered",
      title: "Why This Project Mattered",
      summaryCallout: "To me, this project wasn't about APIs—it was about removing unnecessary effort from one of the most repetitive and time-consuming processes in enterprise software.",
      type: "standard",
      content: [
        "Enterprise ERP systems rarely operate in isolation.",
        "For distributors and wholesalers, suppliers are a critical part of everyday business operations. Yet connecting suppliers to ERP systems often remained a slow, manual, and resource-intensive process.",
        "Every supplier integration required significant implementation effort, repeated data mapping, and technical expertise, making onboarding time-consuming for both customers and implementation teams.",
        "The challenge wasn't simply building another integration.",
        "The challenge was creating a scalable platform that simplified supplier connectivity while reducing operational effort for everyone involved.",
        "To me, this project wasn't about APIs.",
        "It was about removing unnecessary effort from one of the most repetitive and time-consuming processes in enterprise software."
      ]
    },
    {
      id: "sec-exec-summary",
      title: "Executive Summary",
      summaryCallout: "Lead Product Manager initiative at Epicor Software designing a scalable Supplier Integration platform that simplified supplier onboarding, standardized integrations, and reduced implementation complexity.",
      type: "standard",
      content: [
        "Project: Supplier Integration Platform",
        "Company: Epicor Software",
        "ERP Platform: Epicor Prophet 21",
        "Industry: Distribution & Wholesale",
        "Role: Lead Product Owner / Product Manager",
        "Primary Objective: Design a scalable Supplier Integration platform that simplified supplier onboarding, standardized integrations, and enabled customers to connect with suppliers more efficiently while reducing implementation complexity."
      ]
    },
    {
      id: "sec-understanding-business",
      title: "Understanding the Business",
      summaryCallout: "Modern distribution businesses depend on constant collaboration between customers and suppliers across Purchase Orders, Confirmations, ASNs, Invoices, and Inventory Updates.",
      type: "standard",
      content: [
        "Modern distribution businesses depend on constant collaboration between customers and suppliers.",
        "Every one of these transactions requires accurate and timely communication:",
        "Historically, supplier onboarding was a highly manual process. Each implementation often involved custom mapping, repeated configuration, extensive coordination, and significant support effort.",
        "As the number of suppliers increased, the implementation effort increased almost proportionally.",
        "Customers wanted faster onboarding. Implementation teams wanted repeatability. Epicor wanted a platform that could scale.",
        "The opportunity was to transform supplier connectivity from a project into a reusable platform capability."
      ],
      bullets: [
        "Purchase Orders",
        "Order Confirmations",
        "Advance Shipping Notices (ASN)",
        "Invoices",
        "Inventory Updates"
      ]
    },
    {
      id: "sec-understanding-customer",
      title: "Understanding the Customer",
      summaryCallout: "Listening to different stakeholder perspectives made one thing clear: everyone wanted the same outcome—less manual effort.",
      type: "standard",
      content: [
        "The project served multiple stakeholder groups across the enterprise ecosystem:"
      ],
      subsections: [
        {
          title: "Distributors",
          content: "Wanted faster supplier onboarding without lengthy implementation projects."
        },
        {
          title: "Suppliers",
          content: "Needed a simpler way to exchange business documents without extensive technical expertise."
        },
        {
          title: "Professional Services",
          content: "Wanted repeatable implementation processes to scale deployment capacity."
        },
        {
          title: "Support Teams",
          content: "Wanted fewer customer-specific configurations to maintain over time."
        },
        {
          title: "Engineering",
          content: "Needed a scalable architecture capable of supporting long-term platform growth."
        }
      ]
    },
    {
      id: "sec-customer-problem",
      title: "The Customer Problem",
      summaryCallout: "The real issue wasn't connectivity—it was complexity. Every new supplier introduced additional operational effort.",
      type: "problem",
      content: [
        "Although every customer wanted supplier integration, no two implementations looked exactly alike.",
        "Common operational challenges included:"
      ],
      bullets: [
        "Manual supplier onboarding activities",
        "Customer-specific and fragile data mapping",
        "Long implementation timelines for new partners",
        "Repetitive configuration activities across deployments",
        "Limited visibility into onboarding progress",
        "High dependency on implementation consultants",
        "Difficult maintenance and troubleshooting",
        "Limited scalability as supplier networks grew"
      ]
    },
    {
      id: "sec-product-vision",
      title: "Product Vision & Strategy Principles",
      summaryCallout: "From the beginning, I viewed Supplier Integration as a platform rather than an individual feature. The best platform is one customers hardly notice because everything simply works.",
      type: "strategy",
      content: [
        "Instead of optimizing individual integrations, we wanted to create a foundation that could support many suppliers through standardized workflows, reusable mappings, and scalable onboarding processes.",
        "Three core principles guided the product strategy:"
      ],
      subsections: [
        {
          title: "1. Standardize wherever possible",
          content: "Every repeated implementation activity represented an opportunity for platform improvement."
        },
        {
          title: "2. Reduce implementation effort",
          content: "The less manual configuration required, the faster customers could begin exchanging business documents."
        },
        {
          title: "3. Design for growth",
          content: "The platform needed to support increasing supplier networks without increasing operational complexity."
        }
      ]
    },
    {
      id: "sec-discovery-research",
      title: "Discovery & Research",
      summaryCallout: "Asking 'Which activities are repeated every time a new supplier is onboarded?' changed the direction of the product from solving individual integration problems to eliminating repetitive work.",
      type: "standard",
      content: [
        "Understanding the onboarding process required collaboration across Professional Services, Customer Support, Customer implementations, Engineering, Business stakeholders, and Customer onboarding teams.",
        "Rather than asking 'What integration features should we build?' we asked 'Which activities are repeated every time a new supplier is onboarded?'",
        "That single question changed the direction of the product. Instead of solving individual integration problems, we focused on eliminating repetitive work."
      ]
    },
    {
      id: "sec-product-strategy",
      title: "Product Strategy & Priorities",
      summaryCallout: "The objective wasn't to replace implementation consultants—it was to allow them to spend more time solving customer-specific business challenges rather than repeating identical configuration work.",
      type: "strategy",
      content: [
        "Strategic priorities included reusable integration patterns, standardized onboarding workflows, configurable business rules, improved supplier visibility, platform scalability, long-term maintainability, and reduced implementation effort.",
        "Every roadmap decision was evaluated against one question: 'Can we remove unnecessary effort from supplier onboarding?'"
      ],
      bullets: [
        "Reusable integration patterns",
        "Standardized onboarding workflows",
        "Configurable business rules",
        "Improved supplier visibility",
        "Platform scalability",
        "Long-term maintainability",
        "Reduced implementation effort"
      ]
    },
    {
      id: "sec-my-role",
      title: "My Role & Responsibilities",
      summaryCallout: "As Product Manager, I led the product direction from discovery through delivery, ensuring every decision contributed toward a scalable platform rather than isolated customer requests.",
      type: "standard",
      content: [
        "Beyond feature definition, my focus was ensuring that every roadmap decision contributed toward a scalable platform rather than isolated customer requests.",
        "Key responsibilities included:"
      ],
      bullets: [
        "Customer discovery & product vision",
        "Product roadmap & backlog prioritization",
        "Stakeholder alignment & epic creation",
        "User stories & acceptance criteria",
        "Workflow modelling & sprint planning",
        "Release planning & customer discussions",
        "Daily collaboration with Engineering",
        "Product demonstrations & cross-functional alignment"
      ]
    },
    {
      id: "sec-key-decisions",
      title: "Key Product Decisions",
      summaryCallout: "The best enterprise products solve classes of problems—not individual exceptions.",
      type: "strategy",
      content: [
        "One of the most important strategic decisions was choosing to invest in platform capabilities rather than customer-specific customizations.",
        "While individual customer requests often delivered immediate value, repeated analysis showed that many implementation challenges shared common patterns.",
        "Instead of building separate solutions for individual customers, we prioritized reusable capabilities that benefited the broader customer base.",
        "This approach required balancing short-term customer expectations with long-term product scalability, reinforcing a core PM belief: The best enterprise products solve classes of problems—not individual exceptions."
      ]
    },
    {
      id: "sec-collaboration",
      title: "Cross-functional Collaboration",
      summaryCallout: "Supplier Integration required continuous collaboration across Engineering, QA, Professional Services, Support, Product Leadership, and Enterprise Customers.",
      type: "standard",
      content: [
        "Professional Services played a particularly important role because they experienced onboarding challenges firsthand.",
        "Their insights helped identify repetitive implementation activities that could be transformed into reusable platform capabilities."
      ]
    },
    {
      id: "sec-product-capabilities",
      title: "Product Capabilities",
      summaryCallout: "Every capability focused on making supplier onboarding easier for customers and implementation teams rather than increasing technical complexity.",
      type: "solution",
      content: [
        "The platform introduced capabilities focused on simplifying supplier connectivity:"
      ],
      bullets: [
        "Standardized supplier onboarding workflows",
        "Configurable integration workflows",
        "Reusable business mappings",
        "Platform-based supplier connectivity",
        "Improved onboarding visibility",
        "Simplified implementation processes",
        "Better scalability",
        "Easier long-term maintenance",
        "Flexible configuration"
      ]
    },
    {
      id: "sec-tradeoffs",
      title: "Challenges & Trade-offs",
      summaryCallout: "Finding the right balance between standardization and configurability required continuous collaboration with customers, implementation consultants, and Engineering.",
      type: "tradeoffs",
      content: [
        "Enterprise integrations naturally involve many exceptions. Different suppliers follow different business processes; different customers have different operational requirements.",
        "One of the biggest challenges was deciding when to introduce configurability and when to standardize.",
        "Too much flexibility increases product complexity. Too much standardization limits customer adoption.",
        "Finding the right balance required continuous collaboration across teams. The most successful platform decisions came from identifying common business patterns rather than individual customer requests."
      ]
    },
    {
      id: "sec-business-impact",
      title: "Business Impact & Value Delivered",
      summaryCallout: "Shifted supplier integration from a project-based activity toward a scalable product capability.",
      type: "outcome",
      content: [
        "Although this project wasn't measured using publicly available business metrics, it created meaningful operational improvements:",
        "• Simplified supplier onboarding.",
        "• Reduced repetitive implementation activities.",
        "• Improved consistency across supplier integrations.",
        "• Increased platform scalability.",
        "• Reduced long-term maintenance effort.",
        "• Improved customer onboarding experience.",
        "• Created a stronger foundation for future integrations."
      ]
    },
    {
      id: "sec-lessons-learned",
      title: "Lessons Learned",
      summaryCallout: "Platforms create value by eliminating repetition. The more reusable the solution becomes, the more value it creates over time.",
      type: "standard",
      content: [
        "This project fundamentally changed how I think about platform products.",
        "Customers often ask for features; however, Product Managers need to identify the underlying pattern behind those requests.",
        "Rather than solving individual onboarding challenges, we focused on building reusable capabilities that benefited every future customer."
      ]
    },
    {
      id: "sec-building-today",
      title: "If I Were Building This Today (AI Vision)",
      summaryCallout: "If designing today, AI would significantly expand what the platform could accomplish by automating repetitive onboarding activities.",
      type: "standard",
      content: [
        "If I were designing the Supplier Integration Platform today, I would continue focusing on reducing implementation effort—but Artificial Intelligence would significantly expand what the platform could accomplish.",
        "AI could assist implementation teams by:"
      ],
      bullets: [
        "Automatically suggesting data mappings",
        "Identifying document inconsistencies",
        "Recommending configuration based on previous supplier onboarding",
        "Detecting integration issues before deployment",
        "Generating implementation documentation automatically",
        "Providing intelligent onboarding assistants for customers"
      ]
    },
    {
      id: "sec-key-takeaways",
      title: "Key Takeaways & Product Philosophy",
      summaryCallout: "Whenever I encounter a business process that requires the same work to be repeated over and over again, I ask: 'Why should teams have to do this repeatedly?'",
      type: "standard",
      content: [
        "My Product Philosophy: This project perfectly reflects the way I approach Product Management.",
        "Whenever I encounter a business process that requires the same work to be repeated over and over again, I ask a simple question: 'Why should customers or implementation teams have to do this repeatedly?'",
        "That mindset shaped the Supplier Integration Platform. The goal wasn't simply to connect suppliers—the goal was to remove unnecessary effort from supplier onboarding while creating a scalable platform capable of supporting future growth.",
        "To me, that is what Product Management is about—building products that make complex work feel simple."
      ],
      keyTakeaways: [
        "Enterprise platforms create the greatest value when they eliminate repetitive work rather than simply adding new functionality.",
        "Standardization and configurability must be carefully balanced to support diverse customer requirements without increasing product complexity.",
        "Product decisions should focus on solving common business patterns rather than individual customer exceptions.",
        "Successful platform products require close collaboration across Product, Engineering, Professional Services, Customer Support, and customers.",
        "Great Product Management is about designing systems that become simpler as they scale—not more complicated."
      ]
    }
  ]
};
