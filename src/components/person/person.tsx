import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { Link, useParams } from '@tanstack/react-router';

import { usePersonQuery } from '../../hooks/usePersonQuery';
import { GlobalError } from '../global-error';
import { PersonLoader } from './person-loader';

export function Person() {
  const { personId } = useParams({ from: '/people/$personId' });
  const { data, isLoading, error } = usePersonQuery(personId);

  if (isLoading) return <PersonLoader />;
  if (error) return <GlobalError error={error} />;

  return (
    <div className="px-4 py-4">
      <Button color="primary">
        <Link
          to="/people"
          className="flex h-full w-full items-center justify-center"
          data-testid="back_to_people_list_link"
        >
          Back
        </Link>
      </Button>
      <div className="h-screen">
        <h2
          className="mb-2 text-center font-black text-xl"
          data-testid="person_title"
        >
          Character: {data?.name ?? 'n/a'}
        </h2>
        <Table aria-label="Detailed character information table">
          <TableHeader>
            <TableColumn>HEIGHT</TableColumn>
            <TableColumn>MASS</TableColumn>
            <TableColumn>BIRTH YEAR</TableColumn>
            <TableColumn>EYE COLOR</TableColumn>
            <TableColumn>HAIR COLOR</TableColumn>
            <TableColumn>GENDER</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{data?.height ?? 'n/a'}</TableCell>
              <TableCell>{data?.mass ?? 'n/a'}</TableCell>
              <TableCell>{data?.birthYear ?? 'n/a'}</TableCell>
              <TableCell>{data?.eyeColor ?? 'n/a'}</TableCell>
              <TableCell>{data?.hairColor ?? 'n/a'}</TableCell>
              <TableCell>{data?.gender ?? 'n/a'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
