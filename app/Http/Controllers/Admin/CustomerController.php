<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();

        return Inertia::render("admin/customers/index", compact("customers"));
    }

    public function create()
    {
        return Inertia::render("admin/customers/create");
    }

    public function store(Request $request)
    {
        $request->validate([
            "name" => "required",
            "vat_number" => "nullable",
            "phone" => "required",
            "website" => "nullable",
            "address" => "required",
            "city" => "nullable",
            "provence" => "nullable",
            "zip_code" => "nullable",
        ]);

        Customer::create($request->all());

        return to_route("admin.customers.index")->with("success", "Customer created successfully");
    }


    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->back()->with('success', 'Customer deleted successfully.');
    }
}
