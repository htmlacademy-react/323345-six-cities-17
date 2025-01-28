import { NavLink } from 'react-router-dom';
import { RoutePath } from '../../../../shared/consts';

type OffersCardProps = {
  id: string;
  place: 'main' | 'favorites';
  previewImage: string;
}

const MAIN_PAGE_WIDTH = '260';
const MAIN_PAGE_HEIGHT = '200';
const FAVORITE_PAGE_WIDTH = '150';
const FAVORITE_PAGE_HEIGHT = '110';

function OfferCardImg({ id, place, previewImage }: OffersCardProps): JSX.Element {
  return (
    <div
      className={`place-card__image-wrapper ${place === 'main' ? 'cities__image-wrapper' : place === 'favorites' && 'favorites__image-wrapper'}`}
    >
      <NavLink to={RoutePath.OFFER.replace(':offerId', id)} tabIndex={0}>
        <img
          className="place-card__image"
          src={previewImage}
          width={`${place === 'main' ? MAIN_PAGE_WIDTH : place === 'favorites' && FAVORITE_PAGE_WIDTH}`}
          height={`${place === 'main' ? MAIN_PAGE_HEIGHT : place === 'favorites' && FAVORITE_PAGE_HEIGHT}`}
          alt="Place image"
        />
      </NavLink>
    </div>
  );
}

export default OfferCardImg;


