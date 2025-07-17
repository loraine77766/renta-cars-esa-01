'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, differenceInCalendarDays, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

import type { Car } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Calendar as CalendarIcon } from 'lucide-react';

const offices = ["Aeropuerto de La Habana", "Vedado, La Habana", "Aeropuerto de Varadero", "Varadero Centro"];
const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

const formSchema = z.object({
  pickupOffice: z.string().min(1, 'Selecciona una oficina de recogida.'),
  pickupDate: z.date({ required_error: 'La fecha de recogida es obligatoria.' }),
  pickupTime: z.string().min(1, 'La hora de recogida es obligatoria.'),
  dropoffOffice: z.string().min(1, 'Selecciona una oficina de devolución.'),
  dropoffDate: z.date({ required_error: 'La fecha de devolución es obligatoria.' }),
  dropoffTime: z.string().min(1, 'La hora de devolución es obligatoria.'),
}).refine(data => {
    if (!data.pickupDate || !data.dropoffDate) return true;
    return data.dropoffDate > data.pickupDate;
}, {
    message: 'La fecha de devolución debe ser posterior a la de recogida.',
    path: ['dropoffDate'],
});

const INSURANCE_PER_DAY = 25;
const FUEL_COST = 59;

export default function ReservationForm({ car }: { car: Car }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupOffice: '',
      pickupTime: '10:00',
      dropoffOffice: '',
      dropoffTime: '10:00',
    }
  });

  const { watch } = form;
  const pickupDate = watch('pickupDate');
  const dropoffDate = watch('dropoffDate');

  const rentalDays = pickupDate && dropoffDate ? differenceInCalendarDays(dropoffDate, pickupDate) + 1 : 0;
  const requiresMinDays = car.details?.notes.some(n => n.includes('Mínimo de renta'));
  const minRentDays = requiresMinDays ? parseInt(car.details.notes.find(n => n.includes('Mínimo de renta'))?.split(' ')[4] ?? '0') : 1;
  
  const isDateRangeValid = rentalDays > 0 && (!requiresMinDays || rentalDays >= minRentDays);

  const dailyPrice = car.pricePerDay;
  const rentPrice = isDateRangeValid ? rentalDays * dailyPrice : 0;
  const insurancePrice = isDateRangeValid ? rentalDays * INSURANCE_PER_DAY : 0;
  const totalPrice = isDateRangeValid ? rentPrice + insurancePrice + FUEL_COST : 0;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const fromDate = format(values.pickupDate, 'yyyy-MM-dd');
    const toDate = format(values.dropoffDate, 'yyyy-MM-dd');
    router.push(`/confirmacion?carId=${car.id}&from=${fromDate}&to=${toDate}`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Completa los Datos de tu Reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="default" className="mb-6 bg-accent/20 border-accent">
                <Info className="h-4 w-4 text-accent" />
                <AlertTitle className="font-bold text-accent">Nota importante</AlertTitle>
                <AlertDescription>
                    Las reservas deben realizarse con al menos 24 horas de antelación.
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
                            name="pickupOffice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Oficina de recogida *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Selecciona una oficina" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {offices.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
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
                                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
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
                            name="dropoffOffice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Oficina de devolución *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Selecciona una oficina" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {offices.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
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
                                            disabled={(date) => !pickupDate || date <= pickupDate}
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
                                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
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
      </div>

      <div className="space-y-8 lg:sticky lg:top-8 h-fit">
        <Card className="shadow-lg">
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <Image src={car.imageUrl} alt={car.name} data-ai-hint={car.imageHint} fill className="object-cover" />
                </div>
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
