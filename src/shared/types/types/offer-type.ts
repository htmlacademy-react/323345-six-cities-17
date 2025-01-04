import { CityType } from './city-type';
import { LocationType } from './location-type';

export type OfferType = {
  id: string;
  title: string;
  type: 'house' | 'hotel' | 'room' | 'apartment';
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
