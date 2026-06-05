import React from "react";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Switch,
} from "@heroui/react";
import { FaUserPlus, FaUpload } from "react-icons/fa";
import { Head } from "../../../layouts/head";

export default function AddFaculty() {
  return (
    <div className="min-h-screen bg-[var(--light-gold2)] p-6">
      <Head title="Add Faculty" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[42px] text-[var(--secondary-color)]">
          Add Faculty Member
        </h1>

        <p className="text-[16px] text-[#505050] mt-2">
          Add a new instructor or faculty member to the institute.
        </p>
      </div>

      <div className="bg-white rounded-[15px] shadow-md p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Faculty Name */}
          <Input
            placeholder="Enter faculty name"
              variant="underlined"
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
            <SelectItem key="active">
              Active
            </SelectItem>

            <SelectItem key="inactive">
              Inactive
            </SelectItem>
          </Select>

        </div>

        {/* Bio */}
        <div className="mt-6">
          <Textarea
            placeholder="Enter faculty description and achievements..."
              variant="underlined"
                        label={
                            <span className="text-[#000] ">
                               Faculty Bio
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
            minRows={6}
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
              type="file"
              className="mt-4 block mx-auto"
            />
          </div>
        </div>

        {/* Featured Faculty */}
        {/* <div className="mt-6 flex items-center justify-between bg-[var(--light-gold)] p-4 rounded-xl">
          <div>
            <h6 className="mb-1 text-[16px] font-semibold text-[var(--secondary-color)]">
              Featured Faculty
            </h6>

            <p className="mb-0 text-[14px] text-gray-600">
              Show this faculty member in highlighted sections.
            </p>
          </div>

          <Switch />
        </div> */}

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
     <Button
                             className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] font-semibold px-8"
                             radius="md"
                         >
            Save Faculty
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