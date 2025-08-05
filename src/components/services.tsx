import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Sparkles, Sprout } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: "Cleaning Services",
    description: "Comprehensive cleaning solutions for residential and commercial properties. We leave every corner spotless, ensuring a fresh and healthy environment.",
  },
  {
    icon: Sprout,
    title: "Gardening Services",
    description: "Professional gardening to maintain and enhance your outdoor spaces. From lawn care to landscape design, we cultivate beauty.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-primary tracking-tighter">
            What We Offer
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Tailored services designed to meet your specific needs with precision and care.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <service.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
