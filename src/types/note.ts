export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface NoteTag {
  id: string;
  name: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}
