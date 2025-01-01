import { capitalizeFirstLetter } from '../../utils/capitalize-first-letter';
import { getPercentFromRating } from '../../utils/percent-from-rating';
import { RoutePath } from '../../../../shared/consts/route-path.ts';
import { NavLink } from 'react-router-dom';

type OffersCardInfo = {
  id: string;
  place: 'main' | 'favorites';
  price: number;
  type: string;
  title: string;
  rating: number;
}

export function OfferCardInfo({ id, place, price, type, title, rating }: OffersCardInfo): JSX.Element {
  const ratingPercent: number = getPercentFromRating(rating);
  return (
    <div className={`place-card__info ${place === 'favorites' && 'favorites__card-info'}`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: ratingPercent }}></span>
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
