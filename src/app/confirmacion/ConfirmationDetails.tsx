

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format, differenceInYears, parse, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';

import type { Car, ReservationDetails } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, PartyPopper } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ConfirmationDetailsProps {
  car: Car;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  dropoffTime: string;
  reservationDetails: ReservationDetails;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido.' }),
  lastName1: z.string().min(2, { message: 'El primer apellido es requerido.' }),
  lastName2: z.string().optional(),
  birthDay: z.coerce.number({invalid_type_error: "Día inválido"}).min(1, { message: 'Día inválido' }).max(31, { message: 'Día inválido' }),
  birthMonth: z.coerce.number({invalid_type_error: "Mes inválido"}).min(1, { message: 'Mes inválido' }).max(12, { message: 'Mes inválido' }),
  birthYear: z.coerce.number({invalid_type_error: "Año inválido"}).min(1900, { message: 'Año inválido' }),
  phone: z.string().min(5, { message: 'El teléfono es requerido.' }),
  country: z.string().min(2, { message: 'El país es requerido.' }),
  passport: z.string().min(5, { message: 'El número de pasaporte es requerido.' }),
  driversLicense: z.string().min(5, { message: 'El número de licencia es requerido.' }),
  email: z.string().email({ message: 'El correo electrónico no es válido.' }),
  flightNumber: z.string().optional(),
  airline: z.string().optional(),
  paymentOption: z.enum(['deposit', 'full_payment']),
}).refine(data => {
    try {
        const dateOfBirth = parse(`${data.birthYear}-${data.birthMonth}-${data.birthDay}`, 'yyyy-MM-dd', new Date());
        if (isNaN(dateOfBirth.getTime())) {
            return false;
        }
        return differenceInYears(new Date(), dateOfBirth) >= 21;
    } catch {
        return false;
    }
}, {
    message: 'Debes tener al menos 21 años para rentar un auto.',
    path: ['birthYear'],
});

const modifySchema = z.object({
    pickupDate: z.date(),
    dropoffDate: z.date(),
});


