import { clsx, type ClassValue } from "clsx"
import { differenceInDays } from "date-fns";
import { twMerge } from "tailwind-merge"
import type { ReservationDetails } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReservationDetails(rentalDays: number, pricePerDay: number): ReservationDetails | null {
  if (rentalDays <= 0) {
    return null;
  }

  const rentPrice = rentalDays * pricePerDay;
  const deposit = 250;
  const discountPercentage = 0.20; // 20% discount

  // Total if paying later (rent + deposit)
  const totalWithoutDiscount = rentPrice + deposit;
  
  // Calculate discounted rent price
  const discountedRentPrice = rentPrice * (1 - discountPercentage);
  const discountAmount = rentPrice - discountedRentPrice;
  
  // Total if paying in advance (discounted rent + deposit)
  const totalWithDiscount = discountedRentPrice + deposit;

  return {
    rentalDays,
    rentPrice,
    deposit,
    totalWithDiscount,
    totalWithoutDiscount,
    discountAmount
  };
}