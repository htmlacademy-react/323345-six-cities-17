import cn from 'classnames';
import { CityNameType } from '../../../../shared/types';
// import { changeActiveCity } from '../../../../store/action/action';
import { useAppDispatch } from '../../../../shared/hooks/use-app-dispatch';
import { changeActiveCity } from '../../../../store/reducer/city/city-slice';
import './city.css';

type CityProps = {
  city: CityNameType;
  isActive: boolean;
};

export function City({
  city,
  isActive,
}: CityProps): JSX.Element {
  const dispatch = useAppDispatch();
  const choseCity = (name: CityNameType) => {
    dispatch(changeActiveCity(name));
  };
  return (
    <li className="locations__item" onClick={() => choseCity(city)}>
      <div
        className={cn('locations__item-link tabs__item', {
          'tabs__item--active': isActive,
        })}
      >
        <span>{city}</span>
      </div>
    </li>
  );
}
