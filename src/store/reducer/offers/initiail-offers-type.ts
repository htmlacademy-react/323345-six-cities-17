import { CurrentOfferType, OfferType } from '../../../shared/types';

type InitialOffersType = {
  activeOffer: null | string;
  offers: OfferType[];
  currentOffer: CurrentOfferType | undefined;
  nearPoints: OfferType[];
  isLoading: boolean;
};

export type { InitialOffersType };
