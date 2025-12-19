import {
  type ActionFunctionArgs,
  type ErrorResponse,
  json,
  redirect,
} from '@remix-run/node';
import {
  Link,
  useRouteError,
  useLoaderData,
  isRouteErrorResponse,
} from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notes';

export default function NotesPage() {
  const notes = useLoaderData<typeof loader>();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: 'Could not find any notes.' },
      {
        status: 404,
        statusText: 'Not Found',
      }
    );
  }
  return notes;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  const title = formData.get('title');
  const content = formData.get('content');

  if (typeof title !== 'string' || typeof content !== 'string') {
    return json(
      { message: 'Invalid form submission.' },
      { status: 400 }
    );
  }

  if (title.trim().length < 5) {
    return json(
      { message: 'Invalid title - must be at least 5 characters long.' },
      { status: 422 }
    );
  }

  const existingNotes = await getStoredNotes();
  const newNote = {
    id: new Date().toISOString(),
    title,
    content,
  };
  await storeNotes(existingNotes.concat(newNote));
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function meta() {
  return [
    {
      title: 'All Notes',
      description: 'Manage your notes with ease.',
    },
  ];
}

function CatchBoundary({ error }: { error: ErrorResponse }) {
  const message = error.data?.message || 'Data not found.';

  return (
    <main>
      <NewNote />
      <p className='info-message'>{message}</p>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const response = isRouteErrorResponse(error);
  if (response) {
    return <CatchBoundary error={error} />;
  }

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  return (
    <main className='error'>
      <h1>An error related to your notes occurred!</h1>
      <p>{errorMessage}</p>
      <p>
        Back to <Link to='/'>safety</Link>!
      </p>
    </main>
  );
}
