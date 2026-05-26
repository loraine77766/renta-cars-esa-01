
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PoliticaDeCookiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-3xl md:text-4xl text-primary text-center">
                    Política de Cookies
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground prose prose-sm max-w-none">
                <p>
                    El acceso a RentaCarsESA.com puede implicar la utilización de cookies. Las cookies son pequeñas cantidades de información que se almacenan en el navegador utilizado por cada Usuario en los distintos dispositivos que pueda utilizar para navegar para que el servidor recuerde cierta información que posteriormente y únicamente el servidor que la implementó leerá. Las cookies facilitan la navegación, la hacen más amigable, y no dañan el dispositivo de navegación.
                </p>
                <p>
                    Las cookies son procedimientos automáticos de recogida de información relativa a las preferencias determinadas por el Usuario durante su visita al Sitio Web con el fin de reconocerlo como Usuario, y personalizar su experiencia y el uso del Sitio Web, y pueden también, por ejemplo, ayudar a identificar y resolver errores.
                </p>
                <p>
                    La información recabada a través de las cookies puede incluir la fecha y hora de visitas al Sitio Web, las páginas visionadas, el tiempo que ha estado en el Sitio Web y los sitios visitados justo antes y después del mismo. Sin embargo, ninguna cookie permite que esta misma pueda contactarse con el número de teléfono del Usuario o con cualquier otro medio de contacto personal. Ninguna cookie puede extraer información del disco duro del Usuario o robar información personal. La única manera de que la información privada del Usuario forme parte del archivo Cookie es que el usuario dé personalmente esa información al servidor.
                </p>
                <p>
                    Las cookies que permiten identificar a una persona se consideran datos personales. Por tanto, a las mismas les será de aplicación la Política de Privacidad anteriormente descrita. En este sentido, para la utilización de las mismas será necesario el consentimiento del Usuario. Este consentimiento será comunicado, en base a una elección auténtica, ofrecido mediante una decisión afirmativa y positiva, antes del tratamiento inicial, removible y documentado.
                </p>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl text-primary">Cookies propias</h3>
                    <p>
                        Son aquellas cookies que son enviadas al ordenador o dispositivo del Usuario y gestionadas exclusivamente por para el mejor funcionamiento del Sitio Web. La información que se recaba se emplea para mejorar la calidad del Sitio Web y su Contenido y su experiencia como Usuario. Estas cookies permiten reconocer al Usuario como visitante recurrente del Sitio Web y adaptar el contenido para ofrecerle contenidos que se ajusten a sus preferencias.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl text-primary">Cookies de terceros de medios sociales</h3>
                    <p>
                        Para mejorar y hacer mas atractivo nuestro contenido de sitio web, a veces podemos incrustar contenido de video desde otros sitios web de medios sociales como YouTube o Facebook. Como resultado, cuando visita una página con contenido incrustado, se le pueden presentar cookies de estos sitios web. Renta Cars ESA no tiene control o responsabilidad sobre estas cookies y en consecuencia, usted debe verificar la política de cookies de terceros pertinente para obtener más información.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl text-primary">Deshabilitar, rechazar y eliminar cookies</h3>
                    <p>
                        El Usuario puede deshabilitar, rechazar y eliminar las cookies total o parcialmente instaladas en su dispositivo mediante la configuración de su navegador (entre los que se encuentran, por ejemplo, Chrome, Firefox, Safari, Explorer). En este sentido, los procedimientos para rechazar y eliminar las cookies pueden diferir de un navegador de Internet a otro. En consecuencia, el Usuario debe acudir a las instrucciones facilitadas por el propio navegador de Internet que esté utilizando. En el supuesto de que rechace el uso de cookies total o parcialmente podrá seguir usando el Sitio Web, si bien podrá tener limitada la utilización de algunas de las prestaciones del mismo.
                    </p>
                </div>

                <p>
                    Si tiene más preguntas, puede contactarnos por WhatsApp.
                </p>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
