"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";
import { X, Image as ImageIcon, Heart, Camera, Star } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {weddingData.gallery.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capturing our most precious moments together
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
            const icons = [ImageIcon, Heart, Camera, Star];
            const IconComponent = icons[index % icons.length];
            
            return (
              <motion.div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-pink-100 to-purple-100"
                whileHover={{ scale: 1.03 }}
                layout
              >
                <motion.div
                  className="w-full h-64 sm:h-72 md:h-80 flex items-center justify-center"
                  onClick={() => openLightbox(`icon-${index}`)}
                >
                  <IconComponent className="h-20 w-20 text-pink-500" />
                </motion.div>
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="bg-white bg-opacity-90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          );
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeLightbox}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg"
            >
              {selectedImage && (
                (() => {
                  const icons = [ImageIcon, Heart, Camera, Star];
                  const IconComponent = icons[parseInt(selectedImage.split('-')[1]) % icons.length];
                  return <IconComponent className="h-32 w-32 text-pink-500" />;
                })()
              )}
            </motion.div>
            <motion.button
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-300"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}