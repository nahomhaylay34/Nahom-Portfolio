import React, { useState } from "react";
import { Layers, HelpCircle, Briefcase, ShieldCheck, Hexagon, Key } from "lucide-react";
import { certificationsData } from "../data";
import { motion } from "motion/react";

export default function CertificationsSection() {
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<string>("");

  const handleVerify = (certName: string, certId: string) => {
    setVerifyingId(certId);
    setVerifyStatus("STABLISHING_SECURE_RPC_CONNECTION...");
    
    setTimeout(() => {
      setVerifyStatus("QUERYING_BLOCKCHAIN_STATE_LEDGER...");
    }, 1000);

    setTimeout(() => {
      setVerifyStatus("DECRYPTING_SIGNATURE_MANIFEST...");
    }, 2000);

    setTimeout(() => {
      setVerifyStatus(`VERIFICATION_SUCCESSFUL!\n\nIssuer: Academic Ledger Node\nManifest: ${certName}\nKey signature: ${certId}-SHA256-VALID`);
    }, 3200);
  };

  const closeVerify = () => {
    setVerifyingId(null);
    setVerifyStatus("");
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "mern":
        return <Layers className="w-12 h-12 text-primary" />;
      case "blockchain":
        return <Hexagon className="w-12 h-12 text-primary" />;
      case "entrepreneurship":
        return <Briefcase className="w-12 h-12 text-primary" />;
      case "employability":
        return <ShieldCheck className="w-12 h-12 text-primary" />;
      default:
        return <HelpCircle className="w-12 h-12 text-primary" />;
    }
  };

  return (
    <section id="certifications" className="px-6 md:px-16 py-24 max-w-[1280px] mx-auto z-10">
      {/* Header */}
      <div className="mb-16 select-none">
        <span className="font-mono text-[10px] text-secondary uppercase tracking-[0.2em] mb-3 block font-bold">
          // VALIDATION_MODULES
        </span>
        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
          Certifications
        </h2>
      </div>

      {/* Grid of 3D Flip Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
        {certificationsData.map((cert) => (
          <div key={cert.id} className="flip-card perspective-1000 h-80 w-full group cursor-pointer">
            <div className="flip-card-inner relative w-full h-full text-center">
              
              {/* Card Front */}
              <div className="flip-card-front absolute inset-0 glass-card rounded-2xl p-6 flex flex-col items-center justify-center scan-effect bg-surface-container-lowest/10">
                <div className="mb-5 p-4 rounded-xl bg-primary/5 border border-primary/10 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                  {getIcon(cert.id)}
                </div>
                <h4 className="font-headline text-base md:text-lg text-primary font-bold tracking-tight">
                  {cert.title}
                </h4>
                <p className="font-mono text-[9px] text-on-surface-variant tracking-widest uppercase mt-3 font-semibold">
                  {cert.issuer}
                </p>
              </div>

              {/* Card Back */}
              <div className="flip-card-back absolute inset-0 glass-card rounded-2xl p-6 flex flex-col justify-between items-start bg-primary/[0.03] border-primary/20">
                <div className="text-left w-full select-text">
                  <span className="font-mono text-[10px] text-primary mb-3 block font-bold">
                    ID: {cert.certId}
                  </span>
                  <p className="font-mono text-[11px] text-on-surface-variant leading-relaxed">
                    {cert.description}
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVerify(cert.title, cert.certId);
                  }}
                  className="w-full py-2.5 bg-primary/10 border border-primary/30 rounded-lg font-mono text-[10px] text-primary font-bold hover:bg-primary/20 hover:border-primary/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>VERIFY_KEY</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Verification Cryptographic Modal Pop-up */}
      {verifyingId && (
        <div className="fixed inset-0 z-[110] bg-background/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface-container-low border border-primary/30 rounded-xl p-6 shadow-2xl relative select-none">
            <h3 className="font-headline text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-primary animate-pulse" />
              <span>CRYPTOGRAPHIC_VALIDATOR</span>
            </h3>
            
            {/* Holographic text outputs */}
            <div className="p-4 bg-[#0a0c12] border border-white/5 rounded-lg min-h-32 flex flex-col justify-center font-mono text-xs text-primary/90 leading-relaxed whitespace-pre-wrap">
              {verifyStatus}
            </div>

            <button
              onClick={closeVerify}
              className="mt-5 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
            >
              CLOSE_PROTOCOL
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
