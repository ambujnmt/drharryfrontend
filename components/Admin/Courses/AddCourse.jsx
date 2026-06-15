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
import { addCourse, getFaculty } from "../../../utils/fetchApi";
import PageTitle from "../../Breadcrumb/PageTitle";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
});
import "react-quill/dist/quill.snow.css";
import { FaUpload } from "react-icons/fa";

export default function AddCourse() {
    const [featured, setFeatured] = useState(false);
    const [loading, setLoading] = useState(false);
    const [facultyList, setFacultyList] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const initialFormData = {
        title: "",
        description: "",
        duration: "",
        max_students: "",
        modules: "",
        ce_credits: "",
        investment: "",
        seats_left: "",
        status: "1",
        featured: 0,
        faculty_id: "",
        learning_objectives: "",
        ideal_for: "",
        course_order: "",
        image: null,
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchFaculty();
    }, []);

    const fetchFaculty = async () => {
        try {
            const res = await getFaculty();

            if (res.status) {
                setFacultyList(
                    res.faculty.filter((item) => item.status == 1)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fileRef = useRef(null);

    const handleSubmit = async () => {
        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("duration", formData.duration);
        data.append("max_students", formData.max_students);
        data.append("modules", formData.modules);
        data.append("ce_credits", formData.ce_credits);
        data.append("investment", formData.investment);
        data.append("seats_left", formData.seats_left);
        data.append("status", formData.status);
        data.append("featured", formData.featured);
        data.append("faculty_id", formData.faculty_id);
        data.append("description", formData.description);
        data.append(
            "learning_objectives",
            formData.learning_objectives
        );
        data.append("ideal_for", formData.ideal_for);
        data.append("course_order", formData.course_order);

        if (formData.image) {
            const maxSize = 2 * 1024 * 1024;

            if (formData.image.size > maxSize) {
                setLoading(false);

                setMessage("Please select an image smaller than 2 MB.");
                setMessageType("error");

                setTimeout(() => {
                    setFormData(initialFormData);

                    setFeatured(false);

                    if (fileRef.current) {
                        fileRef.current.value = "";
                    }

                    setMessage("");
                    setMessageType("");
                }, 3000);

                return;
            }
        }
        if (formData.image) {

            data.append("image", formData.image);
        }

        try {
            setLoading(true);

            const res = await addCourse(data);

            if (res.status) {
                setMessage(res.message);
                setMessageType("success");

                setTimeout(() => {
                    setFormData({
                        title: "",
                        description: "",
                        duration: "",
                        max_students: "",
                        modules: "",
                        ce_credits: "",
                        investment: "",
                        seats_left: "",
                        status: "1",
                        featured: 0,
                        faculty_id: "",
                        learning_objectives: "",
                        ideal_for: "",
                        course_order: "",
                        image: null,
                    });


                    if (fileRef.current) {
                        fileRef.current.value = "";
                    }
                    setFeatured(false);
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
                    className="text-4xl text-[var(--secondary-color)]"
                    style={{ fontFamily: "Cormorant Garamond" }}
                >
                    Add New Course
                </h1>

                <p
                    className="text-[#2B2B2B] mt-2"
                    style={{ fontFamily: "Inter" }}
                >
                    Create and manage premium educational programs.
                </p>
            </div>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Add Course', active: true },
                ]}
                title="Add Course"
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
            <div className="bg-white rounded-2xl shadow-lg border border-[#e7e2d7] p-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        placeholder="Enter course title"
                        value={formData.title}
                        onValueChange={(value) =>
                            setFormData({ ...formData, title: value })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Course Title
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />


                    <Input
                        placeholder="3 Days"
                        value={formData.duration}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                duration: value,
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Duration
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        placeholder="16"
                        value={formData.max_students}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                max_students: value,
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Max Students
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        placeholder="6"
                        value={formData.modules}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                modules: value,
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Modules
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        placeholder="24"
                        value={formData.ce_credits}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                ce_credits: value,
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                CE Credits
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />


                    <Input
                        placeholder="499"
                        variant="underlined"
                        value={formData.investment}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                investment: value,
                            })
                        }
                        label={
                            <span className="text-[#000] ">
                                Investment ($)
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        placeholder="25"
                        value={formData.seats_left}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                seats_left: value,
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Seats left
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />
                    <Input
                        placeholder="1"
                        value={formData.course_order}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                course_order: value,
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Course Order
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Select
                        selectedKeys={[formData.faculty_id]}
                        onSelectionChange={(keys) =>
                            setFormData({
                                ...formData,
                                faculty_id: [...keys][0],
                            })
                        }
                        variant="underlined"
                        label={
                            <span>
                                Faculty
                                <span className="text-red-500">*</span>
                            </span>
                        }
                    >
                        {facultyList.map((item) => (
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
                                Course Status
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
                <div className="mt-4">

                    <Textarea
                        value={formData.ideal_for}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                ideal_for: value,
                            })
                        }
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Ideal For
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}

                        minRows={4}
                    />
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

                {/* learnign objectives */}
                <div className="mt-6">
                    <label>
                        <span className="text-[#000] text-sm">
                            Learning Objectives
                            <span className="text-red-500 ml-1">*</span>
                        </span>
                    </label>

                    <ReactQuill
                        key={formData.learning_objectives}
                        theme="snow"
                        value={formData.learning_objectives}
                        onChange={(value) =>
                            setFormData({
                                ...formData,
                                learning_objectives: value,
                            })
                        }
                    />
                </div>

                {/* image */}
                <div className="mt-6">
                    <label className="block text-[14px] font-medium text-[var(--secondary-color)] mb-2">
                        Course Image
                    </label>

                    <div className="border-2 border-dashed border-[var(--primary-color)] rounded-xl p-8 text-center bg-[var(--light-gold)]">
                        <FaUpload
                            size={30}
                            className="mx-auto text-[var(--primary-color)] mb-3"
                        />

                        <p className="text-[15px] text-[var(--secondary-color)]">
                            Upload Course Profile Image
                        </p>

                        <p className="text-[13px] text-gray-500 mt-1">
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
                            className="mt-4 block mx-auto"
                        />

                    </div>
                </div>


                {/* Featured */}
                <div className="mt-8 flex items-center justify-between bg-[#F5F2EC] rounded-xl p-4">
                    <div>
                        <h4
                            className="text-[#0a2342] text-xl"
                        >
                            Feature Course
                        </h4>

                    </div>

                    <Switch
                        isSelected={featured}
                        onValueChange={(value) => {
                            setFeatured(value);

                            setFormData((prev) => ({
                                ...prev,
                                featured: value ? 1 : 0,
                            }));
                        }}
                        color="warning"
                    />
                </div>



                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-10">
                    <Button
                        onPress={handleSubmit}
                        className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] font-semibold px-8"
                        isDisabled={loading}
                        radius="md"
                    >
                        {loading ? <Spinner size="sm" color="white" /> : "Save Course"}
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