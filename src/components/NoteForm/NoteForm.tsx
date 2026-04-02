import { useState, FormEvent } from 'react';
import css from './NoteForm.module.css';

type Props = {
  onSubmit: (data: { title: string; content: string; tag: string }) => void;
};

export default function NoteForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Todo');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({ title, content, tag });

    // очистка форми
    setTitle('');
    setContent('');
    setTag('Todo');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2>Create note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit">Create</button>
    </form>
  );
}
