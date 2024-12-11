import { useEffect, useRef } from 'react';
import { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
} from '../../../shared/consts/map-markers-url';
import useMap from '../../../shared/hooks/use-map';
import { CityType, OfferType } from '../../../shared/types/types';
import { CITIES_LIST } from '../../../shared/consts/cities';

type MapProps = {
  city: string;
  points: OfferType[] | undefined;
  selectedPoint: string | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export function CityMap({
  city,
  points,
  selectedPoint,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const locationCity: CityType | undefined = CITIES_LIST.find(
    (item) => item.name === city
  );
  const map = useMap({ mapRef, locationCity: locationCity! });

  useEffect(() => {
    if (map) {
      map.flyTo(
        [
          Number(locationCity?.location.latitude),
          Number(locationCity?.location.longitude),
        ],
        13
      );

      const markerLayer = layerGroup().addTo(map);
      points?.forEach((point) => {
        const marker = new Marker(
          {
            lat: point.location.latitude,
            lng: point.location.longitude,
          },
          {
            alt: `${point.type}`,
            title: `${point.title}`,
          }
        );

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [
    map,
    points,
    selectedPoint,
    locationCity?.location.latitude,
    locationCity?.location.longitude,
  ]);

  return <div className="cities__map" ref={mapRef}></div>;
}
