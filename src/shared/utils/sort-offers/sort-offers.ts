import { SortKeys } from '../../consts/sort-keys';
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
    case SortKeys.TOP_RATED_FIRST:
      return sortedList.sort((itemA, itemB) => itemB.rating - itemA.rating);
    case SortKeys.PRICE_FIRST_LOW:
      return sortedList.sort((itemA, itemB) => itemA.price - itemB.price);
    case SortKeys.PRICE_FIRST_HIGH:
      return sortedList.sort((itemA, itemB) => itemB.price - itemA.price);
    default:
      return activeCityOffersList;
  }
}
