import OfferCardMark from './components/offer-card-mark.tsx';
import OfferCardImg from './components/offer-card-img.tsx';
import OfferCardInfo from './components/offer-card-info.tsx';

type CardProps = {
  place: string;
  isPremium: boolean;
  price: number;
  previewImage: string;
  type: string;
  title: string;
  rating: number;
}

function OfferCard({place, isPremium, price, previewImage, type, title, rating}: CardProps): JSX.Element {
  return (
    <article className={`place-card ${place === 'main' ? 'cities__card' : place === 'favorites' && 'favorites__card'}`}>
      {isPremium ? <OfferCardMark /> : null}
      <OfferCardImg place={place} previewImage={previewImage}/>
      <OfferCardInfo place={place} price={price} type={type} title={title} rating={rating}/>
    </article>
  );
}

export default OfferCard;


