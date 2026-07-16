import React, { useMemo, useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import Table from "../../Table/Table";
import { getSingleFaculty } from "../../../utils/fetchApi";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/router";
import PageTitle from "../../Breadcrumb/PageTitle";


export default function FacultyDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [faculty, setFaculty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");




    const fetchFaculty = async () => {

        if (!id) return;

        try {

            setLoading(true);

            const res = await getSingleFaculty(id);

            if (res.status) {

                setFaculty(res.faculty);

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
        fetchFaculty();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" color="warning" />
            </div>
        );
    }

    if (message) {
        return (
            <div className="text-center text-red-600 mt-10">
                {message}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F2EC] p-6">

            <Head title="Faculty Detail" />

            <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)] mb-2">
                Faculty Detail
            </h1>

            <p className="text-[#505050] text-[14px] md:text-[14px] lg:text-[16px] mb-8">
                View complete information about this faculty member.
            </p>

            <PageTitle
                breadCrumbItems={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Manage Faculty", path: "/admin/faculty/facultyList" },
                    { label: "Faculty Detail", active: true },
                ]}
                title="Faculty Detail"
            />
            <div className="bg-white rounded-xl shadow-md p-3 md:p-6 lg:p-8">

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    <img
                        src={faculty.image}
                        className="w-[320px] h-[320px] rounded-xl object-cover"
                    />

                    <div className="flex-1">

                        <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-2">
                            {faculty.name}
                        </h2>

                        <p className="text-[18px] text-[var(--primary-color)] mb-5">
                            {faculty.designation}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <p className="text-gray-500">
                                    Specialization
                                </p>

                                <h5>
                                    {faculty.specialization}
                                </h5>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Qualification
                                </p>

                                <h5>
                                    {faculty.qualification}
                                </h5>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Email
                                </p>

                                <h5>
                                    {faculty.email}
                                </h5>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Phone
                                </p>

                                <h5>
                                    {faculty.phone}
                                </h5>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    LinkedIn
                                </p>

                                <a
                                    href={faculty.linkedin}
                                    target="_blank"
                                    className="text-blue-600 break-all"
                                >
                                    {faculty.linkedin}
                                </a>

                            </div>

                            <div>

                                <p className="text-gray-500 mb-2">
                                    Status
                                </p>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${faculty.status == 1
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {faculty.status == 1 ? "Active" : "Inactive"}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-10">

                    <h4 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">
                        Faculty Biography
                    </h4>

                    <div
                        className="leading-8 text-[#505050]"
                        dangerouslySetInnerHTML={{
                            __html: faculty.bio,
                        }}
                    />

                </div>

            </div>

        </div>
    );
}