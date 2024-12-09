import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import {CityType} from '../types/types';

type UseMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  ActiveCity: CityType;
}

function useMap({mapRef, ActiveCity}: UseMapProps): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: ActiveCity.location.latitude,
          lng: ActiveCity.location.longitude,
        },
        zoom: 16
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [ActiveCity.location.latitude, ActiveCity.location.longitude, mapRef]);

  return map;
}

export default useMap;
