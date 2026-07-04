import React from "react";
import { BrainCircuit, Rocket, ShieldCheck, HeartHandshake, GitMerge, Settings, CodeXml, Terminal } from "lucide-react";
import { futureGoalsData } from "../data";
import { motion } from "motion/react";

export default function FutureGoalsSection() {
  const getIcon = (id: string) => {
    switch (id) {
      case "currently-learning":
        return <BrainCircuit className="w-8 h-8 text-primary" />;
      case "career-goals":
        return <Rocket className="w-8 h-8 text-secondary" />;
      case "open-opportunities":
        return <HeartHandshake className="w-8 h-8 text-secondary" />;
      case "dream-tech":
        return <GitMerge className="w-8 h-8 text-primary" />;
      default:
        return <Settings className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <section id="future-goals" className="px-6 md:px-16 py-24 max-w-[1280px] mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col mb-12 select-none">
        <span className="text-secondary font-mono text-[10px] uppercase tracking-widest mb-3 block font-bold">
          // STRATEGIC_ROADMAP
        </span>
        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface">
          Future Goals
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {futureGoalsData.map((goal, index) => {
          if (goal.id === "currently-learning") {
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="md:col-span-7 glass-card p-8 rounded-xl min-h-[320px] relative overflow-hidden group hover:border-primary/20 hover:-translate-y-1 transition-all"
              >
                <div className="relative z-10 h-full flex flex-col justify-between select-none">
                  <div className="flex justify-between items-start mb-6">
                    {getIcon(goal.id)}
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-mono text-[10px] font-bold">
                      {goal.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface mb-3">
                      {goal.title}
                    </h3>
                    <p className="font-mono text-xs text-on-surface-variant mb-6 max-w-md leading-relaxed">
                      {goal.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {goal.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/15 transition-all duration-700 pointer-events-none" />
              </motion.div>
            );
          }

          if (goal.id === "career-goals") {
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-5 glass-card p-8 rounded-xl min-h-[320px] flex flex-col justify-between hover:border-secondary/20 hover:-translate-y-1 transition-all"
              >
                <div className="select-none flex justify-between items-start">
                  {getIcon(goal.id)}
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-mono text-[10px] font-bold">
                    {goal.category}
                  </span>
                </div>
                <div className="select-text mt-4">
                  <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface mb-3">
                    {goal.title}
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
                    {goal.description}
                  </p>
                </div>
                {/* Visual Progress Meter bar */}
                <div className="mt-8 h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative select-none">
                  <div 
                    style={{ width: goal.status }}
                    className="h-full bg-secondary shadow-[0_0_12px_rgba(208,188,255,0.6)] rounded-full" 
                  />
                </div>
              </motion.div>
            );
          }

          if (goal.id === "open-opportunities") {
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="md:col-span-5 glass-card p-8 rounded-xl min-h-[320px] flex flex-col justify-between hover:border-secondary/20 hover:-translate-y-1 transition-all"
              >
                <div className="select-none flex justify-between items-start">
                  {getIcon(goal.id)}
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-mono text-[10px] font-bold">
                    {goal.category}
                  </span>
                </div>
                <div className="select-text mt-4">
                  <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface mb-3">
                    {goal.title}
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant leading-relaxed mb-6">
                    {goal.description}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 select-none">
                  <div className="flex -space-x-2.5 font-mono text-[10px] font-bold">
                    {goal.tags?.map((t) => (
                      <div 
                        key={t}
                        className="w-8.5 h-8.5 rounded-full border-2 border-background bg-surface-container flex items-center justify-center text-[10px]"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-on-surface-variant font-bold">
                    COLLABORATION_READY
                  </span>
                </div>
              </motion.div>
            );
          }

          // Goal 4: Dream Technologies
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-7 glass-card p-8 rounded-xl min-h-[320px] relative overflow-hidden group hover:border-primary/20 hover:-translate-y-1 transition-all"
            >
              <div className="relative z-10 h-full flex flex-col justify-between select-none">
                <div className="flex justify-between items-start mb-6">
                  {getIcon(goal.id)}
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-mono text-[10px] font-bold">
                    {goal.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface mb-3">
                    {goal.title}
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant leading-relaxed mb-6 max-w-lg">
                    {goal.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                      <Settings className="w-3.5 h-3.5 text-primary" />
                      <span className="font-mono text-xs">Docker</span>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                      <CodeXml className="w-3.5 h-3.5 text-primary" />
                      <span className="font-mono text-xs">Rust/Wasm</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
