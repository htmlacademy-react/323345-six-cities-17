import { OfferCardMark } from './components/offer-card-mark';
import { OfferCardImg } from './components/offer-card-img';
import { OfferCardInfo } from './components/offer-card-info';

type CardProps = {
  id: string;
  place: 'main' | 'favorites';
  isPremium: boolean;
  price: number;
  previewImage: string;
  type: string;
  title: string;
  rating: number;
  onHandlerActiveOffer?: (id: string | undefined) => void;
};

export function OfferCard({
  id,
  place,
  isPremium,
  price,
  previewImage,
  type,
  title,
  rating,
  onHandlerActiveOffer,
}: CardProps): JSX.Element {
  return (
    <article
      className={`place-card ${
        place === 'main'
          ? 'cities__card'
          : place === 'favorites' && 'favorites__card'
      }`}
      onMouseOver={() => onHandlerActiveOffer && onHandlerActiveOffer(id)}
      onMouseOut={() => onHandlerActiveOffer && onHandlerActiveOffer(undefined)}
    >
      {isPremium ? <OfferCardMark /> : null}
      <OfferCardImg id={id} place={place} previewImage={previewImage} />
      <OfferCardInfo
        id={id}
        place={place}
        price={price}
        type={type}
        title={title}
        rating={rating}
      />
    </article>
  );
}
