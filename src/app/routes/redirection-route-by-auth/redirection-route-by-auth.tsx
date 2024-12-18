import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../shared/consts/route-path.ts';
import { UseAppSelector } from '../../../shared/hooks/use-app-selector.ts';


type NoAuthRouteProps = {
  children: ReactElement;
}

export function RedirectionRouteByAuth({ children }: NoAuthRouteProps): JSX.Element {
  const location = useLocation().pathname;
  const isAuthenticated = UseAppSelector((state) => state.auth);

  if (isAuthenticated) {
    if (location === `${RoutePath.LOGIN}`) {
      return <Navigate to={RoutePath.MAIN} replace/>;
    }
  } else {
    if (location !== `${RoutePath.LOGIN}`) {
      return <Navigate to={RoutePath.LOGIN} replace/>;
    }
  }

  return children;
}
