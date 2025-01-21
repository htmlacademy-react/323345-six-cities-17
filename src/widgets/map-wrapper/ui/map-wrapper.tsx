import { memo } from "react";
import { useAppSelector } from "../../../shared/hooks/use-app-selector";
import { selectCurrentOffer } from "../../../store/reducer/offers/selectors/select-current-offer";
import { selectNearPoints } from "../../../store/reducer/offers/selectors/select-near-points";
import { CityMap } from "../../city-map";
import { useParams } from "react-router-dom";

function MapWrapper() {
  const { offerId } = useParams();
  const nearPoints = useAppSelector(selectNearPoints).slice(0, 3);
  const currentOffer = useAppSelector(selectCurrentOffer);
  console.log('render mapWrapper')
  return (
    <>
      {currentOffer && offerId && <CityMap
        city={currentOffer.city.name}
        points={nearPoints}
        selectedPoint={offerId}
        offerPage={currentOffer}
      />}
    </>
  )
}

export default memo(MapWrapper);
