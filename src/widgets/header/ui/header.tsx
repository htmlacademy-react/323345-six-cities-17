import { HeaderNavNotLogin, HeaderLeft, HeaderNav } from './components';
import { AuthStatus } from '../../../shared/consts';
import { selectAuthorizationStatus } from '../../../store/reducer/user/selectors';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';

type HeaderProps = {
  isLoginPage: boolean;
}

function Header({ isLoginPage }: HeaderProps): JSX.Element {
  const isAuthenticated = useAppSelector(selectAuthorizationStatus);
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

export default Header;
