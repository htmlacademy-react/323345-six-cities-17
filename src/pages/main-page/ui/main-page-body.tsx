import type { CityNameType, OfferType } from '../../../shared/types/types';
import MainPageOffersList from './main-page-offers-list';
import { CityMap } from '../../../widgets/city-map/ui/city-map';
import { UseAppSelector } from '../../../shared/hooks/use-app-selector';

type mainPageBodyProps = {
  activeCityOffersList: OfferType[];
  activeCity: CityNameType;
};

export function MainPageBody({
  activeCityOffersList,
  activeCity,
}: mainPageBodyProps): JSX.Element {
  const activeOffer = UseAppSelector((state)=> state.activeOffer);
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
