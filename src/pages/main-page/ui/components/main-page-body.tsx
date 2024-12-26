import type { CityNameType, OfferType } from '../../../../shared/types';
import MainPageOffersList from './main-page-offers-list';
import { CityMap } from '../../../../widgets/city-map/ui/city-map';
import { useAppSelector } from '../../../../shared/hooks/use-app-selector';
import { SortBy } from '../../../../widgets/sort-by/ui/sort-by';
import { sortOffers } from '../../../../features/sort-offers/sort-offers';
import { activeOfferSelector } from '../../../../store/selectors/acctive-offer-selector';
import { useState } from 'react';
import { sortKeys } from '../../../../shared/consts/sort-keys';

type mainPageBodyProps = {
  activeCityOffersList: OfferType[];
  activeCity: CityNameType;
};

export function MainPageBody({
  activeCityOffersList,
  activeCity,
}: mainPageBodyProps): JSX.Element {
  const activeOffer = useAppSelector(activeOfferSelector);
  const [currentSortType, setCurrentSortType] = useState<sortKeys>(sortKeys.POPULAR);
  const sortedOffersListHandler = (current: sortKeys): void => {
    setCurrentSortType(current);
  };
  const sortedOffers = sortOffers({ currentSortType, activeCityOffersList });
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {activeCityOffersList.length} places to stay in {activeCity}
          </b>
          <SortBy onSortedOffersListHandler={sortedOffersListHandler} currentSortType={currentSortType} />
          <MainPageOffersList
            activeCityOffersList={sortedOffers}
          />
        </section>
        <div className="cities__right-section">
          <CityMap
            city={activeCity}
            points={activeCityOffersList}
            selectedPoint={activeOffer}
            offerPage={false}
          />
        </div>
      </div>
    </div>
  );
}
