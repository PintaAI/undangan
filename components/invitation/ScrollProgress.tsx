"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar only after scrolling past the hero/parallax section
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform for the character position
  const left = useTransform(scaleX, [0, 1], ["0%", "95%"]);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-4 left-4 right-4 h-3 bg-white/20 backdrop-blur-sm rounded-full z-[100] border border-white/30 overflow-visible"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full origin-left"
        style={{ scaleX }}
      />
      <motion.div 
        className="absolute -top-6 -ml-3 w-10 h-10 drop-shadow-lg"
        style={{ left }}
      >
         <Image 
            src="/hero/char.png" 
            alt="Character" 
            width={40} 
            height={40} 
            className="w-full h-full object-contain animate-bounce"
         />
      </motion.div>
    </motion.div>
  );
}