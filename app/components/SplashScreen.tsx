"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Retro Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20" 
               style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Hexagon / Engineering Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: "backOut" }}
              className="w-32 h-32 mb-8 relative"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white stroke-[2]">
                <motion.path
                  d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M30 40 L50 30 L70 40 L70 60 L50 70 L30 60 Z"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                />
                <motion.circle
                  cx="50" cy="50" r="5"
                  className="fill-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 2, duration: 0.5 }}
                />
              </svg>
            </motion.div>

            {/* Text Animation */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="text-white text-4xl font-black tracking-tighter italic"
              >
                RAN <span className="text-gray-500 font-light">ANWARI</span>
              </motion.h1>
            </div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 2 }}
              className="h-1 bg-white mt-4 max-w-[200px]"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-gray-400 text-xs mt-4 tracking-[0.3em] uppercase font-mono"
            >
              System Initializing...
            </motion.p>
          </div>

          {/* Scanlines Effect */}
          <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
