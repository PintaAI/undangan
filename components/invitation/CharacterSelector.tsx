"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Character {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

interface CharacterSelectorProps {
  characters: Character[];
  onCharacterSelect: (characterId: string) => void;
  selectedCharacterId?: string;
  className?: string;
  onSeeStory?: () => void;
}

export default function CharacterSelector({
  characters,
  onCharacterSelect,
  selectedCharacterId,
  className,
 
}: CharacterSelectorProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [tempSelectedId, setTempSelectedId] = useState<string | null>(null);

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
          Love Story
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Pilih mau denger dari cerita siapa?
        </p>
      </div>
      
      <div className="relative">
        <div className="flex  items-center justify-center gap-6">
          <AnimatePresence>
            {characters.map((character) => {
              const shouldHide = tempSelectedId && tempSelectedId !== character.id;
              const isSelected = tempSelectedId === character.id;
              
              if (shouldHide) return null;
              
              return (
                <motion.div
                  key={character.id}
                  className={cn(
                    "relative flex-shrink-0",
                    isSelected && "z-10"
                  )}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isSelected ? 1.1 : 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.8,
                    transition: { duration: 0.3 }
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                  layout={!isSelected}
                  layoutId={isSelected ? `selected-${character.id}` : undefined}
                >
                  {/* Character Card */}
                  <div
                    className={cn(
                      "bg-card rounded-2xl shadow-lg p-1 flex flex-col justify-center border-2 transition-all duration-300 w-47 h-[500px] mb-2 cursor-pointer",
                      tempSelectedId === character.id
                        ? "border-primary shadow-xl"
                        : "border-border hover:border-primary/50",
                      isHovered === character.id && "shadow-xl"
                    )}
                    onClick={() => {
                      // Toggle selection: if already selected, deselect it
                      if (tempSelectedId === character.id) {
                        setTempSelectedId(null);
                      } else {
                        setTempSelectedId(character.id);
                      }
                    }}
                    onMouseEnter={() => setIsHovered(character.id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {/* Avatar */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="w-40 h-50 rounded-full flex items-center justify-center overflow-hidden">
                          <Image
                            src={isSelected ? `/character/${character.id}_jump.png` : character.avatar}
                            alt={character.name}
                            fill
                            className={cn(
                              "object-cover",
                              character.id === "nina" && "transform scale-x-[-1]"
                            )}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center text-2xl font-bold text-primary">
                                    ${character.name.charAt(0)}
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                        
                        {/* Selection indicator */}
                        <AnimatePresence>
                          {tempSelectedId === character.id && (
                            <motion.div
                              className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Character Name */}
                    <h3 className="text-lg font-bold text-foreground text-center">
                      {character.name}
                    </h3>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full opacity-50 blur-xl"
                    animate={{
                      scale: isHovered === character.id ? 1.2 : 1,
                      opacity: isHovered === character.id ? 0.7 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary/10 rounded-full opacity-50 blur-xl"
                    animate={{
                      scale: isHovered === character.id ? 1.2 : 1,
                      opacity: isHovered === character.id ? 0.7 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Action button */}
      <div className="text-center mt-8">
        <button
          onClick={() => {
            if (tempSelectedId) {
              onCharacterSelect(tempSelectedId);
            } else {
              onCharacterSelect("both");
            }
          }}
          className={cn(
            "inline-flex items-center px-8 py-3 rounded-full transition-colors duration-300 hover:shadow-lg",
            tempSelectedId
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"
          )}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          {tempSelectedId ? "See Story" : "Skip to Combined Story"}
        </button>
      </div>


      {/* Selection hint */}
      {selectedCharacterId && selectedCharacterId !== "both" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <p className="text-lg text-muted-foreground">
            Great choice! You'll now see the story from {characters.find(c => c.id === selectedCharacterId)?.name}'s perspective.
          </p>
        </motion.div>
      )}
    </div>
  );
}