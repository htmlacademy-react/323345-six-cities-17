import { OfferType } from '../../../shared/types';

export type InitialOffersType = {
  activeOffer: undefined | string;
  offers: OfferType[];
  currentOffer: OfferType | null;
  nearPoints: OfferType[];
  isLoading: boolean;
  error: boolean;
};
