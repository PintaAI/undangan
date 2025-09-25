"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function Gallery() {
  // Create testimonial data using PNG images from public folder
  const testimonials = [
    {
      quote: `Perjalanan cinta kami dimulai dari pertemuan pertama yang tak terduga`,
      name: `${weddingData.couple.name1} & ${weddingData.couple.name2}`,
      designation: "Awal Kisah Kami",
      src: "/character/nina.png"
    },
    {
      quote: `Setiap momen bersama adalah anugerah yang tak ternilai`,
      name: `${weddingData.couple.name1} & ${weddingData.couple.name2}`,
      designation: "Momen Bahagia",
      src: "/character/rores.png"
    },
    {
      quote: `Dari hati ini, kami akan selalu bersama dalam setiap langkah`,
      name: `${weddingData.couple.name1} & ${weddingData.couple.name2}`,
      designation: "Janji Abadi",
      src: "/character/nina-card.png"
    },
    {
      quote: `Cinta adalah perjalanan terindah yang kami jalani bersama`,
      name: `${weddingData.couple.name1} & ${weddingData.couple.name2}`,
      designation: "Perjalanan Cinta",
      src: "/character/rores-card.png"
    }
  ];

  return (
    <section className="min-h-[calc(100vh-59px)]  flex flex-col py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center flex-shrink-0 mb-6 sm:mb-8 lg:mb-12"
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {weddingData.gallery.title}
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl lg:max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Capturing our most precious moments together
          </motion.p>
        </motion.div>

        <motion.div
          className="flex-1 flex items-center justify-center w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </motion.div>
      </div>
    </section>
  );
}