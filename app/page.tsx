import Parallax from '@/components/Parallax';
import Story from '@/components/invitation/Story';
import EventDetails from '@/components/invitation/EventDetails';
import Gallery from '@/components/invitation/Gallery';
import Rsvp from '@/components/invitation/Rsvp';
import SlideToUnlock from '@/components/invitation/SlideToUnlock';
import ScrollProgress from '@/components/invitation/ScrollProgress';
import FloatingElements from '@/components/invitation/FloatingElements';
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
    <main className="overflow-hidden">
      <div className="bg-background">
        <Parallax title="Nina & Rores Wedding's" />
      </div>
      <div className="relative z-[60]">
        <SlideToUnlock guestName={guestName} />
      </div>
      
      {/* Main Content Area */}
      <div className="relative z-50 bg-gradient-to-b from-[#BFD8BD] to-[#F2F2F2] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] -mt-10 pt-10 border-t border-primary/10 overflow-hidden min-h-screen">
        
        <FloatingElements />
        <ScrollProgress />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
             style={{
               backgroundImage: 'url("/hero/stars.png")',
               backgroundSize: '200px'
             }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-32 pb-32 relative z-10">
            <section id="story" >
              <Story />
            </section>
            
            <section id="gallery" className="relative">
              <Gallery />
            </section>
            
            <section id="event-details">
              <EventDetails />
            </section>
            
            <section id="rsvp">
              <Rsvp />
            </section>
        </div>
      </div>
    </main>
  );
}