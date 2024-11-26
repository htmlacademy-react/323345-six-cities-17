import Footer from '../../widgets/footer/footer.tsx';
import FavoritesList from './components/favorites-list.tsx';
import FAVORITES_LIST from '../../mock-data/favorites.ts';

function FavoritesPage(): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoritesList favoritesList={FAVORITES_LIST}/>
          </ul>
        </section>
      </div>
      <Footer/>
    </main>
  );
}

export default FavoritesPage;
