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
  name: z.string().min(2, { message: 'Requerido' }),
  lastName1: z.string().min(2, { message: 'Requerido' }),
  lastName2: z.string().default(''),
  birthDay: z.string().min(1, 'Día'),
  birthMonth: z.string().min(1, 'Mes'),
  birthYear: z.string().min(4, 'Año'),
  phone: z.string().min(5, { message: 'Requerido' }),
  country: z.string().min(2, { message: 'Requerido' }),
  passport: z.string().min(5, { message: 'Requerido' }),
  driversLicense: z.string().min(5, { message: 'Requerido' }),
  email: z.string().email({ message: 'Email inválido' }),
  flight: z.string().default(''),
  paymentOption: z.enum(['deposit', 'full_payment']).default('deposit'),
}).refine(data => {
    try {
        const day = parseInt(data.birthDay);
        const month = parseInt(data.birthMonth);
        const year = parseInt(data.birthYear);
        const dob = new Date(year, month - 1, day);
        return !isNaN(dob.getTime()) && differenceInYears(new Date(), dob) >= 21;
    } catch { return false; }
}, {
    message: 'Mínimo 21 años.',
    path: ['birthYear'],
});

export default function ConfirmationDetails({ car, startDate, endDate, pickupLocation, dropoffLocation, pickupTime, dropoffTime, reservationDetails }: ConfirmationDetailsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const firestore = useFirestore();
  const { toast } = useToast();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isSubmittingWhatsApp, setIsSubmittingWhatsApp] = useState(false);
  const [isSubmittingInvoice, setIsSubmittingInvoice] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < 8; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setOrderId(res);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '', lastName1: '', lastName2: '', birthDay: '', birthMonth: '', birthYear: '',
      phone: '', country: '', passport: '', driversLicense: '', email: '', flight: '',
      paymentOption: 'deposit',
    },
  });

  if (!isMounted) return null;

  const formData = form.watch();
  const amountToPay = formData.paymentOption === 'full_payment' 
    ? (reservationDetails?.totalWithDiscount || 0) 
    : ((reservationDetails?.rentPrice || 0) + 250);

  const performRegistry = () => {
    if (!firestore || !orderId) return;
    const values = form.getValues();
    const docRef = doc(firestore, 'pedidos', orderId);
    
    setDoc(docRef, {
        id: orderId,
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
    }, { merge: true }).catch(err => {
      console.error("Error al registrar pedido:", err);
    });
  };

  const handleDownloadInvoice = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({ variant: "destructive", title: "Completa los campos obligatorios." });
      return;
    }
    
    setIsSubmittingInvoice(true);
    performRegistry();
    
    // Pequeño delay para asegurar que los datos estén renderizados en el div oculto
    setTimeout(async () => {
      if (invoiceRef.current) {
        try {
          const canvas = await html2canvas(invoiceRef.current, { 
            scale: 2, 
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
          });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`Factura_${formData.name || 'Reserva'}_${orderId}.pdf`);
          toast({ title: "Factura descargada correctamente." });
        } catch (e) { 
          console.error(e);
          toast({ variant: "destructive", title: "Error al generar el PDF de la factura." }); 
        } finally {
          setIsSubmittingInvoice(false);
        }
      } else {
        setIsSubmittingInvoice(false);
        toast({ variant: "destructive", title: "Error técnico: no se encontró el elemento de factura." });
      }
    }, 800);
  };

  const handleWhatsApp = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({ variant: "destructive", title: "Completa los campos obligatorios antes de confirmar." });
      return;
    }
    
    setIsSubmittingWhatsApp(true);
    try {
      performRegistry();
      const msg = `¡Hola! Mi ID de pedido es: ${orderId}. Quiero confirmar mi reserva de auto.`;
      const encodedMsg = encodeURIComponent(msg);
      const whatsappUrl = `https://wa.me/15879120936?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
      toast({ title: "Abriendo WhatsApp para confirmar..." });
    } catch (e) {
      console.error(e);
      toast({ variant: "destructive", title: "No se pudo abrir WhatsApp." });
    } finally {
      setTimeout(() => setIsSubmittingWhatsApp(false), 1000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 md:px-4 pb-20">
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
                                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Nombre *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                    <FormField control={form.control} name="lastName1" render={({ field }) => (<FormItem><FormLabel>1. Apellido *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                    <FormField control={form.control} name="lastName2" render={({ field }) => (<FormItem><FormLabel>2. Apellido</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                                    <div className="space-y-2">
                                        <FormLabel>Nacimiento *</FormLabel>
                                        <div className="grid grid-cols-3 gap-2">
                                            <FormField control={form.control} name="birthDay" render={({ field }) => (<FormControl><Input placeholder="Día" {...field} /></FormControl>)}/>
                                            <FormField control={form.control} name="birthMonth" render={({ field }) => (<FormControl><Input placeholder="Mes" {...field} /></FormControl>)}/>
                                            <FormField control={form.control} name="birthYear" render={({ field }) => (<FormControl><Input placeholder="Año" {...field} /></FormControl>)}/>
                                        </div>
                                    </div>
                                    <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>WhatsApp *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                    <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>País *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                    <FormField control={form.control} name="passport" render={({ field }) => (<FormItem><FormLabel>Pasaporte *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                    <FormField control={form.control} name="driversLicense" render={({ field }) => (<FormItem><FormLabel>Licencia *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                    <FormField control={form.control} name="flight" render={({ field }) => (<FormItem><FormLabel>Vuelo (Opcional)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                                    <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                </div>
                                <Separator />
                                <FormField control={form.control} name="paymentOption" render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Opción de Pago</FormLabel>
                                        <FormControl>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${field.value === 'deposit' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="deposit" checked={field.value === 'deposit'} className="sr-only" />
                                                    <h4 className="font-semibold text-sm">Pago Posterior</h4>
                                                    <p className="text-[10px] text-muted-foreground">Renta + Depósito al recibir.</p>
                                                </label>
                                                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${field.value === 'full_payment' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border'}`}>
                                                    <input type="radio" {...field} value="full_payment" checked={field.value === 'full_payment'} className="sr-only" />
                                                    <h4 className="font-semibold text-sm">Pago Adelantado (-20%)</h4>
                                                    <p className="text-[10px] text-muted-foreground">Ahorra pagando hoy.</p>
                                                </label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}/>
                                <div className="space-y-4 pt-4">
                                    <Button 
                                      type="button" 
                                      onClick={handleDownloadInvoice} 
                                      className="w-full h-auto py-5 text-lg gap-3 bg-primary hover:bg-primary/90 text-white font-bold whitespace-normal" 
                                      disabled={isSubmittingInvoice}
                                    >
                                        {isSubmittingInvoice ? <Loader2 className="h-6 w-6 animate-spin" /> : <FileText className="h-6 w-6" />}
                                        Descargar Factura Proforma
                                    </Button>
                                    <Button 
                                      type="button" 
                                      onClick={handleWhatsApp} 
                                      className="w-full h-auto py-5 text-lg gap-3 bg-green-600 hover:bg-green-700 text-white font-bold whitespace-normal" 
                                      disabled={isSubmittingWhatsApp}
                                    >
                                        {isSubmittingWhatsApp ? <Loader2 className="h-6 w-6 animate-spin" /> : <MessageCircle className="h-6 w-6" />}
                                        Confirmar por WhatsApp
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="shadow-lg lg:sticky lg:top-24 border-2 border-primary/5 h-fit">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="font-headline text-lg text-primary">Resumen del Viaje</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="relative h-32 w-full">
                        <Image src={car.imageUrl} alt={car.name} fill className="object-cover rounded-lg shadow-sm" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <p className="font-bold text-primary">{car.name}</p>
                        <p className="text-xs text-muted-foreground">{reservationDetails.rentalDays} días de renta</p>
                        <p className="text-xs font-mono bg-muted px-2 py-0.5 rounded w-fit">ID: {orderId}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-xl font-bold text-primary">
                        <span>Total:</span>
                        <span className="font-mono text-2xl">${amountToPay.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* FACTURA PARA PDF (OCULTA PERO RENDERIZADA) */}
        <div style={{ position: 'absolute', left: '-5000px', top: '0' }}>
          <div ref={invoiceRef} className="p-10 bg-white text-black font-sans" style={{ width: '210mm', minHeight: '297mm' }}>
            <div className="flex justify-between items-center border-b-4 border-blue-900 pb-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-blue-900">FACTURA PROFORMA</h1>
                <p className="text-md font-semibold mt-1">Renta Cars ESA - Blues Group USA LLC</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-mono font-bold">ID: {orderId}</p>
                <p className="text-sm">Fecha: {format(new Date(), "dd/MM/yyyy")}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-10 mb-8">
              <div className="border border-blue-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-blue-900 border-b-2 mb-3 pb-1 uppercase text-sm">Conductor</h3>
                <div className="space-y-1 text-xs">
                  <p><span className="font-bold">Nombre:</span> {formData.name} {formData.lastName1} {formData.lastName2}</p>
                  <p><span className="font-bold">WhatsApp:</span> {formData.phone}</p>
                  <p><span className="font-bold">País:</span> {formData.country}</p>
                  <p><span className="font-bold">Pasaporte:</span> {formData.passport}</p>
                  <p><span className="font-bold">Licencia:</span> {formData.driversLicense}</p>
                  <p><span className="font-bold">Email:</span> {formData.email}</p>
                </div>
              </div>
              <div className="border border-blue-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-blue-900 border-b-2 mb-3 pb-1 uppercase text-sm">Detalles Renta</h3>
                <div className="space-y-1 text-xs">
                  <p><span className="font-bold">Vehículo:</span> {car.name}</p>
                  <p><span className="font-bold">Días:</span> {reservationDetails.rentalDays}</p>
                  <p><span className="font-bold">Recogida:</span> {format(startDate, "dd/MM/yy", { locale: es })} ({pickupLocation})</p>
                  <p><span className="font-bold">Devolución:</span> {format(endDate, "dd/MM/yy", { locale: es })} ({dropoffLocation})</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="font-bold text-blue-900 mb-4 uppercase text-sm">Desglose de Pago</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Costo Renta ({reservationDetails.rentalDays} días):</span>
                  <span>${reservationDetails.rentPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Depósito Garantía (Reembolsable):</span>
                  <span>$250.00</span>
                </div>
                {formData.paymentOption === 'full_payment' && (
                  <div className="flex justify-between text-green-600 font-semibold italic border-t pt-1">
                    <span>Descuento Pago Adelantado (20%):</span>
                    <span>-${reservationDetails.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-2xl font-bold text-blue-900 border-t-2 border-blue-900 pt-2 mt-2">
                  <span>TOTAL A PAGAR:</span>
                  <span>${amountToPay.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-4 border rounded bg-blue-50 text-[11px]">
              <h4 className="font-bold mb-1">Notas Legales:</h4>
              <p>Factura proforma emitida por Renta Cars ESA. El contrato final se firma en Cuba. El depósito de $250 es reembolsable al entregar el auto en perfectas condiciones. Blues Group USA LLC actúa como intermediario oficial.</p>
            </div>

            <p className="mt-8 text-[9px] text-center text-gray-400">
               Blues Group USA LLC | 1317 EDGEWATER DR UNIT 1858 ORLANDO, FL 32804 | info@bluesgroupusa.com
            </p>
          </div>
        </div>
    </div>
  );
}
