'use client';

import { Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/images&videos/gallery/tendanilogo-Photoroom.png" alt="Tendani Holdings Logo" width={80} height={80} className="h-20" style={{ width: 'auto' }} />
            <span className="text-lg font-bold font-headline">Tendani Holdings</span>
          </div>
          <p className="text-sm text-muted-foreground my-4 md:my-0">
            &copy; {currentYear} Tendani Holdings. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-6 w-6" />
               <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-6 w-6" />
               <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
