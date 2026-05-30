"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, X, ShieldCheck, FileText, Cpu } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

const certificates = [
  { id: "c1", nameKey: "JAPAN_FOUNDATION_TEST", company: "JAPANFOUNDATION 国際交流基金", images: ["/certificates/jft-depan.jpeg", "/certificates/jft-belakang.jpeg"] },
  { id: "c2", nameKey: "BNSP_MAINTENANCE", company: "Badan Nasional Sertifikasi Profesi (BNSP)", images: ["/certificates/BNSP-maintenance-depan.png", "/certificates/BNSP-maintenance-belakang.png"] },
  { id: "c3", nameKey: "INTERNSHIP_PROGRAM", company: "PT. Indorama Synthetics Tbk", images: ["/certificates/sertif-magang.png"] },
  { id: "c4", nameKey: "CAD_COMPETITION_NATIONAL", company: "HMM FPTK UPI", images: ["/certificates/Mechanical-Drafting-Competition.jpg"] },
  { id: "c5", nameKey: "SOLIDWORKS_TRAINING", company: "HMM ITBU", images: ["/certificates/solidworks-software-training.jpg"] },
  { id: "c6", nameKey: "CYBER_SECURITY_FUND", company: "Wehack", images: ["/certificates/cyber-seccurity-fundamental.png"] },
  { id: "c7", nameKey: "CONTENT_HACK_BRANDING", company: "Content Academy", images: ["/certificates/content-hack-personal-branding.jpg"] },
  { id: "c8", nameKey: "TECHNOPRENEUR_AWARENESS", company: "HME PEI", images: ["/certificates/realizing-a-youth-for-technopreneurship.jpg"] },
  { id: "c9", nameKey: "CRYPTO_FUNDAMENTALS", company: "HMM TRPL PEI", images: ["/certificates/what-to-know-cryptocurrency-in-this-era.jpg"] },
];

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const { t, language } = useLanguage();

  const handleRotate = (index: number) => {
    if (certificates[index].images.length > 1) {
      setImageIndex((prev) => (prev + 1) % certificates[index].images.length);
    }
  };

  const handlePreview = (index: number) => {
    setActiveIndex(index);
    setImageIndex(0);
  };

  return (
    <main className="bg-black text-white min-h-screen manga-dots uppercase overflow-x-hidden">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="flex flex-col items-center mb-24 space-y-4 text-center">
          <div className="flex items-center gap-2 text-retro-pink font-mono text-[10px] tracking-[0.5em]">
            <ShieldCheck size={14} />
            {t.cert_label}
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none drop-shadow-[4px_4px_0px_#39ff14]">
            {t.cert_title} <br />
            <span className="text-retro-green">{t.cert_subtitle}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              className="bg-zinc-900 border-2 border-white/10 hover:border-retro-green transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.5)] hover:shadow-[12px_12px_0px_#1a5c0a] overflow-hidden relative group p-2 rounded-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              onClick={() => handlePreview(idx)}
            >
              <div className="relative aspect-video bg-black overflow-hidden border border-white/5 cursor-pointer">
                <Image src={cert.images[0]} alt="Cert" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-retro-green/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-black border-2 border-retro-green text-retro-green font-black italic tracking-tighter text-sm uppercase">
                    {t.cert_preview}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2 text-left">
                <div className="flex items-center gap-2 text-retro-blue font-mono text-[8px] uppercase tracking-widest">
                  <FileText size={10} />
                  AUTH_ID: {cert.id}
                </div>
                <h2 className="font-black italic tracking-tighter text-xl group-hover:text-retro-green transition-colors line-clamp-1">
                  {(t as any)[cert.nameKey] || cert.nameKey}
                </h2>
                <p className="text-[10px] font-mono text-gray-500">{cert.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeIndex !== null && (
          <div className="fixed inset-0 w-full h-full bg-black/98 backdrop-blur-xl z-[999] flex items-center justify-center p-4 md:p-12" onClick={() => setActiveIndex(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="w-full max-w-7xl h-auto max-h-[92vh] bg-zinc-950 border-2 border-retro-green shadow-[0px_0px_100px_rgba(57,255,20,0.15)] flex flex-col relative rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 border-b-2 border-white/10 flex justify-between items-center bg-black">
                <div className="flex flex-col gap-1 text-left uppercase">
                  <div className="flex items-center gap-2 text-retro-green font-mono text-xs tracking-[0.4em]">
                    <Cpu size={18} />
                    {t.modal_inspector} // CERT_VERIFIED
                  </div>
                  <h2 className="text-xl sm:text-4xl font-black italic tracking-tighter text-white leading-none">
                    {(t as any)[certificates[activeIndex].nameKey] || certificates[activeIndex].nameKey}
                  </h2>
                </div>
                <button onClick={() => setActiveIndex(null)} className="text-white hover:text-retro-pink p-2 sm:p-3 border-2 border-white/10 hover:border-retro-pink transition-all bg-white/5">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 overflow-y-auto lg:overflow-hidden">
                <div className="lg:col-span-8 relative w-full aspect-[4/3] lg:aspect-auto lg:h-full bg-black border-b lg:border-b-0 lg:border-r-2 border-white/10 flex items-center justify-center p-4 sm:p-10">
                  <div className="relative w-full h-full min-h-[250px] md:min-h-[400px]">
                    <Image src={certificates[activeIndex].images[imageIndex]} alt="Cert" fill className="object-contain" priority />
                  </div>
                </div>

                <div className="lg:col-span-4 p-8 md:p-12 space-y-10 text-left bg-zinc-900/30 uppercase h-full overflow-y-auto">
                  <section className="space-y-4">
                    <h3 className="text-retro-blue font-black italic tracking-tighter text-2xl sm:text-3xl underline decoration-retro-blue/30 underline-offset-8 uppercase">ENTITY</h3>
                    <p className="text-white font-mono text-base sm:text-xl border-l-4 border-retro-blue pl-6 py-4 bg-retro-blue/5 tracking-tighter leading-tight">
                      {certificates[activeIndex].company}
                    </p>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-retro-pink font-black italic tracking-tighter text-2xl sm:text-3xl underline decoration-retro-pink/30 underline-offset-8 uppercase">CONTROL</h3>
                    <div className="flex flex-col gap-4">
                      {certificates[activeIndex].images.length > 1 && (
                        <button onClick={() => handleRotate(activeIndex)} className="w-full p-6 bg-retro-green text-black font-black italic uppercase text-lg sm:text-xl flex items-center justify-center gap-4 shadow-[6px_6px_0px_#1a5c0a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                          <RotateCw size={28} /> FLIP_CERT_DATA
                        </button>
                      )}
                      <div className="w-full p-4 border-2 border-retro-green/20 bg-retro-green/5 text-retro-green font-mono text-xs sm:text-sm text-center border-dashed">
                        VERIFICATION: PASS // {language}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Contact />
      <Footer />
    </main>
  );
}
