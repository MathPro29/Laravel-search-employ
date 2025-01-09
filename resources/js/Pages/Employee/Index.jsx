import { router } from '@inertiajs/react';
import { useState } from 'react';

// Component สำหรับแสดงรายการพนักงาน พร้อมฟังก์ชันค้นหา จัดเรียง และแบ่งหน้า
export default function Index({ employees, query, sortField, sortOrder }) {
    // สถานะสำหรับการค้นหา
    const [search, setSearch] = useState(query || '');
    // สถานะสำหรับการจัดเรียง (field และ order)
    const [sort, setSort] = useState({ field: sortField || 'emp_no', order: sortOrder || 'asc' });

    // ฟังก์ชันสำหรับการค้นหา
    const handleSearch = (e) => {
        e.preventDefault(); // ป้องกันการ reload หน้า
        // เรียก router.get เพื่อส่ง request ไป backend พร้อม query
        router.get('/employees', { search, sort: sort.field, order: sort.order });
    };

    // ฟังก์ชันสำหรับรีเซ็ตการค้นหาและการจัดเรียงกลับเป็นค่าเริ่มต้น
    const handleReset = () => {
        setSearch(''); // ล้างค่า search
        setSort({ field: 'emp_no', order: 'asc' }); // ตั้งค่าการจัดเรียงเป็นค่าเริ่มต้น
        router.get('/employees', { search: '', sort: 'emp_no', order: 'asc' });
    };

    // ฟังก์ชันสำหรับการแบ่งหน้า (ไปหน้าถัดไปหรือก่อนหน้า)
    const handlePagination = (url) => {
        if (url) {
            // ส่ง request ไปยัง URL ของหน้าที่เลือก พร้อมค่าการค้นหาและจัดเรียง
            router.get(url, { search, sort: sort.field, order: sort.order });
        }
    };

    // ฟังก์ชันสำหรับเปลี่ยนลำดับการจัดเรียง
    const handleSort = (field) => {
        // หาก field เดิมถูกเลือก ให้สลับลำดับ (asc <-> desc)
        const order = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
        setSort({ field, order }); // อัปเดตสถานะการจัดเรียง
        router.get('/employees', { search, sort: field, order }); // ส่ง request ไป backend
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            {/* หัวข้อหน้า */}
            <h1 className="text-3xl font-bold mb-6">Employee List</h1>

            {/* ฟอร์มค้นหา */}
            <form onSubmit={handleSearch} className="mb-6 flex gap-2 w-full max-w-4xl">
                <input
                    type="text"
                    value={search} // ค่าที่ผู้ใช้ป้อนในช่องค้นหา
                    onChange={(e) => setSearch(e.target.value)} // อัปเดต search state
                    className="flex-grow border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-2 focus:border-none focus:ring-red-500 focus:outline-none"
                    placeholder="Search by ID, First Name, Last Name"
                />
                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={handleReset} // รีเซ็ตค่าการค้นหาและการจัดเรียง
                    className="bg-none text-red-500 border-solid px-4 py-2 rounded shadow hover:bg-red-600 hover:text-white transition duration-300 focus:ring-2 focus:ring-gray-500"
                >
                    Reset
                </button>
            </form>

            {/* ตารางรายการพนักงาน */}
            {employees.data.length > 0 ? (
                <div className="w-full max-w-7xl">
                    <table className="w-full border-collapse border border-gray-300 text-center">
                        <thead className="bg-gray-200">
                            <tr>
                                {/* หัวคอลัมน์ที่สามารถคลิกเพื่อจัดเรียงได้ */}
                                <th
                                    onClick={() => handleSort('emp_no')} // เรียงตาม ID
                                    className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    ID {sort.field === 'emp_no' && (sort.order === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    onClick={() => handleSort('first_name')} // เรียงตาม First Name
                                    className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    First Name {sort.field === 'first_name' && (sort.order === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    onClick={() => handleSort('last_name')} // เรียงตาม Last Name
                                    className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    Last Name {sort.field === 'last_name' && (sort.order === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    onClick={() => handleSort('birth_date')} // เรียงตามวันเกิด
                                    className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    Birth Date {sort.field === 'birth_date' && (sort.order === 'asc' ? '↑' : '↓')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* แสดงรายการพนักงาน */}
                            {employees.data.map((employee) => (
                                <tr key={employee.emp_no} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{employee.emp_no}</td>
                                    <td className="border border-gray-300 px-4 py-2">{employee.first_name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{employee.last_name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{employee.birth_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* การแบ่งหน้า */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => handlePagination(employees.prev_page_url)} // ไปหน้าก่อนหน้า
                            disabled={!employees.prev_page_url} // ปิดการใช้งานหากไม่มีหน้าก่อนหน้า
                            className={`px-4 py-2 rounded font-medium shadow ${employees.prev_page_url
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            aria-label="Previous page"
                        >
                            Previous
                        </button>
                        <span className="text-gray-600 font-medium">
                            Page {employees.current_page} of {employees.last_page}
                        </span>
                        <button
                            onClick={() => handlePagination(employees.next_page_url)} // ไปหน้าถัดไป
                            disabled={!employees.next_page_url} // ปิดการใช้งานหากไม่มีหน้าถัดไป
                            className={`px-4 py-2 rounded font-medium shadow ${employees.next_page_url
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            aria-label="Next page"
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                // กรณีไม่มีข้อมูลพนักงาน
                <p className="text-gray-500 text-center mt-6">No employees found.</p>
            )}
        </div>
    );
}
