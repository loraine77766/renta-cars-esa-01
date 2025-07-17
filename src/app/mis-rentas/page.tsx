'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import type { SavedRental } from '@/lib/types';
import { cars } from '@/lib/cars';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, Car } from 'lucide-react';
import Image from 'next/image';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function MisRentasPage() {
  const [savedRentals, setSavedRentals] = useLocalStorage<SavedRental[]>('savedRentals', []);

  const handleClearAll = () => {
    setSavedRentals([]);
  };

  const handleRemoveOne = (index: number) => {
    const newRentals = savedRentals.filter((_, i) => i !== index);
    setSavedRentals(newRentals);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">Mis Rentas Guardadas</h1>
            {savedRentals.length > 0 && (
                <Button variant="destructive" onClick={handleClearAll}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Limpiar todo
                </Button>
            )}
        </div>

        {savedRentals.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Car className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium text-primary">No tienes rentas guardadas</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Cuando encuentres un auto que te guste, guárdalo para verlo aquí más tarde.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link href="/">
                  Ver autos
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedRentals.map((rental, index) => {
              const car = cars.find(c => c.id === rental.carId);
              if (!car) return null;

              const startDate = parseISO(rental.startDate);
              const endDate = parseISO(rental.endDate);
              const rentalDays = differenceInCalendarDays(endDate, startDate) + 1;
              const totalPrice = rentalDays * car.pricePerDay;

              return (
                <Card key={index} className="flex flex-col overflow-hidden shadow-md">
                   <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                            <Image src={car.imageUrl} alt={car.name} data-ai-hint={car.imageHint} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                            <CardTitle className="font-headline text-xl text-primary">{car.name}</CardTitle>
                             <div className="flex flex-wrap gap-2 my-2">
                                {car.features.map(f => <Badge key={f} variant="secondary">{f}</Badge>)}
                            </div>
                        </div>
                    </CardHeader>
                  <CardContent className="flex-grow p-4 space-y-3">
                     <div className="space-y-2 text-sm bg-secondary/50 p-3 rounded-md">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Recogida:</span>
                            <span className="font-semibold">{format(startDate, "PPP", { locale: es })}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Devolución:</span>
                            <span className="font-semibold">{format(endDate, "PPP", { locale: es })}</span>
                        </div>
                    </div>
                    <Separator/>
                    <div className="flex justify-between items-center font-bold text-lg text-primary">
                        <span className="font-headline">Precio Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 bg-gray-50 dark:bg-gray-800/20 grid grid-cols-2 gap-2">
                     <Button variant="outline" onClick={() => handleRemoveOne(index)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                    </Button>
                    <Button asChild className="bg-accent hover:bg-accent/90">
                       <Link href={`/confirmacion?carId=${car.id}&from=${rental.startDate}&to=${rental.endDate}`}>
                            Rentar
                       </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
