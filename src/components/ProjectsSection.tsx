import React from "react";
import { Rocket, Code, FileText, Smartphone, CreditCard } from "lucide-react";
import { projectsData } from "../data";
import { motion } from "motion/react";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 md:px-16 py-24 max-w-[1280px] mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 select-none">
        <div>
          <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-3 block font-bold">
            // PORTFOLIO_INDEX
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Projects
          </h2>
        </div>
        <p className="font-mono text-xs text-on-surface-variant max-w-sm text-left md:text-right leading-relaxed">
          Experimental engineering projects bridging high-performance logic with avant-garde aesthetics.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
            className="glass-card rounded-2xl flex flex-col group h-full hover:border-primary/40 overflow-hidden relative"
          >
            {/* Project Image Panel */}
            <div className="relative h-60 w-full overflow-hidden bg-surface-container-low select-none">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85] group-hover:brightness-100"
                alt={project.title}
                referrerPolicy="no-referrer"
                src={project.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-70" />
              
              {/* Overlay Tags in Bottom Left */}
              <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-background/45 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[10px] text-primary font-bold border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description Card Content */}
            <div className="p-8 flex-grow flex flex-col justify-between select-text">
              <div>
                <h3 className="font-headline text-xl md:text-2xl font-bold text-primary mb-4">
                  {project.title}
                </h3>
                <p className="font-mono text-xs leading-relaxed text-on-surface-variant mb-8">
                  {project.description}
                </p>
              </div>

              {/* Dynamic Action Buttons inside the Project */}
              <div className="mt-auto flex flex-wrap gap-4 font-mono text-[10px]">
                {/* Live Demo standard action */}
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary border border-primary/25 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-lg transition-all hover:scale-[1.03]"
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    <span>LIVE DEMO</span>
                  </a>
                )}

                {/* Case Study standard action */}
                {project.caseStudyUrl && (
                  <a
                    href={project.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary border border-primary/25 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-lg transition-all hover:scale-[1.03]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>CASE STUDY</span>
                  </a>
                )}

                {/* Github standard action */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary hover:bg-white/5 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
