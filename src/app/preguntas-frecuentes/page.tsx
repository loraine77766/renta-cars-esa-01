import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PreguntasFrecuentesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 space-y-12">
        <FAQ />

        <Card className="shadow-lg max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary text-center">¿Quiénes somos?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>
                    Renta Cars ESA es una empresa llena de experiencias, donde te ayudamos a encontrar y rentar tu Auto en Cuba a los precios más acogedores del mercado.
                </p>
                <p>
                    Ubicada en una de las ciudades más emblemáticas de Europa en Italia, que ofrece un servicio distinto a las demás Agencias de viaje. Nos preocupamos por las necesidades reales de nuestros clientes.
                </p>

                <h3 className="font-headline text-2xl text-primary text-center pt-4">Nuestro objetivo</h3>
                 <p>
                    Renta Cars ESA se proyecta como objetivo principal el desarrollo servicios que cumplan con las expectativas de nuestros clientes, especialmente cubanos radicados en Europa y el Estado de la Florida. Todo el equipo humano de Renta Cars ESA se involucra para mantener el alto grado de satisfacción al cliente. Por eso, día tras día, hacemos que sus trámites con nosotros sean más fáciles, rápidos, eficaces y seguros, logrando con ello que nuestros clientes depositen su confianza en nosotros y nuestros servicios.
                </p>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
