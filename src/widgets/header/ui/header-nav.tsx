import {NavLink} from 'react-router-dom';
import {RoutePath} from '../../../shared/consts/route-path.ts';
import {OfferType} from '../../../shared/types/types.ts';
import './header.css';

type HeaderNavProps = {
  favoritesList: OfferType[];
}

export function HeaderNav({favoritesList}: HeaderNavProps): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <span className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">
              Oliver.conner@gmail.com
            </span>
            <span className="tooltip">Личный кабинет пока в разработке</span>
          </span>
          <NavLink to={RoutePath.FAVORITES}>
            <span className="header__favorite-count">{favoritesList.length}</span>
          </NavLink>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
