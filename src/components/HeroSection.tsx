import React, { useRef, useState } from "react";
import { ArrowRight, Download, Terminal } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Kinetic card tilt math based on mouse cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max 10 degrees tilt rotation
    const rotX = (y - centerY) / 20;
    const rotY = (centerX - x) / 20;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative px-6 md:px-16 py-20 overflow-hidden flex flex-col items-center justify-center min-h-[920px] max-w-[1280px] mx-auto z-10"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Hero Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col gap-8"
        >
          <div className="flex items-center gap-4 select-none">
            <span className="px-3.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest animate-pulse">
              AVAILABLE FOR HIRE
            </span>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black text-on-surface leading-[1.1] tracking-tighter">
            BUILDING MODERN SOLUTIONS WITH{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ENGINEERING PRECISION
            </span>
          </h1>

          <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Nahom Haylay Tsadik — Electrical &amp; Computer Engineering graduate and Full Stack Developer. 
            Blending hardware rigor with high-performance software engineering to create resilient digital ecosystems.
          </p>

          <div className="flex flex-wrap gap-5 mt-4">
            <button 
              onClick={() => scrollToSection("graduation")}
              className="group relative px-6 py-4 bg-primary/15 hover:bg-primary/25 backdrop-blur-md border border-primary/30 text-primary text-xs font-mono font-bold rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(173,198,255,0.05)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore My Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => scrollToSection("projects")}
              className="px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-on-surface text-xs font-mono font-bold rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              View Portfolio
            </button>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-8 mt-10">
            <div className="flex flex-col select-none">
              <span className="font-headline text-3xl font-bold text-primary">04+</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">YEARS EXP.</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col select-none">
              <span className="font-headline text-3xl font-bold text-primary">24/7</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">DEV UPTIME</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Profile Card with Interactive 3D hover tilt */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 relative perspective-1000"
        >
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
              transformStyle: "preserve-3d"
            }}
            className="glass-card p-6 rounded-2xl flex flex-col gap-6 shadow-2xl relative select-none"
          >
            {/* Portrait Image container */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 group bg-surface-container-low">
              <img 
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 brightness-[0.85] group-hover:brightness-[0.95]" 
                alt="Nahom Tsadik Ethiopia portrait" 
                referrerPolicy="no-referrer"
                src="/profile.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 z-10">
                <h3 className="font-headline text-2xl font-bold text-on-surface">Nahom Tsadik</h3>
                <p className="font-mono text-[11px] font-bold text-primary tracking-wider uppercase mt-1">SYSTEM ARCHITECT</p>
              </div>
            </div>

            {/* Quick Skills Grid matrix */}
            <div className="grid grid-cols-2 gap-3.5 font-mono text-[11px]">
              <div className="p-3.5 bg-white/5 border border-white/5 rounded-lg flex flex-col gap-1 hover:border-primary/20 transition-colors">
                <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Backend</span>
                <span className="text-on-surface font-semibold text-xs">Node.js / Go</span>
              </div>
              <div className="p-3.5 bg-white/5 border border-white/5 rounded-lg flex flex-col gap-1 hover:border-primary/20 transition-colors">
                <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Frontend</span>
                <span className="text-on-surface font-semibold text-xs">React / Next.js</span>
              </div>
              <div className="p-3.5 bg-white/5 border border-white/5 rounded-lg flex flex-col gap-1 hover:border-primary/20 transition-colors">
                <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Hardware</span>
                <span className="text-on-surface font-semibold text-xs">Embedded C++</span>
              </div>
              <div className="p-3.5 bg-white/5 border border-white/5 rounded-lg flex flex-col gap-1 hover:border-primary/20 transition-colors">
                <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">DevOps</span>
                <span className="text-on-surface font-semibold text-xs">AWS / Docker</span>
              </div>
            </div>
          </div>

          {/* Glowing backlights behind portrait card */}
          <div className="absolute -inset-4 bg-primary/10 blur-[100px] -z-10 rounded-full opacity-60 pointer-events-none" />
          <div className="absolute -inset-4 bg-secondary/5 blur-[80px] -z-10 rounded-full translate-x-12 translate-y-12 opacity-40 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
