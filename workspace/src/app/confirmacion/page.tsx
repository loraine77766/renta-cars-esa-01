
import { redirect } from 'next/navigation';
import { isValid, parseISO } from 'date-fns';
import type { Metadata } from 'next';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cars } from '@/lib/cars';
import ConfirmationDetails from '@/app/confirmacion/ConfirmationDetails';
import { calculateReservationDetails } from '@/lib/utils';
import type { ReservationDetails as ReservationDetailsType } from '@/lib/types';

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { carId, from, to, pickupLocation, dropoffLocation, pickupTime, dropoffTime } = searchParams;

  if (
    !carId || typeof carId !== 'string' ||
    !from || typeof from !== 'string' ||
    !to || typeof to !== 'string' ||
    !pickupLocation || typeof pickupLocation !== 'string' ||
    !dropoffLocation || typeof dropoffLocation !== 'string' ||
    !pickupTime || typeof pickupTime !== 'string' ||
    !dropoffTime || typeof dropoffTime !== 'string'
  ) {
    redirect('/');
  }

  const car = cars.find(c => c.id === parseInt(carId, 10));
  if (!car) {
    redirect('/');
  }

  const startDate = parseISO(from);
  const endDate = parseISO(to);

  if (!isValid(startDate) || !isValid(endDate) || endDate < startDate) {
    redirect('/');
  }
  
  const reservationDetails: ReservationDetailsType | null = calculateReservationDetails(startDate, endDate, car.pricePerDay);

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
