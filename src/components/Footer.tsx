import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-card mt-auto border-t">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p className="text-sm mb-4">
            Renta Cars ESA es una Agencia On-Line con asistencia telefónica donde te ayudamos a encontrar y rentar tu Auto en Cuba con los mejores precios del mercado.
        </p>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 text-xs mb-4">
            <p>&copy; {new Date().getFullYear()} Renta Cars ESA. Todos los derechos reservados.</p>
            <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>
            </Button>
             <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/politica-de-privacidad">Política de Privacidad</Link>
            </Button>
            <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/politica-de-cookies">Política de Cookies</Link>
            </Button>
            <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/contactanos">Contáctanos</Link>
            </Button>
        </div>
        <div className="pt-4 border-t border-border/50 text-[10px] flex justify-center items-center">
          <span>Soporte Técnico: +1 (740) 709-7677</span>
        </div>
      </div>
    </footer>
  );
}
