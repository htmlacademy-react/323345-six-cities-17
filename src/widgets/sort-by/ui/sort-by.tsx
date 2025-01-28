import classNames from 'classnames';
import { memo, useState } from 'react';

import { SortKeys } from '../../../shared/consts';

type SortByProps = {
  onSortedOffersListHandler: (current: SortKeys) => void;
  currentSortType: string;
}

function SortByTemplate({ onSortedOffersListHandler, currentSortType }: SortByProps) {
  const [isOpened, setIsOpened] = useState(false);
  const keysList = Object.keys(SortKeys);

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
          const currentValue = current as keyof typeof SortKeys;
          return (
            <li
              className="places__option"
              tabIndex={0}
              onClick={() => {
                onSortedOffersListHandler(SortKeys[currentValue]);
                setIsOpened(!isOpened);
              }}
              key={crypto.randomUUID()}
            >
              {SortKeys[currentValue]}
            </li>
          );
        })}

      </ul>
    </form>
  );
}
const SortBy = memo(SortByTemplate);

export default SortBy;
