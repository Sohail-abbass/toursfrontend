// src/types/package.ts

export interface Destination {
  name: string;
  stayDays: number;
  image:string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  stay: string;
}

export interface Accommodation {
  hotelCategory: string;
  roomType: string;
  totalNights: number;
  cities?: string[];
}

export interface Transport {
  mode: string;
  fuelIncluded: boolean;
  driver: boolean;
  airportTransfers?: boolean;
}

export interface Package {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency: string;

  duration: {
    days: number;
    nights: number;
  };

  mainImage: string;
  gallery: string[];

  destinations: Destination[];
  itinerary?: ItineraryDay[];

  accommodation: Accommodation;
  transport: Transport;

  includes: string[];
  excludes: string[];

  idealFor?: string[];
  status: "active" | "inactive";
}
