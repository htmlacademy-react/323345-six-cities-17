import MainPage from '../pages/main-page/main-page.tsx';
import Header from '../widgets/header/header.tsx';
import simulationOffersList from '../shared/utils/simulationOffersList.ts';

function App(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <MainPage offersList={simulationOffersList} />
    </div>
  );
}

export default App;
