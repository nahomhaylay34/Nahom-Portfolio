import { Project, Certification, FutureGoal, ContactItem } from "./types";

export const projectsData: Project[] = [
  {
    id: "spark-security",
    title: "Spark Security Corporate Website",
    description: "Designed and developed a modern corporate website for Spark Security from concept to deployment. Built interactive 3D experiences using Three.js to create an engaging and visually dynamic user experience. Implemented responsive layouts, animated interface components, and interactive content optimized for desktop and mobile devices.",
    image: "/Spark.jpg",
    tags: ["React", "Vite", "Tailwind CSS", "Three.js", "Vercel"],
    liveDemoUrl: "https://sparksec-web.vercel.app/",
    githubUrl: "https://github.com/nahomhaylay34/sparksec-web"
  },
  {
    id: "crime-management",
    title: "Crime Management System",
    description: "Developed a role-based crime management platform (Graduation Project) with dedicated dashboards for administrators, police officers, and citizens. Implemented secure authentication and authorization using JWT. Built RESTful backend services connected to a MySQL database for efficient case management and reporting. Designed responsive interfaces to improve accessibility and user experience across multiple roles.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Node.js", "MySQL", "JWT Authentication"],
    githubUrl: "https://github.com/nahomhaylay34/Ethiopia-Police-Minister"
  },
  {
    id: "task-management",
    title: "School Task Management Mobile Application",
    description: "Developed a cross-platform mobile application to help students organize academic tasks and schedules. Built intuitive mobile interfaces focused on usability and productivity. Integrated backend services for user data management and task synchronization.",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80",
    tags: ["React Native", "Expo", "Node.js"],
    githubUrl: "https://github.com/nahomhaylay34/Hope-apllication"
  },
  {
    id: "daycare-management",
    title: "Daycare Management System",
    description: "Developed a web-based daycare management system with dedicated dashboards for administrators, staff, and parents. Designed responsive interfaces to streamline daily management activities and user communication.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Vite", "Node.js", "MySQL"],
    liveDemoUrl: "https://github.com/nahomhaylay34",
    githubUrl: "https://github.com/nahomhaylay34"
  }
];

export const certificationsData: Certification[] = [
  {
    id: "mern",
    title: "MERN Stack: All You Need to Know with Practical Project",
    issuer: "Udemy",
    certId: "MERN-UDEMY-99",
    description: "Full stack MERN application engineering, database structuring, state control mechanisms, and production-level deployment techniques."
  },
  {
    id: "blockchain",
    title: "Learn Blockchain and Cryptocurrency from Beginning",
    issuer: "Udemy",
    certId: "BLOCKCHAIN-UDEMY-01",
    description: "Foundations of decentralized ledger mechanics, cryptographic protocols, token structures, and smart contract design patterns."
  }
];

export const futureGoalsData: FutureGoal[] = [
  {
    id: "currently-learning",
    category: "ACTIVE_PROCESS",
    title: "Currently Learning",
    description: "Mastering advanced client-side interfaces, responsive frameworks, and fluid interactive interactive components.",
    tags: ["UI/UX", "State Control", "Fluid Design"],
    icon: "psychology"
  },
  {
    id: "career-goals",
    category: "STRATEGIC_PLAN",
    title: "Career Goals",
    description: "Building production web applications, integrating REST APIs, and architecting secure backend services with high reliability.",
    status: "90%",
    icon: "rocket_launch"
  },
  {
    id: "open-opportunities",
    category: "COLLABORATION_READY",
    title: "Open to Opportunities",
    description: "Actively seeking Full Stack or Frontend roles where technical rigor matches intuitive design.",
    tags: ["React", "Node.js", "Full Stack"],
    icon: "handshake"
  },
  {
    id: "dream-tech",
    category: "RESEARCH_SCOPE",
    title: "Dream Technologies",
    description: "Furthering expertise in cloud architecture, modern databases, and robust microservice APIs.",
    tags: ["Docker", "TypeScript", "Cloud APIs"],
    icon: "hub"
  }
];

export const contactData: ContactItem[] = [
  {
    id: "email",
    label: "Email",
    value: "nahomhaylay34@gmail.com",
    icon: "mail",
    badge: "DIRECT_COMM",
    actionLabel: "Copy",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=nahomhaylay34@gmail.com"
  },
  {
    id: "github",
    label: "GitHub",
    value: "https://github.com/nahomhaylay34",
    icon: "code_blocks",
    badge: "SOURCE_CONTROL",
    actionLabel: "View Repos",
    link: "https://github.com/nahomhaylay34"
  },

  {
    id: "phone",
    label: "Phone",
    value: "+251 954 883 155",
    icon: "call",
    badge: "VOICE_LINK",
    actionLabel: "Copy",
    link: "tel:+251954883155"
  },
  {
    id: "resume",
    label: "Resume",
    value: "Nahom_Haylay_Tsadik_Resume.pdf",
    icon: "description",
    badge: "DOC_MANIFEST",
    actionLabel: "Download",
    link: "#"
  }
];
