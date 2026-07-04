import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TechStackSection from "./components/TechStackSection";
import ProjectsSection from "./components/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection";
import GraduationSection from "./components/GraduationSection";
import FutureGoalsSection from "./components/FutureGoalsSection";
import ContactSection from "./components/ContactSection";
import DeveloperTerminal from "./components/DeveloperTerminal";
import { Cpu, Terminal, ArrowUp, RefreshCw } from "lucide-react";

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Custom glowing ambient coordinates tracked relative to viewport
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Offset position to keep the radial gradient centered on the cursor
      setGlowX(e.clientX - 200);
      setGlowY(e.clientY - 200);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col relative overflow-hidden">
      
      {/* Absolute Dynamic Mouse-Following Glow Light */}
      <div 
        style={{
          transform: `translate3d(${glowX}px, ${glowY}px, 0)`,
          transition: "transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)"
        }}
        className="kinetic-glow select-none"
      />

      {/* Decorative Matrix Background Hex Grid or Ambient Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e2230_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-20 pointer-events-none" />

      {/* Header Sticky Navigation */}
      <Header onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Presentation Workspace */}
      <main className="flex-grow pt-24 pb-16 flex flex-col gap-8">
        
        {/* Section 1: Hero Frame with dynamic tilt profile */}
        <HeroSection />

        {/* Section 2: Technical Stack bento metrics */}
        <TechStackSection />

        {/* Section 3: Engineering Projects indices */}
        <ProjectsSection />

        {/* Section 4: Academic background & custom 3D GLB canvas */}
        <GraduationSection />

        {/* Section 5: Verification modules */}
        <CertificationsSection />

        {/* Section 6: Future strategic goals */}
        <FutureGoalsSection />

        {/* Section 7: Communication Channels flip blocks */}
        <ContactSection />

      </main>

      {/* Interactive Developer Terminal Shell */}
      <DeveloperTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      {/* Floating Utilities panel */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Scroll back to top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-full text-primary hover:text-on-surface shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer backdrop-blur-md"
            title="Scroll To System Root"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Premium System Footnotes */}
      <footer className="w-full border-t border-white/5 py-10 px-6 bg-surface-container-lowest/20 backdrop-blur-md select-none">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-on-surface-variant text-xs font-mono">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary animate-pulse" />
            <span>SYSTEM_LEDGER_LED : Nahom Haylay Tsadik</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span>Uptime: 24/7 ACTIVE</span>
            <span className="text-primary/70">● SECURE SHELL v1.0</span>
          </div>

          <div>
            <span>© 2026 ENGINEER_CORE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

