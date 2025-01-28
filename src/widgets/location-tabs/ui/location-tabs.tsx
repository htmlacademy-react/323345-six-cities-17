import { memo } from 'react';

import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { selectActiveCity } from '../../../store/reducer/city/selectors';
import { City } from './components';
import { CITIES_LIST } from '../../../shared/consts';

function LocationTabsTemplate(): JSX.Element {
  const activeCity = useAppSelector(selectActiveCity);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES_LIST.map((item) => (
            <City
              city={item.name}
              isActive={activeCity === item.name}
              key={item.name}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

const LocationTabs = memo(LocationTabsTemplate);

export default LocationTabs;
