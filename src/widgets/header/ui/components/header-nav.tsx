import { NavLink } from 'react-router-dom';
import { RoutePath } from '../../../../shared/consts/route-path.ts';
import { OfferType } from '../../../../shared/types';
import '../header.css';
import { useAppDispatch } from '../../../../shared/hooks/use-app-dispatch.ts';
import { auth } from '../../../../store/action/action.ts';

type HeaderNavProps = {
  favoritesList: OfferType[] | null;
}

export function HeaderNav({ favoritesList }: HeaderNavProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <NavLink className="user__link" to={RoutePath.FAVORITES}>
            <span className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                Oliver.conner@gmail.com
              </span>
            </span>
            <span className="header__favorite-count">{favoritesList?.length}</span>
          </NavLink>
        </li>
        <li className="header__nav-item" onClick={() => dispatch(auth(false))}>
          <div className="header__nav-link">
            <span className="header__signout">Sign out</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}
