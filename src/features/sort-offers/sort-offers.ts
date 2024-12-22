import { OfferType } from '../../shared/types/types';

type SortOffersProps = {
  key: string | undefined;
  activeCityOffersList: OfferType[];
}

export function sortOffers ({key, activeCityOffersList}: SortOffersProps) {
  switch(key) {
    case undefined:
      return activeCityOffersList;
    case 'POPULAR':
      return activeCityOffersList.sort((itemA, itemB) => itemB.rating - itemA.rating);
    case 'PRICE_FIRST_LOW':
      return activeCityOffersList.sort((itemA, itemB) => itemA.price - itemB.price);
    case 'PRICE_FIRST_HIGH':
      return activeCityOffersList.sort((itemA, itemB) => itemB.price - itemA.price);
    default:
      return activeCityOffersList;
  }
}
