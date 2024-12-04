import {ReactElement} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {RoutePath} from '../../../shared/consts/route-path.ts';


type NoAuthRouteProps = {
  isAuthenticated: boolean;
  children: ReactElement;
}

export function RedirectionRouteByAuth({isAuthenticated, children}: NoAuthRouteProps): JSX.Element {
  const location = useLocation().pathname;

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
