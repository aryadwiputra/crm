import { RequiredLabel } from '@/components/customs/required-label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Customers',
        href: '/admin/customers',
    },
    {
        title: 'Create',
        href: '/admin/create',
    },
];

function Create() {
    // Gunakan useForm dari Inertia
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        vat_number: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        provence: '',
        zip_code: '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setData(e.target.name as 'name' | 'vat_number' | 'phone' | 'website' | 'address' | 'city' | 'provence' | 'zip_code', e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('admin.customers.store'));
    }

    return (
        <>
            {/*
                Perubahan di sini:
                - 'flex-1': Memungkinkan div ini untuk mengisi ruang vertikal yang tersedia
                            di dalam parent flex-col-nya (dari AppLayout).
                - 'items-center': Memusatkan konten secara vertikal.
                - 'justify-center': Memusatkan konten secara horizontal.
            */}
            <div className="flex w-full flex-1 items-center justify-center">
                {/* Form Input Customer with Card */}
                {/*
                    Opsional: Tambahkan 'w-full max-w-md' ke Card.
                    - 'w-full': Memastikan Card mengambil lebar penuh dari container-nya.
                    - 'max-w-md': Membatasi lebar maksimum Card agar tidak terlalu lebar
                                  pada layar besar, yang seringkali lebih baik untuk form.
                */}
                <Card className="w-full md:w-[900px]">
                    <CardHeader>
                        <CardTitle>Add new customer</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <RequiredLabel htmlFor="name">Name</RequiredLabel>
                                    <Input id="name" name="name" onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="vat_number">VAT Number</Label>
                                    <Input id="vat_number" name="vat_number" onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.vat_number}</div>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <RequiredLabel htmlFor="phone">Phone</RequiredLabel>
                                    <Input id="phone" name="phone" type="tel" onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.phone}</div>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" name="website" onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.website}</div>}
                                </div>
                                {/* Address with textarea */}
                                <div className="flex flex-col space-y-1.5">
                                    <RequiredLabel htmlFor="address">Address</RequiredLabel>
                                    <Textarea id="address" name="address" className="textarea textarea-bordered h-24" onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.address}</div>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.city}</div>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="provence">Provence</Label>
                                    <Input id="provence" name="provence" onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.provence}</div>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="zip_code">Zip Code</Label>
                                    <Input id="zip_code" name="zip_code" onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.zip_code}</div>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="mt-3 flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Save
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}

Create.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} title="Create Customer" />;
export default Create;
