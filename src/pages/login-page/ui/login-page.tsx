import { FormEvent, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { RoutePath } from '../../../shared/consts/route-path';
import { loginAction } from '../../../store/action/async-action';
import { AuthStatus } from '../../../shared/consts/auth-status';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { authSelector } from '../../../store/selectors/auth-selector';
import { validatePassword } from '../utils/validatePassword';
import { toast } from 'react-toastify';

export function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(authSelector);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={
              (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                if (loginRef.current !== null && passwordRef.current !== null) {
                  const validPassword = validatePassword(passwordRef.current.value);
                  if (validPassword) {
                    dispatch(loginAction({
                      login: loginRef.current.value,
                      password: passwordRef.current.value,
                    }));
                  } else {
                    toast.error('Пароль должен содержать хотя бы по одной цифре и латинской букве');
                  }
                }
                if (authStatus === AuthStatus.Auth) {
                  return <Navigate to={RoutePath.MAIN} />;
                }
              }
            }
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={loginRef}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                  autoComplete="off"
                  required
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
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

