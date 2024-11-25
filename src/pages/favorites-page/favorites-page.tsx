import Footer from '../../widgets/footer/footer.tsx';
import FavoritesList from './components/favorites-list.tsx';
import simulationFavoritesList from '../../shared/utils/simulationFavoritesList.ts';

function FavoritesPage(): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <FavoritesList favoritesList={simulationFavoritesList} />
      </div>
      <Footer />
    </main>
  );
}

export default FavoritesPage;
