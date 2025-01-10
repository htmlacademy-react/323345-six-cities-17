import { NavLink } from 'react-router-dom';
import { RoutePath } from '../../../../shared/consts/route-path.ts';
import '../header.css';
import { useAppDispatch } from '../../../../shared/hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../../../shared/hooks/use-app-selector.ts';
import { userNameSelector } from '../../../../store/selectors/user-name-selector.ts';
import { logoutAction } from '../../../../store/action/async-action.ts';
import { loadFavoriteOffersSelector } from '../../../../store/selectors/load-favorite-offers-selector.ts';

export function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesList = useAppSelector(loadFavoriteOffersSelector);
  function logout() {
    dispatch(logoutAction());
  }
  const userName = useAppSelector(userNameSelector);
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <NavLink className="user__link" to={RoutePath.FAVORITES}>
            <span className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {userName}
              </span>
            </span>
            <span className="header__favorite-count">{favoritesList?.length}</span>
          </NavLink>
        </li>
        <li className="header__nav-item" onClick={logout}>
          <div className="header__nav-link">
            <span className="header__signout">Sign out</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}
