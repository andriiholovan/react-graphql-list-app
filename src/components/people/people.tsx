import {
  Button,
  Input,
  Pagination,
  type SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useCallback, useMemo, useState } from 'react';

import { type PersonType, peopleQuery } from '../../api';
import { SearchIcon } from '../search-icon';
import { columns } from './constants';

export function People() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState('');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });
  const hasSearchFilter = Boolean(filterValue);

  const { data } = useSuspenseQuery(peopleQuery);
  const { people } = data;

  const filteredItems = useMemo(() => {
    let filteredUsers = [...people];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredUsers;
  }, [people, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a: PersonType, b: PersonType) => {
        const first = a[sortDescriptor.column as keyof PersonType] as number;
        const second = b[sortDescriptor.column as keyof PersonType] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      }),
    [sortDescriptor, items],
  );

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            Total {people.length} people
          </span>
          <label
            className="flex items-center text-default-400 text-small"
            htmlFor="rows-select"
          >
            Rows per page:
            <select
              className="bg-transparent text-default-400 text-small outline-none"
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
    [filterValue, onClear, onSearchChange, onRowsPerPageChange, people.length],
  );

  const bottomContent = useMemo(
    () => (
      <div className="flex items-center justify-center px-2 py-2">
        <Pagination
          data-testid="pagination_group"
          className="justify-center"
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
          showShadow={!!filteredItems.length}
          showControls={!!filteredItems.length}
        />
      </div>
    ),
    [page, pages, filteredItems.length],
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
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align="start"
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No people found" items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              const renderedValue = item[columnKey as keyof PersonType];
              return (
                <TableCell>
                  {columnKey === 'details' ? (
                    <Button>
                      <Link
                        to="/people/$personId"
                        params={{
                          personId: item.id,
                        }}
                        className="flex h-full w-full items-center justify-center"
                        data-testid="more_details_button"
                      >
                        See more
                      </Link>
                    </Button>
                  ) : (
                    renderedValue
                  )}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
