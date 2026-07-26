import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useCanGoBack, useParams, useRouter } from '@tanstack/react-router';

import { usePersonQuery } from '../../hooks/use-person-query';
import { BackArrowIcon } from '../back-arrow-icon';
import { PersonSkeleton } from './person-skeleton';

export function Person() {
  const { personId } = useParams({ from: '/person/$personId' });
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { data, isLoading, error } = usePersonQuery(personId);

  if (isLoading) return <PersonSkeleton />;
  if (error) throw error;

  const handleBack = () => {
    if (canGoBack) {
      router.history.back();
    } else {
      router.navigate({ to: '/people/$page', params: { page: '1' } });
    }
  };

  return (
    <div className="px-4 py-4">
      <Button
        isIconOnly
        onPress={handleBack}
        startContent={<BackArrowIcon />}
        data-testid="back_to_people_list_link"
      />
      <div className="h-screen">
        <h2
          className="mb-6 text-center font-black text-xl"
          data-testid="person_title"
        >
          <span className="font-normal">Character:</span> {data?.name ?? 'n/a'}
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
