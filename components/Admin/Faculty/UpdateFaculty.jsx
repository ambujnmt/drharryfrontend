import React, { useRef, useState } from "react";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Switch,
  Spinner,
} from "@heroui/react";
import { FaUserPlus, FaUpload } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import dynamic from "next/dynamic";
import {
  getSingleFaculty,
  updateFaculty,
} from "../../../utils/fetchApi";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ReactQuill = dynamic(
  () => import("react-quill"),
  {
    ssr: false,
  }
);

import "react-quill/dist/quill.snow.css";
import PageTitle from "../../Breadcrumb/PageTitle";
export default function UpdateFaculty() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const { id } = router.query;
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    specialization: "",
    qualification: "",
    email: "",
    phone: "",
    linkedin: "",
    bio: "",
    status: "1",
    image: null
  });
  const fileRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchFaculty();
    }
  }, [id]);

  const fetchFaculty = async () => {
    try {
      setLoading(true);

      const res = await getSingleFaculty(id);

      const faculty = res.faculty;

      setFormData({
        name: faculty.name || "",
        designation: faculty.designation || "",
        specialization: faculty.specialization || "",
        qualification: faculty.qualification || "",
        email: faculty.email || "",
        phone: faculty.phone || "",
        linkedin: faculty.linkedin || "",
        bio: faculty.bio || "",
        status: faculty.status?.toString() || "1",
        image: null,
      });

      setPreview(faculty.image);
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

    fd.append("name", formData.name);
    fd.append("designation", formData.designation);
    fd.append("specialization", formData.specialization);
    fd.append("qualification", formData.qualification);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("linkedin", formData.linkedin);
    fd.append("bio", formData.bio);
    fd.append("status", formData.status);

    if (formData.image) {
      fd.append("image", formData.image);
    }

    const res = await updateFaculty(id, fd);

    setMessage(res.message);
    setMessageType("success");

    setTimeout(() => {
      router.push("/admin/faculty/facultyList");
    }, 3000);
  } catch (err) {
    let errorMsg = "Something went wrong.";

    if (err.errors) {
      errorMsg = Object.values(err.errors).flat().join(", ");
    } else if (err.message) {
      errorMsg = err.message;
    }

    setMessage(errorMsg);
    setMessageType("error");
  } finally {
    setLoading(false);
  }
};


  if (loading && !formData.name) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[var(--light-gold2)] p-6">
      <Head title="Update Faculty" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[42px] text-[var(--secondary-color)]">
          Update Faculty Member
        </h1>

        <p className="text-[16px] text-[#505050] mt-2">
          Update faculty member information.
        </p>
      </div>
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          {
            label: "Manage Faculty",
            path: "/admin/faculty/facultyList",
          },
          {
            label: "Update Faculty",
            active: true,
          },
        ]}
        title="Update Faculty"
      />


      <div className="bg-white rounded-[15px] shadow-md p-6 lg:p-8">
        {message &&
          <div className={`mb-4 text-center font-medium ${messageType === "success" ?

            "text-green-700"

            :

            "text-red-700"

            }

`}

          >

            {message}

          </div>
        }
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Faculty Name */}
          <Input
            placeholder="Enter faculty name"
            variant="underlined"
            value={formData.name}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                name: value,
              }))
            }
            label={
              <span className="text-[#000] ">
                Faculty Name
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />

          {/* Designation */}
          <Input
            placeholder="Founder & Clinical Director"
            value={formData.designation}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                designation: value,
              }))
            }
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Designation
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />

          {/* Specialization */}
          <Input
            placeholder="Aesthetic Dentistry & Smile Design"
            value={formData.specialization}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                specialization: value,
              }))
            }
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Specialization
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />

          {/* Qualification */}
          <Input
            placeholder="DDS, MS, AAACD Accredited"
            value={formData.qualification}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                qualification: value,
              }))
            }
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Qualifications
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />

          {/* Email */}
          <Input
            type="email"
            value={formData.email}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                email: value,
              }))
            }
            placeholder="faculty@example.com"
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />

          {/* Phone */}
          <Input
            value={formData.phone}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                phone: value,
              }))
            }
            placeholder="+1 234 567 890"
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Phone Number
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />

          {/* LinkedIn */}
          <Input
            value={formData.linkedin}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                linkedin: value,
              }))
            }
            placeholder="https://linkedin.com/in/faculty"
            variant="underlined"
            label={
              <span className="text-[#000] ">
                LinkedIn Profile
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />

          {/* Status */}
          <Select
            placeholder="Select Status"
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
                Status
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          >
            <SelectItem key="1">Active</SelectItem>
            <SelectItem key="0">Inactive</SelectItem>
          </Select>

        </div>

        {/* Bio */}
        <div className="mt-6">
          <div>
            <span className="text-[#000] text-xs">
              Faculty Bio
              <span className="text-red-500 ml-1">*</span>
            </span>
          </div>
          <ReactQuill
            theme="snow"
            value={formData.bio}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                bio: value,
              }))
            }
          />

        </div>

        {/* Faculty Image */}
        <div className="mt-6">
          <label className="block text-[14px] font-medium text-[var(--secondary-color)] mb-2">
            Faculty Image
          </label>

          <div className="border-2 border-dashed border-[var(--primary-color)] rounded-xl p-8 text-center bg-[var(--light-gold)]">
            <FaUpload
              size={30}
              className="mx-auto text-[var(--primary-color)] mb-3"
            />

            <p className="text-[15px] text-[var(--secondary-color)]">
              Upload Faculty Profile Image
            </p>

            <p className="text-[13px] text-gray-500 mt-1">
              PNG, JPG up to 5MB
            </p>


            <input
  ref={fileRef}
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }}
  className="mt-4 block mx-auto"
/>

{preview && (
  <img
    src={preview}
    className="w-40 h-40 object-cover rounded-lg mt-4 block mx-auto"
  />
)}

          </div>
        </div>


        <div className="flex flex-wrap gap-4 mt-8">
          <Button
            onPress={handleUpdate}
            isDisabled={loading}
            className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] font-semibold px-8"
            radius="md"
          >
            {loading ?
              <Spinner size="sm" color="white" />
              :
              "Update Faculty"
            }
          </Button>

          <Button
            variant="bordered"
            className="border-[var(--secondary-color)] text-[var(--secondary-color)]"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}