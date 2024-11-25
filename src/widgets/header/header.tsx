import HeaderLeft from './header-left.tsx';
import HeaderNav from './header-nav.tsx';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLeft />
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
