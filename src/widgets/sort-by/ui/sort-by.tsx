import classNames from 'classnames';
import { sortKeys } from '../../../shared/consts/sort-keys';
import { memo, useState } from 'react';

type SortByProps = {
  onSortedOffersListHandler: (current: sortKeys) => void;
  currentSortType: string;
}

function SortByTemplate({ onSortedOffersListHandler, currentSortType }: SortByProps) {
  const [isOpened, setIsOpened] = useState(false);
  const keysList = Object.keys(sortKeys);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened(!isOpened)}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', { 'places__options--opened': isOpened })} >
        {keysList.map((current): JSX.Element => {
          const currentValue = current as keyof typeof sortKeys;
          return (
            <li
              className="places__option"
              tabIndex={0}
              onClick={() => {
                onSortedOffersListHandler(sortKeys[currentValue]);
                setIsOpened(!isOpened);
              }}
              key={crypto.randomUUID()}
            >
              {sortKeys[currentValue]}
            </li>
          );
        })}

      </ul>
    </form>
  );
}
const SortBy = memo(SortByTemplate);

export default SortBy;
