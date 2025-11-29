'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

type LoopingGroundProps = {
  src?: string;
  height?: number;     // tinggi track, px
  speed?: number;      // px per detik
  className?: string;
};

function LoopingGround({
  src = '/hero/ground.png',
  height = 250,
  speed = 80,
  className = '',
}: LoopingGroundProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const ratioRef = useRef<number | null>(null); // naturalWidth / naturalHeight
  const [tileW, setTileW] = useState(0);
  const [tileCount, setTileCount] = useState(0);

  // Hitung ulang ukuran tile & jumlah pengulangan
  const recalc = useCallback(() => {
    if (!wrapRef.current || !ratioRef.current) return;
    const h = wrapRef.current.clientHeight; // tinggi aktual container
    const w = Math.ceil(ratioRef.current * h); // lebar tile pada tinggi tsb
    const needed = Math.ceil(window.innerWidth / w) + 2; // + ekstra biar aman
    setTileW(w);
    setTileCount(needed);
  }, []);

  // Ambil rasio gambar asli lewat onLoadingComplete
  const handleProbeLoaded = useCallback((img: HTMLImageElement) => {
    ratioRef.current = img.naturalWidth / img.naturalHeight;
    recalc();
  }, [recalc]);

  useEffect(() => {
    // Recalc saat resize
    const onResize = () => recalc();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [recalc]);

  // Durasi animasi biar kecepatannya konstan (px/detik)
  const duration = tileW > 0 ? tileW / speed : 1;

  return (
    <div
      ref={wrapRef}
      className={`absolute bottom-0 left-0 w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* img “probe” tak terlihat untuk ambil natural ratio; nggak akan kepotong/ketarik */}
      <Image
        src={src}
        alt="probe"
        width={10}
        height={10}
        priority
        className="invisible absolute"
        onLoadingComplete={handleProbeLoaded}
      />

      {/* Jika user prefer reduce-motion, biarkan statis */}
      <motion.div
        className="absolute bottom-0 left-0 flex will-change-transform"
        // Geser persis 1 tile → loop seamless
        animate={{ x: tileW ? [0, -tileW] : 0 }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration,
          },
        }}
        style={{ height }}
      >
        {Array.from({ length: tileCount }).map((_, i) => (
          <div key={i} className="flex-none" style={{ width: tileW , height }}>
            <Image
              src={src}
              alt={`ground_${i}`}
              // width/height dinamis supaya Next Image tetap jaga rasio
              width={tileW || 1}
              height={height}
              priority={i < 2}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {


  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-primary via-white to-transparent relative overflow-hidden">
      <div className="mt-10">
        <h2 className="text-4xl font-serif text-[#020b49]">Wedding invite</h2>
      </div>

      {/* Cloud looping in background - slower parallax effect */}
      <LoopingGround src="/cloud.png" height={120} speed={25} className=" bottom-50" />

      {/* Ground looping – no cut, no stretch, all screens */}
      <LoopingGround src="/hero/ground.png" height={250} speed={80} />



      <div className="absolute bottom-38 left-10 w-[100px] h-[70px] z-20">
        <Image
          src="/hero/char.png"
          alt="UI"
          width={1920}
          height={500}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Notebook image on top */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[290px] h-[250px]">
        <Image
          src="/hero/notebook.png"
          alt="Notebook"
          width={500}
          height={500}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
