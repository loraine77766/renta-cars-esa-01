
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cars } from '@/lib/cars';
import { redirect, useRouter } from 'next/navigation';
import ReservationForm from './ReservationForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type ReservationPageProps = {
  searchParams: {
    carId?: string;
  };
};

export default function ReservationPage({ searchParams }: ReservationPageProps) {
    const router = useRouter();
    const { carId } = searchParams;

    if (!carId) {
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
                        Volver a la lista
                    </Button>
                </div>
                <ReservationForm car={car} />
            </main>
            <Footer />
        </div>
    )
}
