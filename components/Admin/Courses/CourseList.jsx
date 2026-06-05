import React, { useMemo } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import Table from "../../Table/Table";

export default function CourseList() {
  const courseData = [
    {
      id: 1,
      image: "/assets/images/fea-img1.png",
      title: "Smile Design & Veneers",
      instructor: "Dr. Robert Chen",
      duration: "5 Days",
      investment: "$8,500",
      status: "Open",
      seats: "3 Seats Left",
    },
    {
      id: 2,
      image: "/assets/images/fea-img2.png",
      title: "Full Arch Mastery",
      instructor: "Dr. Michael Ross",
      duration: "7 Days",
      investment: "$12,000",
      status: "Open",
      seats: "2 Seats Left",
    },
    {
      id: 3,
      image: "/assets/images/fea-img3.png",
      title: "Implant Fundamentals",
      instructor: "Dr. Sarah Johnson",
      duration: "4 Days",
      investment: "$5,500",
      status: "Waitlist",
      seats: "0 Seats",
    },
   
  ];

  const columns = useMemo(
    () => [
      {
        Header: "Course",
        accessor: "title",
        Cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.image}
              alt=""
              className="w-[60px] h-[60px] rounded-lg object-cover"
            />
            <div>
              <h6 className="mb-1 text-[15px] font-semibold text-[#0a2342]">
                {row.original.title}
              </h6>
              <p className="mb-0 text-[13px] text-gray-500">
                {row.original.instructor}
              </p>
            </div>
          </div>
        ),
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Investment",
        accessor: "investment",
      },
      {
        Header: "Seats",
        accessor: "seats",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-2 rounded-full text-xs font-medium
            ${
              value === "Open"
                ? "bg-green-100 text-green-700"
                : value === "Full"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
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
      <Head title="Manage Courses" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[42px] text-[var(--secondary-color)]">
            Manage Courses
          </h1>

          <p className="text-[#505050] text-[16px] mt-2">
            View, manage and update all dental institute courses.
          </p>
        </div>

    
      </div>

    
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-8">
        <div className="grid lg:grid-cols-3 gap-4">
          <Input
            placeholder="Search by course title..."
              variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Search Course
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
          />

          <Select   variant="underlined"
                        label={
                            <span className="text-[#000] ">
                               Course Status
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}>
            <SelectItem key="open">Open</SelectItem>
            <SelectItem key="full">Full</SelectItem>
            <SelectItem key="waitlist">Waitlist</SelectItem>
          </Select>

          <Button className="bg-[var(--primary-color)] text-white h-[56px] mt-auto">
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Course Table */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <Table
          columns={columns}
          data={courseData}
          pageSize={10}
          pagination
          isSearchable
          isSortable
          tableClass="mb-0"
        />
      </div>

 
    </div>
  );
}