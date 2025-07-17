export type Car = {
  id: number;
  name: string;
  description: string;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
  imageHint: string;
};

export type SavedRental = {
  carId: number;
  startDate: string;
  endDate: string;
};
