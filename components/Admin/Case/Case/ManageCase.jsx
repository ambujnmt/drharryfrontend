import React, { useMemo, useEffect, useState } from "react";
import { Button, Input, Link, Select, SelectItem } from "@heroui/react";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Head } from "../../../../layouts/head";
import Table from "../../../Table/Table";
import { getCases } from "../../../../utils/fetchApi";
import { Spinner } from "@heroui/react";
import PageTitle from "../../../Breadcrumb/PageTitle";



export default function CaseList() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
const [caseData, setCaseData] = useState([]);
const [allCases, setAllCases] = useState([]);


const fetchCases = async () => {
  try {
    setLoading(true);

    const res = await getCases();

    if (res.status) {
      const mappedData = res.data.map((item) => ({
        ...item,

        category_name: item.category?.name || "-",

        treatment:
          item.treatment_weeks + " Weeks",

        status:
          item.status === 1
            ? "Active"
            : "Inactive",
      }));

      setAllCases(mappedData);

      setCaseData(mappedData);
    } else {
      setMessage(res.message);
    }
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchCases();
}, []);

  useEffect(() => {
    let filtered = [...allCases];

    if (statusFilter === "1") {
      filtered = filtered.filter(
        (item) => item.status === "Active"
      );
    } else if (statusFilter === "0") {
      filtered = filtered.filter(
        (item) => item.status === "Inactive"
      );
    }

    setCaseData(filtered);
  }, [statusFilter, allCases]);

const columns = useMemo(
  () => [
    {
      Header: "Case Title",

      accessor: "title",
    },

    {
      Header: "Category",

      accessor: "category_name",
    },

    {
      Header: "Doctor",

      accessor: "doctor",
    },

    {
      Header: "Treatment",

      accessor: "treatment",
    },

    {
      Header: "Status",

      accessor: "status",

      Cell: ({ value }) => (
        <span
          className={`px-3 py-2 rounded-full text-xs font-medium
          ${
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

      Cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            href={`/admin/case/case/caseDetail/${row.original.id}`}
            className="w-9 h-9 rounded-lg bg-[#0a2342] text-white flex items-center justify-center"
          >
            <FaEye />
          </Link>

          <Link
            href={`/admin/case/case/updateCase/${row.original.id}`}
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
      <Head title="Manage Courses" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-[42px] text-[var(--secondary-color)]">
             Manage Cases
          </h1>

          <p className="text-[#505050] text-[16px] mt-2">
            View, manage and update all clinical cases.
          </p>
        </div>

      </div>
     <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Manage Cases', active: true },
                ]}
                title="Manage Cases"
            />


      {/* Filters */}
      <div className="bg-white p-2 rounded-lg w-1/2  mb-6">

        <p className="mb-4">Filter</p>
        <Select
          selectedKeys={statusFilter ? [statusFilter] : [""]}
          onSelectionChange={(keys) =>
            setStatusFilter(Array.from(keys)[0])
          }
          variant="underlined"
          label={<span className="text-[#000]">Case Status</span>}
          classNames={{
            label: "text-[var(--text-color2)] h-[50px]",
            input: "text-[var(--secondary-color)] font-medium",
          }}
        >
          <SelectItem key="">All</SelectItem>
          <SelectItem key="1">Active</SelectItem>
          <SelectItem key="0">Inactive</SelectItem>
        </Select>


      </div>


      {message && (
        <div className="mb-4 text-red-700  text-center">
          {message}
        </div>
      )}
      {/* Course Table */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" color="warning" />
          </div>
        ) : (
          <Table
            columns={columns}
            data={caseData}
            pageSize={5}
            pagination
            isSearchable
            isSortable
            tableClass="mb-0"
          />
        )}
      </div>


    </div>
  );
}