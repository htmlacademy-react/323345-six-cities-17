import { NavLink } from 'react-router-dom';
import pageNotFoundImage from './assets/blue-monday.png';
import './404-page.css';
import Header from '../../widgets/header/header.tsx';
import LoginPage from '../login-page/login-page.tsx';

type NotFoundPageProps = {
  isAuthenticated: boolean;
}

function NotFoundPage({ isAuthenticated }:NotFoundPageProps):JSX.Element {
  return isAuthenticated
    ? (
      <div className="page page--gray page--main">
        ${<Header isLoginPage={false} isAuthenticated={isAuthenticated}/>}
        <div className="page__not-found__container">
          <img
            className="page__not-found__img"
            src={pageNotFoundImage}
            width="545"
            height="545"
            alt="Page Not Found Image"
          />
          <h2 className="page__not-found__title">404</h2>
          <p className="page__not-found__text">Uh oh, something looks wrong here</p>
          <NavLink className="page__not-found__btn" tabIndex={1} to='/'>Home</NavLink>
        </div>
      </div>
    )
    : <LoginPage />;
}

export default NotFoundPage;

