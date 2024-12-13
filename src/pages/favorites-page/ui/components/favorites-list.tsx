import {offerByCity, OfferType} from '../../../../shared/types/types';
import {OfferCard} from '../../../../widgets/offer-card';

type FavoritesListProps = {
  favoritesList: OfferType[];
}

export function FavoritesList({favoritesList}: FavoritesListProps): JSX.Element[] {
  const groupedList: object = Object.groupBy(favoritesList, ((item: OfferType) => item.city.name));
  const favoritesListByCities: offerByCity[] = Object.entries(groupedList);
  return favoritesListByCities.map((group: offerByCity): JSX.Element => (
    <li className="favorites__locations-items" key={`group-${group[0]}}`}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{group[0]}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {group[1].map((favorite: OfferType): JSX.Element => (
          <OfferCard
            key={`favorite-${favorite.id}`}
            id={favorite.id}
            place="favorites"
            isPremium={favorite.isPremium}
            price={favorite.price}
            previewImage={favorite.previewImage}
            type={favorite.type}
            title={favorite.title}
            rating={favorite.rating}
          />))}
      </div>
    </li>));
}


