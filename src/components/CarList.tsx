'use client';

import type { Car } from '@/lib/types';
import { CarCard } from '@/components/CarCard';

interface CarListProps {
  cars: Car[];
}

export function CarList({ cars }: CarListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
