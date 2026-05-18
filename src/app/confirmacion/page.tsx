import { redirect } from 'next/navigation';
import { isValid, parseISO } from 'date-fns';
import type { Metadata } from 'next';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cars } from '@/lib/cars';
import ConfirmationDetails from '@/app/confirmacion/ConfirmationDetails';
import { calculateReservationDetails } from '@/lib/utils';
import type { ReservationDetails as ReservationDetailsType } from '@/lib/types';

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const carId = Array.isArray(params.carId) ? params.carId[0] : params.carId;
  const from = Array.isArray(params.from) ? params.from[0] : params.from;
  const to = Array.isArray(params.to) ? params.to[0] : params.to;
  const pickupLocation = Array.isArray(params.pickupLocation) ? params.pickupLocation[0] : params.pickupLocation;
  const dropoffLocation = Array.isArray(params.dropoffLocation) ? params.dropoffLocation[0] : params.dropoffLocation;
  const pickupTime = Array.isArray(params.pickupTime) ? params.pickupTime[0] : params.pickupTime;
  const dropoffTime = Array.isArray(params.dropoffTime) ? params.dropoffTime[0] : params.dropoffTime;

  if (
    !carId || 
    !from || 
    !to || 
    !pickupLocation || 
    !dropoffLocation || 
    !pickupTime || 
    !dropoffTime
  ) {
    redirect('/');
  }

  const car = cars.find(c => c.id === parseInt(carId, 10));
  if (!car) {
    redirect('/');
  }

  const startDate = parseISO(from);
  const endDate = parseISO(to);

  if (!isValid(startDate) || !isValid(endDate)) {
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

