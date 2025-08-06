
'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images&videos/gallery/tendanilogo-Photoroom.png" alt="Tendani Holdings Logo" width={80} height={80} className="h-20" style={{ width: 'auto' }} />
            <span className="text-xl font-bold font-headline text-foreground">
              Tendani Holdings
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              </Button>
            ))}
             <Button asChild className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contact">Book Now</Link>
            </Button>
          </nav>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-headline text-2xl flex items-center gap-2">
                    <Image src="/images&videos/gallery/tendanilogo-Photoroom.png" alt="Tendani Holdings Logo" width={70} height={70} className="h-16" style={{ width: 'auto' }} />
                    Tendani Holdings
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground hover:text-primary"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                    <Link href="#contact" onClick={handleLinkClick}>Book Now</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
