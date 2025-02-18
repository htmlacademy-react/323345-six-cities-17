import { OfferCard } from '../../../../widgets/offer-card';
import { CityNameType, offerByCityType, OfferType } from '../../../../shared/types';
import { appStore } from '../../../../store';
import { changeActiveCity } from '../../../../store/reducer/city';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../../../shared/consts';

type FavoritesListProps = {
  favoritesList: OfferType[];
}

function FavoritesList({ favoritesList }: FavoritesListProps): JSX.Element[] {
  const groupedList: object = Object.groupBy(favoritesList, ((item: OfferType) => item.city.name));
  const favoritesListByCities: offerByCityType[] = Object.entries(groupedList);
  const redirectHandle = (name: string) => {
    const isCityNameType = (city: string): city is CityNameType => (
      ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'].includes(city)
    );
    return isCityNameType(name) && appStore.dispatch(changeActiveCity(name));
  };

  return favoritesListByCities.map((group: offerByCityType): JSX.Element => (
    <li className="favorites__locations-items" key={`group-${group[0]}}`}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">

          <Link className="locations__item-link" to={RoutePath.MAIN} onClick={() => redirectHandle(group[0])}><span>{group[0]}</span></Link>

        </div>
      </div>
      <div className="favorites__places">
        {group[1].map((favorite: OfferType): JSX.Element => (
          <OfferCard
            key={`favorite-${favorite.id}`}
            id={favorite.id}
            place="favorites"
            isFavorite={favorite.isFavorite}
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

export default FavoritesList;
