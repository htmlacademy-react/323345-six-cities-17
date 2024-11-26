import type {OfferType} from '../../../shared/types/types.ts';
import OfferCard from '../../../widgets/offer-card/offer-card.tsx';

type FavoritesListProps = {
  favoritesList: OfferType[];
}

function FavoritesList({favoritesList}: FavoritesListProps) {
  const citiesName = new Set(favoritesList.map((favorite:OfferType):string => favorite.city.name));
  const citiesNameList:string[] = Array.from(citiesName);
  const groupedList:OfferType[][] = citiesNameList.map((cityName: string):OfferType[] => favoritesList.filter((city:OfferType) => city.city.name === cityName));
  return groupedList.map((group: OfferType[], index: number):JSX.Element => (
    <li className="favorites__locations-items" key={`group-${group[index].id}`}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{group[index].city.name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {group.map((favorite:OfferType):JSX.Element=> (
          <OfferCard
            key={`favorite-${favorite.id}`}
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

export default FavoritesList;
