import { OfferCardMark } from './components/offer-card-mark';
import { OfferCardImg } from './components/offer-card-img';
import { OfferCardInfo } from './components/offer-card-info';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { changeActiveOffer } from '../../../store/reducer/offers/offers-slice';
import { fetchCurrentOfferAction } from '../../../store/action/async-action';

type CardProps = {
  id: string;
  place: 'main' | 'favorites';
  isFavorite: boolean;
  isPremium: boolean;
  price: number;
  previewImage: string;
  type: string;
  title: string;
  rating: number;
};

export function OfferCard({
  id,
  place,
  isFavorite,
  isPremium,
  price,
  previewImage,
  type,
  title,
  rating,
}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const choseOffer = (offerId: string | undefined) => {
    offerId && dispatch(changeActiveOffer(offerId));
  };
  return (
    <article
      className={`place-card ${place === 'main'
        ? 'cities__card'
        : place === 'favorites' && 'favorites__card'
        }`}
      onMouseEnter={() => choseOffer(id)}
      onMouseOut={() => choseOffer(undefined)}
    >
      {isPremium ? <OfferCardMark /> : null}
      <OfferCardImg id={id} place={place} previewImage={previewImage} />
      <OfferCardInfo
        id={id}
        place={place}
        isFavorite={isFavorite}
        price={price}
        type={type}
        title={title}
        rating={rating}
      />
    </article>
  );
}
