import { Navigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../shared/consts/route-path';
import { OfferType } from '../../../shared/types';
import { getOfferById } from '../../../shared/get-offer-by-id/ui/get-offer-by-id';
import { capitalizeFirstLetter } from '../../../widgets/offer-card/utils/capitalize-first-letter';
import { CityMap } from '../../../widgets/city-map/index';
import { CommentsList } from '../../../widgets/comments-list';
import { OfferCard } from '../../../widgets/offer-card/index';
import './offer-card-wrapper.css';
import { getPercentFromRating } from '../../../widgets/offer-card/utils/percent-from-rating';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { loadOffersSelector } from '../../../store/selectors/load-offers-selector';
import { nearPointsSelector } from '../../../store/selectors/near-points-selector';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { useEffect } from 'react';
import { fetchNearPointsAction } from '../../../store/action/async-action';

export function OfferPage(): JSX.Element {
  const { offerId } = useParams<{ offerId: string }>();
  const offersList = useAppSelector(loadOffersSelector);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNearPointsAction(offerId!));
  }, [dispatch, offerId]);
  const nearPoints = useAppSelector(nearPointsSelector).slice(0, 3);

  const offer: OfferType | undefined = getOfferById({
    offerId,
    offersList,
  });

  if (!offer) {
    return <Navigate to={RoutePath.NOT_FOUND} replace />;
  }

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="/img/room.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="/img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="/img/apartment-02.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="/img/apartment-03.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="/img/studio-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="/img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer?.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer?.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${getPercentFromRating(offer.rating)}%` }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer !== undefined && capitalizeFirstLetter(offer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                  <li className="offer__inside-item">Baby seat</li>
                  <li className="offer__inside-item">Kitchen</li>
                  <li className="offer__inside-item">Dishwasher</li>
                  <li className="offer__inside-item">Cabel TV</li>
                  <li className="offer__inside-item">Fridge</li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="/img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between
                    Rembrandt Square and National Opera, but where the bustle of
                    the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              {offerId && <CommentsList offer={offer} offerId={offerId} />}
            </div>
          </div>

          <CityMap
            city={offer.city.name}
            points={nearPoints}
            selectedPoint={offerId}
            offerPage={offer}
          />
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
  );
}
