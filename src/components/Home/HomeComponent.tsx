import { Button } from '@nextui-org/react';
import { Link } from '@tanstack/react-router';

export default function HomeComponent() {
  return (
    <div className="p-2">
      <div className="h-screen flex flex-col justify-center items-center content-center">
        <Button color="primary">
          <Link to="/people" className="h-full flex w-full justify-center items-center">
            Jump to Star Wars characters list
          </Link>
        </Button>
      </div>
    </div>
  );
}
