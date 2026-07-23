import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { Head } from "../../../layouts/head";
import PageTitle from "../../Breadcrumb/PageTitle";
import { useRouter } from "next/router";
import {
    getEnrollmentDetail,
    getSingleCourse,
    updateEnrollmentStatus
} from "../../../utils/fetchApi";
import {
    Select,
    SelectItem,
    Button,
} from "@heroui/react";
import Tmodal from "../../Tmodal/Tmodal";

export default function Detail() {

    const router = useRouter();
    const { id } = router.query;
    const [enquiry, setEnquiry] = useState(null);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [applicationTypeFilter, setApplicationTypeFilter] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const fetchDetail = async () => {
        if (!id) return;

        try {
            setLoading(true);

            const res = await getEnrollmentDetail(id);

            if (res.status) {
                setEnquiry(res.data);
                setSelectedStatus(res.data.status);
                const courseRes = await getSingleCourse(res.data.course_id);

                if (courseRes.status) {
                    setCourse(courseRes.course);
                }
            } else {
                setMessage(res.message);
            }
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const handleStatusUpdate = async () => {
        try {
            setBtnLoading(true);

            const res = await updateEnrollmentStatus(
                enquiry.id,
                selectedStatus
            );

       if (res.status) {

    setEnquiry({
        ...enquiry,
        status: selectedStatus,
        application_type:
            selectedStatus === "Approved" &&
            enquiry.application_type === "Waitlist"
                ? "Enrollment"
                : enquiry.application_type,
    });

    setSuccessMsg(res.message);

                setTimeout(() => {
                    setSuccessMsg("");
                    setIsOpen(false);
                }, 2000);
            }
        } catch (err) {
            setSuccessMsg(err.message);
        } finally {
            setBtnLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" color="warning" />
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-[#F5F2EC] p-6">

            <Head title="Enrollment Detail" />

            <PageTitle
                breadCrumbItems={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Enrollments", path: "/admin/enrollement/list" },
                    { label: "Detail", active: true },
                ]}
                title="Enrollment Detail"
            />
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mt-6">

                {/* Profile Section */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    <img
                        src={enquiry.photo}
                        className="w-full sm:w-72 h-72 rounded-xl object-cover border mx-auto lg:mx-0"
                    />

                    <div className="flex-1">

                        <h2 className="text-3xl lg:text-4xl text-[var(--secondary-color)] mb-3">
                            {enquiry.full_name}
                        </h2>

                        <p className="text-[var(--primary-color)] text-lg lg:text-xl">
                            {course?.title}
                        </p>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">

                            <div>
                                <p className="text-gray-500">Email</p>
                                <h5 className="break-all">{enquiry.email}</h5>
                            </div>

                            <div>
                                <p className="text-gray-500">Phone</p>
                                <h5>{enquiry.phone}</h5>
                            </div>

                            <div>
                                <p className="text-gray-500">Gender</p>
                                <h5>{enquiry.gender}</h5>
                            </div>

                            <div>
                                <p className="text-gray-500">DOB</p>
                                <h5>{enquiry.dob}</h5>
                            </div>

                            <div>
                                <p className="text-gray-500">Qualification</p>
                                <h5>{enquiry.qualification}</h5>
                            </div>

                            <div>
                                <p className="text-gray-500">Status</p>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${enquiry.status === "Approved"
                                            ? "bg-green-100 text-green-700"
                                            : enquiry.status === "Rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {enquiry.status}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>



                {/* Address Message */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

                    <div>
                        <h3 className="text-xl lg:text-2xl text-[var(--secondary-color)] mb-3">
                            Address
                        </h3>

                        <p className="break-words">
                            {enquiry.address}
                        </p>
                    </div>


                    <div>
                        <h3 className="text-xl lg:text-2xl text-[var(--secondary-color)] mb-3">
                            Message
                        </h3>

                        <p className="break-words">
                            {enquiry.message}
                        </p>
                    </div>
                     <div>
                        <h3 className="text-xl lg:text-2xl text-[var(--secondary-color)] mb-3">
                            Application type
                        </h3>

                        <p className="break-words">
                            {enquiry.application_type}
                        </p>
                    </div> 
  
                </div>



                {/* Document */}
                <div className="mt-10">

                    <h3 className="text-xl lg:text-2xl text-[var(--secondary-color)] mb-5">
                        Uploaded Document
                    </h3>

                    <a
                        href={enquiry.document}
                        target="_blank"
                        className="inline-block bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white px-5 py-3 rounded-lg"
                    >
                        View Document
                    </a>

                </div>




                {/* Update Status */}
                <div className="mt-12 bg-[#F5F2EC] rounded-xl p-4 sm:p-6">

                    <h2 className="text-xl lg:text-2xl text-[var(--secondary-color)] mb-5">
                        Update Enrollment Status
                    </h2>


                    <div className="flex flex-col sm:flex-row sm:items-end gap-5">


                        <div className="w-full sm:w-72">

                            <Select
                                selectedKeys={[selectedStatus]}
                                onSelectionChange={(keys) =>
                                    setSelectedStatus(Array.from(keys)[0])
                                }
                                variant="underlined"
                                label={
                                    <span className="text-[#000]">
                                        Select Status
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                }
                                classNames={{
                                    label: "text-[var(--text-color2)] h-[50px]",
                                    input: "text-[var(--secondary-color)] font-medium",
                                }}
                            >

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



                        <Button
                            className="text-white bg-[var(--primary-color)] w-full sm:w-auto"
                            onPress={() => setIsOpen(true)}
                            isDisabled={
                                enquiry.status === "Approved" ||
                                enquiry.status === "Rejected"
                            }
                        >
                            Update Status
                        </Button>


                    </div>

                </div>


                {/* Course Details */}
                {course && (

                    <div className="mt-14 bg-[#F5F2EC] rounded-xl p-4 sm:p-6 lg:p-8">

                        <h2 className="text-2xl lg:text-3xl text-[var(--secondary-color)] mb-6">
                            Enrolled Course
                        </h2>


                        <div className="flex flex-col lg:flex-row gap-6">


                            <img
                                src={course.image}
                                className="w-full lg:w-80 h-52 rounded-xl object-cover"
                            />


                            <div className="flex-1">

                                <h3 className="text-xl lg:text-2xl font-semibold">
                                    {course.title}
                                </h3>


                                <p className="mt-2 text-[var(--primary-color)]">
                                    Faculty : {course.faculty?.name}
                                </p>


                                <div
                                    className="prose mt-4 max-w-none overflow-hidden"
                                    dangerouslySetInnerHTML={{
                                        __html: course.description,
                                    }}
                                />

                            </div>


                        </div>


                    </div>

                )}


            </div>
            <Tmodal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Confirm Status Update"
                footer={
                    successMsg
                        ? null
                        : (<>
                            <Button
                                variant="light"
                                onPress={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                className="text-white bg-[var(--primary-color)]"
                                isLoading={btnLoading}
                                onPress={handleStatusUpdate}
                            >
                                Confirm
                            </Button>
                        </>
                        )
                }
            >

                {successMsg ? (
                    <div className="text-center py-6">
                        <h3 className="text-green-600 text-xl font-semibold">
                            {successMsg}
                        </h3>
                    </div>
                ) : (
                    <p>
                        Are you sure you want to update the enrollment status to

                        <span className="font-bold text-[var(--primary-color)]">
                            {" "}
                            {selectedStatus}
                        </span>

                        ?
                    </p>
                )}

            </Tmodal>

        </div>
    )
}
