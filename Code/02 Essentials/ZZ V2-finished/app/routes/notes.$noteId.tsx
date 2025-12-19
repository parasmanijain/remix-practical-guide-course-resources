import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/notes';
import { Note } from '~/models';
import styles from '~/styles/note-details.css?url';

export default function NoteDetailsPage() {
  const note = useLoaderData<typeof loader>();

  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id='note-details-content'>{note.content}</p>
    </main>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const notes = (await getStoredNotes()) as Note[];
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);

  if (!selectedNote) {
    throw json(
      { message: 'Could not find note for id ' + noteId },
      { status: 404 }
    );
  }

  return selectedNote;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: 'Note not found' }];
  }
  return [
    {
      title: data.title,
      description: 'Manage your notes with ease.',
    },
  ];
};
