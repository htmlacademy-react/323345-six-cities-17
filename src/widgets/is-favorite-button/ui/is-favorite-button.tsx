import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { selectAuthorizationStatus } from '../../../store/reducer/user/selectors';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { favoriteRequestAction } from '../../../store/reducer/favorite/actions';
import { RoutePath, AuthStatus, FavoriteRequestParams } from '../../../shared/consts';

type IsFavoriteButtonProps = {
  isFavorite: boolean;
  offerId: string;
  place: 'Offer' | 'Card';
}

const CARD_WIDTH = 18;
const CARD_HEIGHT = 19;
const OFFER_WIDTH = 31;
const OFFER_HEIGHT = 33;

function IsFavoriteButton({ isFavorite, offerId, place }: IsFavoriteButtonProps) {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const width = (place === 'Card') ? CARD_WIDTH : OFFER_WIDTH;
  const height = (place === 'Card') ? CARD_HEIGHT : OFFER_HEIGHT;

  const toFavoriteToggleHadler = () => {
    if (authorizationStatus !== AuthStatus.Auth) {
      toast.warn('You are not authorized, please authorize for this action');
      navigate(RoutePath.LOGIN);
      return;
    }
    if (offerId) {
      dispatch(
        favoriteRequestAction({
          offerId,
          requestParams: isFavorite
            ? FavoriteRequestParams.DEL
            : FavoriteRequestParams.ADD
        }));
    }
  };

  return (
    <button className={classNames(
      'button',
      {
        'offer__bookmark-button--active': isFavorite && place === 'Offer',
        'offer__bookmark-button': place === 'Offer',
        'place-card__bookmark-button': place === 'Card',
        'place-card__bookmark-button--active': isFavorite && place === 'Card'
      })} type="button" onClick={toFavoriteToggleHadler}
    >
      <svg className={place === 'Offer' ? 'offer__bookmark-icon' : 'place-card__bookmark-icon'} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );

}

export default IsFavoriteButton;

