import React from "react";
import GraduationModel from "./GraduationModel";
import { Award, GraduationCap, BookOpen, Layers } from "lucide-react";
import { motion } from "motion/react";

export default function GraduationSection() {
  const achievements = [
    {
      icon: <GraduationCap className="w-5 h-5 text-primary" />,
      title: "Aksum University",
      desc: "Bachelor of Science in Electrical & Computer Engineering, CGPA: 3.62 / 4.00, Graduated: June 2026."
    },
    {
      icon: <Award className="w-5 h-5 text-primary" />,
      title: "National Exit Exam: 91.25 / 100",
      desc: "Demonstrated exemplary command of professional engineering practices, software development, and computing standards."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      title: "Relevant Coursework",
      desc: "Object-Oriented Programming, Database Systems, Computer Architecture, C++, Data Structures, Software Engineering, Operating Systems, Computer Networks."
    }
  ];

  return (
    <section id="graduation" className="px-6 md:px-16 py-24 max-w-[1280px] mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Side: Graduation and Academic ECE narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col gap-6 select-text"
        >
          <div className="select-none">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-3 block font-bold">
              // ACADEMIC_MILESTONE
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
              Academic Background
            </h2>
            <p className="font-sans text-on-surface-variant text-sm md:text-base leading-relaxed max-w-xl">
              Engineering is about precision, and graduation is the culmination of years spent masterfully analyzing complex systems.
              My degree in Electrical &amp; Computer Engineering represents rigorous hardware synthesis, algorithmic logic architectures, and structural problem-solving.
            </p>
          </div>

          <div className="space-y-4 mt-4">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              >
                <div className="p-2.5 bg-primary/10 rounded-lg h-fit border border-primary/10 shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-headline text-sm font-bold text-on-surface">
                    {item.title}
                  </h4>
                  <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Interactive 3D Canvas Box for GLB uploader/viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col justify-between glass-card rounded-2xl overflow-hidden shadow-2xl relative border-primary/10 min-h-[460px] bg-surface-container-low"
        >
          {/* Neon wireframe cap scene inside this container */}
          <GraduationModel />

          {/* Subtle surrounding light glow */}
          <div className="absolute -inset-4 bg-primary/5 blur-[80px] -z-10 rounded-full opacity-50 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
