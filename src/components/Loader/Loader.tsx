import css from './Loader.module.css';

type Props = {
  small?: boolean;
};

export default function Loader({ small = false }: Props) {
  return (
    <div className={small ? css.loaderWrapperSmall : css.loaderWrapper}>
      <div className={small ? css.loaderSmall : css.loader}></div>
    </div>
  );
}
