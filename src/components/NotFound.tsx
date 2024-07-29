import { Button } from '@nextui-org/react';
import { Link } from '@tanstack/react-router';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center content-center">
      <h2 className="mb-2 text-xl">
        Page not found
      </h2>
      <Button color="danger">
        <Link to="/" className="h-full flex w-full justify-center items-center">
          Start Over
        </Link>
      </Button>
    </div>
  );
}
