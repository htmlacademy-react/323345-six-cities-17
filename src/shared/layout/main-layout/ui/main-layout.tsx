import {Outlet} from 'react-router-dom';
import {useState,} from 'react';
import {Header} from '../../../../widgets/header';
import {Footer} from '../../../../widgets/footer';


type MainLayoutProps = {
  isAuthenticated: boolean;
}

export function MainLayout({isAuthenticated}: MainLayoutProps): JSX.Element {
  const [titleName, setTitleName] = useState<string>(location.pathname);
  if (titleName !== location.pathname) {
    setTitleName(location.pathname);
  }
  return (
    <>
      {/*<Helmet>*/}
      {/*  <title>{getMetaTitlePage(titleName)}</title>*/}
      {/*  <meta name="description" content={MetaTitlePage(titleName)}/>*/}
      {/*</Helmet>*/}
      <Header isLoginPage={location.pathname === '/login'} isAuthenticated={isAuthenticated}/>
      <Outlet/>
      {location.pathname === '/favorites' && <Footer/>}
    </>
  );
}
