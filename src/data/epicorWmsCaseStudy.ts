import { Project } from '../types';

export const epicorWmsCaseStudy: Project = {
  id: "proj-epicor-wms",
  title: "Warehouse Management Modernization",
  subtitle: "Reimagining warehouse operations through modern product design",
  category: "Warehouse Management",
  company: "Epicor Software",
  summary: "Modernized legacy RF client software into a responsive Web UI for Epicor Prophet 21 ERP, replacing platform-specific deployments with a device-independent platform designed around warehouse user workflows.",
  executiveSummary: "Modernized the existing Warehouse Management System for Epicor Prophet 21 ERP by replacing legacy RF technology with a responsive Web UI, significantly improving usability, workflow efficiency, and platform flexibility across distribution and wholesale enterprise customers.",
  problem: "Legacy RF clients were platform-specific, difficult to deploy across modern devices, required excessive navigation, and presented dated interfaces containing unnecessary screen complexity for warehouse operators.",
  solution: "Delivered a responsive Web UI built around warehouse operator workflows, enabling Build Once Run Anywhere deployment across Android and handheld devices while showing only relevant task data.",
  role: "Lead Product Owner / Product Manager — Responsible for product vision, Customer Advisory Board prioritization, epic creation, UX workflow design, and cross-functional execution across engineering, services, and support.",
  businessOutcome: "Dramatically improved warehouse usability, simplified operator workflows, reduced training effort, created a flexible Web-based platform foundation, and increased customer satisfaction.",
  techStack: ["Epicor Prophet 21", "Responsive Web UI", "Cross-Platform RF", "Android RF Handhelds", "RICE Prioritization", "Agile / Scrum"],
  futureVision: "Integrating Artificial Intelligence to proactively assist warehouse operators with intelligent picking recommendations, predictive replenishment, AI-assisted exception handling, and context-aware guidance.",
  featured: true,
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
  metrics: [
    { label: "Deployment Flexibility", value: "Cross-Platform" },
    { label: "Screen Navigation", value: "Simplified" },
    { label: "Operator Training Effort", value: "Significantly Reduced" }
  ],
  sections: [
    {
      id: "sec-why-mattered",
      title: "Why This Project Mattered",
      summaryCallout: "Warehouse success is measured by physical operational efficiency—not software complexity. Modernizing legacy RF clients presented a chance to eliminate workflow friction and build for future enterprise scale.",
      type: "standard",
      content: [
        "Warehouse teams don't measure success by software—they measure it by how efficiently products move through the warehouse. Every unnecessary screen, extra click, or confusing workflow slows operations, increases training effort, and ultimately impacts customer satisfaction.",
        "When I joined Epicor, the Warehouse Management System had already been serving distributors and wholesalers successfully for several years. However, after nearly eight years, both the technology and user experience had begun to show their age. The application relied on platform-specific RF clients that were becoming increasingly difficult to deploy and maintain across the growing variety of warehouse devices.",
        "But technology wasn't the real problem.",
        "The real challenge was usability.",
        "Warehouse operators needed an application that helped them complete tasks quickly, accurately, and confidently. They didn't care what technology powered the application—they cared about getting their work done with fewer clicks, less training, and minimal friction.",
        "This project became an opportunity to rethink how warehouse users interact with enterprise software while creating a platform capable of supporting future customer needs."
      ]
    },
    {
      id: "sec-exec-summary",
      title: "Executive Summary",
      summaryCallout: "Lead PM initiative to replace legacy RF clients with a responsive Web UI for Epicor Prophet 21 ERP, dramatically improving usability, workflow efficiency, and multi-device platform flexibility across wholesale distribution.",
      type: "standard",
      content: [
        "Project: Warehouse Management System Modernization",
        "Company: Epicor Software",
        "ERP Platform: Epicor Prophet 21",
        "Industry: Distribution & Wholesale",
        "Role: Lead Product Owner / Product Manager",
        "Primary Objective: Modernize the existing Warehouse Management System by replacing legacy RF technology with a responsive Web UI while significantly improving usability, workflow efficiency, and platform flexibility."
      ]
    },
    {
      id: "sec-understanding-business",
      title: "Understanding the Business",
      summaryCallout: "Epicor Prophet 21 powers thousands of daily high-velocity warehouse transactions across Receiving, Picking, Packing, and Replenishment where small usability gains drive massive operational productivity.",
      type: "standard",
      content: [
        "Epicor Prophet 21 is an ERP platform designed for distributors and wholesalers, where warehouse efficiency plays a critical role in overall business performance.",
        "The Warehouse Management System supports the day-to-day activities that keep products moving through the supply chain, including:"
      ],
      bullets: [
        "Receiving",
        "Directed Putaway",
        "Inventory Transfers",
        "Picking",
        "Packing",
        "Replenishment",
        "Cycle Counting",
        "Physical Inventory",
        "Returns",
        "Cross Docking"
      ],
      subsections: [
        {
          title: "Business Impact of Daily Transactions",
          content: [
            "For many customers, these processes represent thousands of daily warehouse transactions. Even small usability improvements can significantly reduce operational effort and improve employee productivity.",
            "Modernizing the product wasn't simply about updating technology. It was about improving how warehouse teams interacted with the software every day."
          ]
        }
      ]
    },
    {
      id: "sec-understanding-customer",
      title: "Understanding the Customer",
      summaryCallout: "Direct field observations, customer visits, and Customer Advisory Board sessions revealed a critical product truth: Most warehouse frustrations stemmed from unnecessary screen complexity rather than missing features.",
      type: "standard",
      content: [
        "One of the most valuable aspects of this project was the opportunity to engage directly with warehouse users and understand how they actually worked.",
        "Rather than relying only on feature requests, I gathered insights through multiple channels:"
      ],
      bullets: [
        "Bi-weekly Customer Advisory Board (CAB) meetings",
        "Direct customer conversations",
        "Warehouse visits",
        "User observation sessions",
        "Product workshops",
        "Professional Services teams",
        "Customer Support teams",
        "Product roadmap discussions"
      ],
      subsections: [
        {
          title: "Core Customer Discovery Insight",
          content: [
            "I also encouraged customers to reach out directly with their ideas, frustrations, and operational pain points. This helped ensure that product decisions were based on real warehouse workflows rather than assumptions.",
            "Spending time observing warehouse users revealed something important:",
            "Most frustrations weren't caused by missing functionality—they were caused by unnecessary complexity."
          ]
        }
      ]
    },
    {
      id: "sec-customer-problem",
      title: "The Customer Problem",
      summaryCallout: "Legacy RF clients suffered from slow repetitive interactions, excessive screen navigation, hardware-bound UI, and platform-specific deployment overhead that slowed operator throughput.",
      type: "problem",
      content: [
        "Customers consistently highlighted several challenges with the existing Warehouse Management System.",
        "The product had become increasingly difficult to use within modern warehouse environments.",
        "Common concerns included:"
      ],
      bullets: [
        "Slow user interactions during repetitive warehouse tasks.",
        "RF screens requiring excessive navigation.",
        "A dated interface designed around older hardware.",
        "Poor mobile experience on newer RF devices.",
        "Platform-specific deployments that complicated implementation.",
        "Difficult customization.",
        "Performance limitations.",
        "Screens containing more information than users actually needed."
      ],
      subsections: [
        {
          title: "Core Usability & Operational Friction",
          content: [
            "None of these issues prevented customers from completing warehouse operations.",
            "However, together they created unnecessary friction that affected productivity, training effort, and user satisfaction.",
            "The opportunity wasn't simply to modernize the software.",
            "The opportunity was to simplify the warehouse experience."
          ]
        }
      ]
    },
    {
      id: "sec-product-vision",
      title: "Product Vision",
      summaryCallout: "Architected around three core pillars: Simplify Warehouse Workflows, Build Once Run Anywhere via Web UI, and Show Only What Matters to operators.",
      type: "strategy",
      content: [
        "From the beginning, I wanted the modernization effort to achieve three clear objectives."
      ],
      subsections: [
        {
          title: "Simplify Warehouse Workflows",
          summaryCallout: "Core question: Can this task be completed faster and with fewer steps?",
          content: [
            "The objective wasn't to recreate existing screens using newer technology.",
            "Instead, every workflow was reviewed with one question:",
            "Can this task be completed faster and with fewer steps?"
          ]
        },
        {
          title: "Build Once, Run Anywhere",
          summaryCallout: "Universal Web UI replacing OS-specific legacy RF applications across diverse Android and handheld devices.",
          content: [
            "The legacy application required operating system-specific implementations.",
            "Modern RF devices were increasingly adopting Android and other platforms, making maintenance more complex.",
            "Moving to a Web UI allowed customers to use a single application across multiple RF devices without maintaining different platform-specific versions."
          ]
        },
        {
          title: "Show Only What Matters",
          summaryCallout: "Contextual UI principle: The right information should appear for the right user at the right time.",
          content: [
            "Warehouse operators should never be overwhelmed by unnecessary information.",
            "One principle guided every screen design:",
            "The right information should appear for the right user at the right time.",
            "This philosophy influenced every design discussion throughout the project."
          ]
        }
      ]
    },
    {
      id: "sec-discovery-research",
      title: "Discovery & Research",
      summaryCallout: "Combined Customer Advisory Board voting, field observation, and RICE framework prioritization to balance high-demand requests with engineering effort and operational efficiency.",
      type: "standard",
      content: [
        "Product discovery combined structured prioritization with continuous customer engagement.",
        "Customer priorities were collected through:"
      ],
      bullets: [
        "Customer Advisory Board voting",
        "Customer interviews",
        "Professional Services feedback",
        "Support cases",
        "Warehouse observations",
        "Product workshops"
      ],
      subsections: [
        {
          title: "RICE Prioritization Framework",
          content: [
            "Roadmap decisions balanced customer demand with business value using a combination of customer voting and the RICE prioritization framework.",
            "Rather than simply implementing the highest-voted requests, each decision considered:"
          ],
          bullets: [
            "Customer impact",
            "Frequency of use",
            "Operational efficiency",
            "Long-term product direction",
            "Engineering effort"
          ]
        },
        {
          title: "Strategic Alignment",
          content: [
            "This helped ensure the roadmap remained both customer-driven and strategically aligned."
          ]
        }
      ]
    },
    {
      id: "sec-product-strategy",
      title: "Product Strategy",
      summaryCallout: "Focused on progressive, non-disruptive modernization that improves user experience, maintainability, and device independence while serving established enterprise clients.",
      type: "strategy",
      content: [
        "The modernization effort was never intended to be a simple technology migration.",
        "Instead, it focused on improving the overall warehouse experience while creating a foundation for future innovation.",
        "Key strategic priorities included:"
      ],
      bullets: [
        "Modern Web-based user experience.",
        "Device-independent deployment.",
        "Simplified warehouse workflows.",
        "Reduced training effort.",
        "Improved platform flexibility.",
        "Better long-term maintainability.",
        "Progressive modernization without disrupting existing customer operations."
      ],
      subsections: [
        {
          title: "Guiding Strategic Question",
          content: [
            "Every roadmap decision was evaluated against one guiding question:",
            "Does this make warehouse operations simpler for the customer?"
          ]
        }
      ]
    },
    {
      id: "sec-my-role",
      title: "My Role",
      summaryCallout: "Lead PM & Product Owner owning vision, roadmap, Customer Advisory Board alignment, epics, user stories, sprint planning, and cross-functional execution across engineering and UX.",
      type: "strategy",
      content: [
        "As the Product Manager leading this initiative, my responsibilities extended far beyond writing requirements.",
        "I was responsible for driving the overall product direction by working closely with customers, Professional Services, Engineering, UX, QA, Support, and executive stakeholders.",
        "My responsibilities included:"
      ],
      bullets: [
        "Product vision and roadmap planning",
        "Customer discovery",
        "Customer Advisory Board meetings",
        "Product prioritization",
        "Epic creation",
        "User stories",
        "Acceptance criteria",
        "Workflow design",
        "Sprint planning",
        "Release planning",
        "Daily collaboration with Engineering",
        "UX reviews",
        "Executive roadmap discussions"
      ],
      subsections: [
        {
          title: "Leadership Impact",
          content: [
            "Because I was leading the modernization initiative, my prioritization decisions directly influenced sprint planning and delivery sequencing."
          ]
        }
      ]
    },
    {
      id: "sec-key-decisions",
      title: "Key Product Decisions",
      summaryCallout: "Prioritized evidence-based customer value over executive sponsorship pressure when evaluating competing high-demand feature requests.",
      type: "tradeoffs",
      content: [
        "One of the most challenging decisions occurred when two highly requested features received nearly identical customer demand.",
        "To complicate matters further, one influential customer had executive sponsorship and strongly advocated for their preferred feature to be delivered first.",
        "Rather than prioritizing based on influence, I revisited customer usage patterns, operational impact, and supporting data.",
        "Although the decision required difficult stakeholder conversations, I chose the feature that created greater value across the broader customer base.",
        "This reinforced one of my core Product Management principles:",
        "Product decisions should be guided by evidence and customer value—not by the loudest voice in the room."
      ]
    },
    {
      id: "sec-collaboration",
      title: "Cross-functional Collaboration",
      summaryCallout: "Orchestrated daily alignment across Engineering, UX, QA, Professional Services, Support, Customer Advisory Board, and C-suite leadership.",
      type: "strategy",
      content: [
        "This project required continuous collaboration across multiple teams.",
        "I worked daily with:"
      ],
      bullets: [
        "Engineering",
        "UX Designers",
        "QA",
        "Professional Services",
        "Customer Support",
        "Customer Advisory Board members",
        "Executive Leadership"
      ],
      subsections: [
        {
          title: "Alignment Strategy",
          content: [
            "Product decisions were rarely made in isolation.",
            "Successful delivery depended on aligning technical feasibility, customer expectations, business priorities, and long-term product strategy."
          ]
        }
      ]
    },
    {
      id: "sec-capabilities",
      title: "Product Capabilities",
      summaryCallout: "Delivered responsive Web UI, cross-platform RF support, reduced screen complexity, and a modern flexible platform foundation.",
      type: "solution",
      content: [
        "The modernization introduced several important improvements:"
      ],
      bullets: [
        "Responsive Web UI",
        "Cross-platform RF support",
        "Simplified warehouse workflows",
        "Device-independent deployment",
        "Workflow-focused user experience",
        "Better usability",
        "Improved navigation",
        "Reduced screen complexity",
        "Modernized platform foundation",
        "Improved flexibility for future enhancements"
      ],
      subsections: [
        {
          title: "Core Focus",
          content: [
            "The focus remained on enabling warehouse users to complete their work more efficiently rather than introducing unnecessary functionality."
          ]
        }
      ]
    },
    {
      id: "sec-tradeoffs",
      title: "Challenges & Trade-offs",
      summaryCallout: "Balanced backward compatibility and continuous maintenance with progressive modernization; key reflection: bundling complementary workflows accelerates adoption.",
      type: "tradeoffs",
      content: [
        "Modernizing an existing enterprise product presented several challenges.",
        "The platform already had an established customer base, making backward compatibility an important consideration.",
        "Customers often had different priorities depending on how they used the product.",
        "Engineering also had to balance modernization efforts with ongoing product maintenance.",
        "Rather than rebuilding everything at once, the product was modernized incrementally.",
        "Looking back, one lesson stands out.",
        "If starting again, I would release multiple related warehouse workflows together instead of modernizing one feature at a time.",
        "Grouping complementary workflows would likely have accelerated customer adoption and generated broader feedback earlier in the program."
      ]
    },
    {
      id: "sec-impact",
      title: "Business Impact",
      summaryCallout: "Elevated warehouse operator productivity, reduced training overhead, boosted customer satisfaction, and established a scalable Web platform foundation.",
      type: "outcome",
      content: [
        "Although the modernization was not measured using public business metrics, it delivered meaningful operational improvements.",
        "The project:"
      ],
      bullets: [
        "Improved warehouse usability.",
        "Simplified user workflows.",
        "Increased customer satisfaction.",
        "Reduced training effort.",
        "Created a flexible Web-based platform.",
        "Improved deployment across modern RF devices.",
        "Established a stronger foundation for future product innovation."
      ],
      subsections: [
        {
          title: "Strategic Mindset Shift",
          content: [
            "More importantly, it shifted the focus from modernizing technology to improving the warehouse user experience."
          ]
        }
      ]
    },
    {
      id: "sec-lessons",
      title: "Lessons Learned",
      summaryCallout: "Technology should never drive product decisions—modernization is about simplifying how customers work through deep workflow discovery.",
      type: "standard",
      content: [
        "This project fundamentally changed how I approach Product Management.",
        "One lesson became very clear:",
        "Technology should never drive product decisions.",
        "The best products are designed by understanding customer workflows first and then selecting the technology that best supports those workflows.",
        "I also learned that successful modernization requires patience.",
        "Rather than immediately redesigning everything, product teams should invest time gathering customer insights, validating assumptions, and understanding operational pain points before deciding what should change.",
        "Modernization is not about replacing software.",
        "It is about simplifying how customers work."
      ]
    },
    {
      id: "sec-future-ai",
      title: "If I Were Building This Today",
      summaryCallout: "Harness AI for automated wireframing, feedback pattern analysis, and interactive prototyping, while embedding intelligent picking and predictive replenishment directly into WMS.",
      type: "standard",
      content: [
        "If I were starting this project today, I would still begin with customer workflows rather than technology.",
        "However, Artificial Intelligence would significantly accelerate product discovery and design.",
        "I would use AI to:"
      ],
      bullets: [
        "Generate initial workflow wireframes from customer requirements.",
        "Analyze customer feedback to identify recurring usability patterns.",
        "Create interactive design prototypes before development begins.",
        "Validate user journeys with customers much earlier in the discovery process."
      ],
      subsections: [
        {
          title: "Next-Generation WMS Evolution",
          content: [
            "Within the product itself, I believe modern Warehouse Management Systems will evolve beyond recording warehouse transactions.",
            "The next generation of WMS should proactively assist warehouse operators by providing:"
          ],
          bullets: [
            "Intelligent picking recommendations.",
            "Predictive replenishment suggestions.",
            "AI-assisted exception handling.",
            "Context-aware user guidance.",
            "Smarter warehouse decision support."
          ]
        },
        {
          title: "Core Purpose",
          content: [
            "The objective isn't to automate every decision.",
            "The objective is to help warehouse teams make better decisions, faster."
          ]
        }
      ]
    },
    {
      id: "sec-takeaways",
      title: "Key Takeaways",
      summaryCallout: "4 Core Executive Lessons: Workflow-first value, evidence-based prioritization, right-time information presentation, and cross-functional alignment.",
      type: "outcome",
      bullets: [
        "Modernization is successful when it improves customer workflows—not just technology.",
        "Product decisions should be driven by customer evidence and business impact rather than stakeholder influence alone.",
        "Enterprise software should present the right information to the right user at the right time.",
        "Simplifying complex operations requires continuous collaboration between customers, engineering teams, and business stakeholders."
      ]
    }
  ]
};
