import {OfferType} from '../../../shared/types/types.ts';
import {LocationTabs} from '../../../widgets/location-tabs';
import {MainPageBody} from './main-page-body';
import {MainPageEmpty} from './main-page-empty';

type MainPageProps = {
  offersList: OfferType[];
}

export function MainPage({offersList}: MainPageProps): JSX.Element {
  const isEmptyOffersList: boolean = offersList.length === 0;
  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${isEmptyOffersList ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationTabs/>
        {!isEmptyOffersList
          ? <MainPageBody offersList={offersList}/>
          : <MainPageEmpty/>}
      </main>
    </div>
  );
}
