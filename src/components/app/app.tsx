import Main from '../pages/main/Main.tsx';
import HeaderPage from './UI/header/header-page.tsx';
import { offerCount } from '../const.ts';

function App() {
  return (
    <div className="page page--gray page--main">
      <HeaderPage />
      <Main offerCount={offerCount} />
    </div>
  );
}

export default App;
