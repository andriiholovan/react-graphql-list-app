import { Button } from '@heroui/react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-2">
      <div className="flex h-screen flex-col content-center items-center justify-center">
        <Button color="primary" isLoading={isLoading}>
          <Link
            onClick={() => setIsLoading(true)}
            to="/people"
            className="flex h-full w-full items-center justify-center"
            data-testid="home_start_button"
          >
            Jump to Star Wars characters list
          </Link>
        </Button>
      </div>
    </div>
  );
}
