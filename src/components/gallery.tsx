import Image from 'next/image';

const galleryItems = [
  { src: "/images&videos/gallery/ourwork6.jpg", alt: "A beautifully manicured lawn", hint: "manicured lawn" },
  { src: "/images&videos/gallery/ourwork5.jpg", alt: "A pristine and sanitized bathroom", hint: "sparkling bathroom" },
  { src: "/images&videos/gallery/ourwork4.jpg", alt: "A tidy and organized office space", hint: "tidy office" },
  { src: "/images&videos/gallery/ourwork3.jpg", alt: "A vibrant flowerbed in full bloom", hint: "vibrant flowerbed" },
  { src: "/images&videos/gallery/ourwork1.jpg", alt: "Perfectly trimmed hedges lining a walkway", hint: "trimmed hedges" },
  { src: "/images&videos/gallery/ourwork2.jpg", alt: "A sparkling clean kitchen after our service", hint: "clean kitchen" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary tracking-tighter">
            Our Work
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            A glimpse into the quality and dedication we bring to every project.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={item.hint}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
