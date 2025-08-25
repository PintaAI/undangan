import { weddingData } from "@/lib/data";
import SlideToUnlock from "./SlideToUnlock";

export default function Hero() {
  const { name1, name2 } = weddingData.couple;
  const weddingDate = weddingData.weddingDate;

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
      <div className="text-center px-4 z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
          {name1} & {name2}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-light">
          {weddingDate}
        </p>
        
        {/* Mobile hint - only show on mobile devices */}
        <div className="md:hidden mt-8 text-sm text-gray-500 animate-pulse">
          ↓ Swipe down to continue ↓
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
      
      {/* Slide to unlock component - only on mobile */}
      <div className="md:hidden">
        <SlideToUnlock />
      </div>
    </div>
  );
}