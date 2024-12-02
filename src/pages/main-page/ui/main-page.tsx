import {LocationTabs} from '../../../widgets/location-tabs';
import {MainPageBody} from './main-page-body';
import {MainPageEmpty} from './main-page-empty';
import OFFERS_LIST from '../../../mock-data/offers.ts';

export function MainPage(): JSX.Element {
  const isEmptyOffersList: boolean = OFFERS_LIST.length === 0;
  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${isEmptyOffersList ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationTabs/>
        {!isEmptyOffersList
          ? <MainPageBody offersList={OFFERS_LIST}/>
          : <MainPageEmpty/>}
      </main>
    </div>
  );
}
