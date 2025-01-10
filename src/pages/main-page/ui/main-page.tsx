import { LocationTabs } from '../../../widgets/location-tabs';
import { MainPageBody } from './components/main-page-body.tsx';
import { MainPageEmpty } from './main-page-empty';
import { useAppSelector } from '../../../shared/hooks/use-app-selector.ts';
import { activeCitySelector } from '../../../store/selectors/active-city-selector.ts';
import { Loader } from '../../../shared/loader/loader.tsx';
import { isLoadingSelector } from '../../../store/selectors/is-loading-selector.ts';
import { loadOffersSelector } from '../../../store/selectors/load-offers-selector.ts';

export function MainPage(): JSX.Element {
  const offersList = useAppSelector(loadOffersSelector);
  const activeCity = useAppSelector(activeCitySelector);
  const activeCityOffersList = offersList.filter(
    (offer) => offer.city.name === activeCity
  );
  const isLoading: boolean = useAppSelector(isLoadingSelector);
  const isEmptyOffersList: boolean = activeCityOffersList.length === 0;
  return (
    <div className="page page--gray page--main">
      <main
        className={`page__main page__main--index ${isEmptyOffersList ? 'page__main--index-empty' : ''}`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <LocationTabs
          activeCity={activeCity}
        />
        {
          (!isEmptyOffersList && !isLoading) &&
          <MainPageBody
            activeCityOffersList={activeCityOffersList}
            activeCity={activeCity}
          />
        }
        {
          isLoading && <Loader />
        }
        {
          (isEmptyOffersList && !isLoading) && <MainPageEmpty />
        }
      </main>
    </div>
  );
}
