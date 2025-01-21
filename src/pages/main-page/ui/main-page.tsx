import { useAppSelector } from '../../../shared/hooks/use-app-selector.ts';
import { selectLoadOffers } from '../../../store/reducer/offers/selectors/select-load-offers.ts';
import { selectOffersIsLoading } from '../../../store/reducer/offers/selectors/select-offers-is-loading.ts';
import { selectActiveCity } from '../../../store/reducer/city/selectors/select-active-city.ts';
import { MainPageBody } from './components/main-page-body.tsx';
import { MainPageEmpty } from './main-page-empty';
import LocationTabs from '../../../widgets/location-tabs';
import { Loader } from '../../../shared/ui/loader/loader.tsx';

export function MainPage(): JSX.Element {
  const offersList = useAppSelector(selectLoadOffers);
  const activeCity = useAppSelector(selectActiveCity);
  const activeCityOffersList = offersList.filter(
    (offer) => offer.city.name === activeCity
  );
  const isLoading: boolean = useAppSelector(selectOffersIsLoading);
  const isEmptyOffersList: boolean = activeCityOffersList.length === 0;

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${isEmptyOffersList ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationTabs />
        <div className="cities">
          {
            isEmptyOffersList
              ? <MainPageEmpty />
              : <MainPageBody activeCityOffersList={activeCityOffersList} />
          }
        </div>
      </main>
    </div>
  );
}
