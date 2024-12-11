import { useState } from 'react';
import type { OfferType } from '../../../shared/types/types';
import MainPageOffersList from './main-page-offers-list';
import { CityMap } from '../../../widgets/map/ui/city-map';

type mainPageBodyProps = {
  activeCityOffersList: OfferType[];
  activeCity: string;
};

export function MainPageBody({
  activeCityOffersList,
  activeCity,
}: mainPageBodyProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<string | undefined>(undefined);
  const isActiveOffer: (id: string | undefined) => void = (
    id: string | undefined
  ): void => setActiveOffer(id);
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {activeCityOffersList.length} places to stay in {activeCity}
          </b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li
                className="places__option places__option--active"
                tabIndex={0}
              >
                Popular
              </li>
              <li className="places__option" tabIndex={0}>
                Price: low to high
              </li>
              <li className="places__option" tabIndex={0}>
                Price: high to low
              </li>
              <li className="places__option" tabIndex={0}>
                Top rated first
              </li>
            </ul>
          </form>
          <MainPageOffersList
            activeCityOffersList={activeCityOffersList}
            isActiveOffer={isActiveOffer}
          />
        </section>
        <div className="cities__right-section">
          {/* <section className="cities__map map"></section> */}
          <CityMap
            city={activeCity}
            points={activeCityOffersList}
            selectedPoint={activeOffer}
          />
        </div>
      </div>
    </div>
  );
}
