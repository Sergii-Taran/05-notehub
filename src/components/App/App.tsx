import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';

import { useDebounce } from 'use-debounce';

import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { fetchNotes, createNote } from '../../services/noteService';
import type { CreateNoteDto, NotesResponse } from '../../types/note';

import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';

import css from './App.module.css';

function App() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebounce(search, 500);

  const queryClient = useQueryClient();

  // 🔽 GET notes
  const { data, isLoading, isError, isFetching } = useQuery<NotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  // 🔽 CREATE note
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Note created successfully ✅');

      queryClient.invalidateQueries({ queryKey: ['notes'] });

      setIsOpen(false);
    },
    onError: () => {
      toast.error('Failed to create note ❌');
    },
  });

  // 🔽 submit form
  const handleCreate = (data: CreateNoteDto) => {
    mutation.mutate(data);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1); // ✅ правильне місце
          }}
        />

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

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

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
