import {NavLink} from 'react-router-dom';
import {RoutePath} from '../../../../shared/consts/route-path.ts';

type OffersCardProps = {
  id: string;
  place: string;
  previewImage: string;
}

export function OfferCardImg({id, place, previewImage}: OffersCardProps): JSX.Element {
  return (
    <div
      className={`place-card__image-wrapper ${place === 'main' ? 'cities__image-wrapper' : place === 'favorites' && 'favorites__image-wrapper'}`}
    >
      <NavLink to={RoutePath.OFFER.replace(':offerId', id)} tabIndex={0}>
        <img
          className="place-card__image"
          src={previewImage}
          width={`${place === 'main' ? '260' : place === 'favorites' && '150'}`}
          height={`${place === 'main' ? '200' : place === 'favorites' && '110'}`}
          alt="Place image"
        />
      </NavLink>
    </div>
  );
}
