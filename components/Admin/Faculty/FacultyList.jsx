import React, { useMemo } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import Table from "../../Table/Table";

export default function FacultyList() {

  const facultyData = [
    {
      id: 1,
      image: "/assets/Images/doctor1.png",
      name: "Dr. Sarah Mitchell",
      role: "Founder & Clinical Director",
      specialization: "Aesthetic Dentistry",
      qualification: "DDS, MS, AAACD",
      status: "Active",
    },
    {
      id: 2,
      image: "/assets/Images/doctor2.png",
      name: "Dr. James Chen",
      role: "Implant Specialist",
      specialization: "Full Arch Rehabilitation",
      qualification: "DDS, MSc",
      status: "Active",
    },
    {
      id: 3,
      image: "/assets/Images/doctor1.png",
      name: "Dr. Emily Watson",
      role: "Faculty Instructor",
      specialization: "Smile Design",
      qualification: "DDS, BDS",
      status: "Inactive",
    },
    {
      id: 4,
      image: "/assets/Images/doctor2.png",
      name: "Dr. Michael Ross",
      role: "Clinical Mentor",
      specialization: "Implant Dentistry",
      qualification: "DDS",
      status: "Active",
    },
    {
      id: 5,
      image: "/assets/Images/doctor1.png",
      name: "Dr. Andrew Miller",
      role: "Faculty Instructor",
      specialization: "Digital Dentistry",
      qualification: "DDS, MSc",
      status: "Active",
    },
    {
      id: 6,
      image: "/assets/Images/doctor2.png",
      name: "Dr. Emma Wilson",
      role: "Smile Design Mentor",
      specialization: "Cosmetic Dentistry",
      qualification: "DDS",
      status: "Inactive",
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "Faculty",
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
                {row.original.role}
              </p>
            </div>
          </div>
        ),
      },

      {
        Header: "Specialization",
        accessor: "specialization",
      },

      {
        Header: "Qualification",
        accessor: "qualification",
      },

      {
        Header: "Role",
        accessor: "role",
      },

      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-2 rounded-full text-xs font-medium ${
              value === "Active"
                ? "bg-green-100 text-green-700"
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
      <div className="mb-8">
        <h1 className="text-[42px] text-[var(--secondary-color)]">
          Manage Faculty
        </h1>

        <p className="text-[#505050] text-[16px] mt-2">
          View, manage and update all faculty members.
        </p>
      </div>

    

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-8">
        <div className="grid lg:grid-cols-3 gap-4">

          <Input
            placeholder="Search by faculty..."
            variant="underlined"
            label={<span>Search Faculty</span>}
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",
            }}
          />

          <Select
            variant="underlined"
            label={<span>Faculty Status</span>}
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",
            }}
          >
            <SelectItem key="active">
              Active
            </SelectItem>

            <SelectItem key="inactive">
              Inactive
            </SelectItem>
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
          data={facultyData}
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