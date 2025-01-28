import { useState } from 'react';

import { useAppSelector } from '../../../../shared/hooks/use-app-selector';
import { selectActiveOffer } from '../../../../store/reducer/offers/selectors';
import { selectActiveCity } from '../../../../store/reducer/city/selectors';
import MainPageOffersList from './main-page-offers-list';
import CityMap from '../../../../widgets/city-map/ui/city-map';
import SortBy from '../../../../widgets/sort-by/ui/sort-by';
import type { OfferType } from '../../../../shared/types';
import { SortKeys } from '../../../../shared/consts';
import { sortOffers } from '../../../../shared/utils/sort-offers';

type mainPageBodyProps = {
  activeCityOffersList: OfferType[];
};

function MainPageBody({
  activeCityOffersList,
}: mainPageBodyProps): JSX.Element {
  const activeOffer = useAppSelector(selectActiveOffer);
  const activeCity = useAppSelector(selectActiveCity);
  const [currentSortType, setCurrentSortType] = useState<SortKeys>(SortKeys.POPULAR);
  const sortedOffersListHandler = (current: SortKeys): void => setCurrentSortType(current);
  const sortedOffers = sortOffers({ currentSortType, activeCityOffersList });

  return (
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
  );
}

export default MainPageBody;
