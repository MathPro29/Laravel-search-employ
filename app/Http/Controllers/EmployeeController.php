<?php

namespace App\Http\Controllers;


use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        public function index(Request $request)
    {
        $query = $request->input('search'); // รับค่าจาก URL
        $order = $request->input('order', 'asc'); // รับการเรียงลำดับจาก URL (ค่า default คือ 'asc')

        $employees = DB::table('employees')
            ->where('emp_no', 'like', "%{$query}%")  // ค้นหาจาก ID
            ->orWhere('first_name', 'like', "%{$query}%")  // ค้นหาจาก first_name
            ->orWhere('last_name', 'like', "%{$query}%")  // ค้นหาจาก last_name
            ->orderBy('emp_no', $order) // การเรียงลำดับตาม emp_no
            ->paginate(10);

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'query' => $query,  // ส่ง query กลับไปยัง React component
            'order' => $order,  // ส่งการเรียงลำดับกลับไปยัง React component
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
