import React, { useEffect, useState } from "react";
import { Terminal as TerminalIcon, Cpu, Menu, X, Sun, Moon, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onOpenTerminal: () => void;
}

export default function Header({ onOpenTerminal }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains('light')) {
      setIsLightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.documentElement.classList.toggle('light');
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "graduation", label: "Graduation" },
    { id: "contact", label: "Contact" }
  ];

  // Monitor active section by scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/50 backdrop-blur-[20px] border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 max-w-[1280px] mx-auto">
        {/* Brand Name */}
        <div 
          onClick={() => scrollToSection("home")}
          className="font-headline text-2xl font-black tracking-tighter text-primary cursor-pointer hover:scale-[1.02] transition-transform flex items-center gap-2"
        >
          <span>ENGINEER_CORE</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1.5 font-mono text-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95 text-xs font-semibold ${
                  isActive 
                    ? "text-primary border-b-2 border-primary pb-1 font-bold" 
                    : "text-on-surface-variant hover:text-primary hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Action Button & Menu Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-lg transition-all"
            title="Toggle Theme"
          >
            {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Console Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 rounded-lg text-primary text-xs font-mono font-bold transition-all hover:scale-[1.05] active:scale-[0.95]"
            title="More Info"
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">More Info</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-lg md:hidden transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-surface-container-low border-b border-white/5 backdrop-blur-[20px] py-4 px-6 md:hidden flex flex-col gap-3 font-mono text-sm"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary font-bold"
                      : "text-on-surface-variant hover:text-primary hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
