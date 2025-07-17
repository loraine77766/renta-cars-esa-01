'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

import type { Car } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface ConfirmationDetailsProps {
  car: Car;
  startDate: Date;
  endDate: Date;
  rentalDays: number;
  totalPrice: number;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'El correo electrónico no es válido.' }),
});

export default function ConfirmationDetails({ car, startDate, endDate, rentalDays, totalPrice }: ConfirmationDetailsProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '' },
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

  return (
    <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4 text-center">Confirma tu Renta</h1>
        <p className="text-center text-muted-foreground mb-8">Estás a un paso de asegurar tu vehículo. Por favor, revisa los detalles y completa tu información.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">Resumen de la Renta</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative h-56 w-full rounded-lg overflow-hidden mb-4">
                        <Image src={car.imageUrl} alt={car.name} data-ai-hint={car.imageHint} fill className="object-cover" />
                    </div>
                    <h3 className="font-headline text-xl font-semibold text-primary">{car.name}</h3>
                    <div className="flex flex-wrap gap-2 my-2">
                        {car.features.map(f => <Badge key={f} variant="secondary">{f}</Badge>)}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Recogida:</span>
                            <span className="font-semibold">{format(startDate, "PPP", { locale: es })}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Devolución:</span>
                            <span className="font-semibold">{format(endDate, "PPP", { locale: es })}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Total de días:</span>
                            <span className="font-semibold">{rentalDays}</span>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center text-2xl font-bold text-primary">
                        <span className="font-headline">Precio Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">Tus Datos</CardTitle>
                    <CardDescription>Completa el formulario para finalizar la reserva.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu nombre y apellidos" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="tu@correo.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-lg py-6">
                                Confirmar y Rentar
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
