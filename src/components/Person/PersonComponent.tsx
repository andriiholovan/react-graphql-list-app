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
import PersonPendingComponent from './PersonPendingComponent';
import GlobalError from '../GlobalError';

export default function PersonComponent() {
  const { personId } = useParams({ from: '/people/$personId' });
  const { data, isLoading, error } = usePersonQuery(personId);

  if (isLoading) return <PersonPendingComponent />;

  if (error) return <GlobalError error={error} />;

  return (
    <div className="py-4 px-4">
      <Button color="primary">
        <Link
          to="/people"
          className="h-full flex w-full justify-center items-center"
          data-testid="back_to_people_list_link"
        >
          Back
        </Link>
      </Button>
      <div className="h-screen">
        <h2 className="text-xl text-center mb-2 font-black" data-testid="person_title">
          Character:
          {' '}
          {data?.name ?? 'n/a'}
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
