import Hero from '@/components/invitation/Hero';
import Story from '@/components/invitation/Story';
import EventDetails from '@/components/invitation/EventDetails';
import Gallery from '@/components/invitation/Gallery';
import Rsvp from '@/components/invitation/Rsvp';
import { TracingBeam } from '@/components/ui/tracing-beam';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      
      <TracingBeam className="px-6">
        <Story />
        <EventDetails />
        <Gallery />
        <Rsvp />
      </TracingBeam>
    </div>
  );
}