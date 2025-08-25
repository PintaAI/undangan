import { weddingData } from "@/lib/data";
import { Clock, MapPin, ExternalLink } from "lucide-react";

export default function EventDetails() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Wedding Events
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {weddingData.events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {event.title}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Clock className="w-5 h-5 text-pink-500" />
                  <span className="text-lg">{event.time}</span>
                </div>
                
                <div className="flex items-start space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-pink-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">{event.venue}</p>
                    <p className="text-sm">{event.address}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-pink-500 hover:text-pink-600 transition-colors duration-200"
                  >
                    <span>View on Map</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                {event.description && (
                  <p className="mt-4 text-gray-600 italic text-sm">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}