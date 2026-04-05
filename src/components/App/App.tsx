import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { useDebouncedCallback } from 'use-debounce';

import { Toaster } from 'react-hot-toast';

import {
  fetchNotes,
  type FetchNotesResponse,
} from '../../services/noteService';

import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import StatusMessage from '../StatusMessage/StatusMessage';

import css from './App.module.css';

function App() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>(
    {
      queryKey: ['notes', page, debouncedSearch],
      queryFn: () => fetchNotes(page, debouncedSearch),
      placeholderData: keepPreviousData,
    }
  );

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;
  const handleSearchChange = (value: string) => {
    setSearch(value);
    debounced(value);
  };

  if (isLoading) return <Loader />;
  if (isError)
    return <StatusMessage type="error" message="Failed to load notes" />;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && (
        <>
          <NoteList notes={notes} />

          {isFetching && notes.length > 0 && <Loader small />}
        </>
      )}

      {notes.length === 0 && (
        <StatusMessage type="empty" message="No notes found" />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
