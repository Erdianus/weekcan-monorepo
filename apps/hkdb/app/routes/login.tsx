import { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Input,
  Spacer,
  Spinner,
} from '@nextui-org/react';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import axios, { AxiosError } from 'axios';
import { z, ZodError } from 'zod';
import { zx } from 'zodix';

import { commitSession, getSession } from '~/session';

export const meta: MetaFunction = () => {
  return [
    { title: 'Login' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

// Check if there is an error for a specific path.
function errorAtPath(error: ZodError, path: string) {
  return error.issues.find((issue) => issue.path[0] === path)?.message;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'));

  if (session.has('id')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/db');
  }

  const data = { error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'));
  const { error, data } = await zx.parseFormSafe(request, {
    username: z.string().min(1, 'Minimal 1'),
    password: z.string().min(1, 'Tolong Isi Password'),
  });

  if (error) {
    return json(
      {
        username: errorAtPath(error, 'username'),
        password: errorAtPath(error, 'password'),
        message: '',
      },
      {
        status: 400,
      },
    );
  }

  try {
    const res = await axios.post(
      `${process.env.BASE_API}/api/login`,
      {
        ...data,
        username: data.username,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const user = res.data as { data: { id: string; token: string } };

    session.set('id', user.data.id);
    session.set('token', user.data.token);

    return redirect('/db', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (e) {
    if (e instanceof AxiosError) {
      session.flash('error', e.message);
      // Redirect back to the login page with errors.
      return json(
        {
          success: false,
          message: e.message,
          username: '',
          password: '',
        },
        {
          status: e.status,
          headers: {
            'Set-Cookie': await commitSession(session),
          },
        },
      );
    }
  }
}

export default function Page() {
  const navigation = useNavigation();
  const { error } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const errUsername = actionData?.username;
  const errPass = actionData?.password;

  const errBackend = actionData?.message;

  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        {!!error && (
          <div
            id="error-alert"
            className="mb-4 flex items-center rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              className="me-3 inline h-4 w-4 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{errBackend}</span>{' '}
            </div>
          </div>
        )}
        <Card className="min-w-80 p-5">
          <Form method="POST">
            <h2 className="mb-5 text-center text-2xl font-bold">Login</h2>
            <Input
              variant="underlined"
              name="username"
              label="Username"
              isInvalid={!!errUsername}
              errorMessage={errUsername}
            />
            <Spacer y={1} />
            <Input
              type={!show ? 'password' : 'text'}
              name="password"
              variant="underlined"
              label="Password"
              isInvalid={!!errPass}
              errorMessage={errPass}
            />
            <Spacer y={4} />
            <Checkbox id="show-pass" isSelected={show} onValueChange={setShow}>
              Lihat Password
            </Checkbox>
            <Spacer y={4} />
            <Button
              disabled={navigation.state === 'submitting'}
              fullWidth
              type="submit"
              color="primary"
            >
              {navigation.state === 'submitting' ? (
                <Spinner color="default" />
              ) : (
                'Login'
              )}
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}
