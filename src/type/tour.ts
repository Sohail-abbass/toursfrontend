export interface Tour {
  id: number;
  title: string;
  slug: string;
  location: string;
  days: number;
  nights: number;
  price: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; description: string }[];
  solo: number;
  couple: number;
  deluxe: number;
}