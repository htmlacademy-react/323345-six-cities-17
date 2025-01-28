export type { AuthData } from './auth-data';
export type { CityNameType } from './city-name-type';
export type { CityType } from './city-type';
export type { CommentType } from './comment-type';
export type { CurrentOfferType } from './current-offer-type';
export type { LocationType } from './location-type';
export type { offerByCityType } from './offer-by-city-type';
export type { OfferType } from './offer-type';
export type { ResponseOfferType } from './response-offer-type';
export type { SendFormType } from './send-form-type';
export type { UserData } from './user-data';
export type { UserType } from './user-type';

declare global {
  interface Object {
    groupBy<T>(
      list: T[],
      keyGetter: (item: T) => string
    ): { [key: string]: T[] };
  }
}
