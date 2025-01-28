import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header.module.css';
import { useAppDispatch } from '../../../../shared/hooks/use-app-dispatch';
import { useAppSelector } from '../../../../shared/hooks/use-app-selector';
import { logoutAction } from '../../../../store/reducer/user/actions';
import { selectLoadFavoriteOffers } from '../../../../store/reducer/favorite/selectors';
import { selectUser } from '../../../../store/reducer/user/selectors';
import { RoutePath } from '../../../../shared/consts';

function HeaderNavTemplate(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesList = useAppSelector(selectLoadFavoriteOffers);
  const user = useAppSelector(selectUser);
  function logout() {
    dispatch(logoutAction());
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <NavLink className={styles.userLink} to={RoutePath.FAVORITES}>
            <span className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={user.avatarUrl}
                  width="54"
                  height="54"
                  alt="Reviews avatar"
                />
              </div>
              <span className="header__user-name user__name">
                {user.name}
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

const HeaderNav = memo(HeaderNavTemplate);

export default HeaderNav;
