// src/components/ui/data-table.tsx (Komponen DataTable Generik)
// Ini adalah komponen yang Anda dapatkan dari dokumentasi Shadcn UI + TanStack Table
// dan Anda kembangkan untuk menangani pagination, sorting, filtering, loading, dll.

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    // Props untuk pagination, sorting, filtering (server-side atau client-side)
    // Contoh:
    // pageCount?: number;
    // currentPage?: number;
    // onPaginationChange?: (page: number) => void;
    // onSortingChange?: (sorting: SortingState) => void;
    // globalFilter?: string;
    // onGlobalFilterChange?: (filter: string) => void;
    isLoading?: boolean;
    emptyMessage?: string;
    // ... props lain untuk kustomisasi umum
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading = false,
    emptyMessage = 'Tidak ada data yang ditemukan.',
    // ... destructure props lainnya
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // Jika pagination client-side
        getSortedRowModel: getSortedRowModel(), // Jika sorting client-side
        // ... tambahkan state dan setter untuk server-side pagination/sorting/filtering
        // state: {
        //   pagination: { pageIndex: currentPage, pageSize: 10 },
        //   sorting: [],
        //   globalFilter: globalFilter,
        // },
        // onPaginationChange: (updater) => onPaginationChange?.(typeof updater === 'function' ? updater(table.getState().pagination).pageIndex : updater.pageIndex),
        // manualPagination: true, // Penting untuk server-side pagination
        // manualSorting: true,    // Penting untuk server-side sorting
        // manualFiltering: true,  // Penting untuk server-side filtering
    });

    return (
        <div className="space-y-4">
            {/* Contoh: Input Pencarian Global (jika diimplementasikan di sini) */}
            {/* <Input
        placeholder="Cari semua kolom..."
        value={(table.getState().globalFilter ?? "") as string}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="max-w-sm"
      /> */}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Memuat data...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Contoh: Kontrol Pagination (jika diimplementasikan di sini) */}
            {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Berikutnya
        </Button>
      </div> */}
        </div>
    );
}
