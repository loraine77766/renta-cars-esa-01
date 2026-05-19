import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CarList } from '@/components/CarList';
import { cars } from '@/lib/cars';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Clock, ShieldCheck, ListChecks, Map, CalendarSearch, Car, User, CreditCard, MailCheck, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const sortedCars = [...cars].sort((a, b) => a.pricePerDay - b.pricePerDay);
  const cheapestCar = sortedCars[0];
  const corolla = cars.find(c => c.id === 15);
  const otherCar = sortedCars.find(c => c.id !== cheapestCar.id && c.id !== corolla?.id);
  const recommendedCars = [cheapestCar, corolla, otherCar].filter((c): c is NonNullable<typeof c> => c !== undefined);

  const howToSteps = [
    {
      icon: <CalendarSearch className="h-8 w-8" />,
      title: "Lugar, hora y fecha",
      description: "Seleccione lugar, hora y fecha. Dé click a Buscar."
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "Autos disponibles",
      description: "Elija un auto de los resultados y vea los detalles."
    },
    {
      icon: <User className="h-8 w-8" />,
      title: "Datos personales",
      description: "Complete sus datos. Confirmamos disponibilidad en 24h."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Pagar reserva",
      description: "Recibirá un link de pago para pagar su reserva."
    },
    {
      icon: <MailCheck className="h-8 w-8" />,
      title: "Recibe tu Voucher",
      description: "Pagado, enviamos su Voucher y factura."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero-gradient text-white">
          <div className="container mx-auto px-4 py-20 md:py-28 text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Renta de Autos en Cuba
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-3">
              Encuentra el auto perfecto para tu viaje. Fácil, rápido y confiable.
            </p>
            <p className="text-sm text-white/60 max-w-3xl mx-auto mb-8">
              Agencia en línea con asistencia telefónica para la reserva de autos y servicios turísticos en Cuba.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-headline font-semibold rounded-xl px-8">
                <Link href="/autos">
                  Ver Autos Disponibles <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8">
                <Link href="#como-funciona">¿Cómo funciona?</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4 text-primary">¿Cómo reservar un Auto?</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Solo 5 pasos simples para tener tu auto en Cuba</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
               {howToSteps.map((step, index) => (
                   <div key={index} className="relative text-center group">
                       <div className="mx-auto bg-gradient-to-br from-primary to-primary/70 text-white rounded-2xl h-20 w-20 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                           <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm shadow-md">{index + 1}</span>
                           {step.icon}
                       </div>
                       <h3 className="font-headline text-base font-semibold text-primary mb-1">{step.title}</h3>
                       <p className="text-sm text-muted-foreground">{step.description}</p>
                   </div>
               ))}
            </div>
          </div>
        </section>

        {/* Autos Recomendados */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Autos Recomendados</h2>
                <p className="text-muted-foreground mt-2">Los mejores precios para tu viaje</p>
              </div>
              <Button asChild variant="outline" className="hidden sm:flex border-primary/30 text-primary hover:bg-primary hover:text-white rounded-xl">
                <Link href="/autos">Ver todos <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <CarList cars={recommendedCars} />
            <div className="text-center mt-8 sm:hidden">
              <Button asChild variant="outline" className="border-primary/30 text-primary rounded-xl">
                <Link href="/autos">Ver todos los autos <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4 text-primary">¿Por qué reservar con nosotros?</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Te ofrecemos la mejor experiencia de renta de autos en Cuba</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <MessageSquare className="h-10 w-10" />, title: "Estamos contigo", desc: "Si tienes preguntas o necesitas ayuda, habla con nosotros." },
                { icon: <Clock className="h-10 w-10" />, title: "Confirmación rápida", desc: "Confirmamos tu reserva en menos de 24 horas." },
                { icon: <ShieldCheck className="h-10 w-10" />, title: "Asistencia en Cuba", desc: "Nuestros contactos en Cuba te apoyarán durante tu viaje." }
              ].map((item, i) => (
                <Card key={i} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                  <CardHeader>
                    <div className="mx-auto bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl h-20 w-20 flex items-center justify-center mb-2">
                      <div className="text-accent">{item.icon}</div>
                    </div>
                    <CardTitle className="font-headline text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{item.desc}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                    <ListChecks className="h-6 w-6 text-accent" />
                    Informaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-2"><span className="text-accent mt-1">•</span>Tener un mínimo de 21 y un máximo de 80 años de edad.</li>
                    <li className="flex gap-2"><span className="text-accent mt-1">•</span>Licencia de conducción vigente con validez mínima de 2 años.</li>
                    <li className="flex gap-2"><span className="text-accent mt-1">•</span>Pasaporte vigente y Voucher de su reserva impreso.</li>
                    <li className="flex gap-2"><span className="text-accent mt-1">•</span>La gasolina, el impuesto aereopuerto y seguro podrían estar incluido en el precio.</li>
                    <li className="flex gap-2"><span className="text-accent mt-1">•</span>Si devuelves el auto en un punto diferente al de recogida, existe un cargo extra.</li>
                    <li className="flex gap-2"><span className="text-accent mt-1">•</span>El pago del seguro es obligatorio. Pagos solo con tarjetas de crédito.</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                    <Map className="h-6 w-6 text-accent" />
                    Qué ver y hacer en Cuba
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    {["Pasear por el Malecón de La Habana.", "Tomar un Mojito en La Bodeguita del Medio.", "Callejear por la Habana Vieja.", "Darte un baño en Varadero.", "Visitar la ciudad colonial de Trinidad.", "Recorrer el valle de Viñales a caballo.", "Conocer Cienfuegos y su arquitectura neoclásica."].map((item, i) => (
                      <li key={i} className="flex gap-2"><Star className="h-4 w-4 text-accent shrink-0 mt-0.5" />{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="hero-gradient py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold text-white mb-4">¿Listo para tu viaje a Cuba?</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">Reserva tu auto hoy y viaja con tranquilidad</p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-headline font-semibold rounded-xl px-10">
              <Link href="/autos">Buscar Autos <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
