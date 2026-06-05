import React from "react";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { FaUpload } from "react-icons/fa";
import { Head } from "../../../layouts/head";

export default function AddStudent() {
  return (
    <div className="min-h-screen bg-[var(--light-gold2)] p-6">
      <Head title="Add Student" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[42px] text-[var(--secondary-color)]">
          Add Student
        </h1>

        <p className="text-[16px] text-[#505050] mt-2">
          Add a new student enrolled in the institute.
        </p>
      </div>

      <div className="bg-white rounded-[15px] shadow-md p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Student Name */}
          <Input
            placeholder="Enter student name"
            variant="underlined"
            label={
              <span className="text-[#000]">
                Student Name
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",
            }}
          />

          {/* Student ID */}
          <Input
            placeholder="STU-1001"
            variant="underlined"
            label={
              <span className="text-[#000]">
                Student ID
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
            placeholder="student@example.com"
            variant="underlined"
            label={
              <span className="text-[#000]">
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
              <span className="text-[#000]">
                Phone Number
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",
            }}
          />

          {/* Course */}
          <Select
            placeholder="Select Course"
            variant="underlined"
            label={
              <span className="text-[#000]">
                Enrolled Course
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",
            }}
          >
            <SelectItem key="smile-design">
              Smile Design & Veneers
            </SelectItem>

            <SelectItem key="full-arch">
              Full Arch Mastery
            </SelectItem>

            <SelectItem key="implant">
              Implant Fundamentals
            </SelectItem>

            <SelectItem key="digital">
              Digital Dentistry
            </SelectItem>
          </Select>

          {/* Enrollment Date */}
          <Input
            type="date"
            variant="underlined"
            label={
              <span className="text-[#000]">
                Enrollment Date
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
              <span className="text-[#000]">
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

            <SelectItem key="completed">
              Completed
            </SelectItem>

            <SelectItem key="inactive">
              Inactive
            </SelectItem>
          </Select>

          {/* Emergency Contact */}
          <Input
            placeholder="Emergency Contact Number"
            variant="underlined"
            label={
              <span className="text-[#000]">
                Emergency Contact
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",
            }}
          />
        </div>

        {/* Address */}
        <div className="mt-6">
          <Textarea
            placeholder="Enter student address..."
            variant="underlined"
            label={
              <span className="text-[#000]">
                Address
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",
            }}
            minRows={4}
          />
        </div>

        {/* Notes */}
        <div className="mt-6">
          <Textarea
            placeholder="Additional notes about student..."
            variant="underlined"
            label={
              <span className="text-[#000]">
                Notes
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",
            }}
            minRows={4}
          />
        </div>

        {/* Student Image */}
        <div className="mt-6">
          <label className="block text-[14px] font-medium text-[var(--secondary-color)] mb-2">
            Student Profile Image
          </label>

          <div className="border-2 border-dashed border-[var(--primary-color)] rounded-xl p-8 text-center bg-[var(--light-gold)]">
            <FaUpload
              size={30}
              className="mx-auto text-[var(--primary-color)] mb-3"
            />

            <p className="text-[15px] text-[var(--secondary-color)]">
              Upload Student Profile Image
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

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <Button
            className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] font-semibold px-8"
            radius="md"
          >
            Save Student
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