

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, differenceInCalendarDays, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

import type { Car } from '@/lib/types';
import { locations } from '@/lib/locations';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Calendar as CalendarIcon } from 'lucide-react';
import RentalInfo from '../confirmacion/RentalInfo';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 30) {
            const hour = i;
            const minute = j;
            const date = new Date();
            date.setHours(hour, minute);
            slots.push(format(date, "HH:mm"));
        }
    }
    return slots;
};
const hours = generateTimeSlots();


const formSchema = z.object({
  pickupLocation: z.string().min(1, 'El lugar de recogida es obligatorio.'),
  pickupDate: z.date({ required_error: 'La fecha de recogida es obligatoria.' }),
  pickupTime: z.string().min(1, 'La hora de recogida es obligatoria.'),
  dropoffLocation: z.string().min(1, 'El lugar de devolución es obligatorio.'),
  dropoffDate: z.date({ required_error: 'La fecha de devolución es obligatoria.' }),
  dropoffTime: z.string().min(1, 'La hora de devolución es obligatoria.'),
}).refine(data => {
    if (!data.pickupDate || !data.dropoffDate) return true;
    return data.dropoffDate >= data.pickupDate;
}, {
    message: 'La fecha de devolución debe ser posterior o igual a la de recogida.',
    path: ['dropoffDate'],
});

const INSURANCE_PER_DAY = 25;
const FUEL_COST = 59;

export default function ReservationForm({ car }: { car: Car }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: '',
      pickupTime: '10:00',
      dropoffLocation: '',
      dropoffTime: '10:00',
    }
  });

  const { watch, trigger } = form;
  const pickupDate = watch('pickupDate');
  const dropoffDate = watch('dropoffDate');
  
  const [rentalDays, setRentalDays] = useState(0);
  
  useEffect(() => {
    if (pickupDate && dropoffDate && dropoffDate >= pickupDate) {
      const days = differenceInCalendarDays(dropoffDate, pickupDate) + 1;
      setRentalDays(days);
      trigger("dropoffDate");
    } else {
      setRentalDays(0);
    }
  }, [pickupDate, dropoffDate, trigger]);


  const minRentDaysString = car.details?.notes.find(n => n.includes('Mínimo de renta'));
  const minRentDaysMatch = minRentDaysString ? minRentDaysString.match(/\d+/) : null;
  const minRentDays = minRentDaysMatch ? parseInt(minRentDaysMatch[0], 10) : 1;
  const requiresMinDays = !!minRentDaysString;

  const isDateRangeValid = rentalDays > 0 && (!requiresMinDays || rentalDays >= minRentDays);

  const dailyPrice = car.pricePerDay;
  const rentPrice = isDateRangeValid ? rentalDays * dailyPrice : 0;
  const insurancePrice = isDateRangeValid ? rentalDays * INSURANCE_PER_DAY : 0;
  const totalPrice = isDateRangeValid ? rentPrice + insurancePrice + FUEL_COST : 0;
  
  const imageList = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls : [car.imageUrl];

  function onSubmit(values: z.infer<typeof formSchema>) {
    const fromDate = format(values.pickupDate, 'yyyy-MM-dd');
    const toDate = format(values.dropoffDate, 'yyyy-MM-dd');
    router.push(`/confirmacion?carId=${car.id}&from=${fromDate}&to=${toDate}&pickupLocation=${values.pickupLocation}&dropoffLocation=${values.dropoffLocation}&pickupTime=${values.pickupTime}&dropoffTime=${values.dropoffTime}`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Completa los Datos de tu Reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="default" className="mb-6 bg-accent/20 border-accent dark:bg-accent/10">
                <Info className="h-4 w-4 text-accent" />
                <AlertTitle className="font-bold text-accent">Nota importante</AlertTitle>
                <AlertDescription>
                    Las reservas deben realizarse con al menos 24 horas de antelación. Se pueden recoger autos en otros lugares con un cargo adicional.
                </AlertDescription>
            </Alert>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Recogida */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-headline font-semibold text-primary">Recogida</h3>
                         <FormField
                            control={form.control}
                            name="pickupLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lugar de recogida *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Selecciona un lugar" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {locations.map(loc => <SelectItem key={loc.id} value={`${loc.name}, ${loc.province}`}>{loc.name}, {loc.province}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="pickupDate"
                                render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Fecha de recogida</FormLabel>
                                    <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                        <Button variant={"outline"} className="w-full pl-3 text-left font-normal">
                                            {field.value ? (format(field.value, "PPP", { locale: es })) : (<span>Elige una fecha</span>)}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < addDays(new Date(), 1)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pickupTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>{hours.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                     {/* Devolución */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-headline font-semibold text-primary">Devolución</h3>
                        <FormField
                            control={form.control}
                            name="dropoffLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lugar de devolución *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Selecciona un lugar" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {locations.map(loc => <SelectItem key={loc.id} value={`${loc.name}, ${loc.province}`}>{loc.name}, {loc.province}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="dropoffDate"
                                render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Fecha de devolución</FormLabel>
                                    <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                        <Button variant={"outline"} className="w-full pl-3 text-left font-normal">
                                            {field.value ? (format(field.value, "PPP", { locale: es })) : (<span>Elige una fecha</span>)}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => !pickupDate || date < pickupDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="dropoffTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>{hours.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90" disabled={!isDateRangeValid}>
                      Continuar a la Confirmación
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
         {car.details && <RentalInfo details={car.details} />}
      </div>

      <div className="space-y-8 lg:sticky lg:top-8 h-fit">
        <Card className="shadow-lg">
            <CardHeader className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {imageList.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-56 w-full">
                           <Image src={img} alt={`${car.name} - Imagen ${index + 1}`} data-ai-hint={car.imageHint} fill className="object-cover rounded-t-lg" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {imageList.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                    </>
                  )}
                </Carousel>
                 <div className="p-6">
                    <CardTitle className="font-headline text-2xl text-primary mb-2">{car.name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                        {car.features.map(f => <Badge key={f} variant="secondary">{f}</Badge>)}
                    </div>
                </div>
            </CardHeader>
             {isDateRangeValid && (
                <CardContent className="p-6 pt-0">
                    <Separator className="mb-4" />
                    <h4 className="font-headline text-lg font-semibold text-primary mb-2">Importe a pagar ({rentalDays} x Renta)</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Precio diario</span>
                            <span className="font-mono">${dailyPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Precio de Renta</span>
                            <span className="font-mono">${rentPrice.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Seguro</span>
                            <span className="font-mono">${insurancePrice.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Combustible</span>
                            <span className="font-mono">${FUEL_COST.toFixed(2)}</span>
                        </div>
                    </div>
                     <Separator className="my-4" />
                    <div className="flex justify-between items-center text-xl font-bold text-primary">
                        <span>Importe Total</span>
                        <span className="font-mono">${totalPrice.toFixed(2)}</span>
                    </div>
                </CardContent>
            )}
             {!isDateRangeValid && rentalDays > 0 && (
                <CardFooter className="p-6 pt-0">
                    <p className="text-destructive text-sm text-center w-full bg-destructive/10 p-2 rounded-md">
                        Este auto requiere un mínimo de {minRentDays} días de renta.
                    </p>
                </CardFooter>
            )}
        </Card>
      </div>

    </div>
  );
}
