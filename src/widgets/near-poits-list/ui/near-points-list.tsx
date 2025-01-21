import { memo } from 'react';

import styles from './near-points.module.css';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { selectNearPoints } from '../../../store/reducer/offers/selectors/select-near-points';
import { OfferCard } from '../../offer-card';

function NearPointsListTemplate(): JSX.Element {
  const nearPoints = useAppSelector(selectNearPoints).slice(0, 3);

  return (
    <div className={styles.offerCardWrapper}>
      {nearPoints.map((nearOffer) => (
        <OfferCard
          key={nearOffer.id}
          id={nearOffer.id}
          place='main'
          isFavorite={nearOffer.isFavorite}
          isPremium={nearOffer.isPremium}
          price={nearOffer.price}
          previewImage={nearOffer.previewImage}
          type={nearOffer.type}
          title={nearOffer.title}
          rating={nearOffer.rating}
        />
      ))}
    </div>
  );
}

const NearPointsList = memo(NearPointsListTemplate);
export default NearPointsList;
