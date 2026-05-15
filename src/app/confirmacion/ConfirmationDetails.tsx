'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format, differenceInYears } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase/index';

import type { Car, ReservationDetails } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Loader2, MessageCircle, CheckCircle2 } from 'lucide-react';
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
  lastName2: z.string().default(''),
  birthDay: z.string().min(1, 'Día requerido'),
  birthMonth: z.string().min(1, 'Mes requerido'),
  birthYear: z.string().min(4, 'Año requerido'),
  phone: z.string().min(5, { message: 'El teléfono es requerido.' }),
  country: z.string().min(2, { message: 'El país es requerido.' }),
  passport: z.string().min(5, { message: 'El número de pasaporte es requerido.' }),
  driversLicense: z.string().min(5, { message: 'El número de licencia es requerido.' }),
  email: z.string().email({ message: 'El correo electrónico no es válido.' }),
  paymentOption: z.enum(['deposit', 'full_payment']).default('deposit'),
}).refine(data => {
    try {
        const day = parseInt(data.birthDay);
        const month = parseInt(data.birthMonth);
        const year = parseInt(data.birthYear);
        const dateOfBirth = new Date(year, month - 1, day);
        return !isNaN(dateOfBirth.getTime()) && differenceInYears(new Date(), dateOfBirth) >= 21;
    } catch {
        return false;
    }
}, {
    message: 'Debes tener al menos 21 años para rentar un auto.',
    path: ['birthYear'],
});

