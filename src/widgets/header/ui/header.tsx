import { HeaderLeft } from './components/header-left.tsx';
import { HeaderNav } from './components/header-nav.tsx';
import { HeaderNavNotLogin } from './header-nav-not-logined';
import { OfferType } from '../../../shared/types';
import { useAppSelector } from '../../../shared/hooks/use-app-selector.ts';

type HeaderProps = {
  isLoginPage: boolean;
  favoritesList: OfferType[] | null;
}

export function Header({ isLoginPage, favoritesList }: HeaderProps): JSX.Element {
  const isAuthenticated = useAppSelector((state) => state.auth);
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLeft />
          {isAuthenticated ? !isLoginPage && <HeaderNav favoritesList={favoritesList} /> : <HeaderNavNotLogin />}
        </div>
      </div>
    </header>
  );
}
