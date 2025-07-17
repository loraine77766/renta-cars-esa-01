'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { addDays, format, differenceInCalendarDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Calendar as CalendarIcon, Tag, Users, Car, Bookmark, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

import type { Car, SavedRental } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [savedRentals, setSavedRentals] = useLocalStorage<SavedRental[]>('savedRentals', []);

  const rentalDays = date?.from && date?.to ? differenceInCalendarDays(date.to, date.from) + 1 : 0;
  const totalPrice = rentalDays * car.pricePerDay;

  const handleRent = () => {
    if (!date?.from || !date?.to) {
      toast({
        title: 'Error',
        description: 'Por favor, selecciona un rango de fechas.',
        variant: 'destructive',
      });
      return;
    }
    const fromDate = format(date.from, 'yyyy-MM-dd');
    const toDate = format(date.to, 'yyyy-MM-dd');
    router.push(`/confirmacion?carId=${car.id}&from=${fromDate}&to=${toDate}`);
  };

  const handleSave = () => {
    if (!date?.from || !date?.to) {
        toast({
            title: 'Error',
            description: 'Selecciona un rango de fechas para guardar.',
            variant: 'destructive',
        });
        return;
    }

    const newRental: SavedRental = {
        carId: car.id,
        startDate: format(date.from, 'yyyy-MM-dd'),
        endDate: format(date.to, 'yyyy-MM-dd'),
    };
    
    setSavedRentals([...savedRentals, newRental]);

    toast({
        title: 'Guardado',
        description: 'La renta ha sido guardada en "Mis Rentas".',
        action: <CheckCircle className="text-green-500" />,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={car.imageUrl}
            alt={car.name}
            data-ai-hint={car.imageHint}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
            <CardTitle className="font-headline text-xl text-primary">{car.name}</CardTitle>
            <CardDescription>{car.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
            {car.features.map((feature) => (
                <Badge key={feature} variant="secondary">{feature}</Badge>
            ))}
        </div>
        <Separator />
        <div className="space-y-2">
          <h4 className="font-headline text-sm font-semibold text-primary">Elige las fechas</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Selecciona un rango</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={new Date()}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                disabled={(day) => day < new Date(new Date().setHours(0,0,0,0))}
              />
            </PopoverContent>
          </Popover>
        </div>
        {rentalDays > 0 && (
            <div className='p-3 bg-secondary/50 rounded-md'>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Precio por día</span>
                    <span className="font-semibold">${car.pricePerDay}</span>
                </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Días de renta</span>
                    <span className="font-semibold">{rentalDays}</span>
                </div>
                <Separator className='my-2'/>
                 <div className="flex justify-between items-center font-bold text-lg text-primary">
                    <span className="font-headline">Total</span>
                    <span>${totalPrice}</span>
                </div>
            </div>
        )}
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 dark:bg-gray-800/20 grid grid-cols-2 gap-2">
         <Button variant="outline" onClick={handleSave} disabled={rentalDays <= 0}>
          <Bookmark className="mr-2 h-4 w-4" />
          Guardar
        </Button>
        <Button onClick={handleRent} disabled={rentalDays <= 0} className="bg-accent hover:bg-accent/90">
          Rentar Ahora
        </Button>
      </CardFooter>
    </Card>
  );
}
