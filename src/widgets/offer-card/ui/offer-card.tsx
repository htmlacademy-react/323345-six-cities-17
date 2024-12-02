import {OfferCardMark} from './components/offer-card-mark';
import {OfferCardImg} from './components/offer-card-img';
import {OfferCardInfo} from './components/offer-card-info';
import {NavLink} from 'react-router-dom';
import {RoutePath} from '../../../shared/consts/route-path.ts';

type CardProps = {
  id: string;
  place: string;
  isPremium: boolean;
  price: number;
  previewImage: string;
  type: string;
  title: string;
  rating: number;
}

export function OfferCard({id, place, isPremium, price, previewImage, type, title, rating}: CardProps): JSX.Element {
  return (
    <article
      className={`place-card ${place === 'main' ? 'cities__card' : place === 'favorites' && 'favorites__card'}`}
    >
      <NavLink tabIndex={0} to={`${RoutePath.OFFER}#${id}`}>
        {isPremium ? <OfferCardMark/> : null}
        <OfferCardImg place={place} previewImage={previewImage}/>
        <OfferCardInfo place={place} price={price} type={type} title={title} rating={rating}/>
      </NavLink>
    </article>
  );
}

