"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardWithCorners } from "@/components/ui/card-with-corners";
import { BookOpen } from "lucide-react";

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
  className,
 
}: CharacterSelectorProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [tempSelectedId, setTempSelectedId] = useState<string | null>(null);

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground ">
          Love Story
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Pilih mau denger dari cerita siapa?
        </p>
      </div>
      
      <div className="relative">
        <div className="flex  items-center justify-center gap-2 md:gap-4">
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
                  <CardWithCorners
                    className={cn(
                      "bg-card/50 backdrop-blur-md border border-white/20 p-1 flex flex-col justify-center transition-all duration-300 w-43 md:w-50 h-[400px] mb-2 cursor-pointer",
                      tempSelectedId === character.id
                        ? "border-primary shadow-xl"
                        : "border-border hover:border-primary/50",
                      isHovered === character.id && "shadow-xl"
                    )}
                    style={{
                      boxShadow: tempSelectedId === character.id
                        ? "0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)"
                        : "0 0 20px rgba(0, 0, 0, 0.1)"
                    }}
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
                        <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
                          <Image
                            src={isSelected ? `/character/${character.id}_jump.png` : character.avatar}
                            alt={character.name}
                            fill
                            className={cn(
                              "object-cover transition-all duration-300",
                              character.id === "nina" && "transform scale-x-[-1]"
                            )}
                            style={{
                              filter: isSelected ? "drop-shadow(0 0 12px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 24px rgba(59, 130, 246, 0.4))" : "none"
                            }}
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
                        
                      </div>
                    </div>

                    {/* Character Name */}
                    <h3 className="text-lg font-bold text-foreground text-center mb-2">
                      {character.name}
                    </h3>
                    
                    {/* Character Description */}
                    <p className="text-sm text-muted-foreground text-center px-2 line-clamp-2">
                      {character.description}
                    </p>
                  </CardWithCorners>

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
            }
          }}
          className={cn(
            "inline-flex items-center justify-center px-8 py-3 rounded-full transition-colors duration-300 hover:shadow-lg min-w-[250px]",
            tempSelectedId
              ? "bg-primary text-primary-foreground"
              : "bg-primary/50 text-muted  border border-border"
          )}
          disabled={!tempSelectedId}
        >
          <BookOpen className="w-5 h-5 mr-2" />
          {tempSelectedId ? "See Story" : "Select a Character"}
        </button>
      </div>


    </div>
  );
}