import type {OfferType} from '../../shared/types/types.ts';

import LocationTabs from '../../widgets/location-tabs/location-tabs.tsx';
import MainPageBody from './components/main-page-body.tsx';
import MainPageEmpty from './components/main-page-empty.tsx';

type mainPageProps = {
  offersList: OfferType[];
};

function MainPage({ offersList }: mainPageProps): JSX.Element {
  return (
    <main className={`page__main page__main--index ${offersList.length === 0 ? 'page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <LocationTabs />
      {offersList.length > 0
        ? <MainPageBody offersList = {offersList} />
        : <MainPageEmpty />}
    </main>
  );
}

export default MainPage;
