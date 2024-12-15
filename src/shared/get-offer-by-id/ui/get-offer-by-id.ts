import {OfferType} from '../../types/types.ts';

type GetOfferByIdProps = {
  offerId: string | undefined;
  offersList: OfferType[];
};

/**
 *
 * @param { string } offerId - ID предложения которое ищем.
 * @param { OfferType[] } offersList - список всех предложений.
 * @returns предложение согласно ID
 */
export function getOfferById({offerId, offersList}: GetOfferByIdProps): OfferType | undefined {
  return offersList.length === 0 ? undefined : offersList.find((offer: OfferType) => offer.id === offerId);
}

