import { useEffect, useRef } from 'react';
import L, { Icon, layerGroup, Marker } from 'leaflet';
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
  offerPage: OfferType | false;
  className: string;
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
  offerPage,
  className,
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
          offerPage
            ? Number(offerPage.location.latitude)
            : Number(locationCity?.location.latitude),
          offerPage
            ? Number(offerPage.location.longitude)
            : Number(locationCity?.location.longitude),
        ],
        offerPage ? 16 : 13
      );

      offerPage
        ? L.circle(
            [
              Number(offerPage.location.latitude),
              Number(offerPage.location.longitude),
            ],
            { radius: 400 }
          ).addTo(map)
        : undefined;

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
    offerPage,
    map,
    points,
    selectedPoint,
    locationCity?.location.latitude,
    locationCity?.location.longitude,
  ]);

  return (
    <section
      className={className}
      ref={mapRef}
      style={
        className === 'offer__map'
          ? {
              maxWidth: '1144px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }
          : undefined
      }
    />
  );
}
