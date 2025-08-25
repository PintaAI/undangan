export const weddingData = {
  couple: {
    name1: "Nina",
    name2: "Rores"
  },
  weddingDate: "14 December 2025",
  story: {
    title: "Our Story",
    text: "Our story began in a small coffee shop in the heart of the city...",
    image: "/images/our-story.jpg"
  },
  events: [
    {
      title: "The Ceremony",
      time: "2:00 PM",
      venue: "St. Paul's Cathedral",
      address: "123 Main Street, Anytown, USA",
      mapLink: "https://maps.google.com/...",
      description: "The ceremony will be held outdoors. Please dress accordingly."
    },
    {
      title: "The Reception",
      time: "5:00 PM",
      venue: "The Grand Ballroom",
      address: "456 High Street, Anytown, USA",
      mapLink: "https://maps.google.com/...",
      description: "Join us for dinner, drinks, and dancing!"
    }
  ],
  gallery: {
    title: "Gallery",
    images: [
      "/images/gallery/1.jpg",
      "/images/gallery/2.jpg",
      "/images/gallery/3.jpg",
      "/images/gallery/4.jpg"
    ]
  },
  rsvp: {
    title: "Will you be there?",
    formEndpoint: "/api/rsvp"
  }
};