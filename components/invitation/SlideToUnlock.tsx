'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SlideToUnlockProps {
  onUnlock?: () => void;
  threshold?: number;
  className?: string;
}

export default function SlideToUnlock({
  onUnlock,
  threshold = 80,
  className = ''
}: SlideToUnlockProps = {}) {
  // Animation Constants
  const UNLOCK_DELAY = 250; // ms
  const UNLOCK_DURATION = 1000; // ms
  const RESET_DURATION = 300; // ms

  const [progress, setProgress] = useState(15); // Start at 15% for better UX
  const [isDragging, setIsDragging] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [clouds, setClouds] = useState<Array<{id: number, x: number, y: number, scale: number, blur: number, speed: number}>>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Generate clouds for parallax effect
  useEffect(() => {
    const generateClouds = () => {
      const newClouds = [];
      for (let i = 0; i < 15; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 100,
          y: 50 + Math.random() * 50, // Start clouds in the lower half
          scale: 0.5 + Math.random() * 1.5,
          blur: 0 + Math.random() * 4,
          speed: 0.5 + Math.random() * 2 // Random speed between 0.5 and 2.5
        });
      }
      setClouds(newClouds);
    };

    generateClouds();
  }, []);

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
    const pct = Math.round((relative / max) * 100);
    setProgress(pct);
  }, [getMax]);

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

    if (progress >= threshold) {
      setProgress(100);
      
      // Start the unlock fade-out sequence
      setTimeout(() => {
        setIsFading(true);
        
        // Unmount the component after the animation is complete
        setTimeout(() => {
          setIsUnlocked(true);
          onUnlock?.();
        }, UNLOCK_DURATION);
      }, UNLOCK_DELAY);

    } else {
      // Start the reset animation
      setIsResetting(true);
      setProgress(15);
      setTimeout(() => setIsResetting(false), RESET_DURATION);
    }
  }, [isDragging, progress, threshold, onUnlock, UNLOCK_DELAY, UNLOCK_DURATION, RESET_DURATION]);

  const handlePointerCancel = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(e);
  }, [handlePointerUp]);

  if (isUnlocked) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm transition-all ease-in ${
        isFading ? 'opacity-0 backdrop-blur-none' : 'opacity-100 backdrop-blur-sm'
      } ${className}`}
      style={{ transitionDuration: `${UNLOCK_DURATION}ms` }}
    >
      {/* Cloud parallax background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {clouds.map((cloud) => (
            <motion.div
              key={cloud.id}
              className="absolute bg-white/20 rounded-full"
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                width: `${100 * cloud.scale}px`,
                height: `${60 * cloud.scale}px`,
                filter: `blur(${cloud.blur}px)`,
                transform: `translate(-50%, -50%)`
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: 0.3,
                y: isFading ? -300 * cloud.speed : 0,
                filter: isFading ? `blur(${cloud.blur + 12}px)` : `blur(${cloud.blur}px)`,
              }}
              transition={{
                duration: isFading ? Math.max(0.1, (UNLOCK_DURATION / 1000) / cloud.speed) : 0.5,
                ease: 'easeIn'
              }}
            />
          ))}
        </AnimatePresence>
      </div>
      <div className="text-center p-6 max-w-sm mx-4 mb-24">
        <h2 className="text-xl font-bold text-white mb-2">Buka undangan</h2>
        <p className="text-gray-300 mb-4">Geser untuk lihat details yang sangat </p>

        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: 'none' }}
          className="relative h-16 bg-gray-700 rounded-full overflow-hidden cursor-pointer select-none"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Slide to unlock"
          aria-valuetext={`${progress}%`}
        >
          {/* Progress bar with smooth transitions */}
          <div
            aria-hidden
            className={`absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full ${
              isDragging || isResetting ? 'transition-none' : 'transition-all duration-300 ease-in'
            }`}
            style={{ width: `${progress}%` }}
          />

          {/* Knob with enhanced visual feedback */}
          <div
            ref={knobRef}
            className={`absolute top-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform -translate-y-1/2 ${
              isDragging
                ? 'scale-110 shadow-xl'
                : isResetting
                  ? 'transition-transform duration-300 ease-in'
                  : 'transition-transform duration-200 ease-in hover:scale-105'
            }`}
            style={{
              left: `${progress}%`,
              transform: 'translate(-50%)',
              touchAction: 'none',
            }}
          >
            <ArrowRight className="w-4 h-4 text-gray-700" />
          </div>

          {/* Progress text with enhanced visibility */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white font-medium text-sm drop-shadow-lg">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Subtle pattern overlay for better grip indication */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
