import HeaderLeft from './header-left.tsx';
import HeaderNav from './header-nav.tsx';
import HeaderNavNotLogin from './header-nav-not-logined.tsx';

type HeaderProps = {
  isLoginPage: boolean;
  isAuthenticated: boolean;
}

function Header({ isLoginPage, isAuthenticated }:HeaderProps): JSX.Element {
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

export default Header;
