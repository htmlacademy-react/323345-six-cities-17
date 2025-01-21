import { useAppSelector } from '../../../shared/hooks/use-app-selector.ts';
import { selectLoadFavoriteOffers } from '../../../store/reducer/favorite/selectors/select-load-favorite-offers.ts';
import { FavoritesList } from './components/favorites-list.tsx';
import { FavoritesEmptyPage } from './favorites-empty-page.tsx';


export function FavoritesPage(): JSX.Element {
  const favoritesList = useAppSelector(selectLoadFavoriteOffers);
  return (favoritesList.length > 0) ? (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {<FavoritesList favoritesList={favoritesList} />}
          </ul>
        </section>
      </div>
    </main>
  )
    : <FavoritesEmptyPage />;
}
