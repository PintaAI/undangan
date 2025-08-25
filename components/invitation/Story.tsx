import { weddingData } from "@/lib/data";

export default function Story() {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
          {weddingData.story.title}
        </h2>
      </div>
      <div className="text-center">
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {weddingData.story.text}
        </p>
      </div>
    </section>
  );
}