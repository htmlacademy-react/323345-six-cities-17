import { OfferType } from '../../shared/types';
import { CityNameType } from '../../shared/types';

export type AppStore = {
  auth: boolean;
  activeCity: CityNameType;
  activeOffer: string | undefined;
  offers: OfferType[];
  isLoading: boolean;
};
