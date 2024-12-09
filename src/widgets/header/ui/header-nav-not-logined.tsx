import {NavLink} from 'react-router-dom';
import {RoutePath} from '../../../shared/consts/route-path.ts';

export function HeaderNavNotLogin(): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <NavLink className="header__nav-link header__nav-link--profile" to={RoutePath.LOGIN}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
