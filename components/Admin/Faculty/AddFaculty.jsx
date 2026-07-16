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
import { addFaculty } from "../../../utils/fetchApi";

const ReactQuill = dynamic(
  () => import("react-quill"),
  {
    ssr: false,
  }
);

import "react-quill/dist/quill.snow.css";
import PageTitle from "../../Breadcrumb/PageTitle";
export default function AddFaculty() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
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

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("designation", formData.designation);
    data.append("specialization", formData.specialization);
    data.append("qualification", formData.qualification);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("linkedin", formData.linkedin);
    data.append("bio", formData.bio);
    data.append("status", formData.status);

    if (formData.image) {
      const maxSize = 2 * 1024 * 1024;
      if (formData.image.size > maxSize) {
        setMessage("Please select image smaller than 2 MB.");
        setMessageType("error");
        return;
      }
      data.append("image", formData.image);
    }

    try {
      setLoading(true);
      const res = await addFaculty(data);

      if (res.status) {
        setMessage(res.message);
        setMessageType("success");

        setTimeout(() => {
          setFormData({
            name: "",
            designation: "",
            specialization: "",
            qualification: "",
            email: "",
            phone: "",
            linkedin: "",
            bio: "",
            status: "1",
            image: null,
          });

          if (fileRef.current) {
            fileRef.current.value = "";
          }

          setMessage("");
          setMessageType("");
        }, 3000);
      }

      else {
        setMessage(res.message);
        setMessageType("error");
      }
    }

    catch (error) {
      let errorMsg = "Something went wrong.";
      if (error.errors) {

        errorMsg = Object.values(error.errors)

          .flat()

          .join(", ");

      }

      else if (error.message) {

        errorMsg = error.message;

      }

      setMessage(errorMsg);
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }

    finally {

      setLoading(false);

    }

  }

  return (
    <div className="min-h-screen bg-[var(--light-gold2)] p-6">
      <Head title="Add Faculty" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)]">
          Add Faculty Member
        </h1>

        <p className="text-[14px] md:text-[14px] lg:text-[16px] text-[#505050] mt-2">
          Add a new instructor or faculty member to the institute.
        </p>
      </div>
      <PageTitle
        breadCrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Add Faculty', active: true },
        ]}
        title="Add Faculty"
      />


      <div className="bg-white rounded-[15px] shadow-md p-3 md:p-6 lg:p-8">
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
        <div className="grid md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">

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
          <label className="block text-[14px] md:text-[15px] font-medium text-[var(--secondary-color)] mb-2">
            Faculty Image
          </label>

          <div className="
    border-2
    border-dashed
    border-[var(--primary-color)]
    rounded-xl
    bg-[var(--light-gold)]
    text-center
    p-5
    sm:p-6
    md:p-8
  ">

            <FaUpload
              size={30}
              className="mx-auto text-[var(--primary-color)] mb-3"
            />

            <p className="text-[14px] sm:text-[15px] text-[var(--secondary-color)] font-medium">
              Upload Faculty Profile Image
            </p>

            <p className="text-xs sm:text-[13px] text-gray-500 mt-1">
              PNG, JPG up to 5MB
            </p>


            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
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


        <div className="flex flex-wrap gap-4 mt-8">
          <Button
            onPress={handleSubmit}
            isDisabled={loading}
            className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] font-semibold px-8"
            radius="md"
          >
            {loading ?
              <Spinner size="sm" color="white" />
              :
              "Save Faculty"
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