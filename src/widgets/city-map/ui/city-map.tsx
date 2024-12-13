import { useEffect, useRef } from 'react';
import L, { Icon, layerGroup, Marker } from 'leaflet';
import { RoutePath } from '../../../shared/consts/route-path';
import classNames from 'classnames';
import {
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
} from '../../../shared/consts/map-markers-url';
import useMap from '../../../shared/hooks/use-map';
import { CityType, OfferType } from '../../../shared/types/types';
import { CITIES_LIST } from '../../../shared/consts/cities';
import { NavLink } from 'react-router-dom';

type MapProps = {
  city: string | undefined;
  points: OfferType[] | undefined;
  selectedPoint: string | undefined;
  offerPage: OfferType | false;
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
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const locationCity: CityType | undefined = CITIES_LIST.find(
    (item) => item.name === city
  );
  if (!locationCity) {
    return (
      <>
        <h2>Извините, нет предложений</h2>
        <NavLink to={RoutePath.MAIN} />
      </>
    );
  }

  const map = useMap({
    mapRef,
    locationCity,
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

      if (offerPage) {
        L.circle(
          [
            Number(offerPage.location.latitude),
            Number(offerPage.location.longitude),
          ],
          { radius: 1000 }
        ).addTo(map);
      }

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
      className={classNames('map', {
        'offer__map': offerPage,
        'cities__map': !offerPage,
      })}
      ref={mapRef}
    />
  );
}
