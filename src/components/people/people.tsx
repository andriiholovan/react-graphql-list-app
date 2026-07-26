import {
  cn,
  Input,
  Pagination,
  type SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { type Key, useCallback, useMemo, useState } from 'react';

import type { PersonType } from '../../api';
import { useDebounce, usePeopleQuery } from '../../hooks';
import { SearchIcon } from '../search-icon';
import { columns } from './constants';

export function People() {
  const { page } = useParams({ from: '/people/$page' });
  const navigate = useNavigate();

  const pageNumber = Number.isNaN(Number(page)) ? 1 : Number(page);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState('');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: '',
    direction: 'ascending',
  });

  const debouncedFilter = useDebounce(filterValue, 300);

  const { data, isFetching } = usePeopleQuery({
    offset: (pageNumber - 1) * rowsPerPage,
    limit: rowsPerPage,
    filter: debouncedFilter || undefined,
    sortBy: String(sortDescriptor.column),
    sortDirection: sortDescriptor.direction,
  });

  const people = isFetching ? [] : (data?.people ?? []);
  const pages = data ? Math.ceil(data.totalCount / rowsPerPage) : 0;

  const goToFirstPage = useCallback(() => {
    navigate({ to: '/people/$page', params: { page: '1' } });
  }, [navigate]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      goToFirstPage();
    },
    [goToFirstPage],
  );

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value || '');
  }, []);

  const onSearchClear = useCallback(() => {
    setFilterValue('');
  }, []);

  const onSortChange = useCallback(
    (descriptor: SortDescriptor) => {
      setSortDescriptor(descriptor);
      goToFirstPage();
    },
    [goToFirstPage],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({ to: '/people/$page', params: { page: String(newPage) } });
    },
    [navigate],
  );

  const onRowAction = useCallback(
    (key: Key) =>
      navigate({
        to: '/person/$personId',
        params: { personId: key as string },
      }),
    [navigate],
  );

  const topContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            data-testid="search_input"
            isClearable
            className="w-full"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onSearchClear}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex items-center justify-between">
          {data?.totalCount ? (
            <span className="text-default-400 text-small">
              Total {data.totalCount} people
            </span>
          ) : null}

          <label
            className="ml-auto flex items-center text-default-400 text-small"
            htmlFor="rows-select"
          >
            Rows per page:
            <select
              className="cursor-pointer bg-transparent text-default-400 text-small outline-none"
              id="rows-select"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    ),
    [
      filterValue,
      onSearchClear,
      onSearchChange,
      onRowsPerPageChange,
      data?.totalCount,
    ],
  );

  const bottomContent = useMemo(
    () => (
      <div className="flex items-center justify-center px-2 py-2">
        <Pagination
          data-testid="pagination_group"
          classNames={{ item: 'cursor-pointer' }}
          color="primary"
          page={pageNumber}
          total={pages}
          onChange={handlePageChange}
          showShadow={Boolean(people.length)}
          showControls={Boolean(people.length)}
        />
      </div>
    ),
    [pageNumber, pages, people.length, handlePageChange],
  );

  return (
    <Table
      data-testid="main_table"
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      isStriped
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: 'h-dvh px-4 py-4',
        wrapper: 'h-full min-h-96',
        table: cn(
          people.length >= rowsPerPage && !isFetching && 'h-full',
          '[border-collapse:separate] [border-spacing:0_4px]',
        ),
        tr: 'cursor-pointer',
      }}
      onRowAction={onRowAction}
      onSortChange={onSortChange}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn allowsSorting key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={people}
        isLoading={isFetching}
        emptyContent="No people found"
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {item[columnKey as keyof PersonType] ?? 'n/a'}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
