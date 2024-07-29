import { Button } from '@nextui-org/react';
import {
  ErrorComponent, ErrorComponentProps, Link, useRouter,
} from '@tanstack/react-router';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function GlobalError({ error }: Omit<ErrorComponentProps, 'reset'>) {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  const invalidateRoute = () => {
    router.invalidate();
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center content-center">
      <h2 className="mb-2 text-xl">
        Something went wrong
      </h2>
      <div className="flex gap-2">
        <Button color="danger" onClick={invalidateRoute}>
          Retry
        </Button>
        <Button color="primary">
          <Link to="/" className="h-full flex w-full justify-center items-center">
            Go home
          </Link>
        </Button>
      </div>
      <ErrorComponent error={error} />
    </div>
  );
}
