import {FavoritesList} from './components/favorites-list.tsx';
import {OfferType} from '../../../shared/types/types.ts';

type FavoritesPageProps = {
  favoritesList: OfferType[];
}

export function FavoritesPage({favoritesList}: FavoritesPageProps): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoritesList favoritesList={favoritesList}/>
          </ul>
        </section>
      </div>
    </main>
  );
}
