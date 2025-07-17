
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

import type { Car } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Info } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface ConfirmationDetailsProps {
  car: Car;
  startDate: Date;
  endDate: Date;
  rentalDays: number;
  totalPrice: number;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido.' }),
  lastName1: z.string().min(2, { message: 'El primer apellido es requerido.' }),
  lastName2: z.string().optional(),
  birthDay: z.string().min(1, { message: 'Día requerido.' }).max(2),
  birthMonth: z.string().min(1, { message: 'Mes requerido.' }).max(2),
  birthYear: z.string().min(4, { message: 'Año requerido.' }).max(4),
  phone: z.string().min(5, { message: 'El teléfono es requerido.' }),
  country: z.string().min(2, { message: 'El país es requerido.' }),
  passport: z.string().min(5, { message: 'El número de pasaporte es requerido.' }),
  driversLicense: z.string().min(5, { message: 'El número de licencia es requerido.' }),
  email: z.string().email({ message: 'El correo electrónico no es válido.' }),
  flightNumber: z.string().optional(),
  airline: z.string().optional(),
});

const INSURANCE_PER_DAY = 25;
const FUEL_COST = 59;

export default function ConfirmationDetails({ car, startDate, endDate, rentalDays, totalPrice }: ConfirmationDetailsProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [formattedDates, setFormattedDates] = useState({ start: '', end: '' });

  useEffect(() => {
    // This now runs only on the client, preventing hydration mismatch.
    setFormattedDates({
        start: format(startDate, "EEE dd/MM/yyyy - HH:mm", { locale: es }),
        end: format(endDate, "EEE dd/MM/yyyy - HH:mm", { locale: es }),
    });
  }, [startDate, endDate]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName1: '',
      lastName2: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      phone: '',
      country: '',
      passport: '',
      driversLicense: '',
      email: '',
      flightNumber: '',
      airline: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Booking confirmed for:', values);
    toast({
      title: '¡Renta Confirmada!',
      description: `Gracias, ${values.name}. Hemos enviado los detalles a tu correo.`,
      action: <CheckCircle className="text-green-500" />,
    });
    router.push('/');
  }

  const rentPrice = rentalDays * car.pricePerDay;
  const insurancePrice = rentalDays * INSURANCE_PER_DAY;
  
  return (
    <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4 text-center">Confirma tu Renta</h1>
        <p className="text-center text-muted-foreground mb-8">Estás a un paso de asegurar tu vehículo. Por favor, revisa los detalles y completa tu información.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl text-primary">1. Datos del Conductor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem><FormLabel>Nombre *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="lastName1" render={({ field }) => (
                                        <FormItem><FormLabel>1. Apellido *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="lastName2" render={({ field }) => (
                                        <FormItem><FormLabel>2. Apellido</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                     <FormItem>
                                        <FormLabel>Fecha de nacimiento *</FormLabel>
                                        <div className="flex gap-2">
                                            <FormField control={form.control} name="birthDay" render={({ field }) => (
                                                <FormItem className="flex-1"><FormControl><Input placeholder="Día" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={form.control} name="birthMonth" render={({ field }) => (
                                                <FormItem className="flex-1"><FormControl><Input placeholder="Mes" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={form.control} name="birthYear" render={({ field }) => (
                                                <FormItem className="flex-1"><FormControl><Input placeholder="Año" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                        </div>
                                    </FormItem>
                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem><FormLabel>Teléfono *</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="country" render={({ field }) => (
                                        <FormItem><FormLabel>País *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="passport" render={({ field }) => (
                                        <FormItem><FormLabel>Pasaporte *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="driversLicense" render={({ field }) => (
                                        <FormItem><FormLabel>Licencia de conducir *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem className="md:col-span-2"><FormLabel>Correo electrónico *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                <Separator />
                                <h3 className="font-headline text-xl text-primary">Datos de Vuelo (Opcional)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <FormField control={form.control} name="flightNumber" render={({ field }) => (
                                        <FormItem><FormLabel>Número de vuelo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                     <FormField control={form.control} name="airline" render={({ field }) => (
                                        <FormItem><FormLabel>Compañía aérea</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-lg py-6">
                                    Confirmar y Rentar
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="shadow-lg lg:sticky lg:top-8 h-fit">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">Resumen de la Renta</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
                        <Image src={car.imageUrl} alt={car.name} data-ai-hint={car.imageHint} fill className="object-cover" />
                    </div>
                    
                    <h3 className="font-headline text-xl font-semibold text-primary">Reserva elegida</h3>
                    <Table>
                        <TableBody>
                            <TableRow><TableCell className="font-semibold p-1">Vehículo:</TableCell><TableCell className="p-1">{car.name}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-1">Categoría:</TableCell><TableCell className="p-1">{car.features.includes('Automático') ? 'Economico Automático' : 'Economico Manual'}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-1">Total días:</TableCell><TableCell className="p-1">{rentalDays}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-1">Precio diario:</TableCell><TableCell className="p-1">${car.pricePerDay.toFixed(2)}</TableCell></TableRow>
                            <TableRow>
                                <TableCell className="font-semibold p-1 align-top">Recogida:</TableCell>
                                <TableCell className="p-1">{formattedDates.start || '...'}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold p-1 align-top">Devolución:</TableCell>
                                <TableCell className="p-1">{formattedDates.end || '...'}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    
                    <Separator className="my-4" />
                    
                    <h3 className="font-headline text-xl font-semibold text-primary">Importe a pagar ({rentalDays} x Renta)</h3>
                     <Table>
                        <TableBody>
                            <TableRow><TableCell className="text-muted-foreground p-1">Precio diario</TableCell><TableCell className="text-right p-1 font-mono">${car.pricePerDay.toFixed(2)}</TableCell></TableRow>
                            <TableRow><TableCell className="text-muted-foreground p-1">Precio de Renta</TableCell><TableCell className="text-right p-1 font-mono">${rentPrice.toFixed(2)}</TableCell></TableRow>
                            <TableRow><TableCell className="text-muted-foreground p-1">Seguro</TableCell><TableCell className="text-right p-1 font-mono">${insurancePrice.toFixed(2)}</TableCell></TableRow>
                            <TableRow><TableCell className="text-muted-foreground p-1">Combustible</TableCell><TableCell className="text-right p-1 font-mono">${FUEL_COST.toFixed(2)}</TableCell></TableRow>
                        </TableBody>
                    </Table>

                    <Separator className="my-4" />
                    <div className="flex justify-between items-center text-2xl font-bold text-primary">
                        <span className="font-headline">Importe Total:</span>
                        <span className="font-mono">${totalPrice.toFixed(2)}</span>
                    </div>

                    <Button variant="outline" className="w-full mt-4">Modificar Reserva</Button>
                </CardContent>
            </Card>

        </div>
    </div>
  );
}
