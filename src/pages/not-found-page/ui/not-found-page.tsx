import { NavLink } from 'react-router-dom';

import { Header } from '../../../widgets/header';
import pageNotFoundImage from '../assets/blue-monday.png';
import styles from './not-found-page.module.css';

export function NotFoundPage(): JSX.Element {
  return (
    <>
      {<Header isLoginPage={false} />}
      <div className="page page--gray page--main">
        <div className={styles.pageNotFoundContainer}>
          <img
            src={pageNotFoundImage}
            width="545"
            height="545"
            alt="Page Not Found Image"
          />
          <h2 className={styles.pageNotFoundTitle}>404</h2>
          <p className={styles.pageNotFoundText}>Uh oh, something looks wrong here</p>
          <NavLink className={styles.pageNotFoundBtn} tabIndex={1} to="/">Home</NavLink>
        </div>
      </div>
    </>
  );
}

