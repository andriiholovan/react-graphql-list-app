import { Button } from '@nextui-org/react';
import { Link } from '@tanstack/react-router';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col content-center items-center justify-center">
      <h2 className="mb-4 text-xl" data-testid="not_found_heading">
        Page not found
      </h2>
      <Button color="danger">
        <Link
          to="/"
          className="flex h-full w-full items-center justify-center"
          data-testid="start_over_link"
        >
          Start Over
        </Link>
      </Button>
    </div>
  );
}
