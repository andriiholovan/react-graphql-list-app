import { Card, Skeleton } from '@heroui/react';

const SKELETON_ELEMENTS_MAPPER = [...Array(10)].map(() => Math.random() * 10);

export function PeopleSkeleton() {
  return (
    <div className="flex h-dvh flex-col gap-4 p-4">
      <Skeleton className="mt-1 rounded-lg">
        <div className="h-10 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="flex justify-between rounded-lg">
        <Skeleton className="w-1/12 rounded-lg">
          <div className="h-3 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-1/12 rounded-lg">
          <div className="h-3 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
      <Card className="h-full gap-6 p-4" radius="lg">
        {SKELETON_ELEMENTS_MAPPER.map((_) => (
          <div key={_}>
            <Skeleton className="mb-2 rounded-lg">
              <div className="h-10 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        ))}
      </Card>
    </div>
  );
}
