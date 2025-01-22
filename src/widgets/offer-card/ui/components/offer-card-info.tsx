import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { RoutePath } from '../../../../shared/consts/route-path.ts';
import { useAppSelector } from '../../../../shared/hooks/use-app-selector.ts';
import { useAppDispatch } from '../../../../shared/hooks/use-app-dispatch.ts';
import { selectAuthorizationStatus } from '../../../../store/reducer/user/selectors/select-authorization-status.ts';
import { getPercentFromRating } from '../../../../shared/utils/percent-from-rating/percent-from-rating.ts';
import { capitalizeFirstLetter } from '../../../../shared/utils/capitalize-first-letter/capitalize-first-letter.ts';
import { AuthStatus } from '../../../../shared/consts/auth-status.ts';
import { favoriteRequestParams } from '../../../../shared/consts/favorite-request-params.ts';
import { favoriteRequestAction } from '../../../../store/reducer/favorite/actions/favorite-slice-actions.ts';


type OffersCardInfo = {
  id: string;
  place: 'main' | 'favorites';
  isFavorite: boolean;
  price: number;
  type: string;
  title: string;
  rating: number;
}

export function OfferCardInfo({ id, place, isFavorite, price, type, title, rating }: OffersCardInfo): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ratingPercent: number = getPercentFromRating(rating);
  const toFavoriteToggleHadler = () => {
    if (authorizationStatus !== AuthStatus.Auth) {
      toast.warn('You are not authorized, please authorize for this action');
      navigate(RoutePath.LOGIN);
      return;
    }
    if (isFavorite) {
      dispatch(favoriteRequestAction({ offerId: id, requestParams: favoriteRequestParams.DEL }));
    } else {
      dispatch(favoriteRequestAction({ offerId: id, requestParams: favoriteRequestParams.ADD }));
    }
  };

  return (
    <div className={`place-card__info ${place === 'favorites' && 'favorites__card-info'}`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={classNames('place-card__bookmark-button button', { 'place-card__bookmark-button--active': isFavorite })} type="button" onClick={toFavoriteToggleHadler}>
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
