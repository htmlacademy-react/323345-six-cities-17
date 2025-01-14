import { OfferType } from '../../../shared/types';

export type InitialOffersType = {
  activeOffer: undefined | string;
  offers: OfferType[];
  nearPoints: OfferType[];
  isLoading: boolean;
  error: boolean;
};
