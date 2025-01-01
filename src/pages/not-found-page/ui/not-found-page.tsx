import { NavLink } from 'react-router-dom';
import { Header } from '../../../widgets/header';
import { RedirectionRouteByAuth } from '../../../app/routes/redirection-route-by-auth';
import pageNotFoundImage from '../assets/blue-monday.png';
import './not-found-page.css';

export function NotFoundPage(): JSX.Element {
  return (
    <RedirectionRouteByAuth >
      <>
        {<Header isLoginPage={false} favoritesList={null} />}
        <div className="page page--gray page--main">
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
            <NavLink className="page__not-found__btn" tabIndex={1} to="/">Home</NavLink>
          </div>
        </div>
      </>
    </RedirectionRouteByAuth>
  );
}

