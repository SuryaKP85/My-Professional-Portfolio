export interface CaseStudySection {
  id: string;
  title: string;
  summaryCallout: string;
  content?: string | string[];
  subsections?: {
    id?: string;
    title: string;
    summaryCallout?: string;
    content?: string | string[];
    bullets?: string[];
  }[];
  bullets?: string[];
  keyTakeaways?: string[];
  type?: 'problem' | 'solution' | 'strategy' | 'tradeoffs' | 'outcome' | 'standard';
  metrics?: { label: string; value: string }[];
}

export interface CaseStudyInitiative {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  defaultExpanded?: boolean;
  sections: CaseStudySection[];
}

export interface OverallBusinessImpact {
  summary: string;
  metricsTable: {
    outcome: string;
    impact: string;
    description?: string;
  }[];
  foundationNote?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  company: string;
  summary: string;
  executiveSummary?: string;
  problem: string;
  solution: string;
  role: string;
  businessOutcome: string;
  techStack: string[];
  futureVision: string;
  featured: boolean;
  image: string;
  metrics: { label: string; value: string }[];
  sections?: CaseStudySection[];
  initiatives?: CaseStudyInitiative[];
  overallBusinessImpact?: OverallBusinessImpact;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  category: string;
  description: string;
  careerSummary?: string;
  majorAchievements: string[];
  keyContributions?: string[];
  productsOwned: string[];
  businessImpact: string;
  technologies: string[];
  kpisImproved?: string[];
  whatILearned?: string;
  companyLogo?: string;
  industryPartnerships?: {
    description: string;
    oceanCarriers: string[];
    logisticsProviders: string[];
    enterpriseCustomers: string[];
  };
}

export interface SkillItem {
  name: string;
  experience?: string;
  howIApplyIt?: string;
  keyAreas?: string[];
  frameworks?: string[];
  philosophy?: string;
  highlight?: string;
  level?: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  badgeUrl?: string;
  description: string;
  skillsVerified: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: string;
  author: string;
  tags: string[];
  published: boolean;
}

export interface VisitorLead {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  company?: string;
  designation?: string;
  date: string;
  time: string;
  ip: string;
  country: string;
  device: string;
  browser: string;
  pagesVisited: string[];
  timeSpent: string;
  trafficSource: string;
  referrer: string;
  isReturning: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  executiveSummary: string;
  yearsExperience: number;
  location: string;
  email: string;
  linkedIn: string;
  github: string;
  photoUrl: string;
  stats: {
    years: string;
    enterpriseValue: string;
    productsDelivered: string;
    teamSize: string;
  };
  philosophy: {
    career: string;
    leadership: string;
    productMindset: string;
    problemSolving: string;
    approachPM: string;
  };
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  description?: string;
}

export interface CMSData {
  profile: ProfileData;
  experiences: ExperienceItem[];
  projects: Project[];
  skillCategories: SkillCategory[];
  certifications: Certification[];
  education?: EducationItem[];
  blogPosts: BlogPost[];
}
