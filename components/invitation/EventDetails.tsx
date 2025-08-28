import { weddingData } from "@/lib/data";
import { Clock, MapPin, ExternalLink } from "lucide-react";

export default function EventDetails() {
  return (
    <section className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-foreground mb-12">
          Acara Pernikahan
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {weddingData.events.map((event, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                {event.title === "The Ceremony" ? "Akad" : "Resepsi"}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-lg">{event.time}</span>
                </div>
                
                <div className="flex items-start space-x-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{event.venue === "St. Paul's Cathedral" ? "Katedral St. Paul" : "Balai Agung"}</p>
                    <p className="text-sm">{event.address}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    <span>Lihat di Peta</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                {event.description && (
                  <p className="mt-4 text-muted-foreground italic text-sm">
                    {event.description === "The ceremony will be held outdoors. Please dress accordingly."
                      ? "Upacara akan diadakan di luar ruangan. Mohon berpakaian sesuai."
                      : "Bergabunglah bersama kami untuk makan malam, minuman, dan menari!"}
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