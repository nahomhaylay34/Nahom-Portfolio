export interface TechStackItem {
  name: string;
  category: "backend" | "frontend" | "hardware" | "devops";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  certId: string;
  description: string;
}

export interface FutureGoal {
  id: string;
  category: string;
  title: string;
  description: string;
  status?: string;
  tags?: string[];
  icon: string;
}

export interface ContactItem {
  id: string;
  label: string;
  value: string;
  icon: string;
  badge: string;
  actionLabel: string;
  link: string;
}
