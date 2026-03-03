import { Spinner } from '@nextui-org/react';

export function PersonLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
