import { Button } from '@heroui/react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import {
  ErrorComponent,
  type ErrorComponentProps,
  Link,
  useRouter,
} from '@tanstack/react-router';
import { useEffect } from 'react';

export function GlobalError({ error }: Omit<ErrorComponentProps, 'reset'>) {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  const invalidateRoute = () => {
    router.invalidate();
  };

  return (
    <div className="flex h-screen flex-col content-center items-center justify-center">
      <h2 className="mb-2 text-xl">Something went wrong</h2>
      <div className="flex gap-2">
        <Button color="danger" onClick={invalidateRoute}>
          Retry
        </Button>
        <Button color="primary">
          <Link
            to="/"
            className="flex h-full w-full items-center justify-center"
          >
            Go home
          </Link>
        </Button>
      </div>
      <ErrorComponent error={error} />
    </div>
  );
}
