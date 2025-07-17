'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Wand2, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getAiRecommendations } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const formSchema = z.object({
  preferences: z.string().min(10, {
    message: 'Describe con más detalle qué tipo de auto buscas.',
  }),
});

export default function AiRecommender() {
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation('');
    setError('');
    const result = await getAiRecommendations(values);
    if (result.success) {
      setRecommendation(result.recommendations ?? '');
    } else {
      setError(result.error ?? 'Ocurrió un error inesperado.');
    }
    setIsLoading(false);
  }

  return (
    <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-2 border-primary/10">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center gap-2">
            <Wand2 className="h-6 w-6 text-accent" />
            <CardTitle className="font-headline text-2xl text-primary">¿No sabes qué elegir?</CardTitle>
        </div>
        <CardDescription>Usa nuestra IA para encontrar tu auto ideal. Dinos qué necesitas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Ej: 'un auto económico para 2 personas' o 'uno familiar para un viaje largo'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                'Obtener recomendación'
              )}
            </Button>
          </form>
        </Form>
        {recommendation && (
            <Alert className="mt-4 border-accent">
                <Wand2 className="h-4 w-4" />
                <AlertTitle className="font-headline text-accent">Recomendación</AlertTitle>
                <AlertDescription>
                    {recommendation}
                </AlertDescription>
            </Alert>
        )}
        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
