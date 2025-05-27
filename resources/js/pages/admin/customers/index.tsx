import { buttonVariants } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Customer } from '@/types/customers';
import { Link } from '@inertiajs/react';
import { PlusIcon, UserRound } from 'lucide-react';

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

function Index({ customers }: { customers: Customer }) {
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
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page} />;

export default Index;
