import Image from 'next/image';

const galleryItems = [
  { src: "https://placehold.co/600x400.png", alt: "A sparkling clean kitchen after our service", hint: "clean kitchen" },
  { src: "https://placehold.co/600x400.png", alt: "A beautifully manicured lawn", hint: "manicured lawn" },
  { src: "https://placehold.co/600x400.png", alt: "A pristine and sanitized bathroom", hint: "sparkling bathroom" },
  { src: "https://placehold.co/600x400.png", alt: "A tidy and organized office space", hint: "tidy office" },
  { src: "https://placehold.co/600x400.png", alt: "A vibrant flowerbed in full bloom", hint: "vibrant flowerbed" },
  { src: "https://placehold.co/600x400.png", alt: "Perfectly trimmed hedges lining a walkway", hint: "trimmed hedges" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-primary tracking-tighter">
            Our Work
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A glimpse into the quality and dedication we bring to every project.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
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
