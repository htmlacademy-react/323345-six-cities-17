import { CityNameType } from '../../../../shared/types/types';
import cn from 'classnames';

type CityProps = {
  city: CityNameType,
  onActiveCityHandler: (name: CityNameType)=>void,
  isActive: boolean;
}

export function City({city, onActiveCityHandler, isActive}:CityProps): JSX.Element
 {
  return (
    <li
      className="locations__item"
      onClick={()=>onActiveCityHandler(city)}
    >
      <a
      className={cn(
        "locations__item-link tabs__item",
        {"tabs__item--active": isActive },
      )}
      href="#"
      >
        <span>{city}</span>
      </a>
    </li>
  );
}
