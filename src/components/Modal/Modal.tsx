import { ReactNode } from 'react';
import css from './Modal.module.css';

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: Props) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
