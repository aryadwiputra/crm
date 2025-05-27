import { Button, buttonVariants } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Customer } from '@/types/customers';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, PlusIcon, UserRound } from 'lucide-react';
import { DataTable } from '../../../components/data-table/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Customers',
        href: '/admin/customers',
    },
];

function Index({ customers }: { customers: Customer[] }) {
    // Definisi kolom untuk tabel pelanggan
    const customerColumns: ColumnDef<Customer>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Nama
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'vat_number',
            header: 'VAT Number',
        },
        {
            accessorKey: 'phone',
            header: 'Telepon',
        },
        {
            accessorKey: 'created_at',
            header: 'Dibuat Pada',
            cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <Button variant="outline" size="sm" onClick={() => alert(`Edit ${row.original.name}`)}>
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {/* Menambahkan ikon user */}
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                                <UserRound /> <h1 className="text-2xl font-bold">Customers</h1>
                            </div>
                            <p className="text-muted-foreground text-sm">Show all customers data </p>{' '}
                        </div>
                    </div>
                </div>
                <Link href={route('admin.customers.create')} className={buttonVariants({ variant: 'default' })}>
                    <PlusIcon /> New customer
                </Link>
            </div>
            <div>
                <DataTable columns={customerColumns} data={customers} />
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page} />;

export default Index;
