
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { format, differenceInYears } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase/index';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import type { Car, ReservationDetails } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Loader2, MessageCircle, FileText } from 'lucide-react';
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
  flight: z.string().default(''),
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
  const firestore = useFirestore();
  const { toast } = useToast();
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  const [formattedDates, setFormattedDates] = useState({ start: '', end: '' });
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmittingWhatsApp, setIsSubmittingWhatsApp] = useState(false);
  const [isDownloadingInvoice, setIsDownloadingInvoice] = useState(false);
  
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
      flight: '',
      paymentOption: 'deposit',
    },
  });
  
  const paymentOption = form.watch('paymentOption');
  const amountToPay = paymentOption === 'full_payment' ? reservationDetails.totalWithDiscount : (reservationDetails.rentPrice + 250);

  const generateOrderId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const registerInFirestore = async (currentId: string) => {
    if (!firestore) return;
    const values = form.getValues();
    try {
      await setDoc(doc(firestore, 'pedidos', currentId), {
        id: currentId,
        customerName: `${values.name} ${values.lastName1} ${values.lastName2 || ''}`,
        customerEmail: values.email,
        customerPhone: values.phone,
        customerPassport: values.passport,
        customerLicense: values.driversLicense,
        customerCountry: values.country,
        customerDOB: `${values.birthDay}/${values.birthMonth}/${values.birthYear}`,
        customerFlight: values.flight || 'N/A',
        carName: car.name,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        pickupLocation,
        dropoffLocation,
        totalAmount: amountToPay,
        paymentOption: values.paymentOption,
        createdAt: serverTimestamp(),
      });
      return true;
    } catch (e) {
      console.error("Firestore error:", e);
      return false;
    }
  };

  const handleDownloadInvoice = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({ variant: "destructive", title: "Por favor, completa los datos obligatorios." });
      return;
    }

    setIsDownloadingInvoice(true);
    const currentId = orderId || generateOrderId();
    if (!orderId) setOrderId(currentId);

    // Registrar en Firestore sin bloquear
    registerInFirestore(currentId);

    setTimeout(async () => {
      if (invoiceRef.current) {
        try {
          const canvas = await html2canvas(invoiceRef.current, { scale: 2, useCORS: true });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          const fileName = `Factura_${form.getValues('name')}_${form.getValues('lastName1')}_${currentId}.pdf`.replace(/\s+/g, '_');
          pdf.save(fileName);
          toast({ title: "Factura descargada correctamente." });
        } catch (error) {
          console.error("PDF Error:", error);
          toast({ variant: "destructive", title: "Error al generar factura." });
        }
      }
      setIsDownloadingInvoice(false);
    }, 500);
  };

  const handleWhatsApp = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({ variant: "destructive", title: "Por favor, completa los datos obligatorios." });
      return;
    }

    setIsSubmittingWhatsApp(true);
    const currentId = orderId || generateOrderId();
    if (!orderId) setOrderId(currentId);

    // Registrar y abrir WhatsApp
    try {
      await registerInFirestore(currentId);
      const message = `¡Hola! Mi ID de pedido es: ${currentId}. Quiero confirmar mi reserva de auto.`;
      window.location.href = `https://wa.me/15879120936?text=${encodeURIComponent(message)}`;
    } catch (e) {
      console.error("WhatsApp error:", e);
    } finally {
      setIsSubmittingWhatsApp(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 md:px-4">
        <h1 className="font-headline text-2xl md:text-4xl font-bold text-primary mb-2 text-center">Finaliza tu Reserva</h1>
        <p className="text-center text-sm text-muted-foreground mb-8">Completa tus datos para confirmar tu renta en Cuba.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card className="shadow-lg border-2 border-primary/5">
                    <CardHeader className="bg-primary/5">
                        <CardTitle className="font-headline text-xl text-primary">Datos del Conductor</CardTitle>
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
                                    <FormField control={form.control} name="flight" render={({ field }) => (
                                        <FormItem><FormLabel>Vuelo / Aerolínea (Opcional)</FormLabel><FormControl><Input placeholder="Ej: IB6621 Iberia" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem><FormLabel>Correo Electrónico *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                
                                <Separator />
                                <h3 className="font-headline text-lg text-primary">Forma de Pago</h3>
                                <FormField
                                    control={form.control}
                                    name="paymentOption"
                                    render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${field.value === 'deposit' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="deposit" checked={field.value === 'deposit'} className="sr-only" />
                                                    <h4 className="font-semibold text-sm">Pago Posterior (Renta + Depósito)</h4>
                                                    <p className="text-[10px] text-muted-foreground">Paga al recibir el auto.</p>
                                                </label>
                                                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${field.value === 'full_payment' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="full_payment" checked={field.value === 'full_payment'} className="sr-only" />
                                                    <h4 className="font-semibold text-sm">Pago Total (-20% Descuento)</h4>
                                                    <p className="text-[10px] text-muted-foreground">Ahorra pagando hoy mismo.</p>
                                                </label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />

                                <div className="pt-4 space-y-4">
                                  <Button 
                                    type="button"
                                    onClick={handleDownloadInvoice}
                                    className="w-full h-auto py-5 text-lg gap-3 bg-primary hover:bg-primary/90 shadow-lg text-white font-bold whitespace-normal"
                                    disabled={isDownloadingInvoice}
                                  >
                                    {isDownloadingInvoice ? <Loader2 className="h-6 w-6 animate-spin" /> : <><FileText className="h-6 w-6 shrink-0" /> Descargar Factura Proforma</>}
                                  </Button>

                                  <Button 
                                    type="button"
                                    onClick={handleWhatsApp}
                                    className="w-full h-auto py-5 text-lg gap-3 bg-green-600 hover:bg-green-700 shadow-lg text-white font-bold whitespace-normal"
                                    disabled={isSubmittingWhatsApp}
                                  >
                                    {isSubmittingWhatsApp ? <Loader2 className="h-6 w-6 animate-spin" /> : <><MessageCircle className="h-6 w-6 shrink-0" /> Confirmar por WhatsApp</>}
                                  </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="shadow-lg lg:sticky lg:top-24 border-2 border-primary/5">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="font-headline text-lg text-primary">Resumen del Viaje</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="relative h-32 w-full">
                       <Image src={car.imageUrl} alt={car.name} fill className="object-cover rounded-lg shadow-sm" />
                    </div>
                    <Table>
                        <TableBody>
                            <TableRow><TableCell className="font-semibold p-2 text-xs">Auto:</TableCell><TableCell className="p-2 text-xs">{car.name}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-2 text-xs">Días:</TableCell><TableCell className="p-2 text-xs">{reservationDetails.rentalDays}</TableCell></TableRow>
                            <TableRow><TableCell className="font-semibold p-2 text-xs">Recogida:</TableCell><TableCell className="p-2 text-xs font-mono">{formattedDates.start}</TableCell></TableRow>
                        </TableBody>
                    </Table>
                    <Separator />
                    <div className="flex justify-between items-center text-xl font-bold text-primary">
                        <span>Monto Total:</span>
                        <span className="font-mono">${amountToPay.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Factura Proforma (Hidden) */}
        <div className="absolute left-[-9999px] top-[-9999px]">
          <div ref={invoiceRef} className="p-10 bg-white text-black w-[210mm] font-sans">
            <div className="flex justify-between items-center border-b-4 border-primary pb-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-primary">FACTURA PROFORMA</h1>
                <p className="text-md font-semibold mt-1">Renta Cars ESA - Blues Group USA LLC</p>
                <p className="text-xs text-muted-foreground">1317 Edgewater Dr Unit 1858, Orlando, FL 32804</p>
              </div>
              <div className="text-right">
                <div className="bg-primary text-white p-2 rounded mb-2">
                  <p className="text-xs uppercase font-bold">ID de Reserva</p>
                  <p className="text-xl font-mono font-bold">{orderId || 'PENDIENTE'}</p>
                </div>
                <p className="text-sm font-bold">Fecha: {format(new Date(), "dd/MM/yyyy")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-8">
              <div className="border border-primary/20 p-4 rounded-lg">
                <h3 className="font-bold text-primary border-b-2 border-primary/10 mb-3 pb-1 uppercase text-sm">Datos del Conductor</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-bold">Nombre:</span> {form.getValues('name')} {form.getValues('lastName1')} {form.getValues('lastName2')}</p>
                  <p><span className="font-bold">Nacimiento:</span> {form.getValues('birthDay')}/{form.getValues('birthMonth')}/{form.getValues('birthYear')}</p>
                  <p><span className="font-bold">Teléfono:</span> {form.getValues('phone')}</p>
                  <p><span className="font-bold">País:</span> {form.getValues('country')}</p>
                  <p><span className="font-bold">Email:</span> {form.getValues('email')}</p>
                  <p><span className="font-bold">Pasaporte:</span> {form.getValues('passport')}</p>
                  <p><span className="font-bold">Licencia:</span> {form.getValues('driversLicense')}</p>
                </div>
              </div>
              <div className="border border-primary/20 p-4 rounded-lg">
                <h3 className="font-bold text-primary border-b-2 border-primary/10 mb-3 pb-1 uppercase text-sm">Detalles de Renta</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-bold">Vehículo:</span> {car.name}</p>
                  <p><span className="font-bold">Días:</span> {reservationDetails.rentalDays}</p>
                  <p><span className="font-bold">Recogida:</span> {formattedDates.start}</p>
                  <p className="text-xs ml-4 text-muted-foreground">{pickupLocation}</p>
                  <p><span className="font-bold">Devolución:</span> {formattedDates.end}</p>
                  <p className="text-xs ml-4 text-muted-foreground">{dropoffLocation}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-primary border-b-2 border-primary/10 mb-3 pb-1 uppercase text-sm">Desglose del Costo</h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Precio Renta:</span>
                    <span className="font-mono font-bold">${reservationDetails.rentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Depósito (Reembolsable):</span>
                    <span className="font-mono font-bold">$250.00</span>
                  </div>
                  <Separator className="my-2" />
                  {form.getValues('paymentOption') === 'full_payment' && (
                    <div className="flex justify-between items-center text-green-600 font-bold bg-green-50 p-2 rounded">
                      <span>Descuento (20%):</span>
                      <span className="font-mono">-${reservationDetails.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-2xl font-bold text-primary mt-4 border-t-2 border-primary pt-4">
                    <span>MONTO TOTAL:</span>
                    <span className="font-mono">${amountToPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
