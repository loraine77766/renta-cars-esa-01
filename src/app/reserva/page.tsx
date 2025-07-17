import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cars } from '@/lib/cars';
import { redirect } from 'next/navigation';
import ReservationForm from './ReservationForm';

type ReservationPageProps = {
  searchParams: {
    carId?: string;
  };
};

export default function ReservationPage({ searchParams }: ReservationPageProps) {
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
                <ReservationForm car={car} />
            </main>
            <Footer />
        </div>
    )
}
