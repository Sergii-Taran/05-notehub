import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesResponse {
  data: Note[];
  meta: {
    totalPages: number;
    page: number;
    perPage: number;
    total: number;
  };
}

export const fetchNotes = async (
  page: number,
  search: string,
  perPage: number = 12
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });
  return data;
};

export const createNote = async (
  note: Pick<Note, 'title' | 'content'>
): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
