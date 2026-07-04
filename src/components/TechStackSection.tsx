import React, { useState } from "react";
import { Palette, Settings, Database, Wrench, Rocket, Check, ArrowDown, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TechCardData {
  id: string;
  title: string;
  icon: LucideIcon;
  quote: string;
  hint: string;
  description: string;
  signature: string;
  tech?: string[];
  specialization?: string;
  experience?: string[];
  additional?: string[];
  dailyTools?: string[];
  workflow?: string[];
  principles?: string[];
  currentLearning?: string[];
}

const techCards: TechCardData[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: Palette,
    quote: '"Designing interfaces users enjoy."',
    hint: "Click to explore my frontend toolkit.",
    description: "I create modern, responsive, and interactive user interfaces that combine performance with intuitive user experience. My focus is building applications that feel smooth, accessible, and visually engaging across desktop and mobile devices.",
    tech: ["React", "React Native", "Vite", "Tailwind CSS", "HTML5", "CSS3", "Three.js"],
    specialization: "Responsive Design • Component Architecture • Interactive UI • 3D Experiences",
    signature: "Creating intuitive digital experiences."
  },
  {
    id: "backend",
    title: "Backend Engineering",
    icon: Settings,
    quote: '"Powering applications behind the scenes."',
    hint: "Click to see how I build server-side systems.",
    description: "I develop secure backend systems that manage authentication, business logic, API communication, and database operations to support scalable web and mobile applications.",
    tech: ["Node.js", "Java", "REST APIs", "JWT Authentication"],
    experience: ["User Authentication", "Authorization", "RESTful API Development", "Business Logic", "Secure Routing"],
    signature: "Building secure and scalable foundations."
  },
  {
    id: "database",
    title: "Database Engineering",
    icon: Database,
    quote: '"Turning data into reliable systems."',
    hint: "Click to discover the databases I work with.",
    description: "I design and integrate relational and NoSQL databases to ensure secure, efficient, and well-structured data storage for modern applications.",
    tech: ["MongoDB", "MySQL", "PostgreSQL"],
    additional: ["Data Scraping", "Microsoft Excel", "Data Organization", "Data Validation"],
    signature: "Organizing information that powers applications."
  },
  {
    id: "workflow",
    title: "Developer Workflow",
    icon: Wrench,
    quote: '"From idea to deployment."',
    hint: "Click to see the tools behind my process.",
    description: "Every project follows a structured workflow focused on clean code, version control, collaboration, testing, and maintainability.",
    dailyTools: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Docker (Basic)", "Microsoft Excel"],
    workflow: ["Plan", "Design", "Develop", "Test", "Deploy", "Improve"],
    signature: "Engineering with structure and purpose."
  },
  {
    id: "deployment",
    title: "Deployment & Innovation",
    icon: Rocket,
    quote: '"Bringing ideas to life."',
    hint: "Click to explore how I ship production apps.",
    description: "I deploy modern web applications while continuously exploring new technologies that improve scalability, performance, and user experience.",
    tech: ["Vercel", "Three.js", "Responsive Design", "Performance Optimization"],
    currentLearning: ["Cloud Platforms", "Docker", "CI/CD", "Advanced Three.js", "System Design"],
    signature: "Transforming ideas into production-ready solutions."
  }
];

