import LocationTabs from '../../widgets/location-tabs/location-tabs.tsx';
import MainPageBody from './components/main-page-body.tsx';
import MainPageEmpty from './components/main-page-empty.tsx';
import Header from '../../widgets/header/header.tsx';
import OFFERS_LIST from '../../mock-data/offers.ts';
import LoginPage from '../login-page/login-page.tsx';

type MainPageProps = {
  isAuthenticated: boolean;
}

function MainPage({ isAuthenticated }: MainPageProps): JSX.Element {
  const isEmptyOffersList:boolean = OFFERS_LIST.length === 0;
  return isAuthenticated
    ? (
      <div className="page page--gray page--main">
        <Header isLoginPage={false} isAuthenticated={isAuthenticated}/>
        <main className={`page__main page__main--index ${isEmptyOffersList ? 'page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <LocationTabs/>
          {!isEmptyOffersList
            ? <MainPageBody offersList={OFFERS_LIST}/>
            : <MainPageEmpty/>}
        </main>
      </div>
    )
    : <LoginPage />;
}

export default MainPage;
