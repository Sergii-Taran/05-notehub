import { Note } from '../../types/note';

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  );
}
