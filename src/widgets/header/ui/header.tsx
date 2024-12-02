import { HeaderLeft } from './header-left';
import { HeaderNav } from './header-nav';
import { HeaderNavNotLogin } from './header-nav-not-logined';

type HeaderProps = {
  isLoginPage: boolean;
  isAuthenticated: boolean;
}

export function Header({ isLoginPage, isAuthenticated }:HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLeft />
          { isAuthenticated ? !isLoginPage && <HeaderNav /> : <HeaderNavNotLogin />}
        </div>
      </div>
    </header>
  );
}
