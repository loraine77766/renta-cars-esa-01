
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cars } from '@/lib/cars';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import ReservationForm from './ReservationForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

// This is the parent component, which can be a server component or a client component.
// It sets up the main structure and uses Suspense to handle the client-side part.
export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="flex flex-col min-h-screen items-center justify-center"><p>Cargando...</p></div>}>
      <ReservationPageContent />
    </Suspense>
  )
}

// This component MUST be a client component because it uses client-side hooks like useSearchParams and useRouter.
function ReservationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');

  if (!carId) {
    // Using redirect from next/navigation is fine in client components.
    redirect('/');
  }

  const car = cars.find(c => c.id === parseInt(carId, 10));

  if (!car) {
    redirect('/');
  }

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
            <div className="mb-6">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>
            </div>
            <ReservationForm car={car} />
        </main>
        <Footer />
    </div>
  );
}
