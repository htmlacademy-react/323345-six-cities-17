import { CurrentOfferType, OfferType } from '../../../shared/types';

export type InitialOffersType = {
  activeOffer: null | string;
  offers: OfferType[];
  currentOffer: CurrentOfferType | undefined;
  nearPoints: OfferType[];
  isLoading: boolean;
};
