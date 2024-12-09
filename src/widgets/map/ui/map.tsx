import leaflet from 'leaflet';
import {RefObject, useEffect, useRef, useState} from 'react';
import {OfferType} from '../../../shared/types/types.ts';
import {getOfferById} from '../../../shared/get-offer-by-id';

type UseMapProps = {
  offersList: OfferType[];
  activeOfferId: string;
}

export function OffersMap({offersList, activeOfferId}: UseMapProps) {
  const mapRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);
  const isRenderedRef = useRef(false);
  const activeOffer = getOfferById({activeOfferId, offersList});
  useEffect(() => {
    if (mapRef.current === null && activeOffer === null) {
      return;
    }
    if (!isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: activeOffer?.city.location.latitude,
          lng: activeOffer?.city.location.longitude,
        },
        zoom: activeOffer?.city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, offersList, activeOfferId]);

  return (
    <div
      className="cities__right-section"
      style={{height: 'inherit'}}
      ref={mapRef}
    >
    </div>
  );
}
