'use client';

import { useState, useRef, useCallback, useEffect, memo } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from 'framer-motion';
import { Mail } from 'lucide-react';
import Image from 'next/image';


interface SlideToUnlockProps {
  onUnlock?: () => void;
  threshold?: number;
  className?: string;
  guestName?: string;
}

export default function SlideToUnlock({
  onUnlock,
  threshold = 80,
  className = '',
  guestName = 'Honored Guest'
}: SlideToUnlockProps) {
  // Animation Constants
  const UNLOCK_DELAY = 250; // ms
  const UNLOCK_DURATION = 1000; // ms
  const RESET_DURATION = 300; // ms

  const progress = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Transform hooks - moved before conditional returns
  const scaleX = useTransform(progress, [0, 100], [0, 1]);
  const translateX = useTransform(progress, [0, 100], ['0%', '-100%']);
  const left = useTransform(progress, (p) => `${p}%`);

  // Clean up animation frame on unmount
  useEffect(() => {
    const animationId = animationRef.current;
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Disable scroll when component is active, re-enable on unmount
  useEffect(() => {
    // Disable scrolling when component is mounted and not unlocked
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = '';
    };
  }, [isUnlocked]);


  const getMax = useCallback(() => {
    const container = containerRef.current;
    const knob = knobRef.current;
    if (!container) return 1;
    const rect = container.getBoundingClientRect();
    const knobW = knob ? knob.offsetWidth : 0;
    return Math.max(1, rect.width - knobW);
  }, []);

  const updateProgress = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const max = getMax();
    const clampedX = Math.max(rect.left, Math.min(clientX, rect.left + max));
    const relative = clampedX - rect.left;
    const pct = (relative / max) * 100;
    progress.set(pct);
  }, [getMax, progress]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateProgress(e.clientX);
  }, [updateProgress]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateProgress(e.clientX);
  }, [isDragging, updateProgress]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (error) {
      console.warn('Failed to release pointer capture:', error);
    }

    if (progress.get() >= threshold) {
      animate(progress, 100, {
        duration: RESET_DURATION / 1000,
        ease: 'easeOut',
        onComplete: () => {
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              setIsUnlocked(true);
              onUnlock?.();
            }, UNLOCK_DURATION);
          }, UNLOCK_DELAY);
        },
      });
    } else {
      animate(progress, 0, {
        duration: RESET_DURATION / 1000,
        ease: 'easeOut',
      });
    }
  }, [isDragging, progress, threshold, onUnlock, UNLOCK_DELAY, UNLOCK_DURATION, RESET_DURATION]);

  const handlePointerCancel = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(e);
  }, [handlePointerUp]);

  // Don't render if unlocked, but keep hooks consistent
  if (isUnlocked) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-gradient-to-b from-primary/80 to-black/20 transition-all ease-in ${
        isFading
          ? 'opacity-0 backdrop-blur-none'
          : 'opacity-100 backdrop-blur-sm'
      } ${className}`}
      style={{ transitionDuration: `${UNLOCK_DURATION}ms` }}
    >
      {/* Cloud parallax background */}
      <CloudLayer isFading={isFading} UNLOCK_DURATION={UNLOCK_DURATION} />
      
      {/* Welcome message at the top */}
      {guestName && (
        <motion.div
          className="absolute top-20 left-0 right-0 text-center pt-16 px-6 z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: isFading ? 0 : 1, y: isFading ? -50 : 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          
          <div className="flex flex-col items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-white mb-2" />
            <h1 className="text-4xl md:text-4xl font-serif font-bold text-white drop-shadow-lg">
              Wedding Invitation
            </h1>
          </div>
          <div className="text-xl md:text-2xl text-blue-100 font-light font-serif flex flex-col items-center">
            <div className="inline-block">
              <p className="mb-1">Dear, {guestName}</p>
              <div className="h-1 bg-white/30 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          
        </motion.div>
      )}

      <motion.div
        className="text-center p-6 max-w-sm mx-4 mb-24 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: isFading ? 100 : 0, opacity: isFading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-xl font-serif font-bold text-gray-100 mb-2">
          Buka undangan
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Geser tombol ke kanan untuk melihat undangan
        </p>

        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: 'none' }}
          className="relative h-16 bg-gray-700/30 rounded-full w-67 cursor-pointer select-none"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress.get()}
          aria-label="Slide to unlock"
          aria-valuetext={`${Math.round(progress.get())}%`}
        >
          {/* Progress bar with smooth transitions */}
          <motion.div
            aria-hidden
            className="absolute top-0 left-0 h-full rounded-full bg-blue-500/50"
            style={{
              scaleX: scaleX,
              transformOrigin: 'left',
              willChange: 'transform',
            }}
          />

          {/* Knob with enhanced visual feedback */}
          <motion.div
            ref={knobRef}
            className="absolute top-1/2 w-15 h-4 flex items-center justify-center"
            style={{
              translateX: translateX ,
              left: left,
              scale: isDragging ? 1.2 : 1,
              willChange: 'transform',
            }}
            transition={{
              scale: {
                duration: RESET_DURATION / 1000,
                ease: 'easeOut',
              },
            }}
          >
            <Image
              src="/knob.png"
              alt="Slide knob"
              width={128}
              height={128}
              priority
              className="object-contain scale-x-[-1] mb-12"
            />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.span
              className="text-white font-medium text-sm drop-shadow-lg"
            >
              <ProgressLabel progress={progress} />
            </motion.span>
          </div>

          {/* Treasure image at the end of slider */}
          <div className="absolute top-1/2 right-6 transform -translate-y-1/2 translate-x-1/2 pointer-events-none">
            <Image
              src="/treasure.png"
              alt="Treasure"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// Cloud Layer Component
interface Cloud {
  id: number;
  x: number;
  y: number;
  scale: number;
  blur: number;
  speed: number;
}

const CloudLayer = memo(function CloudLayer({
  isFading,
  UNLOCK_DURATION,
}: {
  isFading: boolean;
  UNLOCK_DURATION: number;
}) {
  const cloudsRef = useRef<Cloud[]>([]);

  useEffect(() => {
    const generateClouds = () => {
      const isMobile = window.innerWidth < 768;
      const cloudCount = isMobile ? 8 : 15;
      const newClouds: Cloud[] = [];
      for (let i = 0; i < cloudCount; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 100,
          y: 50 + Math.random() * 50,
          scale: 0.5 + Math.random() * 1.5,
          blur: 0 + Math.random() * 4,
          speed: 0.5 + Math.random() * 2,
        });
      }
      cloudsRef.current = newClouds;
    };
    generateClouds();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {cloudsRef.current.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute opacity-30"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${30 * cloud.scale}%`,
            height: 'auto',
            willChange: 'transform, filter',
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: isFading ? 0 : 0.3,
            y: isFading ? -300 * cloud.speed : [0, -5, 0],
            filter: isFading
              ? `blur(${cloud.blur + 12}px)`
              : `blur(${cloud.blur}px)`,
          }}
          transition={{
            opacity: {
              duration: isFading
                ? Math.max(0.1, UNLOCK_DURATION / 1000 / cloud.speed)
                : 0,
            },
            y: {
              duration: isFading
                ? Math.max(0.1, UNLOCK_DURATION / 1000 / cloud.speed)
                : 3,
              ease: 'easeInOut',
              repeat: isFading ? 0 : Infinity,
              repeatType: 'reverse',
            },
            filter: {
              duration: isFading
                ? Math.max(0.1, UNLOCK_DURATION / 1000 / cloud.speed)
                : 0,
            },
          }}
        >
          <Image
            src="/cloud.png"
            alt="Cloud"
            width={512}
            height={256}
            priority
            className="object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
});

function ProgressLabel({ progress }: { progress: MotionValue<number> }) {
  const label = useTransform(progress, (p) => `${Math.round(p)}%`);
  return <motion.span>{label}</motion.span>;
}
