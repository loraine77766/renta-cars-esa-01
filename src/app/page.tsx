
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { CarList } from '@/components/CarList';
import { cars } from '@/lib/cars';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Clock, ShieldCheck, ListChecks, Map, CalendarSearch, Car, User, CreditCard, MailCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const sortedCars = [...cars].sort((a, b) => a.pricePerDay - b.pricePerDay);
  
  // Find the cheapest car
  const cheapestCar = sortedCars[0];
  
  // Find the new Toyota Corolla
  const corolla = cars.find(c => c.id === 15);
  
  // Find one other car that isn't the cheapest or the corolla
  const otherCar = sortedCars.find(c => c.id !== cheapestCar.id && c.id !== corolla?.id);

  const recommendedCars = [cheapestCar, corolla, otherCar].filter((c): c is NonNullable<typeof c> => c !== undefined);


  const howToSteps = [
    {
      icon: <CalendarSearch className="h-8 w-8 text-accent" />,
      title: "Lugar, hora y fecha",
      description: "Seleccione Lugar, Hora y fecha y darle click a Buscar."
    },
    {
      icon: <Car className="h-8 w-8 text-accent" />,
      title: "Autos disponibles",
      description: "Elija un Auto del resultados de su búsqueda y click para mas detalles."
    },
    {
      icon: <User className="h-8 w-8 text-accent" />,
      title: "Datos personales",
      description: "Complete los datos y envíe la solicitud. Confirmamos disponibilidad en 24 horas."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-accent" />,
      title: "Pagar reserva",
      description: "Recibirá un link de pago y allí proceda al pago de su reserva."
    },
    {
      icon: <MailCheck className="h-8 w-8 text-accent" />,
      title: "Recibe tu Voucher",
      description: "Una vez confirmado su pago, enviaremos el Voucher y su factura."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
            Renta de Autos en Cuba
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Renta Cars ESA es una agencia en línea con asistencia telefónica dedicada a la intermediación, organización y realización de proyectos turísticos, planes e itinerarios y venta de productos turísticos como: alquiler de coches y reservas de hoteles.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra el auto perfecto para tu viaje. Fácil, rápido y confiable.
          </p>
           <Button asChild className="mt-6 bg-accent hover:bg-accent/90">
                <Link href="/autos">
                  Ver Autos Disponibles
                </Link>
            </Button>
        </section>

        <section className="my-16">
           <h2 className="font-headline text-3xl font-bold text-center mb-12 text-primary">¿Cómo reservar un Auto?</h2>
           <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 -mt-8"></div>
               {howToSteps.map((step, index) => (
                   <div key={index} className="relative text-center">
                       <div className="relative z-10 mx-auto bg-card border-2 border-accent rounded-full h-20 w-20 flex items-center justify-center mb-4">
                           <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">{index + 1}</span>
                           {step.icon}
                       </div>
                       <h3 className="font-headline text-lg font-semibold text-primary">{step.title}</h3>
                       <p className="text-sm text-muted-foreground">{step.description}</p>
                   </div>
               ))}
           </div>
        </section>
        
        <section id="cars" className="my-16">
          <h2 className="font-headline text-3xl font-bold text-center mb-8 text-primary">Autos Recomendados</h2>
          <CarList cars={recommendedCars} />
        </section>

        <section className="my-16 py-12 bg-secondary/50 rounded-lg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold mb-8 text-primary">¿Por qué reservar un Auto con Renta Cars ESA?</h2>
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

        <section className="my-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                  <ListChecks className="h-6 w-6 text-accent" />
                  Informaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  <li>Tener un mínimo de 21 y un máximo de 80 años de edad.</li>
                  <li>Licencia de conducción vigente con validez mínima de 2 años.</li>
                  <li>Pasaporte vigente y Voucher de su reserva impreso.</li>
                  <li>La gasolina, el impuesto aereopuerto y seguro podrían estar incluido en el precio.</li>
                  <li>A conductores entre 21-24 años y 74-80 años de edad se le incrementará el costo del seguro en un 50%.</li>
                  <li>Si devuelves el auto en un punto diferente al de recogida, existe un cargo extra.</li>
                  <li>El pago del seguro es obligatorio.</li>
                  <li>Los pagos en las oficinas de renta serán exclusivamente con tarjetas de crédito.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                  <Map className="h-6 w-6 text-accent" />
                  ¡Qué ver y qué hacer en Cuba!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  <li>Pasear por el Malecón de La Habana.</li>
                  <li>Tomar un Mojito en La Bodeguita del Medio.</li>
                  <li>Callejear por la Habana Vieja.</li>
                  <li>Darte un baño en Varadero.</li>
                  <li>Visitar la la ciudad colonial de Trinidad.</li>
                  <li>Recorrer el valle de Viñales a caballo.</li>
                  <li>Montarse en un "almendrón" y tomas clases de salsa.</li>
                  <li>Visitar Santiago de Cuba.</li>
                  <li>Conocer Viñales, una de las zonas más rurales de Cuba.</li>
                  <li>Conocer Cienfuegos y su arquitectura neoclásica.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
