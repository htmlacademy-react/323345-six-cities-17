import OfferCardMark from './components/offer-card-mark.tsx';
import OfferCardImg from './components/offer-card-img.tsx';
import OfferCardInfo from './components/offer-card-info.tsx';

type CardProps = {
  place: string;
  premium: boolean;
}

function OfferCard({place, premium}: CardProps): JSX.Element {
  return (
    <article className={`place-card ${place === 'main' ? 'cities__card' : place === 'favorites' && 'favorites__card'}`}>
      {premium ? <OfferCardMark /> : null}
      <OfferCardImg place={place} />
      <OfferCardInfo place={place}/>
    </article>
  );
}

export default OfferCard;
