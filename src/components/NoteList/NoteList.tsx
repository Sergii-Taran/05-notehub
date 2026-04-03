import type { Note } from '../../types/note';
import css from './NoteList.module.css';

type Props = {
  notes: Note[];
  onDelete: (id: string) => void;
  deletingId?: string;
  isDeleting: boolean;
};

export default function NoteList({
  notes,
  onDelete,
  deletingId,
  isDeleting,
}: Props) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>Note</span>

            <button
              className={css.button}
              onClick={() => onDelete(note.id)}
              disabled={isDeleting && deletingId === note.id}
            >
              {isDeleting && deletingId === note.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
