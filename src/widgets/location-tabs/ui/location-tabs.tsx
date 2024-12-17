import { CITIES_LIST } from '../../../shared/consts/cities';
import { City } from './components/city';

type LocationTabsType = {
  activeCity: string;
};

export function LocationTabs({
  activeCity,
}: LocationTabsType): JSX.Element {
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
