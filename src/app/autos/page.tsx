
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { CarList } from '@/components/CarList';
import { cars } from '@/lib/cars';

export default function AutosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        
        <section className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
                Encuentra tu Auto Ideal
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explora nuestra flota de vehículos para encontrar el auto perfecto para tu viaje en Cuba.
            </p>
        </section>

        <section id="cars" className="my-12">
          <h2 className="font-headline text-3xl font-bold text-center mb-8 text-primary">Nuestra Flota</h2>
          <CarList cars={cars} />
        </section>

      </main>
      <Footer />
    </div>
  );
}
