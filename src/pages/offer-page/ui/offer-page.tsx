import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import './offer-card-wrapper.css';
import { CurrentOfferType } from '../../../shared/types';
import { RoutePath } from '../../../shared/consts/route-path';
import { capitalizeFirstLetter } from '../../../widgets/offer-card/utils/capitalize-first-letter';
import { getPercentFromRating } from '../../../widgets/offer-card/utils/percent-from-rating';
import { CityMap } from '../../../widgets/city-map/index';
import { CommentsList } from '../../../widgets/comments-list';
import { OfferCard } from '../../../widgets/offer-card/index';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { fetchCurrentOfferAction, fetchNearPointsAction, removeFromFavoriteAction, sendToFavoriteAction } from '../../../store/action/async-action';
import { selectNearPoints } from '../../../store/reducer/offers/selectors/select-near-points';
import { selectCurrentOffer } from '../../../store/reducer/offers/selectors/select-current-offer';
import { selectAuthorizationStatus } from '../../../store/reducer/user/selectors/select-authorization-status';
import { Loader } from '../../../shared/loader/loader';
import { AuthStatus } from '../../../shared/consts/auth-status';
import { toast } from 'react-toastify';

export function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { offerId } = useParams();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  let currentOffer: CurrentOfferType | undefined = useAppSelector(selectCurrentOffer);
  const nearPoints = useAppSelector(selectNearPoints).slice(0, 3);
  const [loaderVisible, setLoaderVisible] = useState(true);

  const navigate = useNavigate();

  const toFavoriteToggleHadler = () => {
    if (authorizationStatus !== AuthStatus.Auth) {
      toast.warn('You are not authorized, please authorize for this action');
      navigate(RoutePath.LOGIN);
      return;
    }
    if (currentOffer && currentOffer.isFavorite) {
      offerId && dispatch(removeFromFavoriteAction(offerId));
    } else {
      offerId && dispatch(sendToFavoriteAction(offerId));
    }
  }

  useEffect(() => {
    (async () => {
      if (offerId) {
        await dispatch(fetchCurrentOfferAction(offerId));
        await dispatch(fetchNearPointsAction(offerId));
        setLoaderVisible(false);
      }
    })();
  }, [dispatch, offerId]);


  if (!currentOffer && !loaderVisible) {
    return <Navigate to={RoutePath.NOT_FOUND} />;
  }
  if (loaderVisible) {
    return <Loader />
  }

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer?.images.map((image: string) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo ${currentOffer?.type}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer?.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer?.title}</h1>
                <button className="offer__bookmark-button button" type="button" onClick={toFavoriteToggleHadler}>
                  <svg className={classNames('offer__bookmark-icon', { 'offer__bookmark-icon--checked': currentOffer?.isFavorite })} width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${getPercentFromRating(currentOffer?.rating)}%` }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer?.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer && capitalizeFirstLetter(currentOffer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${currentOffer?.bedrooms} Bedrooms`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${currentOffer?.bedrooms} adults`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    currentOffer?.goods.map((good) => (
                      <li className="offer__inside-item" key={good}>{good}</li>
                    ))
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer?.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer?.host.name}</span>
                  {currentOffer?.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer?.description}</p>
                </div>
              </div>
              {offerId && <CommentsList offerId={offerId} />}
            </div>
          </div>

          {currentOffer && <CityMap
            city={currentOffer.city.name}
            points={nearPoints}
            selectedPoint={offerId}
            offerPage={currentOffer}
          />}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="offer__card-wrapper">
              {nearPoints.map((nearOffer) => (
                <OfferCard
                  key={nearOffer.id}
                  id={nearOffer.id}
                  place='main'
                  isFavorite={nearOffer.isFavorite}
                  isPremium={nearOffer.isPremium}
                  price={nearOffer.price}
                  previewImage={nearOffer.previewImage}
                  type={nearOffer.type}
                  title={nearOffer.title}
                  rating={nearOffer.rating}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
