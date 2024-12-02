import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';


type NoAuthRouteProps = {
  isAuthenticated: boolean;
  children: ReactElement;
}

export function RedirectionRouteByAuth({isAuthenticated, children}: NoAuthRouteProps): JSX.Element {
  return isAuthenticated ? children : <Navigate to={isAuthenticated ? '/' : '/login'}/>;
}
