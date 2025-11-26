"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars Layer - Slow moving */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 right-[10%] opacity-40 w-16 h-16"
      >
        <Image 
          src="/hero/stars.png" 
          alt="Stars" 
          width={64} 
          height={64} 
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[40%] left-[5%] opacity-30 w-24 h-24"
      >
        <Image 
          src="/hero/stars.png" 
          alt="Stars" 
          width={96} 
          height={96} 
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Cloud Layer - Medium speed */}
      <motion.div 
        style={{ y: y2, x: 50 }}
        className="absolute top-[30%] right-[-5%] opacity-20 w-64 h-auto"
      >
        <Image 
          src="/cloud.png" 
          alt="Cloud" 
          width={256} 
          height={128} 
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div 
        style={{ y: y2, x: -50 }}
        className="absolute top-[60%] left-[-5%] opacity-20 w-48 h-auto"
      >
        <Image 
          src="/cloud.png" 
          alt="Cloud" 
          width={256} 
          height={128} 
          className="w-full h-full object-contain scale-x-[-1]"
        />
      </motion.div>

       {/* Floating Elements near bottom */}
       <motion.div 
        style={{ y: y1, rotate }}
        className="absolute bottom-[10%] right-[15%] opacity-60 w-12 h-12"
      >
        <Image 
          src="/hero/stars.png" 
          alt="Star" 
          width={48} 
          height={48} 
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
}