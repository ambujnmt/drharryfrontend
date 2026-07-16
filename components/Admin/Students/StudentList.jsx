import React, { useMemo, useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import Table from "../../Table/Table";
import { getUsers } from "../../../utils/fetchApi";
import PageTitle from "../../Breadcrumb/PageTitle";

export default function StudentList() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    fetchUsers();

  }, []);



  const fetchUsers = async () => {

    try {

      setLoading(true);

      const res = await getUsers();


      if (res.status) {

        setStudentData(res.data);

      }


    }
    catch (error) {

      console.log(error);

    }
    finally {

      setLoading(false);

    }

  };


  const columns = useMemo(
    () => [
      {
        Header: "Student",
        accessor: "name",
        Cell: ({ row }) => (
          <div>
            <h6 className="mb-1 text-[15px] font-semibold text-[#0a2342]">
              {row.original.name}
            </h6>


          </div>
        ),
      },


      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "Role",
        accessor: "role",
      },


      {
        Header: "Status",
        accessor: "is_verified",

        Cell: ({ value }) => (
          <span
            className={`px-3 py-2 rounded-full text-xs font-medium ${value
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >

            {value ? "Verified" : "Not Verified"}

          </span>
        )
      },

      // {
      //   Header: "Actions",
      //   accessor: "actions",
      //   Cell: () => (
      //     <div className="flex gap-2">
      //       <button className="w-9 h-9 rounded-lg bg-[#0a2342] text-white flex items-center justify-center">
      //         <FaEye />
      //       </button>

      //       <button className="w-9 h-9 rounded-lg bg-[#c8a96a] text-white flex items-center justify-center">
      //         <FaEdit />
      //       </button>

      //       <button className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center">
      //         <FaTrash />
      //       </button>
      //     </div>
      //   ),
      // },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#F5F2EC] p-6">
      <Head title="Manage Faculty" />

      {/* Header */}
      <Head title="Manage Students" />

      <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)]">
        Manage Students
      </h1>

      <p className="text-[#505050] text-[12px] md:text-[12px] lg:text-[16px] mt-2">
        View, manage and update all enrolled students.
      </p>

      <PageTitle
        breadCrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Manage Students', active: true },
        ]}
        title="Manage Students"
      />

      {/* Filters */}
      {/* <div className="bg-white rounded-xl p-3 md:p-5 lg:p-6 shadow-md mb-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-5">

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

    <Button
      className="
        w-full
        md:w-auto
        lg:w-full
        bg-[var(--primary-color)]
        text-white
        h-[40px]
        md:h-[48px]
        lg:h-[56px]
        self-end
      "
    >
      Apply Filters
    </Button>

  </div>
</div> */}

      {/* Table */}
      <div className="bg-white rounded-xl p-3 lg:p-4 shadow-md">
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