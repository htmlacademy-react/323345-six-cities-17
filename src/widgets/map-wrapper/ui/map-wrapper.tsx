import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { selectCurrentOffer } from '../../../store/reducer/offers/selectors/select-current-offer';
import { selectNearPoints } from '../../../store/reducer/offers/selectors/select-near-points';
import { CityMap } from '../../city-map';

function MapWrappedTemplate() {
  const { offerId } = useParams();
  const nearPoints = useAppSelector(selectNearPoints).slice(0, 3);
  const currentOffer = useAppSelector(selectCurrentOffer);

  return (
    currentOffer && offerId &&
    <CityMap
      city={currentOffer.city.name}
      points={nearPoints}
      selectedPoint={offerId}
      offerPage={currentOffer}
    />
  );
}

const MapWrapped = memo(MapWrappedTemplate);

export default MapWrapped;
