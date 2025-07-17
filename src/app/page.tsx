import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AiRecommender from '@/components/AiRecommender';
import { CarList } from '@/components/CarList';
import { cars } from '@/lib/cars';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
            Renta de Autos en Cuba
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            RentCubaCar es una agencia en línea con asistencia telefónica dedicada a la intermediación, organización y realización de proyectos turísticos, planes e itinerarios y venta de productos turísticos como: alquiler de coches y reservas de hoteles.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra el auto perfecto para tu viaje. Fácil, rápido y confiable.
          </p>
        </section>

        <AiRecommender />

        <section id="cars" className="my-12">
          <h2 className="font-headline text-3xl font-bold text-center mb-8 text-primary">Nuestra Flota</h2>
          <CarList cars={cars} />
        </section>

        <section className="my-16 py-12 bg-secondary/50 rounded-lg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold mb-8 text-primary">¿Por qué reservar un Auto con RentCubaCar?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-md">
                <CardHeader>
                  <div className="mx-auto bg-accent/20 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-accent"/>
                  </div>
                  <CardTitle className="font-headline text-xl text-primary">¡Estamos contigo para ayudarte!</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Si tienes alguna pregunta, sugerencia, solicitud especial o comentario. ¡Habla con nosotros!
                </CardContent>
              </Card>
              <Card className="text-center shadow-md">
                <CardHeader>
                  <div className="mx-auto bg-accent/20 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-accent"/>
                  </div>
                  <CardTitle className="font-headline text-xl text-primary">Confirmación casi inmediata</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Le confirmaremos la disponibilidad de su reserva en menos de 24 horas.
                </CardContent>
              </Card>
              <Card className="text-center shadow-md">
                <CardHeader>
                  <div className="mx-auto bg-accent/20 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8 text-accent"/>
                  </div>
                  <CardTitle className="font-headline text-xl text-primary">Asistencia en Cuba</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  En caso que necesite ayuda nuestros contáctos en Cuba estarán a tu disposición.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
