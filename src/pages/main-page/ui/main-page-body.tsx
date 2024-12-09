import {useState} from 'react';
import type {OfferType} from '../../../shared/types/types';
import MainPageOffersList from './main-page-offers-list';

type mainPageBodyProps = {
  offersList: OfferType[];
}

export function MainPageBody({offersList}: mainPageBodyProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<null | string>(null);
  const isActiveOffer: (id: string | null) => void = (id: string | null): void => setActiveOffer(id);
  console.log('Active card id -', activeOffer);
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">312 places to stay in Amsterdam</b>
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
          {offersList.length > 0 && <MainPageOffersList offersList={offersList} isActiveOffer={isActiveOffer}/>}
        </section>
        <div className="cities__right-section">
          <section className="cities__map map"></section>
          {/*<OffersMap offersList={offersList} activeOfferId={activeOffer}/>*/}
        </div>
      </div>
    </div>
  );
}
