import React, { useEffect, useMemo, useState } from "react";
import { Link, Spinner } from "@heroui/react";
import Table from "../../../components/Table/Table";
import PageTitle from "../../../components/Breadcrumb/PageTitle";
import { FaEdit, FaEye } from "react-icons/fa";
import { getPlans } from "../../../utils/fetchApi";


export default function SubsPlan() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPlans = async () => {
        try {
            setLoading(true);

            const res = await getPlans();

            if (res?.status) {
                setPlans(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: "Plan Name",
                accessor: "name",
            },

            {
                Header: "Price",
                accessor: "price",

                Cell: ({ value }) => (
                    <span className="font-medium">
                        ${value}
                    </span>
                ),
            },

            {
                Header: "Duration",
                accessor: "duration",
            },

            {
                Header: "Popular",

                accessor: "is_popular",

                Cell: ({ value }) => (
                    <span
                        className={`px-3 py-2 rounded-full text-xs ${value
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {value ? "Yes" : "No"}
                    </span>
                ),
            },

            {
                Header: "Status",

                accessor: "status",

                Cell: ({ value }) => (
                    <span
                        className={`px-3 py-2 rounded-full text-xs ${value
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {value ? "Active" : "Inactive"}
                    </span>
                ),
            },

            {
                Header: "Updated",

                accessor: "updated_at",

                Cell: ({ value }) =>
                    value
                        ? new Date(value).toLocaleDateString()
                        : "-",
            },


            {
                Header: "Action",

                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/subsPlan/detail/${row.original.id}`}
                            className="w-9 h-9 rounded-lg bg-[#0a2342] text-white flex items-center justify-center"
                        >
                            <FaEye />
                        </Link>
                        <Link
                            href={`/admin/subsPlan/update/${row.original.id}`}
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

            <div className="mb-6">
                <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)]">
                    Subscription Plan Management
                </h1>
            </div>

            <PageTitle
                breadCrumbItems={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Subscription Plans", active: true },
                ]}
                title="Subscription Plans"
            />

            <div className="bg-white rounded-xl p-3 lg:p-4 shadow-md">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Spinner size="lg" color="warning" />
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={plans}
                        pageSize={10}
                        pagination
                        isSearchable
                        isSortable
                    />
                )}
            </div>


      
        </div>
    );
}