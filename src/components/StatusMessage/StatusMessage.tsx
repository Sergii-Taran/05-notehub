import css from './StatusMessage.module.css';

interface StatusMessageProps {
  message: string;
  type?: 'error' | 'info' | 'empty';
}

export default function StatusMessage({
  message,
  type = 'info',
}: StatusMessageProps) {
  return <div className={`${css.message} ${css[type]}`}>{message}</div>;
}
