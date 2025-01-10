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
    // รับค่าค้นหาจากคำขอ และตั้งค่าเริ่มต้นเป็นค่าว่าง ('') หากไม่มีการส่งค่ามา
    $query = $request->input('search', '');

    // รับค่าฟิลด์ที่จะใช้ในการจัดเรียง (sort) และทิศทางการเรียงลำดับ (order)
    $sortField = $request->input('sort', 'emp_no');
    // หากไม่ได้ส่งค่ามา จะใช้ค่าเริ่มต้นเป็น 'emp_no' และเรียงจากน้อยไปมาก ('asc')
    $sortOrder = $request->input('order', 'asc');

    // สร้างคำสั่ง Query เพื่อดึงข้อมูลจากตาราง employees
    $employees = DB::table('employees')
        ->where(function($queryBuilder) use ($query) {
            // เพิ่มเงื่อนไขการค้นหา:
            // ค้นหาในฟิลด์ first_name หรือ last_name โดยใช้คำที่ผู้ใช้กรอก (search)
            // หรือค้นหาในฟิลด์ emp_no ที่มีค่าเท่ากับคำค้น (search)
            $queryBuilder->where('first_name', 'like', '%' . $query . '%')
                         ->orWhere('last_name', 'like', '%' . $query . '%')
                         ->orWhere('emp_no', '=', $query)
                         ->orWhere('birth_date', '=', $query);
        })
        // เรียงลำดับข้อมูลตามฟิลด์ที่ระบุ โดยค่าเริ่มต้นจะใช้ 'emp_no'
        // เรียงลำดับจากน้อยไปมาก ('asc') หรือจากมากไปน้อย ('desc') ตามที่ผู้ใช้กำหนด
        ->orderBy($sortField, $sortOrder)
        // แบ่งหน้าผลลัพธ์ โดยกำหนดให้แสดงหน้าละ 10 รายการ
        ->paginate(10);

    // ส่งข้อมูลไปยัง  React component ผ่าน Inertia
    // 'employees' คือข้อมูลพนักงานที่ได้จาก Query (รวมข้อมูลการแบ่งหน้า)
    // 'query' คือคำค้นที่ผู้ใช้กรอก
    // 'sortField' และ 'sortOrder' คือข้อมูลการจัดเรียงที่ผู้ใช้ระบุ
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
