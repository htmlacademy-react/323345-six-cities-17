import {Outlet, useLocation} from 'react-router-dom';
import {useEffect, useState,} from 'react';
import {Header} from '../../../../widgets/header';
import {Footer} from '../../../../widgets/footer';
import {Helmet} from 'react-helmet';
import {getMetaTitlePage, MetaTitlePage} from '../../../consts/meta-title-page.ts';

type MainLayoutProps = {
  isAuthenticated: boolean;
}

export function MainLayout({isAuthenticated}: MainLayoutProps): JSX.Element {
  const location = useLocation();
  const [titleName, setTitleName] = useState<string>(location.pathname);

  useEffect(() => {
    setTitleName(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{getMetaTitlePage(titleName)}</title>
        <meta name="description" content={MetaTitlePage(titleName)}/>
      </Helmet>
      <div className={`page ${location.pathname !== '/favorites' && 'page--gray page--main'}`}>
        <Header isLoginPage={location.pathname === '/login'} isAuthenticated={isAuthenticated}/>
        <Outlet/>
        {location.pathname === '/favorites' && <Footer/>}
      </div>
    </>

  );
}
