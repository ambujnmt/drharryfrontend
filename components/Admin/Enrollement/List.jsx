import React, { useEffect, useMemo, useState } from "react";
import { Link, Select, SelectItem, Spinner } from "@heroui/react";
import { FaEye } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import Table from "../../Table/Table";
import PageTitle from "../../Breadcrumb/PageTitle";
import { getEnrollmentList } from "../../../utils/fetchApi";


export default function List() {
    const [enrollmentData, setEnrollmentData] = useState([]);
    const [allEnrollment, setAllEnrollment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
const [applicationTypeFilter, setApplicationTypeFilter] = useState("");

    const fetchEnrollment = async () => {
  try {
    setLoading(true);

    const res = await getEnrollmentList();

    if (res.status) {
      setEnrollmentData(res.data);
      setAllEnrollment(res.data);
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
  fetchEnrollment();
}, []);

useEffect(() => {
let filtered = [...allEnrollment];

if (statusFilter !== "") {
  filtered = filtered.filter(
    (item) => item.status === statusFilter
  );
}

if (applicationTypeFilter !== "") {
  filtered = filtered.filter(
    (item) => item.application_type === applicationTypeFilter
  );
}

setEnrollmentData(filtered);
}, [statusFilter, applicationTypeFilter, allEnrollment]);


const columns = useMemo(
  () => [
    {
      Header: "Student",
      accessor: "full_name",
      Cell: ({ row }) => (
        <div>
          <h6 className="mb-1 text-[15px] font-semibold text-[#0a2342]">
            {row.original.full_name}
          </h6>

          <p className="mb-0 text-[13px] text-gray-500">
            {row.original.qualification}
          </p>
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
      Header: "Gender",
      accessor: "gender",
    },
    {
  Header: "Application Type",
  accessor: "application_type",
  Cell: ({ value }) => (
    <span
      className={`px-3 py-2 rounded-full text-xs font-medium ${
        value === "Waitlist"
          ? "bg-blue-100 text-blue-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {value}
    </span>
  ),
},

  {
  Header: "Status",
  accessor: "status",
  Cell: ({ value }) => {
    const statusStyle =
      value === "Approved"
        ? "bg-green-100 text-green-700"
        : value === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";

    return (
      <span
        className={`px-3 py-2 rounded-full text-xs font-medium ${statusStyle}`}
      >
        {value}
      </span>
    );
  },
},


    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            href={`/admin/enrollement/detail/${row.original.id}`}
            className="w-9 h-9 rounded-lg bg-[#0a2342] text-white flex items-center justify-center"
          >
            <FaEye />
          </Link>
        </div>
      ),
    },
  ],
  []
);
   return (
  <div className="min-h-screen bg-[#F5F2EC] p-6">

    <Head title="Enrollment Enquiries" />

    <div className="mb-8">
      <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)]">
        Enrollment Enquiries
      </h1>

      <p className="text-[#505050] text-[14px] md:text-[14px] lg:text-[16px] mt-2">
        View and manage all enrollment enquiries.
      </p>
    </div>

    <PageTitle
      breadCrumbItems={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Enrollment Enquiries", active: true },
      ]}
      title="Enrollment Enquiries"
    />
{/* Filter Section */}

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
        Status
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

    <SelectItem key="Pending">
      Pending
    </SelectItem>

    <SelectItem key="Approved">
      Approved
    </SelectItem>

    <SelectItem key="Rejected">
      Rejected
    </SelectItem>

  </Select>

</div>
    {/* Table */}

    <div className="bg-white rounded-xl p-3 lg:p-4 shadow-md">

      <Table
        columns={columns}
        data={enrollmentData}
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
