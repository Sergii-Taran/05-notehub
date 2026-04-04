// import { useEffect, type ReactNode } from 'react';
// import css from './Modal.module.css';

// type Props = {
//   children: ReactNode;
//   onClose: () => void;
// };

// export default function Modal({ children, onClose }: Props) {
//   useEffect(() => {
//     // ✅ Закриття по ESC
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     // ✅ Блокуємо скрол
//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';

//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       // cleanup
//       window.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = originalOverflow;
//     };
//   }, [onClose]);

//   return (
//     <div className={css.backdrop} onClick={onClose}>
//       <div className={css.modal} onClick={(e) => e.stopPropagation()}>
//         <button className={css.closeBtn} onClick={onClose}>
//           ✕
//         </button>

//         {children}
//       </div>
//     </div>
//   );
// }

import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

type Props = {
  children: ReactNode;
  onClose: () => void;
};

const modalRoot = document.getElementById('modal-root')!;

export default function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
