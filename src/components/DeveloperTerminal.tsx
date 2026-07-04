import React, { useState, useRef, useEffect } from "react";
import { X, Terminal as TerminalIcon, ChevronRight } from "lucide-react";
import { projectsData, contactData } from "../data";

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeveloperTerminal({ isOpen, onClose }: DeveloperTerminalProps) {
  const [history, setHistory] = useState<string[]>([
    "ENGINEER_CORE v1.0.0 [SYSTEM_STABLE]",
    "Copyright (c) 2026 Nahom Haylay Tsadik. All rights reserved.",
    "Type 'help' to view available system terminal commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, `> ${cmd}`];

    if (!trimmed) {
      setHistory([...newHistory, ""]);
      return;
    }

    switch (trimmed) {
      case "help":
        setHistory([
          ...newHistory,
          "Available terminal commands:",
          "  about       - Display comprehensive engineer biography",
          "  skills      - Query precision system and hardware skill matrix",
          "  projects    - List elite engineered systems & full-stack projects",
          "  graduation  - Show academic graduation (Electrical & Computer Engineering) details",
          "  contact     - Reveal active communications & contact channels",
          "  sysinfo     - Check system memory, development uptime, and latency stats",
          "  clear       - Clear the console terminal screen buffer",
          "  exit        - Terminate and close terminal emulator shell",
          ""
        ]);
        break;

      case "about":
        setHistory([
          ...newHistory,
          "SYSTEM_BIO: Nahom Haylay Tsadik",
          "--------------------------------------------------",
          "Profession: Electrical & Computer Engineering Graduate & Full Stack Developer",
          "Summary: Electrical & Computer Engineering graduate with hands-on experience developing modern full-stack web and mobile applications using React, React Native, Node.js, Java, MySQL, MongoDB, and PostgreSQL. Experienced in building responsive user interfaces, implementing secure JWT authentication, and creating interactive 3D web experiences using Three.js.",
          "Experience: Frontend Developer Intern at Root Solutions (June 30, 2025 – August 29, 2025)",
          "Languages: Amharic (Native), English (Fluent)",
          ""
        ]);
        break;

      case "skills":
        setHistory([
          ...newHistory,
          "TECHNICAL_STACK_MATRIX:",
          "--------------------------------------------------",
          "  [Programming Languages] - JavaScript, Java, C++, HTML5, CSS3",
          "  [Frontend]              - React, React Native, Vite, Tailwind CSS, Three.js",
          "  [Backend]               - Node.js, REST APIs, JWT Authentication",
          "  [Databases]             - MySQL, MongoDB, PostgreSQL",
          "  [Tools]                 - Git, GitHub, VS Code, Figma, Postman (Basic), Docker (Basic), Microsoft Excel",
          "  [Deployment]            - Vercel",
          ""
        ]);
        break;

      case "projects":
        const prjLines = projectsData.map(
          (p) => `  * ${p.title} - ${p.description} [Tech: ${p.tags.join(", ")}]`
        );
        setHistory([
          ...newHistory,
          "ENGINEER_PORTFOLIO_PROJECTS:",
          "--------------------------------------------------",
          ...prjLines,
          "",
          "Type 'about' for more detail or visit the portfolio sections.",
          ""
        ]);
        break;

      case "graduation":
        setHistory([
          ...newHistory,
          "ACADEMIC_CREDENTIALS: Graduation Milestone",
          "--------------------------------------------------",
          "  Institution: Aksum University",
          "  Degree: Bachelor of Science in Electrical & Computer Engineering",
          "  Metrics: CGPA: 3.62 / 4.00 | National Exit Exam Score: 91.25 / 100",
          "  Graduation Date: June 2026",
          "  Relevant Coursework: Object-Oriented Programming, Database Systems, Computer Architecture, C++, Data Structures, Software Engineering, Operating Systems, Computer Networks",
          ""
        ]);
        break;

      case "contact":
        const contLines = contactData.map(
          (c) => `  * ${c.label}: ${c.value} (${c.badge})`
        );
        setHistory([
          ...newHistory,
          "COMMUNICATIONS_CHANNELS:",
          "--------------------------------------------------",
          ...contLines,
          ""
        ]);
        break;

      case "sysinfo":
        const localTimeStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
        setHistory([
          ...newHistory,
          "CORE_SYSTEM_METRICS:",
          "--------------------------------------------------",
          `  Host Server : ${window.location.host}`,
          "  System State: STABLE // OPERATIONAL",
          "  Dev Uptime  : 24/7 DEV ACTIVE",
          `  Local Time  : ${localTimeStr}`,
          `  Runtime     : React 19.0.1 + TailwindCSS v4`,
          "  Latency     : 14ms (Simulated Edge Node)",
          ""
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
        onClose();
        break;

      default:
        setHistory([
          ...newHistory,
          `command not found: '${trimmed}'. Type 'help' to review list of active commands.`,
          ""
        ]);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[480px] bg-surface-container-low border border-primary/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container border-b border-white/5 font-mono text-xs select-none">
          <div className="flex items-center gap-2 text-primary font-bold">
            <TerminalIcon className="w-4 h-4" />
            <span>ENGINEER_CORE_SHELL (~/nahom)</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-error hover:bg-white/5 rounded transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Content Box */}
        <div 
          className="flex-grow p-5 overflow-y-auto font-mono text-xs text-on-surface-variant space-y-2 select-text bg-[#0c0e14]"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, index) => {
            if (line.startsWith("> ")) {
              return (
                <div key={index} className="text-primary flex items-center gap-1.5 font-bold">
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span>{line.substring(2)}</span>
                </div>
              );
            }
            if (line.startsWith("SYSTEM_BIO") || line.startsWith("TECHNICAL_STACK_MATRIX") || line.startsWith("ENGINEER_PORTFOLIO_PROJECTS") || line.startsWith("ACADEMIC_CREDENTIALS") || line.startsWith("COMMUNICATIONS_CHANNELS") || line.startsWith("CORE_SYSTEM_METRICS")) {
              return <div key={index} className="text-secondary font-semibold mt-2">{line}</div>;
            }
            if (line.includes("command not found")) {
              return <div key={index} className="text-error/90">{line}</div>;
            }
            return <div key={index} className="leading-relaxed whitespace-pre-wrap">{line}</div>;
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Footer */}
        <form 
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-surface-container border-t border-white/5 font-mono text-xs"
        >
          <span className="text-primary font-bold">nahom@engineer_core:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-on-surface caret-primary placeholder-white/20"
            placeholder="type 'help'..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
