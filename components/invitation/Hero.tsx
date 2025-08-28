import { weddingData } from "@/lib/data";
import SlideToUnlock from "./SlideToUnlock";

interface HeroProps {
  guestName?: string;
}

export default function Hero({ guestName }: HeroProps) {
  const { name1, name2 } = weddingData.couple;
  const weddingDate = weddingData.weddingDate;

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[var(--muted)] to-[var(--accent)] relative overflow-hidden">
      <div className="text-center px-4 z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-[var(--foreground)] mb-6">
          {name1} & {name2}
        </h1>
        <p className="text-xl md:text-2xl text-[var(--muted-foreground)] font-light">
          {weddingDate}
        </p>
        
        {/* Mobile hint - only show on mobile devices */}
        <div className="md:hidden mt-8 text-sm text-[var(--muted-foreground)] animate-pulse">
          ↓ Swipe down to continue ↓
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--accent)] rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[var(--muted)] rounded-full opacity-50 blur-xl"></div>
      
      {/* Slide to unlock component - only on mobile */}
      <div className="md:hidden">
        <SlideToUnlock guestName={guestName} />
      </div>
    </div>
  );
}