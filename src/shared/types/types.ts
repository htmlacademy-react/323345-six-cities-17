export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type CityType = {
  name: string;
  location: LocationType;
};

export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type offerByCity = [
  key: string,
  value: OfferType[],
]

declare global {
  interface Object {
    groupBy<T>(list: T[], keyGetter: (item: T) => string): { [key: string]: T[] };
  }
}
