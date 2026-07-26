import { Skeleton } from '@heroui/react';

export function PersonSkeleton() {
  return (
    <div className="flex h-dvh flex-col gap-2 p-4">
      <Skeleton className="w-10 rounded-lg">
        <div className="h-10 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="mx-auto mb-6 w-80 rounded-lg">
        <div className="h-8 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 rounded-lg">
          <div className="h-10 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="h-10 rounded-lg">
          <div className="h-10 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </div>
  );
}
