"use client";

import { motion, AnimatePresence, PanInfo } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
      resetTimer();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
      resetTimer();
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(handleNext, 5000);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoplay, handleNext]);

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(handleNext, 5000);
    }
  };

  const randomRotateY = (index: number) => {
    // Use deterministic random values based on index to ensure consistency between server and client
    return (index * 7) % 21 - 10; // This will produce consistent values for each testimonial
  };
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-4xl lg:max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 font-sans antialiased">
      <div className="relative grid grid-cols-1 gap-8 sm:gap-12 md:gap-16 lg:gap-20 md:grid-cols-2 h-full">
        <div className="flex flex-col items-center justify-center">
          <div className="relative ml-7 w-[270px] h-[390px] sm:h-72 md:h-80 lg:h-96 max-w-xs sm:max-w-sm md:max-w-md" ref={constraintsRef}>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom cursor-grab active:cursor-grabbing"
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                >
                  <div className="relative h-full w-full rounded-lg overflow-hidden">
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full object-cover object-center bg-muted"
                    />
                    {/* Polaroid frame effect */}
                    <div className="absolute inset-0 border-4 sm:border-6 md:border-8 border-white shadow-lg rounded-lg" />
                    <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-14 md:h-16 bg-white bg-opacity-90 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-medium text-gray-800 px-2 text-center line-clamp-1">
                        {testimonial.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActive(index);
                  resetTimer();
                }}
                className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-colors duration-200 ${
                  isActive(index) ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex bg-white/20 backdrop-blur-sm flex-col justify-center p-3 sm:p-4 md:p-6 shadow-lg border border-muted rounded-xl md:rounded-2xl h-full min-h-[100px] sm:min-h-[250px] md:min-h-[300px]">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="text-center md:text-left"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-black dark:text-white mb-2">
              {testimonials[active].name}
            </h3>

            <motion.p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-300 leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
