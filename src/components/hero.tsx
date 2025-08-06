import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      <video
        src="/cleaning.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-20 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
          Excellence in Every Detail
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-xl text-slate-200 drop-shadow-md">
          Bringing unparalleled cleaning and gardening services to your doorstep. Experience the Tendani difference today.
        </p>
        <Button asChild size="lg" className="mt-8 group bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg py-6 px-7 sm:py-7 sm:px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
          <Link href="#services">
            Explore Our Services <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
