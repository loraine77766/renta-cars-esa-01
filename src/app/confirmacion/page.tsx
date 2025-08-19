import { redirect } from 'next/navigation';
import { differenceInCalendarDays, parseISO } from 'date-fns';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cars } from '@/lib/cars';
import ConfirmationDetails from './ConfirmationDetails';
import { calculateReservationDetails } from '@/lib/utils';
import type { ReservationDetails as ReservationDetailsType } from '@/lib/types';


type ConfirmationPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { carId, from, to, pickupLocation, dropoffLocation, pickupTime, dropoffTime } = searchParams;

  if (!carId || !from || !to || !pickupLocation || !dropoffLocation || !pickupTime || !dropoffTime || Array.isArray(carId) || Array.isArray(from) || Array.isArray(to) || Array.isArray(pickupLocation) || Array.isArray(dropoffLocation) || Array.isArray(pickupTime) || Array.isArray(dropoffTime)) {
    redirect('/');
  }

  const car = cars.find(c => c.id === parseInt(carId, 10));

  if (!car) {
    redirect('/');
  }

  const startDate = parseISO(from);
  const endDate = parseISO(to);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    redirect('/');
  }
  
  const rentalDays = differenceInCalendarDays(endDate, startDate) + 1;
  
  const reservationDetails: ReservationDetailsType | null = calculateReservationDetails(rentalDays, car.pricePerDay);

  if (!reservationDetails) {
     redirect('/');
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ConfirmationDetails 
          car={car}
          startDate={startDate}
          endDate={endDate}
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          pickupTime={pickupTime}
          dropoffTime={dropoffTime}
          reservationDetails={reservationDetails}
        />
      </main>
      <Footer />
    </div>
  );
}
