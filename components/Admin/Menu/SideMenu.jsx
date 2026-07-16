import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { MdOutlineSick } from "react-icons/md";
import { FaBook, FaUser, FaAmazonPay } from "react-icons/fa";
import { MdDashboard, MdFormatListNumberedRtl, MdManageAccounts } from "react-icons/md";
import { Link } from "@heroui/react";
import { useAdmin } from "../../../context/AdminContext";
import { useUser } from "../../../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { SiHomepage } from "react-icons/si";
import { LiaClinicMedicalSolid } from "react-icons/lia";

export default function AdminSideMenu({ isOpen, onClose }) {
    const { admin } = useAdmin();
    const { user } = useUser();

    return (
        <div
            className={`
        fixed top-0 left-0 z-40 h-[100%] w-64
        bg-[var(--secondary-color)]
        border-r-4 border-[var(--primary-color)]
        shadow-2xl
        flex flex-col
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
        >
            {/* Mobile Close */}
            <div className="lg:hidden flex justify-end p-4 border-b border-white/10">
                <button
                    onClick={onClose}
                    className="
            w-10 h-10
            rounded-full
            bg-[var(--primary-color)]
            text-[var(--secondary-color)]
            font-bold
            text-xl
            flex items-center justify-center
          "
                >
                    ×
                </button>
            </div>

            {/* Logo Section */}
            <div className="relative px-4 py-3 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>

                <div className="relative z-10 text-center">
                    <img
                        src="/assets/Images/footer-logo.png"
                        alt="Welli Logo"
                        className="w-28  object-contain"
                    />


                </div>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-3">
                <ul className="space-y-1 px-2">

                    {/* Dashboard */}
                    <li>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-[15px] font-medium transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)]"
                        >
                            <MdDashboard size={18} />
                            Dashboard
                        </Link>
                    </li>

                    {/* Students */}
                    <li>
                        <Accordion variant="light" className="p-0">
                            <AccordionItem
                                key="2"
                                aria-label="Faculty"
                                classNames={{
                                    base: "p-0",
                                    heading: "p-0",
                                    trigger: "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-[15px] font-medium hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300 min-h-0 h-auto",
                                    title: "text-white text-[15px] font-medium",
                                    indicator: "text-[var(--primary-color)]",
                                    content: "pt-1 pb-1"
                                }}
                                title={
                                    <span className="flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        <FaUser size={18} />
                                        Students
                                    </span>
                                }
                            >
                                <ul className="space-y-1 pl-9">
                                    {/* <li>
                                        <Link href="/admin/students/addStudent" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Add student
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link href="/admin/students/studentList" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Manage students
                                        </Link>
                                    </li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </li>

                    {/* Courses Management */}
                    <li>
                        <Accordion variant="light" className="p-0">
                            <AccordionItem
                                key="1"
                                aria-label="Courses"
                                classNames={{
                                    base: "p-0",
                                    heading: "p-0",
                                    trigger: "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-[15px] font-medium hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300 min-h-0 h-auto",
                                    title: "text-white text-[15px] font-medium",
                                    indicator: "text-[var(--primary-color)]",
                                    content: "pt-1 pb-1"
                                }}
                                title={
                                    <span className="flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        <FaBook size={18} />
                                        Courses Management
                                    </span>
                                }
                            >
                                <ul className="space-y-1 pl-9">
                                    <li>
                                        <Link href="/admin/courses/addCourse" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Add Course
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/courses/courseList" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Manage Courses
                                        </Link>
                                    </li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </li>

                    {/* Faculty Management */}
                    <li>
                        <Accordion variant="light" className="p-0">
                            <AccordionItem
                                key="2"
                                aria-label="Faculty"
                                classNames={{
                                    base: "p-0",
                                    heading: "p-0",
                                    trigger: "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-[15px] font-medium hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300 min-h-0 h-auto",
                                    title: "text-white text-[15px] font-medium",
                                    indicator: "text-[var(--primary-color)]",
                                    content: "pt-1 pb-1"
                                }}
                                title={
                                    <span className="flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        <FaUser size={18} />
                                        Faculty Management
                                    </span>
                                }
                            >
                                <ul className="space-y-1 pl-9">
                                    <li>
                                        <Link href="/admin/faculty/addFaculty" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Add Faculty
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/faculty/facultyList" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Manage Faculty
                                        </Link>
                                    </li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </li>

                    {/* Enrollement Management */}
                    <li>
                        <Accordion variant="light" className="p-0">
                            <AccordionItem
                                key="2"
                                aria-label="Faculty"
                                classNames={{
                                    base: "p-0",
                                    heading: "p-0",
                                    trigger: "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-[15px] font-medium hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300 min-h-0 h-auto",
                                    title: "text-white text-[15px] font-medium",
                                    indicator: "text-[var(--primary-color)]",
                                    content: "pt-1 pb-1"
                                }}
                                title={
                                    <span className="flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        <MdFormatListNumberedRtl size={18} />
                                        Enrollement
                                    </span>
                                }
                            >
                                <ul className="space-y-1 pl-9">
                                    <li>
                                        <Link href="/admin/enrollement/list" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            List
                                        </Link>
                                    </li>

                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </li>

                    {/* Home Page Management */}
                    <li>
                        <Accordion variant="light" className="p-0">
                            <AccordionItem
                                key="2"
                                aria-label="Faculty"
                                classNames={{
                                    base: "p-0",
                                    heading: "p-0",
                                    trigger: "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-[15px] font-medium hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300 min-h-0 h-auto",
                                    title: "text-white text-[15px] font-medium",
                                    indicator: "text-[var(--primary-color)]",
                                    content: "pt-1 pb-1"
                                }}
                                title={
                                    <span className="flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        <SiHomepage size={18} />
                                        Home Page
                                    </span>
                                }
                            >
                                <ul className="space-y-1 pl-9">
                                    <li>
                                        <Link href="/admin/homePage/heroBanner" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Hero Title
                                        </Link>
                                    </li>

                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </li>

                    {/* Case Management */}
                    <li>
                        <Accordion variant="light" className="p-0">
                            <AccordionItem
                                key="2"
                                aria-label="Faculty"
                                classNames={{
                                    base: "p-0",
                                    heading: "p-0",
                                    trigger: "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-[15px] font-medium hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300 min-h-0 h-auto",
                                    title: "text-white text-[15px] font-medium",
                                    indicator: "text-[var(--primary-color)]",
                                    content: "pt-1 pb-1"
                                }}
                                title={
                                    <span className="flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        <LiaClinicMedicalSolid size={18} />
                                        Case Management
                                    </span>
                                }
                            >
                                <ul className="space-y-1 pl-9">
                                    <li>
                                        <Link href="/admin/case/category/category" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Case Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/case/case/addCase" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Add Case
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/case/case/manageCase" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Manage Case
                                        </Link>
                                    </li>

                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </li>

                    {/* Subscription plan Management */}
                    <li>
                        <Accordion variant="light" className="p-0">
                            <AccordionItem
                                key="2"
                                aria-label="Faculty"
                                classNames={{
                                    base: "p-0",
                                    heading: "p-0",
                                    trigger: "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-[15px] font-medium hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300 min-h-0 h-auto",
                                    title: "text-white text-[15px] font-medium",
                                    indicator: "text-[var(--primary-color)]",
                                    content: "pt-1 pb-1"
                                }}
                                title={
                                    <span className="flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        <FaAmazonPay size={18} />
                                        Subscription plans
                                    </span>
                                }
                            >
                                <ul className="space-y-1 pl-9">
                                    <li>
                                        <Link href="/admin/subsPlan/subsPlan" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Subscription plans
                                        </Link>
                                    </li>


                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </li>

                    {/* CMS */}
                    <li>
                        <Accordion variant="light" className="p-0">
                            <AccordionItem
                                key="2"
                                aria-label="Faculty"
                                classNames={{
                                    base: "p-0",
                                    heading: "p-0",
                                    trigger: "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-[15px] font-medium hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300 min-h-0 h-auto",
                                    title: "text-white text-[15px] font-medium",
                                    indicator: "text-[var(--primary-color)]",
                                    content: "pt-1 pb-1"
                                }}
                                title={
                                    <span className="flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        <MdManageAccounts size={18} />
                                        CMS
                                    </span>
                                }
                            >
                                <ul className="space-y-1 pl-9">
                                    <li>
                                        <Link href="/admin/cms/faqs" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            FAQ's
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/cms/privacyPolicy" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/cms/terms" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                            Terms of Service
                                        </Link>
                                    </li>
                                                     <li>
                                        <Link href="/admin/cms/contactUs" className="block rounded-lg px-4 py-2 text-[14px] text-gray-300 hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300">
                                           Contact Us
                                        </Link>
                                    </li>
                                                                    </ul>

                            </AccordionItem>
                        </Accordion>
                    </li>
                </ul>
            </div>
        </div>
    );
}