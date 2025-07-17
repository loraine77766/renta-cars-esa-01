import Link from 'next/link';
import { Car, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-opacity-80 transition-colors">
            <Car className="h-7 w-7" />
            <span className="font-headline text-2xl font-bold">CubaRenta</span>
          </Link>
          <nav>
            <Button variant="ghost" asChild>
              <Link href="/mis-rentas" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span>Mis Rentas</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
