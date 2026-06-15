import React, { useEffect, useRef, useState } from "react";
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
    getSingleCourse,
    updateCourse,
    getFaculty
} from "../../../utils/fetchApi";
import { useRouter } from "next/router";
import PageTitle from "../../Breadcrumb/PageTitle";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
});

import "react-quill/dist/quill.snow.css";
import { FaUpload } from "react-icons/fa";

export default function UpdateCourse() {
    const [featured, setFeatured] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const router = useRouter();
    const [preview, setPreview] = useState("");
    const [image, setImage] = useState(null);
    const { id } = router.query;
    const [formData, setFormData] = useState({
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
    const [facultyList, setFacultyList] = useState([]);
    const fileRef = useRef(null);

    const fetchFaculty = async () => {
        const res = await getFaculty();

        if (res.status) {
            setFacultyList(
                res.faculty.filter((item) => item.status == 1)
            );
        }
    };

    useEffect(() => {
        if (id) {
            fetchCourse();
        }
        fetchFaculty();
    }, [id]);

    const fetchCourse = async () => {
        try {
            setLoading(true);

            const res = await getSingleCourse(id);

            const course = res.course;

            setFormData({
                title: course.title || "",
                description: course.description || "",
                duration: course.duration || "",
                max_students: course.max_students?.toString() || "",
                modules: course.modules?.toString() || "",
                ce_credits: course.ce_credits?.toString() || "",
                investment: course.investment?.toString() || "",
                seats_left: course.seats_left?.toString() || "",
                status: course.status?.toString() || "1",
                featured: course.featured || 0,
                faculty_id: course.faculty_id?.toString() || "",
                learning_objectives: course.learning_objectives || "",
                ideal_for: course.ideal_for || "",
                course_order: course.course_order?.toString() || "",
                image: null,
            });

            setFeatured(course.featured == 1);

            setPreview(course.image);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);

            const fd = new FormData();

            fd.append("title", formData.title);
            fd.append("description", formData.description);
            fd.append("duration", formData.duration);
            fd.append("max_students", formData.max_students);
            fd.append("modules", formData.modules);
            fd.append("ce_credits", formData.ce_credits);
            fd.append("investment", formData.investment);
            fd.append("seats_left", formData.seats_left);
            fd.append("status", formData.status);
            fd.append("featured", featured ? 1 : 0);
            fd.append("faculty_id", formData.faculty_id);
            fd.append("learning_objectives", formData.learning_objectives);
            fd.append("ideal_for", formData.ideal_for);
            fd.append("course_order", formData.course_order);

            if (image) {
                fd.append("image", image);
            }

            const res = await updateCourse(id, fd);

            setMessage(res.message);
            setMessageType("success");

            setTimeout(() => {
                router.push("/admin/courses/courseList");
            }, 3000);
        } catch (err) {
            setMessage(err.message);
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !formData.title) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" color="warning" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F2EC] p-6">
            {/* Header */}
            <div className="mb-8">
                <h1
                    className="text-4xl text-[var(--secondary-color)]"
                    style={{ fontFamily: "Cormorant Garamond" }}
                >
                    Update Course
                </h1>

                <p
                    className="text-[#2B2B2B] mt-2"
                    style={{ fontFamily: "Inter" }}
                >
                    Update and manage premium educational programs.
                </p>
            </div>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Manage Courses', path: '/admin/courses/courseList' },
                    { label: 'Update Course', active: true },
                ]}
                title="Update Course"
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

                    <Select
                        selectedKeys={[formData.faculty_id]}
                        onSelectionChange={(keys) =>
                            setFormData({
                                ...formData,
                                faculty_id: [...keys][0],
                            })
                        }
                        variant="underlined"
                        label="Faculty"
                    >
                        {facultyList.map((item) => (
                            <SelectItem key={item.id.toString()}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </Select>



                </div>

                <div className="mt-6">
                    <label className="block text-[14px] font-medium mb-2">
                        Course Image
                    </label>

                    <div className="border-2 border-dashed border-[var(--primary-color)] rounded-xl p-8 text-center bg-[var(--light-gold)]">
                        <FaUpload
                            size={30}
                            className="mx-auto text-[var(--primary-color)] mb-3"
                        />

                        <p>Upload Course Profile Image</p>

                        <p className="text-sm text-gray-500">
                            PNG, JPG up to 5MB
                        </p>

                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="mt-4 block mx-auto"
                            onChange={(e) => {
                                const file = e.target.files[0];

                                setImage(file);

                                setFormData({
                                    ...formData,
                                    image: file,
                                });

                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        {preview && (
                            <img
                                src={preview}
                                className="w-40 h-40 mx-auto rounded-xl object-cover mt-4"
                            />
                        )}
                    </div>
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
                <div className="mt-4">
                    <label>
                        <span className="text-[#000] text-sm">
                            Description
                            <span className="text-red-500 ml-1">*</span>
                        </span>
                    </label>
                    <ReactQuill
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


                <div className="mt-4">
                    <label>
                        <span className="text-[#000] text-sm">
                            Learning Objectives
                            <span className="text-red-500 ml-1">*</span>
                        </span>
                    </label>
                    <ReactQuill
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
                        onPress={handleUpdate}
                        className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] font-semibold px-8"
                        isDisabled={loading}
                        radius="md"
                    >
                        {loading ? <Spinner size="sm" color="white" /> : "Update  Course"}
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