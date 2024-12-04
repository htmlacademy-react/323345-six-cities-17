import {NavLink} from 'react-router-dom';
import {RoutePath} from '../../../shared/consts/route-path.ts';

export function HeaderNav(): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="#">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">
              Oliver.conner@gmail.com
            </span>
          </a>
          <NavLink to={RoutePath.FAVORITES}>
            <span className="header__favorite-count">3</span>
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
