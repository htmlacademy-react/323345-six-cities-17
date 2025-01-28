import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath, AuthStatus } from '../../../../shared/consts';
import { useAppSelector } from '../../../../shared/hooks/use-app-selector';
import { selectAuthorizationStatus } from '../../../../store/reducer/user/selectors';


type NoAuthRouteProps = {
  children: ReactElement;
}

function RedirectionRouteByAuth({ children }: NoAuthRouteProps): JSX.Element {
  const location = useLocation().pathname;
  const isAuthenticated = useAppSelector(selectAuthorizationStatus);

  if (isAuthenticated === AuthStatus.Auth) {
    if (location === `${RoutePath.LOGIN}`) {
      return <Navigate to={RoutePath.MAIN} replace />;
    }
  } else {
    if (location !== `${RoutePath.LOGIN}`) {
      return <Navigate to={RoutePath.LOGIN} replace />;
    }
  }

  return children;
}

export default RedirectionRouteByAuth;
