'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format, differenceInYears, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

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
import { CalendarIcon, PartyPopper, Download, FileText, Loader2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useToast } from '@/hooks/use-toast';

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
  const firestore = useFirestore();
  const { toast } = useToast();
  const [formattedDates, setFormattedDates] = useState({ start: '', end: '' });
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const imageList = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls : [car.imageUrl];

  useEffect(() => {
    try {
      const startDateTime = new Date(startDate);
      const [startHour, startMinute] = pickupTime.split(':').map(Number);
      startDateTime.setHours(startHour, startMinute);

      const endDateTime = new Date(endDate);
      const [endHour, endMinute] = dropoffTime.split(':').map(Number);
      endDateTime.setHours(endHour, endMinute);

      if (!isNaN(startDateTime.getTime()) && !isNaN(endDateTime.getTime())) {
        setFormattedDates({
          start: format(startDateTime, "EEE dd/MM/yyyy - HH:mm", { locale: es }),
          end: format(endDateTime, "EEE dd/MM/yyyy - HH:mm", { locale: es }),
        });
      }
    } catch (e) {
      console.error("Error formatting dates:", e);
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

  const generateInvoiceMarkdown = (values: z.infer<typeof formSchema>, id: string) => {
    const today = format(new Date(), "dd/MM/yyyy");
    return `
# FACTURA PROFORMA / COMPROBANTE DE VENTA
**Renta Cars ESA**
ID de Factura: ${id}
Fecha: ${today}
Estado: PENDIENTE DE PAGO

## 1. PARTES INTERESADAS
**VENDEDOR:**
Renta Cars ESA
Atención al Cliente: +1 (587) 912-0936
Email: info@rentacarsesa.com

**CLIENTE:**
Nombre: ${values.name} ${values.lastName1}
Email: ${values.email}
Teléfono: ${values.phone}
Pasaporte: ${values.passport}

## 2. CONCEPTOS DE RENTA
| Cantidad | Descripción del Servicio | Precio Unitario | Subtotal |
| :--- | :--- | :--- | :--- |
| ${reservationDetails.rentalDays} | Renta de vehículo: ${car.name} | $${car.pricePerDay.toFixed(2)} /día | $${reservationDetails.rentPrice.toFixed(2)} |
| 1 | Depósito de Garantía (Reembolsable) | $250.00 | $250.00 |

## 3. TOTALES
**Subtotal:** $${reservationDetails.totalWithoutDiscount.toFixed(2)}
**Descuentos (Pago Adelantado 20%):** ${paymentOption === 'full_payment' ? `-$${reservationDetails.discountAmount.toFixed(2)}` : '$0.00'}
**Impuestos:** $0.00 (Exportación de Servicios)
---
**TOTAL FINAL:** $${amountToPay.toFixed(2)}

## 4. NOTAS Y TÉRMINOS
- **Método de Pago:** A realizar vía Zelle o Transferencia Bancaria. Un agente le contactará para procesar el pago.
- **Opción de Pago Seleccionada:** ${paymentOption === 'full_payment' ? 'Pago Total con Descuento' : 'Solo Depósito de Reserva'}.
- **Garantía:** El depósito de $250.00 es reembolsable al finalizar la renta si el vehículo no presenta daños.
- Esta factura es una proforma válida por 24 horas para garantizar la disponibilidad.

Gracias por confiar en Renta Cars ESA.
    `.trim();
  };

  const downloadInvoice = (markdown: string, id: string) => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `factura-rentacarsesa-${id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) return;
    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(firestore, 'pedidos'), {
        customerName: `${values.name} ${values.lastName1}`,
        customerEmail: values.email,
        customerPhone: values.phone,
        carName: car.name,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        pickupLocation,
        dropoffLocation,
        totalAmount: amountToPay,
        paymentOption: values.paymentOption,
        createdAt: serverTimestamp(),
      });

      setOrderId(docRef.id);

      const message = `
¡Hola! Quiero confirmar mi reserva de auto:
-----------------------------------
ID PEDIDO: ${docRef.id}
-----------------------------------
*Detalles del Conductor:*
Nombre: ${values.name} ${values.lastName1} ${values.lastName2 || ''}
Teléfono: ${values.phone}
Email: ${values.email}
Pasaporte: ${values.passport}
Licencia: ${values.driversLicense}
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
¡Gracias!
      `;
      const whatsappUrl = `https://wa.me/15879120936?text=${encodeURIComponent(message.trim())}`;
      window.open(whatsappUrl, '_blank');
      setIsConfirmationDialogOpen(true);
    } catch (error: any) {
      console.error("Error saving order:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo registrar el pedido.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4 text-center">Confirma tu Renta</h1>
        <p className="text-center text-muted-foreground mb-8">Estás a un paso de asegurar tu vehículo. Por favor, revisa los detalles y elige tu opción de pago.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card className="shadow-lg border-2 border-primary/5">
                    <CardHeader className="bg-primary/5">
                        <CardTitle className="font-headline text-2xl text-primary">1. Datos del Conductor</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
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
                                         <FormMessage />
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
                                <h3 className="font-headline text-xl text-primary">2. Opción de Pago</h3>
                                 <FormField
                                    control={form.control}
                                    name="paymentOption"
                                    render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className={`block p-4 border rounded-lg cursor-pointer ${field.value === 'deposit' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="deposit" checked={field.value === 'deposit'} className="sr-only" />
                                                    <h4 className="font-semibold">Pagar solo el Depósito</h4>
                                                    <p className="text-sm text-muted-foreground">Paga $250.00 ahora para reservar. El resto se paga al recoger el auto.</p>
                                                </label>
                                                 <label className={`block p-4 border rounded-lg cursor-pointer ${field.value === 'full_payment' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="full_payment" checked={field.value === 'full_payment'} className="sr-only" />
                                                    <h4 className="font-semibold">Pagar Todo Ahora y Ahorrar 20%</h4>
                                                    <p className="text-sm text-muted-foreground">Paga el total de $<span className="font-mono">{reservationDetails.totalWithDiscount.toFixed(2)}</span> con descuento.</p>
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Card className="bg-secondary/30 mt-6 border-dashed">
                                    <CardContent className="p-4 text-center">
                                        <p className="font-headline text-lg">Pagarás ahora:</p>
                                        <p className="font-bold text-3xl text-primary font-mono">${amountToPay.toFixed(2)}</p>
                                        <p className="text-sm text-muted-foreground">{paymentConcept}</p>
                                    </CardContent>
                                </Card>

                                <Button 
                                  type="submit" 
                                  className="w-full bg-accent hover:bg-accent/90 text-lg py-6 shadow-lg"
                                  disabled={isSubmitting}
                                >
                                    {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Registrando...</> : 'Confirmar y Pagar por WhatsApp'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="shadow-lg lg:sticky lg:top-24 h-fit border-2 border-primary/5">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="font-headline text-2xl text-primary">Resumen</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="relative h-40 w-full mb-4">
                       <Image src={car.imageUrl} alt={car.name} data-ai-hint={car.imageHint} fill className="object-cover rounded-lg" />
                    </div>
                    <Table>
                        <TableBody>
                            <TableRow><TableCell className="font-semibold p-1">Vehículo:</TableCell><TableCell className="p-1">{car.name}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-1">Total días:</TableCell><TableCell className="p-1">{reservationDetails.rentalDays}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-1">Precio diario:</TableCell><TableCell className="p-1">${car.pricePerDay.toFixed(2)}</TableCell></TableRow>
                        </TableBody>
                    </Table>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center text-2xl font-bold text-primary">
                        <span className="font-headline">Total:</span>
                        <span className="font-mono">${reservationDetails.totalWithoutDiscount.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
            <AlertDialogContent className="sm:max-w-xl">
                <AlertDialogHeader>
                    <div className="flex justify-center items-center pb-4"><PartyPopper className="h-12 w-12 text-accent" /></div>
                    <AlertDialogTitle className="text-center font-headline text-2xl text-primary">¡Casi listo!</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-muted-foreground space-y-4">
                        <p>Hemos registrado tu pedido con el ID: <strong className="text-primary font-mono">{orderId}</strong>.</p>
                        <div className="bg-secondary/30 p-4 rounded-lg border border-dashed border-primary/20">
                          <p className="font-semibold text-primary flex items-center justify-center gap-2 mb-2"><FileText className="h-4 w-4" /> Comprobante</p>
                          <Button onClick={() => downloadInvoice(generateInvoiceMarkdown(form.getValues(), orderId || 'ERROR'), orderId || 'ERROR')} variant="secondary" className="w-full gap-2"><Download className="h-4 w-4" /> Descargar Factura</Button>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogAction onClick={() => router.push('/')} className="bg-accent hover:bg-accent/90 w-full">Volver al Inicio</AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}