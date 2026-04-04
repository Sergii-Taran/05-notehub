import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';

import { useDebouncedCallback } from 'use-debounce';

import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import {
  fetchNotes,
  createNote,
  deleteNote,
  type FetchNotesResponse,
} from '../../services/noteService';

import type { CreateNoteDto, Note } from '../../types/note';

import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';

import css from './App.module.css';

function App() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // 🔍 search
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const queryClient = useQueryClient();

  // ✅ debounce callback (по ТЗ)
  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  // 📥 GET notes
  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>(
    {
      queryKey: ['notes', page, debouncedSearch],
      queryFn: () => fetchNotes(page, debouncedSearch),
      placeholderData: keepPreviousData,
    }
  );

  // ➕ CREATE note
  const createMutation = useMutation({
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

  // ❌ DELETE note
  const deleteMutation = useMutation<Note, Error, string>({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success('Note deleted');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {
      toast.error('Failed to delete note');
    },
  });

  // 🧠 handlers
  const handleCreate = (data: CreateNoteDto) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    if (!id) return;
    deleteMutation.mutate(id);
  };

  // 📦 safe data
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  // ⏳ стани
  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* 🔍 Search */}
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value); // миттєво оновлюємо input
            debounced(value); // debounce запиту
          }}
        />

        {/* 📑 Pagination */}
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        {/* ➕ Create */}
        <button
          className={css.button}
          onClick={() => setIsOpen(true)}
          disabled={createMutation.isPending}
        >
          Create note +
        </button>
      </header>

      {/* 📄 Notes */}
      {notes.length > 0 && (
        <>
          <NoteList
            notes={notes}
            onDelete={handleDelete}
            deletingId={deleteMutation.variables}
            isDeleting={deleteMutation.isPending}
          />

          {isFetching && <Loader small />}
        </>
      )}

      {/* 🔽 Empty */}
      {notes.length === 0 && <p>No notes found</p>}

      {/* 🔽 MODAL */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onSubmit={handleCreate} onCancel={() => setIsOpen(false)} />
        </Modal>
      )}

      {/* 🔔 TOAST */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
