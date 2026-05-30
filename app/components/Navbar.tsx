"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Cpu, Zap, FolderCode, Award, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../lib/LanguageContext";
import { Language } from "../../lib/translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "ID", label: "INDONESIA" },
    { code: "EN", label: "ENGLISH" },
    { code: "JP", label: "日本語" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black border-b-2 border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-retro-green flex items-center justify-center rounded-sm transform group-hover:rotate-12 transition-transform shadow-[4px_4px_0px_#1a5c0a]">
            <Cpu className="text-black" size={24} />
          </div>
          <span className="text-white font-black italic tracking-tighter text-xl group-hover:text-retro-green transition-colors uppercase">RANANWARI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1 font-mono text-sm uppercase tracking-widest">
          <NavLink href="/" icon={<Zap size={14} />} label={t.nav_system} />
          <NavLink href="/project-detail" icon={<FolderCode size={14} />} label={t.nav_archives} />
          <NavLink href="/certificates" icon={<Award size={14} />} label={t.nav_clearance} />
          
          {/* Language Switcher */}
          <div className="relative ml-4">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-retro-green text-gray-400 hover:text-white transition-all bg-white/5"
            >
              <Globe size={14} className="text-retro-green" />
              <span className="text-[10px]">{language}</span>
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-40 bg-zinc-900 border border-white/20 shadow-xl"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[10px] hover:bg-retro-green hover:text-black transition-colors border-b border-white/5 last:border-none ${language === lang.code ? 'text-retro-green' : 'text-gray-400'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center gap-4">
           <button 
              onClick={() => {
                const nextLang = language === "ID" ? "EN" : language === "EN" ? "JP" : "ID";
                setLanguage(nextLang);
              }}
              className="text-[10px] font-mono text-retro-green border border-retro-green/30 px-2 py-1"
            >
              {language}
            </button>
          <button
            className="text-retro-green p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black border-b-2 border-white/20 text-white px-6 py-8 space-y-6 font-mono"
        >
          <MobileNavLink href="/" label={`[01] ${t.nav_system}`} onClick={() => setIsOpen(false)} />
          <MobileNavLink href="/project-detail" label={`[02] ${t.nav_archives}`} onClick={() => setIsOpen(false)} />
          <MobileNavLink href="/certificates" label={`[03] ${t.nav_clearance}`} onClick={() => setIsOpen(false)} />
        </motion.div>
      )}
    </nav>
  );
}

function NavLink({ href, label, icon }: { href: string, label: string, icon: React.ReactNode }) {
  return (
    <Link href={href} className="group relative px-6 py-2">
      <div className="flex items-center gap-2 text-gray-400 group-hover:text-retro-green transition-colors">
        {icon}
        <span>{label}</span>
      </div>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-retro-green transition-all group-hover:w-full"></span>
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string, label: string, onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block text-2xl font-black italic hover:text-retro-green transition-colors tracking-tighter uppercase">
      {label}
    </Link>
  )
}
