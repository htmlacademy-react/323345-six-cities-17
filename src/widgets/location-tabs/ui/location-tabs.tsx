import { CITIES_LIST } from '../../../shared/consts/cities';
import { CityNameType } from '../../../shared/types/types';
import { City } from './components/city';

type LocationTabsType = {
  activeCity: string;
  onActiveCityHandler: (name: CityNameType) => void;
};

export function LocationTabs({
  activeCity,
  onActiveCityHandler,
}: LocationTabsType): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES_LIST.map((item) => (
            <City
              city={item.name}
              onActiveCityHandler={onActiveCityHandler}
              isActive={activeCity === item.name}
              key={item.name}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
