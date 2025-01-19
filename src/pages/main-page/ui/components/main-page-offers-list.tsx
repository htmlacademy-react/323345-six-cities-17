import { memo } from 'react';

import { OfferCard } from '../../../../widgets/offer-card';
import type { OfferType } from '../../../../shared/types';

type MainPageOffersListProps = {
  activeCityOffersList: OfferType[];
};

function MainPageOffersListTemplate({
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
const MainPageOffersList = memo(MainPageOffersListTemplate);

export default MainPageOffersList;