export default function ConfirmationDetails({ car, startDate, endDate, pickupLocation, dropoffLocation, pickupTime, dropoffTime, reservationDetails }: ConfirmationDetailsProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [formattedDates, setFormattedDates] = useState({ start: '', end: '' });
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  useEffect(() => {
    try {
      setFormattedDates({
        start: format(startDate, "EEE dd/MM/yyyy", { locale: es }) + " - " + pickupTime,
        end: format(endDate, "EEE dd/MM/yyyy", { locale: es }) + " - " + dropoffTime,
      });
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
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      phone: '',
      country: '',
      passport: '',
      driversLicense: '',
      email: '',
      paymentOption: 'deposit',
    },
  });
  
  const paymentOption = form.watch('paymentOption');
  const amountToPay = paymentOption === 'full_payment' ? reservationDetails.totalWithDiscount : reservationDetails.deposit;
  const paymentConcept = paymentOption === 'full_payment' ? `Pago Completo (20% Desc.)` : `Depósito de Reserva`;

  const generateOrderId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleRegisterAndWhatsApp = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    if (!firestore) {
      toast({ variant: "destructive", title: "Error: No hay conexión con la base de datos." });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const values = form.getValues();
      const currentId = orderId || generateOrderId();

      // Registro en Firestore (sin await para que sea instantáneo)
      setDoc(doc(firestore, 'pedidos', currentId), {
        id: currentId,
        customerName: `${values.name} ${values.lastName1} ${values.lastName2 || ''}`,
        customerEmail: values.email,
        customerPhone: values.phone,
        customerPassport: values.passport,
        customerLicense: values.driversLicense,
        customerCountry: values.country,
        carName: car.name,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        pickupLocation,
        dropoffLocation,
        totalAmount: amountToPay,
        paymentOption: values.paymentOption,
        createdAt: serverTimestamp(),
      });

      setOrderId(currentId);
      setIsRegistered(true);

      // Abrir WhatsApp inmediatamente
      const message = `¡Hola! Quiero confirmar mi reserva:\nID PEDIDO: ${currentId}\nVehículo: ${car.name}\nConductor: ${values.name} ${values.lastName1}\nPasaporte: ${values.passport}\nWhatsApp: ${values.phone}\nRecogida: ${formattedDates.start}\nDevolución: ${formattedDates.end}\nPAGO: $${amountToPay.toFixed(2)} (${paymentConcept})\nFavor enviarme link de pago.`.trim();
      
      window.open(`https://wa.me/15879120936?text=${encodeURIComponent(message)}`, '_blank');
      
      toast({ title: "Pedido registrado con éxito" });
    } catch (error) {
      console.error("Error:", error);
      toast({ variant: "destructive", title: "Error al procesar. Inténtalo de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2 text-center">Finaliza tu Reserva</h1>
        <p className="text-center text-muted-foreground mb-8">Completa tus datos para registrar el pedido y contactarnos por WhatsApp.</p>

        {isRegistered && (
          <Card className="mb-8 border-2 border-green-500 bg-green-50 dark:bg-green-900/10">
            <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-500 shrink-0" />
                <div>
                  <p className="font-bold text-green-700 dark:text-green-300">Pedido registrado con éxito</p>
                  <p className="text-xs text-green-600 dark:text-green-400">ID de seguimiento: <span className="font-mono font-bold">{orderId}</span></p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => router.push('/')}>Nueva Reserva</Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleRegisterAndWhatsApp}>Reabrir WhatsApp</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card className="shadow-lg border-2 border-primary/5">
                    <CardHeader className="bg-primary/5">
                        <CardTitle className="font-headline text-2xl text-primary">Datos del Conductor</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Form {...form}>
                            <form className="space-y-6">
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
                                    <div className="space-y-2">
                                        <FormLabel>Fecha de nacimiento *</FormLabel>
                                        <div className="grid grid-cols-3 gap-2">
                                            <FormField control={form.control} name="birthDay" render={({ field }) => (
                                                <FormControl><Input placeholder="Día" type="number" {...field} /></FormControl>
                                            )}/>
                                            <FormField control={form.control} name="birthMonth" render={({ field }) => (
                                                <FormControl><Input placeholder="Mes" type="number" {...field} /></FormControl>
                                            )}/>
                                            <FormField control={form.control} name="birthYear" render={({ field }) => (
                                                <FormControl><Input placeholder="Año" type="number" {...field} /></FormControl>
                                            )}/>
                                        </div>
                                    </div>
                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem><FormLabel>WhatsApp/Teléfono *</FormLabel><FormControl><Input placeholder="+1..." {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="country" render={({ field }) => (
                                        <FormItem><FormLabel>País de Residencia *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="passport" render={({ field }) => (
                                        <FormItem><FormLabel>Número de Pasaporte *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="driversLicense" render={({ field }) => (
                                        <FormItem><FormLabel>Licencia de Conducir *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem className="md:col-span-2"><FormLabel>Correo Electrónico *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                
                                <Separator />
                                <h3 className="font-headline text-xl text-primary">Opción de Pago</h3>
                                <FormField
                                    control={form.control}
                                    name="paymentOption"
                                    render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${field.value === 'deposit' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="deposit" checked={field.value === 'deposit'} className="sr-only" />
                                                    <h4 className="font-semibold">Solo Depósito ($250)</h4>
                                                    <p className="text-xs text-muted-foreground">Reembolsable al entregar el auto.</p>
                                                </label>
                                                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${field.value === 'full_payment' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="full_payment" checked={field.value === 'full_payment'} className="sr-only" />
                                                    <h4 className="font-semibold">Pago Total (-20% Dto.)</h4>
                                                    <p className="text-xs text-muted-foreground">Ahorra pagando hoy mismo.</p>
                                                </label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />

                                <div className="bg-secondary/30 p-6 rounded-lg text-center border border-dashed border-primary/20">
                                    <p className="text-sm text-muted-foreground mb-1">Total a pagar ahora:</p>
                                    <p className="font-bold text-4xl text-primary font-mono">${amountToPay.toFixed(2)}</p>
                                </div>

                                <div className="pt-4">
                                  <Button 
                                    type="button"
                                    onClick={handleRegisterAndWhatsApp}
                                    className="w-full h-auto py-5 text-lg gap-3 bg-green-600 hover:bg-green-700 shadow-lg text-white whitespace-normal text-center"
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting ? (
                                      <Loader2 className="h-6 w-6 animate-spin" />
                                    ) : (
                                      <>
                                        <MessageCircle className="h-6 w-6 shrink-0" /> 
                                        <span className="flex-1">Confirmar Reserva y Pagar por WhatsApp</span>
                                      </>
                                    )}
                                  </Button>
                                  <p className="text-[10px] text-center text-muted-foreground mt-4">
                                    Al hacer clic, se registrará tu pedido y se abrirá WhatsApp con el ID de reserva.
                                  </p>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="shadow-lg lg:sticky lg:top-24 border-2 border-primary/5">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="font-headline text-xl text-primary">Resumen de Renta</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="relative h-40 w-full">
                       <Image src={car.imageUrl} alt={car.name} fill className="object-cover rounded-lg" />
                    </div>
                    <Table>
                        <TableBody>
                            <TableRow><TableCell className="font-semibold p-2">Auto:</TableCell><TableCell className="p-2">{car.name}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-2">Días:</TableCell><TableCell className="p-2">{reservationDetails.rentalDays}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-2">Recogida:</TableCell><TableCell className="p-2 text-xs">{pickupLocation.split(',')[0]}</TableCell></TableRow>
                        </TableBody>
                    </Table>
                    <Separator />
                    <div className="flex justify-between items-center text-xl font-bold text-primary">
                        <span>Total:</span>
                        <span className="font-mono">${reservationDetails.totalWithoutDiscount.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}