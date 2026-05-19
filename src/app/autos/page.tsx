import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CarList } from '@/components/CarList';
import { cars } from '@/lib/cars';
import { Car } from 'lucide-react';

export default function AutosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Car className="h-4 w-4" /> Nuestra Flota
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
              Encuentra tu Auto Ideal
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra flota de vehículos y encuentra el auto perfecto para tu viaje en Cuba.
            </p>
          </div>
        </section>
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <CarList cars={cars} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
