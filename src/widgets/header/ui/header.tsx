import { HeaderLeft } from './components/header-left.tsx';
import { HeaderNav } from './components/header-nav.tsx';
import { HeaderNavNotLogin } from './header-nav-not-logined';
import { useAppSelector } from '../../../shared/hooks/use-app-selector.ts';
import { authSelector } from '../../../store/selectors/auth-selector.ts';
import { AuthStatus } from '../../../shared/consts/auth-status.ts';

type HeaderProps = {
  isLoginPage: boolean;
}

export function Header({ isLoginPage }: HeaderProps): JSX.Element {
  const isAuthenticated = useAppSelector(authSelector);
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLeft />
          {isAuthenticated === AuthStatus.Auth ? !isLoginPage && <HeaderNav /> : <HeaderNavNotLogin />}
        </div>
      </div>
    </header>
  );
}
