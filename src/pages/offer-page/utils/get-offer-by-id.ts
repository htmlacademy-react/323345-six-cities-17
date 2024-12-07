import {OfferType} from '../../../shared/types/types.ts';

type GetOfferByIdProps = {
  offerId: string | undefined;
  offersList: OfferType[];
};

export function getOfferById({offerId, offersList}: GetOfferByIdProps): OfferType | undefined {
  return offersList.length === 0 ? undefined : offersList.find((offer: OfferType) => offer.id === offerId);
}

