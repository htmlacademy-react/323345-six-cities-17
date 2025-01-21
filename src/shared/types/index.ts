export type { CityNameType } from './types/city-name-type';
export type { CityType } from './types/city-type';
export type { CommentType } from './types/comment-type';
export type { LocationType } from './types/location-type';
export type { offerByCityType } from './types/offer-by-city-type';
export type { OfferType } from './types/offer-type';
export type { SendFormType } from './types/send-form-type';
export type { AuthData } from './types/auth-data';
export type { UserData } from './types/user-data';
export type { UserType } from './types/user-type';
export type { CurrentOfferType } from './types/current-offer-type';

declare global {
  interface Object {
    groupBy<T>(
      list: T[],
      keyGetter: (item: T) => string
    ): { [key: string]: T[] };
  }
}
