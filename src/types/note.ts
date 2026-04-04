export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tag?: string;
}

export interface NoteTag {
  id: string;
  name: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}
