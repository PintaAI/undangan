"use client"
import { weddingData } from "@/lib/data";
import { Clock, MapPin, } from "lucide-react";
import {
  CardWithCorners,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card-with-corners";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';

export default function EventDetails() {
  const searchParams = useSearchParams();
  const guestSide = searchParams.get('side') || 'female'; // Default to female if not specified
  const [events, setEvents] = useState(weddingData.events);
  
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (response.ok) {
          const data = await response.json();
          if (data.events && Array.isArray(data.events)) {
            setEvents(data.events);
          }
        }
      } catch (error) {
        console.error("Failed to load dynamic event config", error);
      }
    };
    
    fetchConfig();
  }, []);

  // Filter events based on guest side
  const filteredEvents = events.filter(event =>
    !event.side || event.side === guestSide
  );

  // Extract day and month from wedding date (e.g., "14 Desember 2025" -> day: 14, month: "Desember")
  const weddingDateParts = weddingData.weddingDate.split(' ');
  const weddingDay = parseInt(weddingDateParts[0]);
  const weddingMonth = weddingDateParts[1]; // Get the month name
  const [displayCounts, setDisplayCounts] = useState<number[]>([]);
  const currentCountsRef = useRef<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  useEffect(() => {
    // Reset counts when events change
    setDisplayCounts(Array(filteredEvents.length).fill(0));
    currentCountsRef.current = Array(filteredEvents.length).fill(0);
  }, [filteredEvents.length]);

  useEffect(() => {
    if (isInView && filteredEvents.length > 0) {
      // Initialize with random numbers for each card
      const initialCounts = Array(filteredEvents.length).fill(0).map(() =>
        Math.floor(Math.random() * (weddingDay - 1)) + 1
      );
      currentCountsRef.current = initialCounts;
      setDisplayCounts(initialCounts);

      // Start the interval
      intervalRef.current = setInterval(() => {
        let allDone = true;
        const newCounts = currentCountsRef.current.map(count => {
          if (count < weddingDay) {
            allDone = false;
            return count + 1;
          }
          return count;
        });

        if (allDone) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        } else {
            currentCountsRef.current = newCounts;
            setDisplayCounts([...newCounts]);
          }
        }, 100);
      } else {
        // Clear interval and reset
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setDisplayCounts(Array(filteredEvents.length).fill(0));
      }
    }, [isInView, weddingDay, filteredEvents.length]);

  return (
    <section className="min-h-screen max-h-screen flex flex-col  py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground mb-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Acara Pernikahan
        </motion.h2>
        
        <motion.div
          className="flex items-center justify-center space-x-2 text-lg sm:text-xl text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="font-medium">{weddingData.weddingDate}</span>
        </motion.div>
        
        <div ref={ref} className="grid md:grid-cols-2 gap-8 sm:gap-12 mt-9 sm:mt-20">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2 + 0.4,
                ease: "easeOut"
              }}
            >
              <CardWithCorners
                className="rounded-2xl border-6 border-primary shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8"
              >
              {/* Date and month in top right corner with counting animation */}
              <motion.div
                className="absolute top-8 sm:top-10 right-10 sm:right-13 flex flex-col items-center justify-center z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="text-5xl sm:text-7xl font-bold text-primary">
                  {displayCounts[index]}
                </div>
                <div className="text-base sm:text-lg font-medium text-muted-foreground mt-0">
                  {weddingMonth}
                </div>
              </motion.div>
              <motion.div
                className={`absolute -top-[65px] sm:-top-[79px] ${index % 2 === 0 ? 'left-2 sm:left-4 scale-x-[-1]' : 'right-2 sm:right-4'} w-16 sm:w-22 h-16 sm:h-22 z-10`}
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2 + 0.6,
                  ease: "easeOut"
                }}
              >
                <Image
                  src={index % 2 === 0 ? "/character/nina-card.png" : "/character/rores-card.png"}
                  alt="Character"
                  width={74}
                  height={74}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <CardHeader className="p-0">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 0.8,
                    ease: "easeOut"
                  }}
                >
                  <CardTitle className="text-xl ml-2 sm:text-2xl font-serif font-semibold">
                    {event.title}
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="p-0 ml-4 space-y-3 sm:space-y-4">
                <motion.div
                  className="flex items-center space-x-2 sm:space-x-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 1.0,
                    ease: "easeOut"
                  }}
                >
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  <span className="text-base sm:text-lg">{event.time}</span>
                </motion.div>
                
                <motion.div
                  className="flex items-start space-x-2 sm:space-x-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 1.2,
                    ease: "easeOut"
                  }}
                >
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">{event.venue}</p>
                    <Link
                      href={event.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors duration-200 underline"
                    >
                      {event.address}
                    </Link>
                  </div>
                </motion.div>
                
                {event.description && (
                  <motion.p
                    className="text-muted-foreground italic text-xs sm:text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 1.4,
                      ease: "easeOut"
                    }}
                  >
                    {event.description}
                  </motion.p>
                )}
              </CardContent>
            </CardWithCorners>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}