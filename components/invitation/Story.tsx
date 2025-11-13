"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";
import CharacterSelector from "./CharacterSelector";
import { ArrowLeft } from "lucide-react";

interface Character {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

export default function Story() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

  const characters: Character[] = [
    {
      id: "nina",
      name: weddingData.couple.name1,
      description: "Her journey of love and dreams that led to this beautiful day.",
      avatar: "/character/nina.png"
    },
    {
      id: "rores",
      name: weddingData.couple.name2,
      description: "His path of devotion and commitment that brought them together.",
      avatar: "/character/rores.png"
    }
  ];

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacterId(characterId);
  };

  const handleSeeStory = () => {
    if (selectedCharacterId) {
      // Story will be displayed in the main content area
    }
  };

  const getCharacterStory = () => {
    if (!selectedCharacterId) return null;
    
    
    const character = characters.find(c => c.id === selectedCharacterId);
    if (!character) return null;

    // You can customize the story based on the selected character
    return {
      title: `${character.name}'s Story`,
      text: `This is ${character.name}'s perspective of their beautiful love story. From the moment they first met to this special day, every moment has been filled with joy, laughter, and growing love. ${character.name} has cherished every step of this journey and is excited to share their heart with you.`
    };
  };

  const characterStory = getCharacterStory();

  return (
    <section className="h-screen bg-background rounded-t-2xl flex flex-col px-4 relative">

      
      {/* Content area */}
      <div className="flex-1 flex  justify-center relative z-10">
        {!selectedCharacterId ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CharacterSelector
              characters={characters}
              onCharacterSelect={handleCharacterSelect}
              selectedCharacterId={selectedCharacterId || undefined}
              onSeeStory={handleSeeStory}
              className="py-16"
            />
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-16 w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                {characterStory?.title}
              </motion.h2>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.p
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              >
                {characterStory?.text}
              </motion.p>
            </motion.div>
            
            {/* Add a way to go back to character selection */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            >
              <motion.button
                onClick={() => setSelectedCharacterId(null)}
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Choose Different Perspective
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}