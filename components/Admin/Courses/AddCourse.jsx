import React, { useState } from "react";
import {
    Input,
    Textarea,
    Select,
    SelectItem,
    Button,
    Switch,
} from "@heroui/react";

export default function AddCourse() {
    const [featured, setFeatured] = useState(false);

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

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-[#e7e2d7] p-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        placeholder="Enter course title"
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
                        placeholder="course-slug"
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Course Slug
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        type="date"
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Course Date
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
                        placeholder="Dr. John Smith"
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Instructor Name
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        placeholder="Los Angeles, California"
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

                    <Select
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
                        <SelectItem key="open">
                            Open
                        </SelectItem>

                        <SelectItem key="full">
                            Full
                        </SelectItem>

                        <SelectItem key="waitlist">
                            Waitlist
                        </SelectItem>
                    </Select>

                    <Input
                        placeholder="499"
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Course Price ($)
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
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Seats Available
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        type="file"
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Thumbnail Image
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />

                    <Input
                        type="file"
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Banner Image
                                <span className="text-red-500 ml-1">*</span>
                            </span>
                        }
                        classNames={{
                            label: "text-[var(--text-color2)] h-[50px]",
                            input: "text-[var(--secondary-color)] font-medium",

                        }}
                    />
                </div>

                {/* Full Description */}
                <div className="mt-6">
                    <Textarea
                        label="Description"
                        placeholder="Detailed course description"
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Description
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

                {/* Highlights */}
                <div className="mt-6">
                    <Textarea
                        placeholder="• Live patient training
• Smile design workflow
• Veneer preparation"
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Course Highlights
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

                {/* Outcomes */}
                <div className="mt-6">
                    <Textarea
                        placeholder="What students will learn"
                        variant="underlined"
                        label={
                            <span className="text-[#000] ">
                                Learning Outcomes
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

                {/* Featured */}
                {/* <div className="mt-8 flex items-center justify-between bg-[#F5F2EC] rounded-xl p-4">
          <div>
            <h4
              className="text-[#0a2342] text-xl"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Featured Course
            </h4>

            <p
              className="text-sm text-[#2B2B2B]"
              style={{ fontFamily: "Inter" }}
            >
              Display this course prominently on the homepage.
            </p>
          </div>

          <Switch
            isSelected={featured}
            onValueChange={setFeatured}
            color="warning"
          />
        </div> */}



                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-10">
                    <Button
                        className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] font-semibold px-8"
                        radius="md"
                    >
                        Save Course
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