import React, { useState, useEffect, useRef } from "react";
import { Input, Textarea, Button, Spinner, Select, SelectItem, } from "@heroui/react";
import { useRouter } from "next/router";
import { submitEnrollment } from "../../../../utils/fetchApi";
import { useUser } from "../../../../context/UserContext";
import { FaUpload } from "react-icons/fa";

export default function SubmitForm() {

    const router = useRouter();
    const { id } = router.query;
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");


    const photoRef = useRef(null);
    const documentRef = useRef(null);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        gender: "",
        qualification: "",
        message: "",
        photo: null,
        document: null,
    });


    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                full_name: user.name || "",
                email: user.email || "",
            }));
        }
    }, [user]);
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        const fd = new FormData();

        fd.append("course_id", id);

        Object.keys(formData).forEach((key) => {
            if (formData[key] != null) {
                fd.append(key, formData[key]);
            }
        });

        try {
            const res = await submitEnrollment(fd);

            if (res.status) {
                setSuccess(res.message);

                setFormData({
                    full_name: "",
                    email: "",
                    phone: "",
                    address: "",
                    dob: "",
                    gender: "",
                    qualification: "",
                    message: "",
                    photo: null,
                    document: null,
                });

                if (photoRef.current) {
    photoRef.current.value = "";
}

if (documentRef.current) {
    documentRef.current.value = "";
}

                setTimeout(() => {
                    setSuccess("");
                }, 3000);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-[var(--light-gold2)] py-20">
            <div className="container mx-auto max-w-6xl">
                <div className="bg-white rounded-xl shadow-lg p-10">
                    <h1 className="text-5xl text-center text-[var(--secondary-color)] font-bold mb-3">
                        Enrollment Form
                    </h1>

                    <p className="text-center text-[var(--text-color2)] mb-12">
                        Complete your enrollment application.
                    </p>

                    {success && (
                        <div className=" text-green-700 mb-8">
                            {success}
                        </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-8">
                        <Input
                            name="full_name"
                            value={formData.full_name}
                            isReadOnly
                            variant="underlined"
                            label={
                                <span className="text-[#000] ">
                                    Full Name
                                    <span className="text-red-500 ml-1">*</span>
                                </span>
                            }
                            classNames={{
                                label: "text-[var(--text-color2)] h-[50px]",
                                input: "text-[var(--secondary-color)] font-medium",

                            }}
                        />

                        <Input
                            name="email"
                            value={formData.email}
                            isReadOnly
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
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
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

                        <Select
                            variant="underlined"
                            label={
                                <span className="text-[#000] ">
                                    Gender
                                    <span className="text-red-500 ml-1">*</span>
                                </span>
                            }
                            classNames={{
                                label: "text-[var(--text-color2)] h-[50px]",
                                input: "text-[var(--secondary-color)] font-medium",

                            }}
                            selectedKeys={formData.gender ? [formData.gender] : []}
                            onSelectionChange={(keys) =>
                                setFormData({
                                    ...formData,
                                    gender: Array.from(keys)[0],
                                })
                            }
                        >
                            <SelectItem key="Male">Male</SelectItem>
                            <SelectItem key="Female">Female</SelectItem>
                        </Select>

                        <Input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            variant="underlined"
                            label={
                                <span className="text-[#000] ">
                                    Date of Birth
                                    <span className="text-red-500 ml-1">*</span>
                                </span>
                            }
                            classNames={{
                                label: "text-[var(--text-color2)] h-[50px]",
                                input: "text-[var(--secondary-color)] font-medium",

                            }}
                        />

                        <Input
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            variant="underlined"
                            label={
                                <span className="text-[#000] ">
                                    Qualification
                                    <span className="text-red-500 ml-1">*</span>
                                </span>
                            }
                            classNames={{
                                label: "text-[var(--text-color2)] h-[50px]",
                                input: "text-[var(--secondary-color)] font-medium",

                            }}
                        />




                    </div>

                    <Textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Address
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px] mt-4",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />


                    <div className="mt-6">
                        <label className="block text-[14px] font-medium text-[var(--secondary-color)] mb-2">
                            Photo
                        </label>

                        <div className="border-2 border-dashed border-[var(--primary-color)] rounded-xl p-8 text-center bg-[var(--light-gold)]">
                            <FaUpload
                                size={30}
                                className="mx-auto text-[var(--primary-color)] mb-3"
                            />

                            <p className="text-[15px] text-[var(--secondary-color)]">
                                Upload Photo
                            </p>

                            <p className="text-[13px] text-gray-500 mt-1">
                                JPG, JPEG, PNG up to 2048
                            </p>


                            <input
                                ref={photoRef}
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleChange}
                                className="mt-4 block mx-auto"
                            />

                        </div>
                    </div>


                    <div className="mt-6">
                        <label className="block text-[14px] font-medium text-[var(--secondary-color)] mb-2">
                            Document
                        </label>

                        <div className="border-2 border-dashed border-[var(--primary-color)] rounded-xl p-8 text-center bg-[var(--light-gold)]">
                            <FaUpload
                                size={30}
                                className="mx-auto text-[var(--primary-color)] mb-3"
                            />

                            <p className="text-[15px] text-[var(--secondary-color)]">
                                Upload Document
                            </p>

                            <p className="text-[13px] text-gray-500 mt-1">
                                PDF, DOC, DOCX, JPG, JPEG, PNG up to 5120
                            </p>


                            <input
                                ref={documentRef}
                                type="file"
                                name="document"
                                accept="image/*"
                                onChange={handleChange}
                                className="mt-4 block mx-auto"
                            />

                        </div>
                    </div>


                    <div className="mt-10">
                        <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            variant="underlined"
                            label={
                                <span className="text-[#000] ">
                                    Additional Message
                                    <span className="text-red-500 ml-1">*</span>
                                </span>
                            }
                            classNames={{
                                label: "text-[var(--text-color2)] h-[50px]",
                                input: "text-[var(--secondary-color)] font-medium",

                            }}
                            minRows={5}
                        />
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Button
                            className="bg-[var(--primary-color)] text-white px-12 py-7 text-lg hover:bg-[var(--secondary-color)]"
                            onPress={handleSubmit}
                            isDisabled={loading}
                        >
                            {loading ? (
                                <Spinner size="sm" color="white" />
                            ) : (
                                "Submit Enrollment"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}