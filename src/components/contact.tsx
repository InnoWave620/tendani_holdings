'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-primary tracking-tighter">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We're here to help. Contact us for a free quote or any inquiries.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-headline font-semibold mb-6">Contact Us</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="tendanitradings@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can we help you today?" {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">Send Message</Button>
              </form>
            </Form>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-headline font-semibold mb-4">Our Information</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>contact@tendaniholdings.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <span>+27644836405</span>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <span>443 Phola street,Dullstroom sakhelwe</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-semibold mb-4">Business Hours</h3>
              <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 5:00 PM</p>
              <p className="text-muted-foreground">Sat: 9:00 AM - 4:00 PM</p>
              <p className="text-muted-foreground">Sun: Closed</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://maps.google.com/maps?q=443%20Phola%20street,Dullstroom%20sakhelwe&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Company Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
