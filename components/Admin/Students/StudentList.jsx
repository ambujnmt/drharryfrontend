import React, { useMemo } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import Table from "../../Table/Table";

export default function StudentList() {

 const studentData = [
  {
    id: 1,
    image: "/assets/Images/student-1.jpg",
    name: "John Anderson",
    course: "Smile Design & Veneers",
    studentId: "STU-1001",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 2,
    image: "/assets/Images/student-1.jpg",
    name: "Emma Wilson",
    course: "Full Arch Mastery",
    studentId: "STU-1002",
    email: "emma@example.com",
    status: "Active",
  },
  {
    id: 3,
    image: "/assets/Images/student-1.jpg",
    name: "Michael Brown",
    course: "Implant Fundamentals",
    studentId: "STU-1003",
    email: "michael@example.com",
    status: "Completed",
  },
  {
    id: 4,
    image: "/assets/Images/student-1.jpg",
    name: "Sophia Davis",
    course: "Digital Dentistry",
    studentId: "STU-1004",
    email: "sophia@example.com",
    status: "Active",
  },
  {
    id: 5,
    image: "/assets/Images/student-1.jpg",
    name: "Daniel Smith",
    course: "Advanced Veneers",
    studentId: "STU-1005",
    email: "daniel@example.com",
    status: "Inactive",
  },
  {
    id: 6,
    image: "/assets/Images/student-1.jpg",
    name: "Olivia Taylor",
    course: "Aesthetic Occlusion",
    studentId: "STU-1006",
    email: "olivia@example.com",
    status: "Active",
  },
];

const columns = useMemo(
  () => [
    {
      Header: "Student",
      accessor: "name",
      Cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.image}
            alt=""
            className="w-[60px] h-[60px] rounded-lg object-cover"
          />

          <div>
            <h6 className="mb-1 text-[15px] font-semibold text-[#0a2342]">
              {row.original.name}
            </h6>

            <p className="mb-0 text-[13px] text-gray-500">
              {row.original.studentId}
            </p>
          </div>
        </div>
      ),
    },

    {
      Header: "Course",
      accessor: "course",
    },

    {
      Header: "Student ID",
      accessor: "studentId",
    },

    {
      Header: "Email",
      accessor: "email",
    },

    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <span
          className={`px-3 py-2 rounded-full text-xs font-medium ${
            value === "Active"
              ? "bg-green-100 text-green-700"
              : value === "Completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },

    {
      Header: "Actions",
      accessor: "actions",
      Cell: () => (
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-lg bg-[#0a2342] text-white flex items-center justify-center">
            <FaEye />
          </button>

          <button className="w-9 h-9 rounded-lg bg-[#c8a96a] text-white flex items-center justify-center">
            <FaEdit />
          </button>

          <button className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center">
            <FaTrash />
          </button>
        </div>
      ),
    },
  ],
  []
);

  return (
    <div className="min-h-screen bg-[#F5F2EC] p-6">
      <Head title="Manage Faculty" />

      {/* Header */}
   <Head title="Manage Students" />

<h1 className="text-[42px] text-[var(--secondary-color)]">
  Manage Students
</h1>

<p className="text-[#505050] text-[16px] mt-2">
  View, manage and update all enrolled students.
</p>

    

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-8">
        <div className="grid lg:grid-cols-3 gap-4">

          <Input
  placeholder="Search by student..."
  variant="underlined"
  label={<span>Search Student</span>}
  classNames={{
    label: "text-[var(--text-color2)] h-[50px]",
    input: "text-[var(--secondary-color)] font-medium",
  }}
/>

<Select
  variant="underlined"
  label={<span>Student Status</span>}
  classNames={{
    label: "text-[var(--text-color2)] h-[50px]",
    input: "text-[var(--secondary-color)] font-medium",
  }}
>
  <SelectItem key="active">Active</SelectItem>
  <SelectItem key="completed">Completed</SelectItem>
  <SelectItem key="inactive">Inactive</SelectItem>
</Select>
          <Button className="bg-[var(--primary-color)] text-white h-[56px] mt-auto">
            Apply Filters
          </Button>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl p-4 shadow-md">
      <Table
  columns={columns}
  data={studentData}
  pageSize={5}
  pagination
  isSearchable
  isSortable
  tableClass="mb-0"
/>
      </div>

    </div>
  );
}