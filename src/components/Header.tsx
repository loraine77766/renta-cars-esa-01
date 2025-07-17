import Link from 'next/link';
import { Car, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-opacity-80 transition-colors">
            <Car className="h-7 w-7" />
            <span className="font-headline text-2xl font-bold">rentacar</span>
          </Link>
          <nav>
            <Button variant="ghost" asChild>
              <Link href="https://wa.me/18256097251" target="_blank" className="flex items-center gap-2">
                <LifeBuoy className="h-4 w-4" />
                <span>Soporte</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
