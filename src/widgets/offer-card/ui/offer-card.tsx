import classNames from 'classnames';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { changeActiveOffer } from '../../../store/reducer/offers';
import { OfferCardMark, OfferCardImg, OfferCardInfo } from './components';

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

function OfferCard({
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
  const activeOfferHandler = (offerId: string | null) => {
    dispatch(changeActiveOffer(offerId));
  };
  return (
    <article
      className={classNames(
        'place-card',
        {
          'cities__card': place === 'main',
          'favorites__card': place === 'favorites'
        }
      )}
      onMouseEnter={() => activeOfferHandler(id)}
      onMouseLeave={() => activeOfferHandler(null)}
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

export default OfferCard;
