import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState, } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import classNames from 'classnames';

import { RoutePath } from '../../../../consts';
import { Header } from '../../../../../widgets/header';
import { Footer } from '../../../../../widgets/footer';
import { getMetaTitlePage, metaTitlePage } from '../../../../utils/meata-title-page';
import { useAppSelector } from '../../../../hooks/use-app-selector';
import { selectLoadFavoriteOffers } from '../../../../../store/reducer/favorite/selectors';

function MainLayout(): JSX.Element {
  const location = useLocation();
  const [titleName, setTitleName] = useState<string>(location.pathname);
  const favoriteList = useAppSelector(selectLoadFavoriteOffers);

  useEffect(() => {
    setTitleName(location.pathname);
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{getMetaTitlePage(titleName)}</title>
        <meta name="description" content={metaTitlePage(titleName)} />
      </Helmet>
      <div className={classNames('page', { 'page--gray page--main': (location.pathname !== `${RoutePath.FAVORITES}`), 'page--favorites-empty': (location.pathname === `${RoutePath.FAVORITES}` && favoriteList.length === 0) })}>
        <Header
          isLoginPage={location.pathname === `${RoutePath.LOGIN}`}
        />
        <Outlet />
        {location.pathname === `${RoutePath.FAVORITES}` && <Footer />}
      </div>
    </HelmetProvider >

  );
}

export default MainLayout;
