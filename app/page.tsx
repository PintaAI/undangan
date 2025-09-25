import Hero from '@/components/invitation/Hero';
import Story from '@/components/invitation/Story';
import EventDetails from '@/components/invitation/EventDetails';
import Gallery from '@/components/invitation/Gallery';
import Rsvp from '@/components/invitation/Rsvp';
import SlideToUnlock from '@/components/invitation/SlideToUnlock';


interface PageProps {
  searchParams: Promise<{
    name?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const guestName = resolvedSearchParams.name ? decodeURIComponent(resolvedSearchParams.name) : undefined;

  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen ">
      <div className="snap-always snap-center  ">
        <Hero />
      </div>
      <SlideToUnlock guestName={guestName} />
      <div className="snap-always snap-center ">
        <Story />
      </div>
      <div className="snap-always snap-center ">
        <Gallery />
       
      </div>
      <div className="snap-always snap-center ">
        
         <EventDetails />
      </div>
      <div className="snap-always snap-center">
        <Rsvp />
      </div>
    </div>
  );
}