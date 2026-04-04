import css from './StatusMessage.module.css';

type Props = {
  message: string;
  type?: 'error' | 'info' | 'empty';
};

export default function StatusMessage({ message, type = 'info' }: Props) {
  return <div className={`${css.message} ${css[type]}`}>{message}</div>;
}
