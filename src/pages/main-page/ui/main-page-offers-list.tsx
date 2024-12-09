import type {OfferType} from '../../../shared/types/types';
import {OfferCard} from '../../../widgets/offer-card';

type MainPageOffersListProps = {
  offersList: OfferType[];
  isActiveOffer?: (id: string | null) => void;
}

function MainPageOffersList({offersList, isActiveOffer}: MainPageOffersListProps) {
  // const [activeOffer, setActiveOffer] = useState<null | string>(null);
  // const isActiveOffer: (id: string | null) => void = (id: string | null): void => setActiveOffer(id);
  // eslint-disable-next-line no-console

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList.map((offer: OfferType) => (
        <OfferCard
          key={offer.id}
          id={offer.id}
          place="main"
          isPremium={offer.isPremium}
          price={offer.price}
          previewImage={offer.previewImage}
          type={offer.type}
          title={offer.title}
          rating={offer.rating}
          onHandlerActiveOffer={isActiveOffer}
        />
      ))}
    </div>
  );
}

export default MainPageOffersList;
