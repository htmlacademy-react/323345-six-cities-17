import style from './loader.module.css';

function Loader() {
  return (
    <span className={style.loader} data-testid="loader-container" ></span>
  );
}

export default Loader;
