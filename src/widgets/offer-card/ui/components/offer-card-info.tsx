import { NavLink } from 'react-router-dom';

import { RoutePath } from '../../../../shared/consts/route-path.ts';
import { getPercentFromRating } from '../../../../shared/utils/percent-from-rating/percent-from-rating.ts';
import { capitalizeFirstLetter } from '../../../../shared/utils/capitalize-first-letter/capitalize-first-letter.ts';
import IsFavoriteButton from '../../../is-favorite-button/index.ts';


type OffersCardInfo = {
  id: string;
  place: 'main' | 'favorites';
  isFavorite: boolean;
  price: number;
  type: string;
  title: string;
  rating: number;
}

function OfferCardInfo({ id, place, isFavorite, price, type, title, rating }: OffersCardInfo): JSX.Element {
  const ratingPercent: number = getPercentFromRating(rating);
  const integerStarCount = `${Math.round(ratingPercent / 20) * 20}%`;

  return (
    <div className={`place-card__info ${place === 'favorites' && 'favorites__card-info'}`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        {<IsFavoriteButton offerId={id} isFavorite={isFavorite} place={'Card'} />}
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: integerStarCount }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <NavLink to={RoutePath.OFFER.replace(':offerId', id)} tabIndex={0}>
          {title}
        </NavLink>
      </h2>
      <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
    </div>
  );
}

export default OfferCardInfo;
