import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';

import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { fetchNotes, createNote } from '../../services/noteService';
import type { NotesResponse } from '../../types/note';

import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

import css from './App.module.css';

function App() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  // 🔽 GET notes
  const { data, isLoading, isError, isFetching } = useQuery<NotesResponse>({
    queryKey: ['notes', page],
    queryFn: () => fetchNotes(page),
    placeholderData: keepPreviousData,
  });

  // 🔽 CREATE note
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Note created successfully ✅');

      queryClient.invalidateQueries({ queryKey: ['notes'] });

      setIsOpen(false); // ✅ закриваємо тільки після успіху
    },
    onError: () => {
      toast.error('Failed to create note ❌');
    },
  });

  // 🔽 submit form
  const handleCreate = (data: {
    title: string;
    content: string;
    tag: string;
  }) => {
    mutation.mutate(data);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button
          className={css.button}
          onClick={() => setIsOpen(true)}
          disabled={mutation.isPending}
        >
          Create note +
        </button>
      </header>

      {data && (
        <>
          <NoteList notes={data.notes} />

          <div>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              Prev
            </button>

            <span>
              Page: {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>

          {isFetching && <p>Updating...</p>}
        </>
      )}

      {/* 🔽 MODAL */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onSubmit={handleCreate} />
        </Modal>
      )}

      {/* 🔽 TOAST */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
