import {OfferType} from '../../types/types.ts';

type GetOfferByIdProps = {
  activeOfferId: string | undefined;
  offersList: OfferType[];
};

export function getOfferById({activeOfferId, offersList}: GetOfferByIdProps): OfferType | undefined {
  return offersList.length === 0 ? undefined : offersList.find((offer: OfferType) => offer.id === activeOfferId);
}

