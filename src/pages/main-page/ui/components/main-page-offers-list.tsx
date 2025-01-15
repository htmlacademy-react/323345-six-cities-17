import type { OfferType } from '../../../../shared/types';
import { OfferCard } from '../../../../widgets/offer-card';

type MainPageOffersListProps = {
  activeCityOffersList: OfferType[];
};

function MainPageOffersList({
  activeCityOffersList,
}: MainPageOffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {activeCityOffersList.map((offer: OfferType) => (
        <OfferCard
          key={offer.id}
          id={offer.id}
          place="main"
          isFavorite={offer.isFavorite}
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
