export type Car = {
  id: number;
  name: string;
  description: string;
  pricePerDay: number;
  originalPricePerDay?: number;
  imageUrl: string;
  features: string[];
  imageHint: string;
  details?: {
    additionalCharges: string[];
    included: string[];
    notIncluded: string[];
    pickupAndDropoff: string[];
    notes: string[];
  }
};

export type SavedRental = {
  carId: number;
  startDate: string;
  endDate: string;
};
