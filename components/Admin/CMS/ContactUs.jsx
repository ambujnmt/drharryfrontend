import React, { useEffect, useState } from "react";
import {
    Input,
    Button,
    Switch,
} from "@heroui/react";

import { Spinner } from "@heroui/react";

import { FaPlus } from "react-icons/fa";

import PageTitle from "../../Breadcrumb/PageTitle";

import Tmodal from "../../Tmodal/Tmodal";

import Table from "../../Table/Table";
import {
    fetchContact,
    fetchContactEnquiries,
    updateContact
} from "../../../utils/fetchApi";


export default function ContactUs() {
    const [contact, setContact] = useState({});
    const [enquiries, setEnquiries] = useState([]);

    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        location: "",
        phone: "",
        email: "",
        facebook: "",
        instagram: "",
        youtube: "",
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            const contactRes = await fetchContact();
            const enquiryRes = await fetchContactEnquiries();

            setContact(contactRes.data);

            setFormData(contactRes.data);

            setEnquiries(enquiryRes.data);

        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {

        try {

            setSaving(true);

            const res = await updateContact(formData);

            setMessage(res.message);

            await loadData();

            setTimeout(() => {

                setMessage("");

                setModalOpen(false);

            }, 3000);

        }

        catch (error) {

            setMessage(error.message);

        }

        finally {

            setSaving(false);

        }

    }

    const columns = [

        {

            Header: "Name",

            accessor: "name"

        },

        {

            Header: "Phone",

            accessor: "phone"

        },

        {

            Header: "Email",

            accessor: "email"

        },

        {

            Header: "Message",

            accessor: "message"

        },

        {

            Header: "Submitted On",

            accessor: "created_at"

        }

    ];

    return (

        <div className="min-h-screen bg-[#F5F2EC] p-6">


            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">


                <div>


                    <h1

                        className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)]"

                        style={{
                            fontFamily: "Cormorant Garamond"
                        }}

                    >

                        Contact Us

                    </h1>



                    <p className="text-[#2B2B2B] text-[14px] md:text-[14px] lg:text-[16px] mt-2">

                        Manage Contact Information and Customer Enquiries.

                    </p>


                </div>





                <Button

                    onPress={() => setModalOpen(true)}
  className="
    bg-[var(--secondary-color)]
    text-white
    lg:w-auto
    w-fit
    px-4
    py-2.5
    text-sm
    sm:text-base
  "

                    startContent={<FaPlus />}

                >

                    Update Contact Info

                </Button>



            </div>


            <PageTitle

                breadCrumbItems={[
                    {
                        label: "Dashboard",
                        path: "/dashboard"
                    },
                    {
                        label: "Contact Us",
                        active: true
                    }
                ]}

                title="Contact Us"

            />

            <div className="bg-white rounded-xl  p-3 lg:p-4 shadow-md  lg:mt-6">
                <h3 className="text-2xl font-semibold mb-5">
                    Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                    <div>
                        <p className="text-gray-500">Location</p>
                        <p>{contact.location}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Phone</p>
                        <p>{contact.phone}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Email</p>
                        <p>{contact.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Facebook</p>
                        <p>{contact.facebook}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Instagram</p>
                        <p>{contact.instagram}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Youtube</p>
                        <p>{contact.youtube}</p>
                    </div>

                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Spinner size="lg" color="warning" />
                </div>
            ) : (
                <>
                    {message && (
                        <div className="mb-5 text-center text-green-700 font-medium">
                            {message}
                        </div>
                    )}
                    <div className="bg-white rounded-xl shadow-md p-4">

                        <Table
                            columns={columns}
                            data={enquiries}
                            pageSize={10}
                            pagination
                            isSearchable
                            isSortable
                        />
                    </div>
                </>
            )}
            <Tmodal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Update Contact Information"
                footer={
                    <>
                        <Button
                            variant="light"
                            onPress={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="warning"
                            onPress={handleUpdate}
                            isLoading={saving}
                        >
                            Update
                        </Button>
                    </>
                }
            >

                <div className="grid grid-cols-2 gap-4">

                    <Input
                        value={formData.location}
                        onValueChange={(value) =>
                            setFormData({ ...formData, location: value })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Location
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        value={formData.phone}
                        onValueChange={(value) =>
                            setFormData({ ...formData, phone: value })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Phone
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />
                </div>



                <div className="grid grid-cols-2 gap-4">


                    <Input
                        value={formData.email}
                        onValueChange={(value) =>
                            setFormData({ ...formData, email: value })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Email
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        value={formData.facebook}
                        onValueChange={(value) =>
                            setFormData({ ...formData, facebook: value })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Facebook
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />
                </div>



                <div className="grid grid-cols-2 gap-4">


                    <Input
                        value={formData.instagram}
                        onValueChange={(value) =>
                            setFormData({ ...formData, instagram: value })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Instagram
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        value={formData.youtube}
                        onValueChange={(value) =>
                            setFormData({ ...formData, youtube: value })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Youtube
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />
                </div>

            </Tmodal>

        </div>

    );

}