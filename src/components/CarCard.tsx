'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import type { Car as CarType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CarCardProps {
  car: CarType;
}

export function CarCard({ car }: CarCardProps) {
  const requiresMinDays = car.details?.notes.some(n => n.includes('Mínimo de renta'));
  
  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={car.imageUrl}
            alt={car.name}
            data-ai-hint={car.imageHint}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
            <div className="flex justify-between items-start">
              <CardTitle className="font-headline text-xl text-primary">{car.name}</CardTitle>
              {requiresMinDays && (
                 <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertCircle className="h-5 w-5 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{car.details?.notes.find(n => n.includes('Mínimo de renta'))}</p>
                      </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <CardDescription>{car.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
            {car.features.map((feature) => (
                <Badge key={feature} variant="secondary">{feature}</Badge>
            ))}
        </div>
        
        <div className="flex justify-end items-baseline gap-2 text-primary">
            {car.originalPricePerDay && (
                <span className="text-muted-foreground line-through text-lg">${car.originalPricePerDay}</span>
            )}
            <span className="font-headline text-2xl font-bold">${car.pricePerDay}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 dark:bg-gray-800/20">
        <Button asChild className="w-full bg-accent hover:bg-accent/90">
            <Link href={`/reserva?carId=${car.id}`}>
                Rentar Ahora
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
