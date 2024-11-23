import Main from '../../pages/main/Main.tsx';
import Header from '../UI/header/Header.tsx';
import { offerCount } from '../../const.ts';

function App() {
  return (
    <div className="page page--gray page--main">
      <Header />
      <Main offerCount={offerCount} />
    </div>
  );
}

export default App;
