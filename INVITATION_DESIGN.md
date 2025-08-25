# Digital Wedding Invitation Design

This document outlines the structure, components, and data format for a single-page digital wedding invitation.

## 1. Page Sections

The wedding invitation page will be composed of the following sections, appearing in this order:

1.  **Hero/Banner:** The first thing guests see. A visually appealing section with the couple's names and wedding date.
2.  **Couple's Story:** A section to share a brief story about the couple.
3.  **Event Details:** Clear and concise information about the ceremony and reception.
4.  **Photo Gallery:** A collection of photos of the couple.
5.  **RSVP:** A form for guests to confirm their attendance.

## 2. Component Breakdown

### Hero/Banner Section

*   `BackgroundImage`: A full-width, high-quality image of the couple.
*   `CoupleNames`: A text component to display the names of the couple (e.g., "Jane & John").
*   `WeddingDate`: A text component for the wedding date.

### Couple's Story Section

*   `SectionTitle`: A title for the section (e.g., "Our Story").
*   `StoryText`: A paragraph component to display the couple's story.
*   `CoupleImage`: An optional image of the couple to accompany the story.

### Event Details Section

This section will contain details for both the ceremony and the reception.

*   `SectionTitle`: A title for the section (e.g., "Wedding Events").
*   `EventCard` (reusable component for Ceremony & Reception):
    *   `EventTitle`: The title of the event (e.g., "The Ceremony", "The Reception").
    *   `EventTime`: The date and time of the event.
    *   `EventVenue`: The name of the venue.
    *   `EventAddress`: The address of the venue.
    *   `MapLink`: A link to the location on a map service (e.g., Google Maps).
    *   `Description`: A brief description or special instructions.

### Photo Gallery Section

*   `SectionTitle`: A title for the section (e.g., "Gallery").
*   `ImageGrid`: A grid layout to display a collection of photos.
    *   `PhotoImage`: An individual image component within the grid.

### RSVP Section

*   `SectionTitle`: A title for the section (e.g., "Will you be there?").
*   `RSVPForm`: A form for guests to respond.
    *   `NameInput`: A text field for the guest's full name.
    *   `AttendanceSelect`: A dropdown or radio buttons for "Attending" or "Not Attending".
    *   `GuestCountInput`: A number input for the number of guests (if attending).
    *   `MessageInput`: An optional textarea for a message to the couple.
    *   `SubmitButton`: A button to submit the form.

## 3. Data Structure (JSON)

A single JSON object can be used to populate the content of the entire page. This separates the data from the presentation, making it easy to update.

```json
{
  "couple": {
    "name1": "Jane Doe",
    "name2": "John Smith"
  },
  "weddingDate": "Saturday, October 26, 2024",
  "story": {
    "title": "Our Story",
    "text": "Our story began in a small coffee shop in the heart of the city...",
    "image": "/images/our-story.jpg"
  },
  "events": [
    {
      "title": "The Ceremony",
      "time": "2:00 PM",
      "venue": "St. Paul's Cathedral",
      "address": "123 Main Street, Anytown, USA",
      "mapLink": "https://maps.google.com/...",
      "description": "The ceremony will be held outdoors. Please dress accordingly."
    },
    {
      "title": "The Reception",
      "time": "5:00 PM",
      "venue": "The Grand Ballroom",
      "address": "456 High Street, Anytown, USA",
      "mapLink": "https://maps.google.com/...",
      "description": "Join us for dinner, drinks, and dancing!"
    }
  ],
  "gallery": {
    "title": "Gallery",
    "images": [
      "/images/gallery/1.jpg",
      "/images/gallery/2.jpg",
      "/images/gallery/3.jpg",
      "/images/gallery/4.jpg"
    ]
  },
  "rsvp": {
    "title": "Will you be there?",
    "formEndpoint": "/api/rsvp"
  }
}
```

This structure provides a clear blueprint for a developer to build the digital wedding invitation.