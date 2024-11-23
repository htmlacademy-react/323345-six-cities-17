import HeaderLeft from './HeaderLeft';
import HeaderNav from './HeaderNav';

function HeaderPage() {
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

export default HeaderPage;
