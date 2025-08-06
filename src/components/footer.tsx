
'use client';

import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path
      d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459l-6.354 1.652zm6.225-3.148.351.207c1.494.882 3.23.133 4.601-.11 1.659-.288 5.328-2.444 5.328-2.444l-.042-.051c-1.162-.99-2.588-1.536-4.088-1.536-3.322 0-6.018 2.696-6.018 6.018 0 1.102.297 2.129.831 3.027l-.146.446-1.132 3.461 3.461-1.132z"
    />
  </svg>
);


export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/images&videos/gallery/tendanilogo-Photoroom.png" alt="Tendani Holdings Logo" width={80} height={80} className="h-20" style={{ width: 'auto' }} />
            <span className="text-lg font-bold font-headline">Tendani Holdings</span>
          </div>
          <p className="text-sm text-muted-foreground my-4 md:my-0">
            &copy; 2024 Tendani Holdings. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="https://wa.me/27609157255" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span className="sr-only">WhatsApp</span>
            </Link>
            <Link href="https://www.facebook.com/share/1B6SKX1Q27/?mibextid=wwXIfr" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-6 w-6" />
               <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://www.instagram.com/tendanitradings_dullstroom?igsh=c3lkaWM5bjIycXQ1&utm_source=qr" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6" />
               <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
