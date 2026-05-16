
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { format, differenceInYears } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
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
import { Loader2, MessageCircle, CheckCircle2, FileText } from 'lucide-react';
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
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  const [formattedDates, setFormattedDates] = useState({ start: '', end: '' });
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
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
    if (!isValid) return;

    setIsDownloading(true);
    const currentId = orderId || generateOrderId();
    setOrderId(currentId);

    // Registro silencioso
    registerInFirestore(currentId);

    // Generación de PDF
    setTimeout(async () => {
      if (invoiceRef.current) {
        try {
          const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`Factura_RentaCarsESA_${currentId}.pdf`);
          toast({ title: "Factura descargada correctamente." });
        } catch (error) {
          console.error("PDF Error:", error);
          toast({ variant: "destructive", title: "Error al generar factura." });
        }
      }
      setIsDownloading(false);
    }, 100);
  };

  const handleRegisterAndWhatsApp = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    setIsSubmitting(true);
    const currentId = orderId || generateOrderId();
    setOrderId(currentId);

    // Registro silencioso
    registerInFirestore(currentId);

    const message = `¡Hola! Mi ID de pedido es: ${currentId}`;
    window.open(`https://wa.me/15879120936?text=${encodeURIComponent(message)}`, '_blank');
    
    setIsSubmitting(false);
    toast({ title: "Redirigiendo a WhatsApp..." });
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
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem className="md:col-span-2"><FormLabel>Correo Electrónico *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
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
                                                    <h4 className="font-semibold text-sm">Depósito de Reserva ($250)</h4>
                                                    <p className="text-[10px] text-muted-foreground">Reembolsable al entregar el auto.</p>
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

                                <div className="bg-secondary/30 p-6 rounded-lg text-center border border-dashed border-primary/20">
                                    <p className="text-xs text-muted-foreground mb-1">Monto a abonar:</p>
                                    <p className="font-bold text-4xl text-primary font-mono">${amountToPay.toFixed(2)}</p>
                                </div>

                                <div className="pt-4 space-y-4">
                                  <Button 
                                    type="button"
                                    onClick={handleDownloadInvoice}
                                    className="w-full h-auto py-5 text-lg gap-3 bg-primary hover:bg-primary/90 shadow-lg text-white font-bold whitespace-normal"
                                    disabled={isDownloading}
                                  >
                                    {isDownloading ? <Loader2 className="h-6 w-6 animate-spin" /> : <><FileText className="h-6 w-6 shrink-0" /> Descargar Factura Proforma</>}
                                  </Button>

                                  <Button 
                                    type="button"
                                    onClick={handleRegisterAndWhatsApp}
                                    className="w-full h-auto py-5 text-lg gap-3 bg-green-600 hover:bg-green-700 shadow-lg text-white font-bold whitespace-normal"
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <><MessageCircle className="h-6 w-6 shrink-0" /> Confirmar por WhatsApp</>}
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
                        <span>Total:</span>
                        <span className="font-mono">${reservationDetails.totalWithoutDiscount.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Factura Oculta para Generación de PDF */}
        <div className="absolute left-[-9999px] top-[-9999px]">
          <div ref={invoiceRef} className="p-10 bg-white text-black w-[210mm] font-sans">
            <div className="flex justify-between items-center border-b-2 border-primary pb-6">
              <div>
                <h1 className="text-3xl font-bold text-primary">FACTURA PROFORMA</h1>
                <p className="text-sm">Renta Cars ESA - Blues Group USA LLC</p>
              </div>
              <div className="text-right">
                <p className="font-bold">ID Reserva: {orderId || 'PENDIENTE'}</p>
                <p className="text-sm">Fecha: {format(new Date(), "dd/MM/yyyy")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 my-8">
              <div>
                <h3 className="font-bold border-b mb-2">CLIENTE</h3>
                <p className="text-sm uppercase">{form.getValues('name')} {form.getValues('lastName1')}</p>
                <p className="text-sm">Pje: {form.getValues('passport')}</p>
                <p className="text-sm">Lic: {form.getValues('driversLicense')}</p>
                <p className="text-sm">País: {form.getValues('country')}</p>
              </div>
              <div>
                <h3 className="font-bold border-b mb-2">DETALLES DE RENTA</h3>
                <p className="text-sm">Vehículo: {car.name}</p>
                <p className="text-sm">Días: {reservationDetails.rentalDays}</p>
                <p className="text-sm">Desde: {formattedDates.start}</p>
                <p className="text-sm">Hasta: {formattedDates.end}</p>
              </div>
            </div>
            <div className="bg-gray-100 p-6 rounded">
              <div className="flex justify-between mb-2"><span>Precio Renta ({reservationDetails.rentalDays} días):</span><span>${reservationDetails.rentPrice.toFixed(2)}</span></div>
              <div className="flex justify-between mb-2"><span>Depósito de Garantía:</span><span>$250.00</span></div>
              {form.getValues('paymentOption') === 'full_payment' && (
                <div className="flex justify-between text-green-600 font-bold mb-2"><span>Descuento Pago Adelantado (20%):</span><span>-${reservationDetails.discountAmount.toFixed(2)}</span></div>
              )}
              <Separator className="my-4" />
              <div className="flex justify-between text-xl font-bold"><span>MONTO TOTAL:</span><span>${amountToPay.toFixed(2)}</span></div>
            </div>
            <div className="mt-10 text-[10px] text-gray-500 italic">
              * Esta es una factura proforma informativa. Para confirmar su reserva debe contactar con soporte vía WhatsApp proporcionando su ID de reserva. El depósito de garantía es reembolsable al finalizar la renta.
            </div>
          </div>
        </div>
    </div>
  );
}
