import MainPage from '../../pages/main-page/main-page.tsx';
import Header from '../UI/header/header.tsx';
import { offerCount } from '../../const.ts';

function App(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <MainPage offerCount={offerCount} />
    </div>
  );
}

export default App;
