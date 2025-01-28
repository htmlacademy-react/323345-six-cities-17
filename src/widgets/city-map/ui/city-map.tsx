import { useEffect, useRef } from 'react';
import { Icon, layerGroup, Marker } from 'leaflet';
import classNames from 'classnames';
import {
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
  CITIES_LIST
} from '../../../shared/consts';
import { useMap } from '../../../shared/hooks/use-map';
import { CityType, CurrentOfferType, OfferType } from '../../../shared/types';

type MapProps = {
  city: string;
  points: OfferType[] | undefined;
  selectedPoint: string | null;
  offerPage: OfferType | false | CurrentOfferType;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

function CityMap({
  city,
  points,
  selectedPoint,
  offerPage,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const locationCity: CityType | undefined = CITIES_LIST.find(
    (item) => item.name === city
  );

  const map = useMap({
    mapRef,
    locationCity: { name: 'Paris', location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 } },
  });
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
        13
      );

      const markerLayer = layerGroup().addTo(map);

      if (offerPage) {
        new Marker(
          {
            lat: offerPage.location.latitude,
            lng: offerPage.location.longitude,
          },
          {
            alt: `${offerPage.type}`,
            title: `${offerPage.title}`,
          }
        )
          .setIcon(currentCustomIcon)
          .addTo(markerLayer);
      }

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
      className={classNames('map', {
        'offer__map': offerPage,
        'cities__map': !offerPage,
      })}
      ref={mapRef}
    />
  );
}

export default CityMap;
