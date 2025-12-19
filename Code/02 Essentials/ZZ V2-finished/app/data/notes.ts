import fs from 'fs/promises';
import { Note } from '~/models';

export async function getStoredNotes() {
  try {
    const rawFileContent = await fs.readFile('notes.json', {
      encoding: 'utf-8',
    });
    const data = JSON.parse(rawFileContent);
    const storedNotes = data.notes ?? [];
    return storedNotes;
  } catch {
    return [];
  }
}

export function storeNotes(notes: Note[]) {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes }));
}
