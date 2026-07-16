import React, { useEffect, useState, useRef } from "react";
import {
    Input,
    Textarea,
    Select,
    SelectItem,
    Button,
    Switch,
} from "@heroui/react";
import { Spinner } from "@heroui/react";
import {
    addCase,
    getCaseCategories,
} from "../../../../utils/fetchApi";
import PageTitle from "../../../Breadcrumb/PageTitle";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
});
import "react-quill/dist/quill.snow.css";
import { FaUpload } from "react-icons/fa";

export default function AddCase() {
    const [loading, setLoading] = useState(false);

    const [categoryList, setCategoryList] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const initialFormData = {
        category_id: "",
        title: "",
        description: "",
        doctor: "",
        treatment_weeks: "",
        status: "1",
        image: null,
    };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await getCaseCategories();

            if (res.status) {
                setCategoryList(
                    res.data.filter((item) => item.status == 1)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fileRef = useRef(null);

    const handleSubmit = async () => {
        const data = new FormData();

        data.append("category_id", formData.category_id);

        data.append("title", formData.title);

        data.append("description", formData.description);

        data.append("doctor", formData.doctor);

        data.append("treatment_weeks", formData.treatment_weeks);

        data.append("status", formData.status);

        if (formData.image) {
            data.append("image", formData.image);
        }


        try {
            setLoading(true);

            const res = await addCase(data);

            if (res.status) {
                setMessage(res.message);
                setMessageType("success");

                setTimeout(() => {
                    setFormData(initialFormData);


                    if (fileRef.current) {
                        fileRef.current.value = "";
                    }
                    setMessage("");
                }, 3000);
            } else {
                setMessage(res.message);
                setMessageType("error");

                setTimeout(() => {
                    setMessage("");
                }, 3000);
            }
        } catch (error) {
            let errorMsg = "Something went wrong.";

            if (error.errors) {
                errorMsg = Object.values(error.errors)
                    .flat()
                    .join(", ");
            } else if (error.message) {
                errorMsg = error.message;
            }

            setMessage(errorMsg);
            setMessageType("error");

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F2EC] p-6">
            {/* Header */}
            <div className="mb-8">
                <h1
                    className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)]"
                    style={{ fontFamily: "Cormorant Garamond" }}
                >
                    Add Clinical Case
                </h1>

                <p
                    className="text-[#2B2B2B] text-[14px] md:text-[14px] lg:text-[16px] mt-2"
                    style={{ fontFamily: "Inter" }}
                >
                    Create and manage clinical cases.
                </p>
            </div>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Add Case', active: true },
                ]}
                title="Add Case"
            />

            {message && (
                <div
                    className={`mb-4 text-center font-medium ${messageType === "success"
                        ? " text-green-700"
                        : " text-red-700"
                        }`}
                >
                    {message}
                </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-[#e7e2d7] p-3 md:p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                    <Input
                        placeholder="Enter Case title"
                        value={formData.title}
                        onValueChange={(value) =>
                            setFormData({ ...formData, title: value })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Case Title
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />


                    <Input
                        placeholder="Dr. John"
                        value={formData.doctor}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                doctor: value
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Doctor
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        placeholder="3"
                        value={formData.treatment_weeks}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                treatment_weeks: value
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Treatment Weeks
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Select
                        selectedKeys={[formData.category_id]}
                        onSelectionChange={(keys) =>
                            setFormData({
                                ...formData,
                                category_id: [...keys][0]
                            })
                        }
                        variant="underlined"
                        label={
                            <span>
                                Category
                                <span className="text-red-500">*</span>
                            </span>
                        }
                    >
                        {categoryList?.map((item) => (
                            <SelectItem key={item.id.toString()}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        selectedKeys={[formData.status]}
                        onSelectionChange={(keys) =>
                            setFormData({
                                ...formData,
                                status: [...keys][0],
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Case Status
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    >
                        <SelectItem key="1">
                            Active
                        </SelectItem>

                        <SelectItem key="0">
                            Inactive
                        </SelectItem>
                    </Select>





                </div>




                {/* Full Description */}

                <div className="mt-6">
                    <label>
                        <span className="text-[#000] text-sm">
                            Description
                            <span className="text-red-500 ml-1">*</span>
                        </span>
                    </label>

                    <ReactQuill
                        key={formData.description}
                        theme="snow"
                        value={formData.description}
                        onChange={(value) =>
                            setFormData({
                                ...formData,
                                description: value,
                            })
                        }
                    />
                </div>


                {/* Case Image */}

                <div className="mt-6">

                    <label className="block text-[14px] md:text-[15px] font-medium text-[var(--secondary-color)] mb-2">
                        Case Image
                    </label>


                    <div
                        className="
      border-2
      border-dashed
      border-[var(--primary-color)]
      rounded-xl
      text-center
      bg-[var(--light-gold)]
      p-5
      sm:p-6
      lg:p-8
    "
                    >

                        <FaUpload
                            size={30}
                            className="mx-auto text-[var(--primary-color)] mb-3"
                        />


                        <p className="text-[14px] sm:text-[15px] text-[var(--secondary-color)]">
                            Upload Case Profile Image
                        </p>


                        <p className="text-xs sm:text-[13px] text-gray-500 mt-1">
                            PNG, JPG up to 5MB
                        </p>


                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    image: e.target.files[0],
                                })
                            }
                            className="
        mt-4
        block
        w-full
        sm:w-auto
        mx-auto
        text-sm
        file:mr-4
        file:px-4
        file:py-2
        file:rounded-lg
        file:border-0
        file:bg-[var(--primary-color)]
        file:text-white
        file:cursor-pointer
      "
                        />

                    </div>

                </div>


                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-10">
                    <Button
                        onPress={handleSubmit}
                        className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] font-semibold px-8"
                        isDisabled={loading}
                        radius="md"
                    >
                        {loading ? <Spinner size="sm" color="white" /> : "Save Case"}
                    </Button>


                    <Button
                        variant="light"
                        className="text-[var(--secondary-color)] border-2 border-[var(--secondary-color)]"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}