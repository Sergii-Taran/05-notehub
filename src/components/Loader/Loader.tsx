import css from './Loader.module.css';

interface LoaderProps {
  small?: boolean;
}

export default function Loader({ small = false }: LoaderProps) {
  return (
    <div className={small ? css.loaderWrapperSmall : css.loaderWrapper}>
      <div className={small ? css.loaderSmall : css.loader}></div>
    </div>
  );
}
