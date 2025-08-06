import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble, Leaf, Zap } from 'lucide-react';
import Link from 'next/link';

const pricingPlans = [
  {
    icon: BedDouble,
    title: "Complete Changeover",
    price: "Starting from R800",
    description: "Includes a full cleaning service with linen washing and ironing.",
    features: ["Full property cleaning", "Linen washed and ironed", "Ideal for turnovers"],
    buttonText: "Book Now",
  },
  {
    icon: Zap,
    title: "Quick Service",
    price: "Starting from R300",
    description: "A quick but thorough cleaning for a tidy-up.",
    features: ["Surface cleaning", "Quick declutter", "Perfect for a refresh"],
    buttonText: "Book Now",
  },
  {
    icon: Leaf,
    title: "Gardening",
    price: "Starting from R350",
    description: "Per day rate for our professional gardening services.",
    features: ["Lawn mowing & edging", "Weeding & maintenance", "General garden care"],
    buttonText: "Book Now",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary tracking-tighter">
            Our Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            Affordable rates for top-quality services. Choose the plan that's right for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className="flex flex-col text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="items-center pb-4">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <plan.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">{plan.title}</CardTitle>
                <CardDescription className="text-lg font-semibold text-primary">{plan.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="#contact">{plan.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
