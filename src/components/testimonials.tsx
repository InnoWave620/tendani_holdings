'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah L.',
    avatar: 'SL',
    role: 'Homeowner',
    quote: "Tendani Holdings transformed my garden! It's never looked better. Their team was professional, friendly, and incredibly skilled. Highly recommended!",
  },
  {
    name: 'Mike P.',
    avatar: 'MP',
    role: 'Business Owner',
    quote: "The cleaning service for our office is exceptional. They are thorough, reliable, and always leave the place sparkling. A fantastic service all around.",
  },
  {
    name: 'Jessica T.',
    avatar: 'JT',
    role: 'Property Manager',
    quote: "I've used their services for multiple properties, and the results are consistently outstanding. Their attention to detail is second to none.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-primary tracking-tighter">
            Happy Clients
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear what our customers have to say about their experience with us.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full flex flex-col justify-between shadow-md">
                    <CardContent className="p-6 flex-grow">
                      <div className="flex items-center mb-4">
                        <Avatar>
                          <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.avatar}`} />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                        ))}
                      </div>
                      <blockquote className="text-muted-foreground italic">
                        "{testimonial.quote}"
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
