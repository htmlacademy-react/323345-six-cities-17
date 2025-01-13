import { OfferType } from '../../../shared/types';

export type InitialOffersType = {
  activeOffer: undefined | OfferType;
  offers: OfferType[];
  isLoading: boolean;
  error: boolean;
};
