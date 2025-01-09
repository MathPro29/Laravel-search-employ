<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Illuminate\Response;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get search query and sanitize input to prevent issues
        $query = $request->input('search', '');

        // Get sort and order from the request
        $sortField = $request->input('sort', 'emp_no');
        $sortOrder = $request->input('order', 'asc');

        // Build the query
        $employees = DB::table('employees')
            ->where(function($queryBuilder) use ($query) {
                // Apply search to first and last names
                $queryBuilder->where('first_name', 'like', '%' . $query . '%')
                             ->orWhere('last_name', 'like', '%' . $query . '%')
                             ->orWhere('emp_no', '=', $query);
            })
            // Sort by the specified field, default to 'emp_no' if not provided
            ->orderBy($sortField, $sortOrder)
            // Paginate results
            ->paginate(10);

        // คืนค่า
        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'query' => $query,
            'sortField' => $sortField,
            'sortOrder' => $sortOrder,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
