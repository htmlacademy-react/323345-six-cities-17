import { OfferType } from '../../../shared/types';

type FindNearestPointProps = {
  offer: OfferType;
  activeCityOffersList: OfferType[];
  NEAR_OFFER_COUNT: number;
};
/**
 * @param  offer - текущее предложение.
 * @param  activeCityOffersList - список предложений для этого города.
 * @param  NEAR_OFFER_COUNT - число, сколько надо найти близжайших предложений.
 * @returns список ближайщих предложений в количестве  = NEAR_OFFER_COUNT
 */
export function findNearestPoint({
  offer,
  activeCityOffersList,
  NEAR_OFFER_COUNT,
}: FindNearestPointProps) {
  const offersWithDistance = activeCityOffersList.map((point) => {
    const distance = Math.sqrt(
      Math.pow(point.location.latitude - offer.location.latitude, 2) +
      Math.pow(point.location.longitude - offer.location.longitude, 2)
    );
    return { point, distance };
  });
  offersWithDistance.sort((a, b) => a.distance - b.distance);
  return offersWithDistance
    .slice(0, NEAR_OFFER_COUNT + 1)
    .map((item) => item.point);
}
