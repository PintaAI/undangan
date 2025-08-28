import Hero from '@/components/invitation/Hero';
import Story from '@/components/invitation/Story';
import EventDetails from '@/components/invitation/EventDetails';
import Gallery from '@/components/invitation/Gallery';
import Rsvp from '@/components/invitation/Rsvp';


interface PageProps {
  searchParams: {
    name?: string;
  };
}

export default function Home({ searchParams }: PageProps) {
  const guestName = searchParams.name ? decodeURIComponent(searchParams.name) : undefined;

  return (
    <div className="relative">
      <Hero guestName={guestName} />
      
    
        <Story />
        <EventDetails />
        <Gallery />
        <Rsvp />
     
    </div>
  );
}