export default function ConfirmationDetails({ car, startDate, endDate, pickupLocation, dropoffLocation, pickupTime, dropoffTime, reservationDetails }: ConfirmationDetailsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formattedDates, setFormattedDates] = useState({ start: '', end: '' });
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  
  const imageList = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls : [car.imageUrl];

  useEffect(() => {
    try {
      const startDateTimeStr = `${format(startDate, 'yyyy-MM-dd')} ${pickupTime}`;
      const endDateTimeStr = `${format(endDate, 'yyyy-MM-dd')} ${dropoffTime}`;
      
      const startDateTime = parse(startDateTimeStr, 'yyyy-MM-dd HH:mm', new Date());
      const endDateTime = parse(endDateTimeStr, 'yyyy-MM-dd HH:mm', new Date());

      if (!isNaN(startDateTime.getTime()) && !isNaN(endDateTime.getTime())) {
          setFormattedDates({
              start: format(startDateTime, "EEE dd/MM/yyyy - HH:mm", { locale: es }),
              end: format(endDateTime, "EEE dd/MM/yyyy - HH:mm", { locale: es }),
          });
      } else {
        setFormattedDates({ start: 'Fecha inválida', end: 'Fecha inválida' });
      }
    } catch (e) {
      console.error("Error formatting dates:", e);
      setFormattedDates({ start: 'Error', end: 'Error' });
    }
  }, [startDate, endDate, pickupTime, dropoffTime]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName1: '',
      lastName2: '',
      birthDay: undefined,
      birthMonth: undefined,
      birthYear: undefined,
      phone: '',
      country: '',
      passport: '',
      driversLicense: '',
      email: '',
      flightNumber: '',
      airline: '',
      paymentOption: 'deposit',
    },
  });
  
  const paymentOption = form.watch('paymentOption');
  const amountToPay = paymentOption === 'full_payment' ? reservationDetails.totalWithDiscount : reservationDetails.deposit;
  const paymentConcept = paymentOption === 'full_payment' ? `Pago Completo (con 20% de descuento)` : `Depósito de Reserva`;


  const modifyForm = useForm<z.infer<typeof modifySchema>>({
    resolver: zodResolver(modifySchema),
    defaultValues: {
        pickupDate: startDate,
        dropoffDate: endDate,
    }
  });

  function onModify(values: z.infer<typeof modifySchema>) {
      const fromDate = format(values.pickupDate, 'yyyy-MM-dd');
      const toDate = format(values.dropoffDate, 'yyyy-MM-dd');
      
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('from', fromDate);
      currentParams.set('to', toDate);

      router.push(`/confirmacion?${currentParams.toString()}`);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const message = `
¡Hola! Quiero confirmar mi reserva de auto:
-----------------------------------
*Detalles del Conductor:*
Nombre: ${values.name} ${values.lastName1} ${values.lastName2 || ''}
Fecha de Nacimiento: ${values.birthDay}/${values.birthMonth}/${values.birthYear}
Teléfono: ${values.phone}
País: ${values.country}
Email: ${values.email}
Pasaporte: ${values.passport}
Licencia: ${values.driversLicense}
Vuelo (Opcional): ${values.flightNumber || 'N/A'} - ${values.airline || 'N/A'}
-----------------------------------
*Resumen de la Renta:*
Vehículo: ${car.name}
Recogida: ${formattedDates.start} en ${pickupLocation}
Devolución: ${formattedDates.end} en ${dropoffLocation}
Total Días: ${reservationDetails.rentalDays}
-----------------------------------
*Opción de Pago Seleccionada:*
${paymentConcept}: $${amountToPay.toFixed(2)}
-----------------------------------
*Desglose del Costo Total:*
Costo de Renta: $${reservationDetails.rentPrice.toFixed(2)}
Depósito Reembolsable: $${reservationDetails.deposit.toFixed(2)}
Total sin descuento: $${reservationDetails.totalWithoutDiscount.toFixed(2)}
Total con 20% descuento (pago adelantado): $${reservationDetails.totalWithDiscount.toFixed(2)}
-----------------------------------
¡Gracias!
    `;
    const whatsappUrl = `https://wa.me/17067179341?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, '_blank');
    setIsConfirmationDialogOpen(true);
  }

  return (
    <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4 text-center">Confirma tu Renta</h1>
        <p className="text-center text-muted-foreground mb-8">Estás a un paso de asegurar tu vehículo. Por favor, revisa los detalles, completa tu información y elige tu opción de pago.</p>

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
                                                <FormItem className="flex-1"><FormControl><Input placeholder="Día" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={form.control} name="birthMonth" render={({ field }) => (
                                                <FormItem className="flex-1"><FormControl><Input placeholder="Mes" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={form.control} name="birthYear" render={({ field }) => (
                                                <FormItem className="flex-1"><FormControl><Input placeholder="Año" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                        </div>
                                         <FormMessage>{form.formState.errors.birthYear?.message}</FormMessage>
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
                                
                                <Separator />
                                <h3 className="font-headline text-xl text-primary">2. Opción de Pago</h3>
                                 <FormField
                                    control={form.control}
                                    name="paymentOption"
                                    render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className={`block p-4 border rounded-lg cursor-pointer ${field.value === 'deposit' ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="deposit" checked={field.value === 'deposit'} className="sr-only" />
                                                    <h4 className="font-semibold">Pagar solo el Depósito</h4>
                                                    <p className="text-sm text-muted-foreground">Paga $250.00 ahora para reservar. El resto ($<span className="font-mono">{(reservationDetails.rentPrice).toFixed(2)}</span>) se paga al recoger el auto.</p>
                                                </label>
                                                 <label className={`block p-4 border rounded-lg cursor-pointer ${field.value === 'full_payment' ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="full_payment" checked={field.value === 'full_payment'} className="sr-only" />
                                                    <h4 className="font-semibold">Pagar Todo Ahora y Ahorrar 20%</h4>
                                                    <p className="text-sm text-muted-foreground">Paga el total de $<span className="font-mono">{reservationDetails.totalWithDiscount.toFixed(2)}</span> y ahorra $<span className="font-mono">{reservationDetails.discountAmount.toFixed(2)}</span>.</p>
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Card className="bg-secondary/30 mt-6">
                                    <CardContent className="p-4 text-center">
                                        <p className="font-headline text-lg">Pagarás ahora:</p>
                                        <p className="font-bold text-3xl text-primary font-mono">${amountToPay.toFixed(2)}</p>
                                        <p className="text-sm text-muted-foreground">{paymentConcept}</p>
                                    </CardContent>
                                </Card>


                                <p className="text-sm text-muted-foreground text-center mt-4 mb-4">
                                    Es importante que los datos de contácto (e-mail/teléfono) sean correctos para poder confirmar tu reserva. Sin ésta confirmación por parte nuestra, la reserva no será válida.
                                </p>
                                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-lg py-6">
                                    Confirmar y Pagar por WhatsApp
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
                     <Carousel className="w-full mb-4">
                      <CarouselContent>
                        {imageList.map((img, index) => (
                          <CarouselItem key={index}>
                            <div className="relative h-48 w-full">
                               <Image src={img} alt={`${car.name} - Imagen ${index + 1}`} data-ai-hint={car.imageHint} fill className="object-cover rounded-lg" />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {imageList.length > 1 && (
                        <>
                          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                        </>
                      )}
                    </Carousel>
                    
                    <h3 className="font-headline text-xl font-semibold text-primary">Reserva elegida</h3>
                    <Table>
                        <TableBody>
                            <TableRow><TableCell className="font-semibold p-1">Vehículo:</TableCell><TableCell className="p-1">{car.name}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-1">Categoría:</TableCell><TableCell className="p-1">{car.features.includes('Automático') ? 'Economico Automático' : 'Economico Manual'}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-1">Total días:</TableCell><TableCell className="p-1">{reservationDetails.rentalDays}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-1">Precio diario:</TableCell><TableCell className="p-1">${car.pricePerDay.toFixed(2)}</TableCell></TableRow>
                             <TableRow>
                                <TableCell className="font-semibold p-1 align-top">Recogida:</TableCell>
                                <TableCell className="p-1">{formattedDates.start || '...'} <br/> <span className="text-sm text-muted-foreground">{pickupLocation}</span></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold p-1 align-top">Devolución:</TableCell>
                                <TableCell className="p-1">{formattedDates.end || '...'} <br/> <span className="text-sm text-muted-foreground">{dropoffLocation}</span></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    
                    <Separator className="my-4" />
                    
                    <h3 className="font-headline text-xl font-semibold text-primary">Costo Total de la Renta</h3>
                     <Table>
                        <TableBody>
                            <TableRow><TableCell className="text-muted-foreground p-1">Costo de Renta ({reservationDetails.rentalDays} días)</TableCell><TableCell className="text-right p-1 font-mono">${reservationDetails.rentPrice.toFixed(2)}</TableCell></TableRow>
                            <TableRow><TableCell className="text-muted-foreground p-1">Depósito (reembolsable)</TableCell><TableCell className="text-right p-1 font-mono">${reservationDetails.deposit.toFixed(2)}</TableCell></TableRow>
                        </TableBody>
                    </Table>

                    <Separator className="my-4" />
                    <div className="flex justify-between items-center text-2xl font-bold text-primary">
                        <span className="font-headline">Total:</span>
                        <span className="font-mono">${reservationDetails.totalWithoutDiscount.toFixed(2)}</span>
                    </div>
                     <Card className="mt-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <CardContent className="p-3 text-center">
                            <p className="text-sm font-bold text-green-700 dark:text-green-300">¡Ahorra ${reservationDetails.discountAmount.toFixed(2)}!</p>
                            <p className="text-xs text-green-600 dark:text-green-400">Paga todo por adelantado por solo <span className="font-mono">${reservationDetails.totalWithDiscount.toFixed(2)}</span>.</p>
                        </CardContent>
                    </Card>

                    <Dialog>
                        <DialogTrigger asChild>
                             <Button variant="outline" className="w-full mt-4">Modificar Reserva</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Modificar reserva</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-muted-foreground">Importante: 21 años es la edad mínima permitida para rentar un auto en Cuba. Las reservas deben realizarse con al menos 24 horas de antelación.</p>
                            <Form {...modifyForm}>
                                <form onSubmit={modifyForm.handleSubmit(onModify)} className="space-y-4">
                                     <FormField
                                        control={modifyForm.control}
                                        name="pickupDate"
                                        render={({ field }) => (
                                        <FormItem>
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
                                        control={modifyForm.control}
                                        name="dropoffDate"
                                        render={({ field }) => (
                                        <FormItem>
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
                                                    disabled={(date) => !modifyForm.watch('pickupDate') || date < modifyForm.watch('pickupDate')}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <DialogFooter className="sm:justify-end">
                                        <DialogClose asChild>
                                            <Button type="button" variant="ghost">Cancelar</Button>
                                        </DialogClose>
                                        <Button type="submit">Guardar Cambios</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>

                </CardContent>
            </Card>

        </div>

        <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-center items-center pb-4">
                        <PartyPopper className="h-10 w-10 text-accent" />
                    </div>
                    <AlertDialogTitle className="text-center font-headline text-2xl text-primary">¡Casi listo! Tu reserva está pre-confirmada.</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-muted-foreground">
                        Hemos enviado tu solicitud a través de WhatsApp. Un agente se pondrá en contacto contigo en breve para confirmar la disponibilidad y guiarte con el proceso de pago.
                        <br/><br/>
                        ¡Gracias por confiar en nosotros!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogAction onClick={() => router.push('/')} className="bg-accent hover:bg-accent/90">
                    Entendido
                </AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
