import { OfferCardMark } from './components/offer-card-mark';
import { OfferCardImg } from './components/offer-card-img';
import { OfferCardInfo } from './components/offer-card-info';

type CardProps = {
  place: string;
  isPremium: boolean;
  price: number;
  previewImage: string;
  type: string;
  title: string;
  rating: number;
}

export function OfferCard({place, isPremium, price, previewImage, type, title, rating}: CardProps): JSX.Element {
  return (
    <article
      className={`place-card ${place === 'main' ? 'cities__card' : place === 'favorites' && 'favorites__card'}`}
    >
      {isPremium ? <OfferCardMark/> : null}
      <OfferCardImg place={place} previewImage={previewImage}/>
      <OfferCardInfo place={place} price={price} type={type} title={title} rating={rating}/>
    </article>
  );
}

