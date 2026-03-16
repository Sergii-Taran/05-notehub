import axios from 'axios';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (page: number, search: string) => {
  const { data } = await api.get('/notes', {
    params: { page, search },
  });
  return data;
};

export const createNote = async (note: { title: string; content: string }) => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
