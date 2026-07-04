import React, { useState } from "react";
import { Mail, Github, Linkedin, Phone, FileText, Copy, ExternalLink, Download, Check, MapPin } from "lucide-react";
import { contactData } from "../data";
import { motion } from "motion/react";
import { generateResumePDF } from "../utils/pdfGenerator";

export default function ContactSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fallbackCopy = (text: string, itemId: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (successful) {
        setCopiedId(itemId);
        setTimeout(() => setCopiedId(null), 2000);
      } else {
        console.error("Fallback copy command failed");
      }
    } catch (err) {
      console.error("Fallback copy execution failed", err);
    }
  };

  const handleAction = (e: React.MouseEvent, item: typeof contactData[0]) => {
    e.stopPropagation();

    if (item.actionLabel === "Copy") {
      const valueToCopy = item.value;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(valueToCopy)
          .then(() => {
            setCopiedId(item.id);
            setTimeout(() => setCopiedId(null), 2000);
          })
          .catch((err) => {
            console.error("Clipboard API failed, using fallback copy", err);
            fallbackCopy(valueToCopy, item.id);
          });
      } else {
        fallbackCopy(valueToCopy, item.id);
      }
    } else if (item.actionLabel === "Download") {
      // Trigger actual resume PDF generation & download
      generateResumePDF();
    } else {
      // Connect / View
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "email":
        return <Mail className="w-12 h-12 text-primary" />;
      case "github":
        return <Github className="w-12 h-12 text-secondary" />;
      case "location":
        return <MapPin className="w-12 h-12 text-primary" />;
      case "phone":
        return <Phone className="w-12 h-12 text-secondary" />;
      case "resume":
        return <FileText className="w-12 h-12 text-primary" />;
      default:
        return <Mail className="w-12 h-12 text-primary" />;
    }
  };

  return (
    <section id="contact" className="relative px-6 md:px-16 py-24 max-w-[1280px] mx-auto z-10">
      <div className="flex flex-col items-center text-center mb-16 select-none">
        <span className="text-primary font-mono text-[10px] uppercase tracking-widest mb-3 block font-bold">
          // ESTABLISH_CONNECTION
        </span>
        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface">
          Contact
        </h2>
        <p className="text-on-surface-variant max-w-xl mt-4 font-sans text-sm leading-relaxed">
          Available for sophisticated engineering projects and technical consultation. Select a channel to initiate protocol.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {contactData.map((item) => (
          <div
            key={item.id}
            onClick={(e) => {
              if (item.id === "resume") {
                handleAction(e, item);
              }
            }}
            className="flip-card h-64 w-full sm:w-[320px] lg:w-[340px] group cursor-pointer"
          >
            <div className="flip-card-inner relative w-full h-full text-center">
              
              {/* Card Front */}
              <div className="flip-card-front absolute inset-0 glass-card rounded-xl p-6 flex flex-col items-center justify-center border-primary/10 hover:border-primary/30">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(item.id)}
                </div>
                <span className="font-headline text-lg font-bold text-on-surface">
                  {item.label}
                </span>
              </div>

              {/* Card Back */}
              <div className="flip-card-back absolute inset-0 glass-card rounded-xl p-6 flex flex-col justify-between items-center bg-surface-container-low/80 border-primary/20">
                <div className="text-center w-full select-text mt-2">
                  <p className="font-mono text-[9px] text-primary mb-3 font-bold uppercase tracking-widest">
                    {item.badge}
                  </p>
                  <p className="font-mono text-xs text-on-surface-variant break-all leading-normal px-2">
                    {item.value}
                  </p>
                </div>

                <button
                  onClick={(e) => handleAction(e, item)}
                  className={`w-full py-2 bg-primary/15 border border-primary/30 hover:bg-primary/25 rounded-lg text-xs font-mono font-bold text-primary transition-all flex items-center justify-center gap-1.5 hover:scale-[1.03] ${
                    copiedId === item.id ? "bg-green-500/20 border-green-500/40 text-green-400" : ""
                  }`}
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      {item.actionLabel === "Copy" && <Copy className="w-3.5 h-3.5" />}
                      {item.actionLabel === "Download" && <Download className="w-3.5 h-3.5" />}
                      {item.actionLabel === "View Repos" && <Github className="w-3.5 h-3.5" />}
                      {item.actionLabel === "Connect" && <ExternalLink className="w-3.5 h-3.5" />}
                      <span>{item.actionLabel}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Background radial soft lights */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
