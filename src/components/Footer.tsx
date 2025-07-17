import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-card mt-auto border-t">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p className="text-sm mb-2">
            RentCubaCar es una Agencia On-Line con asistencia telefónica donde te ayudamos a encontrar y rentar tu Auto en Cuba con los mejores precios del mercado.
        </p>
        <div className="flex justify-center items-center gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} rentacar. Todos los derechos reservados.</p>
            <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>
            </Button>
        </div>
      </div>
    </footer>
  );
}