const CardBack: React.FC<{ card: TechCardData }> = ({ card }) => {
  const Icon = card.icon;
  return (
    <motion.div
      key="back-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
        <Icon className="w-4 h-4 text-primary shrink-0" />
        <h3 className="font-headline text-base font-bold text-primary">{card.title}</h3>
      </div>

      {/* Description */}
      <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed mb-4">
        {card.description}
      </p>

      {/* Core Technologies (all except workflow) */}
      {card.tech && card.id !== "workflow" && (
        <div className="mb-4">
          <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-2">Core Technologies</h4>
          <div className="flex flex-wrap gap-1.5">
            {card.tech.map(t => (
              <span key={t} className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono text-on-surface">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Daily Tools for workflow card */}
      {card.dailyTools && (
        <div className="mb-4">
          <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-2">Daily Tools</h4>
          <div className="flex flex-wrap gap-1.5">
            {card.dailyTools.map(t => (
              <span key={t} className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono text-on-surface">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience (backend) */}
      {card.experience && (
        <div className="mb-4">
          <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-2">Experience Includes</h4>
          <ul className="space-y-1">
            {card.experience.map(exp => (
              <li key={exp} className="flex items-start gap-2 text-[11px] font-sans text-on-surface-variant">
                <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional experience (database) */}
      {card.additional && (
        <div className="mb-4">
          <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-2">Additional Experience</h4>
          <div className="flex flex-wrap gap-1.5">
            {card.additional.map(t => (
              <span key={t} className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono text-on-surface">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Workflow steps */}
      {card.workflow && (
        <div className="mb-4">
          <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-2">My Workflow</h4>
          <div className="flex flex-col items-start gap-1 bg-black/20 rounded-lg p-3">
            {card.workflow.map((step, i) => (
              <React.Fragment key={step}>
                <span className="text-[11px] font-mono text-primary font-bold">{step}</span>
                {i < (card.workflow?.length ?? 0) - 1 && <ArrowDown className="w-3 h-3 text-white/30" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Principles */}
      {card.principles && (
        <div className="mb-4">
          <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-2">Development Principles</h4>
          <ul className="space-y-1">
            {card.principles.map(principle => (
              <li key={principle} className="flex items-start gap-2 text-[11px] font-sans text-on-surface-variant">
                <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Current Learning */}
      {card.currentLearning && (
        <div className="mb-4">
          <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-2">Current Learning</h4>
          <div className="flex flex-wrap gap-1.5">
            {card.currentLearning.map(t => (
              <span key={t} className="px-2 py-1 bg-primary/10 rounded border border-primary/20 text-[10px] font-mono text-primary">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Specialization */}
      {card.specialization && (
        <div className="mb-4">
          <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-1">Specialization</h4>
          <p className="text-[10px] font-mono text-on-surface-variant">{card.specialization}</p>
        </div>
      )}

      {/* Signature */}
      <div className="mt-auto pt-3 border-t border-white/10">
        <p className="font-headline text-xs font-bold text-primary italic">"{card.signature}"</p>
      </div>
    </motion.div>
  );
}

const TechCard: React.FC<{ card: TechCardData; idx: number }> = ({ card, idx }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      className="relative w-full perspective-1000 cursor-pointer"
      style={{ height: "460px" }}
      onClick={() => setIsFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: "spring", stiffness: 280, damping: 25 }}
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div className="flip-card-front absolute inset-0 glass-card rounded-2xl p-8 flex flex-col justify-center items-center text-center border-primary/20 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(99,102,241,0.12)] transition-all duration-300">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5 border border-primary/30">
            <Icon className="w-7 h-7" />
          </div>
          <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{card.title}</h3>
          <p className="font-mono text-xs italic text-primary/70 mb-6 px-4 leading-relaxed">
            {card.quote}
          </p>
          <div className="mt-auto px-4 py-2 bg-primary/5 rounded-full border border-primary/20 text-[10px] font-mono text-primary/80">
            {card.hint}
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back absolute inset-0 glass-card rounded-2xl p-5 flex flex-col border-primary/40 bg-surface-container-low/98 overflow-y-auto">
          <AnimatePresence mode="wait">
            {isFlipped && <CardBack key={card.id} card={card} />}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechStackSection() {
  return (
    <section id="skills" className="px-6 md:px-16 py-24 max-w-[1520px] mx-auto z-10">
      {/* Header */}
      <div className="mb-16 select-none">
        <span className="text-primary font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block font-bold">// TECH_STACK</span>
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
          Technologies &amp; Engineering
        </h2>
        <p className="font-sans text-on-surface-variant mt-4 max-w-xl text-sm leading-relaxed">
          Comprehensive full-stack expertise — front-end immersion, backend reliability, and robust deployment pipelines.
        </p>
      </div>

      {/* Row 1: 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 -mx-6 md:-mx-16">
        {techCards.slice(0, 3).map((card, idx) => (
          <TechCard key={card.id} card={card} idx={idx} />
        ))}
      </div>

      {/* Row 2: 2 cards centered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
        {techCards.slice(3).map((card, idx) => (
          <TechCard key={card.id} card={card} idx={idx + 3} />
        ))}
      </div>
    </section>
  );
}
