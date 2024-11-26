import MainPage from '../pages/main-page/main-page.tsx';
import Header from '../widgets/header/header.tsx';
import {OFFERS_LIST} from '../mock-data/offers.ts';

function App(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <MainPage offersList={OFFERS_LIST} />
    </div>
  );
}

export default App;
