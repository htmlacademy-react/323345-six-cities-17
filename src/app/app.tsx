import MainPage from '../pages/main-page/main-page.tsx';
import Header from '../widgets/header/header.tsx';
import FavoritesPage from '../pages/favorites-page/favorites-page.tsx';

function App(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      {/*<MainPage />*/}
      <FavoritesPage />
    </div>
  );
}

export default App;
