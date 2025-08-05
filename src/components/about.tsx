import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="wow animate__animated animate__fadeInLeft">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-primary tracking-tighter">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              At Tendani Holdings, our mission is to provide exceptional cleaning and gardening services that enhance the beauty and value of every property we touch. We are dedicated to delivering professional, reliable, and high-quality workmanship, ensuring complete customer satisfaction.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Our values of integrity, excellence, and respect guide everything we do. We believe in building lasting relationships with our clients by consistently exceeding their expectations and treating their homes and gardens as if they were our own.
            </p>
          </div>
          <div className="wow animate__animated animate__fadeInRight">
            <Image
              src="/images&videos/ourmission.jpg"
              alt="Tendani Holdings team working together"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="diverse team smiling"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
