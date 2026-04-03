import axios from 'axios';
import type { NotesResponse } from '../types/note';
import type { CreateNoteDto, Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (
  page: number = 1,
  search: string = ''
): Promise<NotesResponse> => {
  const res = await api.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
    },
  });

  return res.data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const res = await api.post('/notes', note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
