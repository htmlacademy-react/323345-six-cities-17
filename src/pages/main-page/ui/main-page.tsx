import { OfferType } from '../../../shared/types/types.ts';
import { LocationTabs } from '../../../widgets/location-tabs';
import { MainPageBody } from './main-page-body';
import { MainPageEmpty } from './main-page-empty';
import { UseAppSelector } from '../../../shared/hooks/use-app-selector.ts';

type MainPageProps = {
  offersList: OfferType[];
};

export function MainPage({ offersList }: MainPageProps): JSX.Element {
  const activeCity = UseAppSelector((state) => state.activeCity);
  const activeCityOffersList = offersList.filter(
    (offer) => offer.city.name === activeCity
  );
  const isEmptyOffersList: boolean = activeCityOffersList.length === 0;
  return (
    <div className="page page--gray page--main">
      <main
        className={`page__main page__main--index ${
          isEmptyOffersList ? 'page__main--index-empty' : ''
        }`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <LocationTabs
          activeCity={activeCity}
        />
        {!isEmptyOffersList ? (
          <MainPageBody
            activeCityOffersList={activeCityOffersList}
            activeCity={activeCity}
          />
        ) : (
          <MainPageEmpty />
        )}
      </main>
    </div>
  );
}
