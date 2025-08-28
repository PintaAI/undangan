"use client";

import { useState } from "react";
import { weddingData } from "@/lib/data";
import CharacterSelector from "./CharacterSelector";

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
    
    if (selectedCharacterId === "both") {
      return {
        title: "Their Combined Story",
        text: `This is the beautiful love story of ${weddingData.couple.name1} and ${weddingData.couple.name2}, told from both perspectives. From the moment they first met to this special day, every moment has been filled with joy, laughter, and growing love. Together, they have cherished every step of this journey and are excited to share their hearts with you.`
      };
    }
    
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
    <section className="min-h-screen flex flex-col px-4">
      {!selectedCharacterId ? (
        <div className="flex-1 flex items-center justify-center">
          <CharacterSelector
            characters={characters}
            onCharacterSelect={handleCharacterSelect}
            selectedCharacterId={selectedCharacterId || undefined}
            onSeeStory={handleSeeStory}
            className="py-16"
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
                {characterStory?.title}
              </h2>
            </div>
            <div className="text-center">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {characterStory?.text}
              </p>
            </div>
            
            {/* Add a way to go back to character selection */}
            <div className="text-center mt-12">
              <button
                onClick={() => setSelectedCharacterId(null)}
                className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Choose Different Perspective
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}