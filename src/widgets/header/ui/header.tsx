import {HeaderLeft} from './header-left';
import {HeaderNav} from './header-nav';
import {HeaderNavNotLogin} from './header-nav-not-logined';
import {OfferType} from '../../../shared/types/types.ts';

type HeaderProps = {
  isLoginPage: boolean;
  isAuthenticated: boolean;
  favoritesList: OfferType[] | null;
}

export function Header({isLoginPage, isAuthenticated, favoritesList}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLeft/>
          {isAuthenticated ? !isLoginPage && <HeaderNav favoritesList={favoritesList}/> : <HeaderNavNotLogin/>}
        </div>
      </div>
    </header>
  );
}
