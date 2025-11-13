import Parallax from '@/components/Parallax';
import Story from '@/components/invitation/Story';
import EventDetails from '@/components/invitation/EventDetails';
import Gallery from '@/components/invitation/Gallery';
import Rsvp from '@/components/invitation/Rsvp';
import SlideToUnlock from '@/components/invitation/SlideToUnlock';


interface PageProps {
  searchParams: Promise<{
    name?: string;
    id?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const guestName = resolvedSearchParams.name ? decodeURIComponent(resolvedSearchParams.name) : undefined;

  return (
    <div>
      <div className="bg-background">
        <Parallax title="Nina & Rores Wedding's" />
      </div>
      <div className="relative z-51">
        <SlideToUnlock guestName={guestName} />
      </div>
      <div className="relative z-50">
        <Story />
      </div>
      <div className="relative z-50">
        <Gallery />
      </div>
      <div className="relative z-50 bg-background">
        <EventDetails />
      </div>
      <div className="relative z-50 bg-background">
        <Rsvp />
      </div>
    </div>
  );
}