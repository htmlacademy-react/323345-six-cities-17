import type {OfferType} from '../../../shared/types/types';
import {OfferCard} from '../../../widgets/offer-card';

type MainPageOffersListProps = {
  offersList: OfferType[];
}

function MainPageOffersList({offersList}: MainPageOffersListProps) {
  // const [activeOffers, setActiveOffers] = useState([offersList[0].id]);
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
        />
      ))}
    </div>
  );
}

export default MainPageOffersList;
