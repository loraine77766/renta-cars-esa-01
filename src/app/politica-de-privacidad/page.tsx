import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PoliticaDePrivacidadPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-3xl md:text-4xl text-primary text-center">
                    Política de Seguridad y Privacidad
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground prose prose-sm max-w-none">
                <p>
                    Este sitio web es operado por RentaCarsESA.com, una comercial de BLUES GROUP USA LLC con registro No. L21000489130. Estamos comprometidos con proteger su privacidad y tomamos muy en serio nuestras responsabilidades con respecto a la seguridad de la información del cliente. Esta política explica cómo usamos la información del cliente y cómo protegemos su privacidad.
                </p>
                <p>
                    Proteger la privacidad y seguridad de la información personal de nuestros clientes es muy importante para nosotros.
                </p>
                <p>
                    La ley federal requiere que le digamos cómo usamos, compartimos y protegemos su información personal. Limita también el utilizo de su información personal.
                </p>
                <p>
                    Lea atentamente toda nuestra Política de privacidad para que comprenda que hacemos con toda la información personal que optenemos de nuestros clientes tanto on line que sin conección.
                </p>
                <p>
                    Recopilamos y usamos solo la información necesaria para responder a sus inquietudes y poder procesar el servicio que usted elija entre los que ofrecemos. En la mayoría de los casos, recopilamos información personal mínima, como nombre, dirección, número de teléfono o dirección de correo electrónico.
                </p>
                <p>
                    En casos limitados, dependiendo de la naturaleza de su solicitud se podrian también recopilar otra información personal, como números de su tarjeta de credito o números de cuenta para la ejecución de un pago. También podemos recopilar información sobre su visita a nuestros sitios web por cuestiones de seguridad, operaciones internas envio de propuestas comerciales etc.
                </p>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl text-primary">Renta Cars ESA optiene sus datos personales de las siguientes maneras:</h3>
                    <ul className="list-disc list-inside">
                        <li>Cuando se contacta con nosotros para pedir informamaciones de nuestros servicios</li>
                        <li>Cuando se registra en nuestro sitio</li>
                        <li>Cuando utiliza nuestros servicios sea reserva de vuelos, hoteles, autos, envíos marítimos o aereos,tramitación consular etc.</li>
                        <li>Cuando presenta una queja o demanda.</li>
                        <li>Cuando participa a uno de nuestras rifas, a nuestro servicio Fidelidad, para la optención de bonos o puntos de las promiciones.</li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl text-primary">Contactaremos solo con usted:</h3>
                    <ul className="list-disc list-inside">
                        <li>Para informarla de nuevos servicios, nuevas ofertas y descuentos</li>
                        <li>En caso que gane algun premio esponzorizado y organizado por Renta Cars ESA</li>
                        <li>Para darle respuesta a sus preguntas, dudas del servicio</li>
                        <li>Para ayudar a recopilar las planillas on-line en caso de necesidad</li>
                        <li>Para informarle en caso de cancelación de vuelos , reservas por causa mayor o por qualquier otra necesidad colegados a nuestros servicios</li>
                    </ul>
                </div>

                <p>
                    Toda su información personal quedará registrada en la base datos de Renta Cars ESA. Usamos su información solo para un analisis de mercado y un crecimiento de la compañía y no proporcionamos informaciones de nuestros clientes a terceros.
                </p>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl text-primary">Cambios en nuestra política de privacidad</h3>
                    <p>
                        Nuestra Política de privacidad se revisa a menudo para asegurar que refleje la forma en que utilizamos su información. Le notificaremos de cualquier cambio al actualizar esta política.
                    </p>
                    <p>
                        Esta Política de privacidad se actualizó por última vez el 10 de Enero de 2021.
                    </p>
                </div>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
