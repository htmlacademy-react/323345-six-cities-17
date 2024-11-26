import LocationTabs from '../../widgets/location-tabs/location-tabs.tsx';
import MainPageBody from './components/main-page-body.tsx';
import MainPageEmpty from './components/main-page-empty.tsx';
import OFFERS_LIST from '../../mock-data/offers.ts';

function MainPage(): JSX.Element {
  const isEmptyOffersList:boolean = OFFERS_LIST.length === 0;
  return (
    <main className={`page__main page__main--index ${isEmptyOffersList ? 'page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <LocationTabs />
      {!isEmptyOffersList
        ? <MainPageBody offersList = {OFFERS_LIST} />
        : <MainPageEmpty />}
    </main>
  );
}

export default MainPage;
