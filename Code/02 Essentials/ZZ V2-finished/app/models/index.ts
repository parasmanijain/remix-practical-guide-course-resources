export interface AddNote {
  title: string;
  content: string;
}

export interface Note extends AddNote {
  id: string;
}

export interface NotesFile {
  notes: Note[];
}
