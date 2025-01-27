import { sortKeys } from '../../consts/sort-keys';
import { OfferType } from '../../types';

type SortOffersProps = {
  currentSortType: string;
  activeCityOffersList: OfferType[];
};

export function sortOffers({
  currentSortType,
  activeCityOffersList,
}: SortOffersProps) {
  const sortedList: OfferType[] = [...activeCityOffersList];
  switch (currentSortType) {
    case sortKeys.TOP_RATED_FIRST:
      return sortedList.sort((itemA, itemB) => itemB.rating - itemA.rating);
    case sortKeys.PRICE_FIRST_LOW:
      return sortedList.sort((itemA, itemB) => itemA.price - itemB.price);
    case sortKeys.PRICE_FIRST_HIGH:
      return sortedList.sort((itemA, itemB) => itemB.price - itemA.price);
    default:
      return activeCityOffersList;
  }
}
