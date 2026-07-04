import React from "react";
import { Cpu, Terminal, CheckCircle2, Cloud, Globe, Database } from "lucide-react";
import { motion } from "motion/react";

export default function TechStackSection() {
  const checkItems = [
    "Distributed Systems Design",
    "Scalable Cloud Infrastructure",
    "Low-latency API Engineering"
  ];

  const instrumentationTags = ["FPGA", "Firmware", "Microcontrollers", "ARM Architecture"];

  // Animation constants for children stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="skills" className="px-6 md:px-16 py-24 max-w-[1280px] mx-auto z-10">
      {/* Header */}
      <div className="mb-16 select-none">
        <span className="text-primary font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block font-bold">// TECH_STACK</span>
        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">Technical Stack</h2>
        <p className="font-sans text-on-surface-variant mt-4 max-w-xl text-sm leading-relaxed">
          Deep expertise across the full stack, from silicon-level logic to distributed cloud systems.
        </p>
      </div>

      {/* Bento Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6"
      >
        {/* Item 1: Large Card - Precision Instrumentation */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 lg:col-span-8 glass-card rounded-2xl p-8 relative overflow-hidden group hover:border-primary/30 hover:-translate-y-1.5 transition-all"
        >
          <div className="flex flex-col h-full justify-between gap-12 relative z-10 select-none">
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 border border-primary/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-3">Precision Instrumentation</h3>
              <p className="font-sans text-on-surface-variant text-sm max-w-lg leading-relaxed">
                Developing hardware-interfacing software that requires microsecond latency and absolute reliability. 
                My background in Electrical Engineering informs every line of code.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 font-mono text-[11px]">
              {instrumentationTags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-white/5 rounded border border-white/5 hover:border-primary/20 hover:bg-white/10 text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Huge background board vector icon decor */}
          <div className="absolute -right-16 -bottom-16 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none select-none">
            <Cpu className="w-[280px] h-[280px]" />
          </div>
        </motion.div>

        {/* Item 2: Vertical Card - System Architecture */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 lg:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between gap-8 hover:border-primary/30 hover:-translate-y-1.5 transition-all"
        >
          <div className="select-none">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 border border-primary/20">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">System Architecture</h3>
          </div>

          <ul className="space-y-4 select-none">
            {checkItems.map((item) => (
              <li key={item} className="flex items-center gap-3 text-on-surface-variant text-sm font-sans">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Item 3: Small Card - Cloud Native */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 lg:col-span-4 glass-card rounded-2xl p-8 hover:translate-y-[-6px] hover:border-primary/20 transition-all select-none"
        >
          <Cloud className="w-8 h-8 text-primary/80 mb-4" />
          <h4 className="font-headline text-lg text-on-surface mb-3">Cloud Native</h4>
          <p className="font-sans text-on-surface-variant text-xs leading-relaxed">
            Building with high availability and fault tolerance using AWS, Kubernetes, and Terraform.
          </p>
        </motion.div>

        {/* Item 4: Small Card - High-Performance Web */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 lg:col-span-4 glass-card rounded-2xl p-8 hover:translate-y-[-6px] hover:border-primary/20 transition-all select-none"
        >
          <Globe className="w-8 h-8 text-primary/80 mb-4" />
          <h4 className="font-headline text-lg text-on-surface mb-3">High-Performance Web</h4>
          <p className="font-sans text-on-surface-variant text-xs leading-relaxed">
            Architecting fluid experiences with Next.js and optimized WebGL/Three.js visualizations.
          </p>
        </motion.div>

        {/* Item 5: Small Card - Data Persistence */}
        <motion.div 
          variants={cardVariants}
          className="md:col-span-2 lg:col-span-4 glass-card rounded-2xl p-8 hover:translate-y-[-6px] hover:border-primary/20 transition-all select-none"
        >
          <Database className="w-8 h-8 text-primary/80 mb-4" />
          <h4 className="font-headline text-lg text-on-surface mb-3">Data Persistence</h4>
          <p className="font-sans text-on-surface-variant text-xs leading-relaxed">
            Managing complex state and high-throughput data with PostgreSQL, Redis, and MongoDB.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
