import {OfferType} from '../../types/types.ts';

type GetOfferByIdProps = {
  activeOffer: string | undefined;
  offersList: OfferType[];
};

export function getOfferById({activeOffer, offersList}: GetOfferByIdProps): OfferType | undefined {
  return offersList.length === 0 ? undefined : offersList.find((offer: OfferType) => offer.id === activeOffer);
}

