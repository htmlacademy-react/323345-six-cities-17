import { FormEvent, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { appStore } from '../../../store';
import { loginAction } from '../../../store/reducer/user/actions/user-slice-actions';
import { changeActiveCity } from '../../../store/reducer/city';
import { selectAuthorizationStatus } from '../../../store/reducer/user/selectors';
import { validatePassword } from '../../../shared/utils/validate-password';
import { CityNameType } from '../../../shared/types';
import { AuthStatus, RoutePath, CITIES_LIST, INITIAL_LOGIN_FORM_STATE } from '../../../shared/consts';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const [loginFormData, setLoginFormData] = useState(INITIAL_LOGIN_FORM_STATE);


  const onFormChangeHandle = (name: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginFormData({
      ...loginFormData,
      [name]: e.target.value,
    });
  };

  const cityName = useMemo(() => {
    const nameIndex = Math.floor(Math.random() * CITIES_LIST.length);
    const cityNameData: CityNameType = CITIES_LIST[nameIndex].name;
    return cityNameData;
  }, []);

  const redirectHandle = () => {
    appStore.dispatch(changeActiveCity(cityName));
  };

  const onLoginChangeHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginFormData.login !== null && loginFormData.password !== null) {
      const validPassword = validatePassword(loginFormData.password);
      if (validPassword) {
        dispatch(loginAction({
          login: loginFormData.login,
          password: loginFormData.password,
        }));
      } else {
        toast.error('Пароль должен содержать хотя бы по одной цифре и латинской букве');
      }
    }
    if (authStatus === AuthStatus.Auth) {
      return <Navigate to={RoutePath.MAIN} />;
    }
  };

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={onLoginChangeHandle}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginFormData.login}
                  required
                  onChange={(e) => onFormChangeHandle('login', e)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginFormData.password}
                  autoComplete="off"
                  required
                  onChange={(e) => onFormChangeHandle('password', e)}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={RoutePath.MAIN} onClick={redirectHandle}>
                <span>{cityName}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;

