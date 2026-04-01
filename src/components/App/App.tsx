import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';

function App() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page],
    queryFn: () => fetchNotes(page),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button}>Create note +</button>
      </header>

      {data && (
        <>
          <NoteList notes={data.notes} />

          <div>
            <button onClick={() => setPage((prev) => prev - 1)}>Prev</button>

            <span> Page: {page} </span>

            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
