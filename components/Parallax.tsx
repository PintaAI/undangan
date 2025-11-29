'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Layer {
  id: number;
  src: string;
  speed: number;
}

interface ParallaxProps {
  title?: string;
}

const Parallax = ({ title = "add text here" }: ParallaxProps) => {
  const [scrollY, setScrollY] = useState(0);

  // Shrink effect configuration
  const SHRINK_RATE = 0.0005; // How fast layers shrink as you scroll
  const MIN_SCALE = 0.8; // Minimum scale (0.5 = 50% of original height)
  const TITLE_HIDE_THRESHOLD = 1000; // Scroll position where title starts moving up
  const TITLE_HIDE_SPEED = 0.5; // How fast title moves up when threshold is reached

  // Define the layers with their respective speeds
  // Lower number (1.png) is background with slowest speed
  // Higher numbers are foreground with faster speeds
  const layers: Layer[] = [
    { id: 1, src: '/paralax/background.png', speed: 0.2 },
    { id: 2, src: '/paralax/secondground.png', speed: 0.4 },
    { id: 3, src: '/paralax/character.png', speed: 0.2 },
    { id: 4, src: '/paralax/foreground.png', speed: 0.4 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed parallax container */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        {/* Title text */}
        <div
          className="absolute left-0 right-0 text-center px-8"
          style={{
            top: `${96 - Math.max(0, scrollY - TITLE_HIDE_THRESHOLD) * TITLE_HIDE_SPEED}px`,
            opacity: Math.max(0, 1 - scrollY / 600),
            zIndex: 2
          }}
        >
          <h1 className="text-4xl md:text-6xl font-serif text-white break-words" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7)' }}>
            {title}
          </h1>
        </div>
        
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="absolute inset-0 w-full h-full"
            style={{
              transform: layer.id === 2 || layer.id === 4
                ? `translateY(-${scrollY * layer.speed}px) scaleY(${Math.max(MIN_SCALE, 1 - scrollY * SHRINK_RATE)})`
                : `translateY(-${scrollY * layer.speed}px)`,
              transformOrigin: layer.id === 2 || layer.id === 4 ? 'bottom center' : 'center',
              zIndex: layer.id,
            }}
          >
            <Image
              src={layer.src}
              width={2200}
              height={2200}
              alt={`Parallax layer ${layer.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Spacer to enable scrolling */}
      <div className="relative z-50" style={{ height: '100vh' }}></div>
      
      {/* Mohon Doa Restu text at the bottom */}
      <div className="fixed bottom-9 left-0 right-0 opacity-50 text-center">
        <p className="text-white text-lg md:text-xl font-serif px-8 mx-4 py-8 rounded-lg backdrop-blur-sm" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          وَالَّذِيْنَ يَقُوْلُوْنَ رَبَّنَا هَبْ لَنَا مِنْ اَزْوَاجِنَا وَذُرِّيّٰتِنَا قُرَّةَ اَعْيُنٍ وَّاجْعَلْنَا لِلْمُتَّقِيْنَ اِمَامًا
        </p>
        <p className="text-white text-sm md:text-base font-light font-serif px-8 mx-4 py-2 rounded-lg backdrop-blur-sm" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
       &ldquo;Dan orang-orang yang berkata, 'Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa'.&rdquo;


        </p>
      </div>
    </>
  );
};

export default Parallax;