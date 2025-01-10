import { FavoritesList } from './components/favorites-list.tsx';
import { loadFavoriteOffersSelector } from '../../../store/selectors/load-favorite-offers-selector.ts';
import { useAppSelector } from '../../../shared/hooks/use-app-selector.ts';


export function FavoritesPage(): JSX.Element {
  const favoritesList = useAppSelector(loadFavoriteOffersSelector);
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {favoritesList.length > 0 ? <FavoritesList favoritesList={favoritesList} /> :
              <h2
                style={
                  {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                }
              >Вы пока ничего не добавили
              </h2>}
          </ul>
        </section>
      </div>
    </main>
  );
}
