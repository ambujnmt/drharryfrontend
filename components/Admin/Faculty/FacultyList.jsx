import React, { useMemo, useEffect, useState } from "react"; import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import Table from "../../Table/Table";
import PageTitle from "../../Breadcrumb/PageTitle";
import { getFaculty } from "../../../utils/fetchApi";
import { Spinner, Link } from "@heroui/react";

export default function FacultyList() {
  const [facultyData, setFacultyData] = useState([]);
  const [allFaculty, setAllFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchFaculty = async () => {

    try {

      setLoading(true);

      const res = await getFaculty();

      if (res.status) {

        const mappedData = res.faculty.map((item) => ({

          ...item,

          role: item.designation,

          status: item.status == 1 ? "Active" : "Inactive",

        }));

        setFacultyData(mappedData);

        setAllFaculty(mappedData);

      } else {

        setMessage(res.message);

      }

    }

    catch (error) {

      setMessage(error.message);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchFaculty();

  }, []);


  useEffect(() => {

    let filtered = [...allFaculty];

    if (statusFilter === "1") {

      filtered = filtered.filter(

        (item) => item.status === "Active"

      );

    }

    else if (statusFilter === "0") {

      filtered = filtered.filter(

        (item) => item.status === "Inactive"

      );

    }

    setFacultyData(filtered);

  }, [statusFilter, allFaculty]);



  const columns = useMemo(
    () => [
      {
        Header: "Faculty",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center gap-3">


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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
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
            className={`px-3 py-2 rounded-full text-xs font-medium ${value === "Active"
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
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <Link

              href={`/admin/faculty/facultyDetail/${row.original.id}`}
              className="w-9 h-9 rounded-lg bg-[#0a2342] text-white flex items-center justify-center"
            >
              <FaEye />
            </Link>

            <Link

              href={`/admin/faculty/facultyUpdate/${row.original.id}`}
              className="w-9 h-9 rounded-lg bg-[#c8a96a] text-white flex items-center justify-center"
            >
              <FaEdit />
            </Link>


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
        <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)]">
          Manage Faculty
        </h1>

        <p className="text-[#505050] text-[14px] md:text-[14px] lg:text-[16px] mt-2">
          View, manage and update all faculty members.
        </p>
      </div>

      <PageTitle
        breadCrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Manage Faculty', active: true },
        ]}
        title="Manage Faculty"
      />


{/* Filters */}
<div className="bg-white p-4 rounded-lg w-full sm:w-1/2 mb-6">

  <p className="mb-4 text-[var(--secondary-color)] font-medium">
    Filter
  </p>

  <Select
    selectedKeys={statusFilter ? [statusFilter] : [""]}
    onSelectionChange={(keys) =>
      setStatusFilter(Array.from(keys)[0])
    }
    variant="underlined"
    label={
      <span className="text-[#000]">
        Course Status
      </span>
    }
    classNames={{
      label: "text-[var(--text-color2)] h-[50px]",
      input: "text-[var(--secondary-color)] font-medium",
    }}
  >
    <SelectItem key="">
      All
    </SelectItem>

    <SelectItem key="1">
      Active
    </SelectItem>

    <SelectItem key="0">
      Inactive
    </SelectItem>

  </Select>

</div>

      {/* Table */}
      <div className="bg-white rounded-xl p-3 lg:p-4  shadow-md">
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