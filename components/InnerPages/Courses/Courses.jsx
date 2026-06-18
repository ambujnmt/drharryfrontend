"use client";

import React, { useState, useEffect } from "react";
import { Link, LinkIcon, Spinner, user } from '@heroui/react';
import { FaSearch, FaFilter } from "react-icons/fa";
import { Accordion, AccordionItem } from "@heroui/react";
import { getCourses } from "../../../utils/fetchApi";
import { useRouter } from "next/router";
import { useUser } from "../../../context/UserContext";

// == This is for Accordian ==
const items = [
    {
        title: "What are the requirements for enrolling",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, impedit rem, quisquam aspernatur blanditiis consequuntur provident sequi omnis, laudantium assumenda officiis quas quod earum? Iste id at nesciunt ut optio.",
    },
    {
        title: "What are the requirements for enrolling",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, impedit rem, quisquam aspernatur blanditiis consequuntur provident sequi omnis, laudantium assumenda officiis quas quod earum? Iste id at nesciunt ut optio.",
    },
    {
        title: "What are the requirements for enrolling",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, impedit rem, quisquam aspernatur blanditiis consequuntur provident sequi omnis, laudantium assumenda officiis quas quod earum? Iste id at nesciunt ut optio.",
    },
    {
        title: "What are the requirements for enrolling",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, impedit rem, quisquam aspernatur blanditiis consequuntur provident sequi omnis, laudantium assumenda officiis quas quod earum? Iste id at nesciunt ut optio.",
    },
];
// == // This is for Accordian ==


// == This is For Video section tabs ==
const tabs = [
    {
        id: "surgical",
        label: "Surgical videos",
        content: {
            title: "Surgical Procedures",
            description:
                "Advanced surgical techniques and protocols. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "154+",
            modules: "3",
            browseLabel: "Browse Surgical Procedure",
            cards: [
                {
                    count: "85+ procedures",
                    title: "Surgical Videos",
                    desc: "Step-by-step surgical demonstrations with expert commentary",
                },
                {
                    count: "42+ videos",
                    title: "Implant Placement",
                    desc: "Surgical protocols for optimal implant positioning",
                },
                {
                    count: "27+ videos",
                    title: "Soft Tissue Management",
                    desc: "Step-by-step surgical demonstrations with expert commentary",
                },
            ],
        },
    },
    {
        id: "smile",
        label: "Smile design tutorials",
        content: {
            title: "Smile Design Tutorials",
            description:
                "Master the art of digital smile design. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "98+",
            modules: "4",
            browseLabel: "Browse Smile Design",
            cards: [
                {
                    count: "40+ tutorials",
                    title: "Digital Smile Design",
                    desc: "Create stunning smile makeovers using digital tools and techniques",
                },
                {
                    count: "33+ videos",
                    title: "Shade Matching",
                    desc: "Precision shade selection and matching techniques for natural results",
                },
                {
                    count: "25+ videos",
                    title: "Mock-up Techniques",
                    desc: "Hands-on mock-up workflows for predictable smile transformations",
                },
            ],
        },
    },
    {
        id: "crown",
        label: "Crown prep",
        content: {
            title: "Crown Prep",
            description:
                "Master precise crown preparation techniques. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "120+",
            modules: "3",
            browseLabel: "Browse Crown Prep",
            cards: [
                {
                    count: "50+ videos",
                    title: "Preparation Techniques",
                    desc: "Achieve ideal margins and reduction with proven prep techniques",
                },
                {
                    count: "38+ videos",
                    title: "Impression Taking",
                    desc: "Accurate impression workflows for predictable crown outcomes",
                },
                {
                    count: "32+ videos",
                    title: "Temporary Restorations",
                    desc: "Fabricate and cement high-quality temporaries with ease",
                },
            ],
        },
    },
    {
        id: "veneer",
        label: "Veneer cementation",
        content: {
            title: "Veneer Cementation",
            description:
                "Perfect your veneer bonding protocol. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "86+",
            modules: "3",
            browseLabel: "Browse Veneer Cementation",
            cards: [
                {
                    count: "35+ videos",
                    title: "Surface Preparation",
                    desc: "Optimal etching and bonding surface prep for long-lasting veneers",
                },
                {
                    count: "28+ videos",
                    title: "Resin Selection",
                    desc: "Choosing the right cement shade and viscosity for each case",
                },
                {
                    count: "23+ videos",
                    title: "Finishing & Polishing",
                    desc: "Achieve flawless margins and high-gloss finish every time",
                },
            ],
        },
    },
    {
        id: "fullarch",
        label: "Full arch workflow",
        content: {
            title: "Full Arch Workflow",
            description:
                "Advanced full arch treatment planning and delivery. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "154+",
            modules: "3",
            browseLabel: "Browse Full Arch Workflow",
            cards: [
                {
                    count: "85+ procedures",
                    title: "Surgical Videos",
                    desc: "Step-by-step surgical demonstrations with expert commentary",
                },
                {
                    count: "42+ videos",
                    title: "Implant Placement",
                    desc: "Surgical protocols for optimal implant positioning",
                },
                {
                    count: "27+ videos",
                    title: "Soft Tissue Management",
                    desc: "Step-by-step surgical demonstrations with expert commentary",
                },
            ],
        },
    },
];

const GOLD = "#C9A84C";
const LIGHT_GOLD = "#FDF6E3";
// == // This is For Video section tabs

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const router = useRouter();
    const { user } = useUser();

    const handleEnroll = (course) => {
        if (user) {
            router.push(`/web/enrollement/submitForm/${course.id}`);
        } else {
            router.push("/login");
        }
    };

    const fetchCourses = async () => {
        try {
            setLoadingCourses(true);

            const res = await getCourses();

            const activeCourses = res.courses.filter(
                (item) => item.status == 1
            );

            const featured = res.courses.filter(
                (item) => item.status == 1 && item.featured == 1
            );

            setCourses(activeCourses);
            setFeaturedCourses(featured);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCourses(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);
    const [activeTab, setActiveTab] = useState("fullarch");

    const current = tabs.find((t) => t.id === activeTab).content;

    return (
        <>
            {/* == Courses Hero Section == */}
            <section className="relative bg-[url('/assets/Images/course-hero-img.jpg')] bg-cover bg-center bg-no-repeat py-[132px]">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="container mx-auto relative z-10">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-7/12 text-center">
                            <div>
                                <h1 className="text-white font-bold leading-[102%] mb-[30px] text-[67.14px] md:text-[55px] lg:text-[67.14px]">
                                    Transform Your
                                    <span className="block text-[var(--primary-color)]">
                                        Clinical Experience
                                    </span>
                                </h1>
                                <p className="text-white font-light text-[16px] leading-[140%]">
                                    Elevate your practice with world-class education in aesthetic
                                    dentistry, smile design, digital workflows, and full arch
                                    rehabilitation, etc...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* == // Courses Hero Section == */}


            {/* == Search Section == */}
            <section className="bg-[var(--light-gold2)] py-[22px]">
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] sm:gap-0 w-full">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#b5aea5] text-[14px] pointer-events-none" />

                            <input
                                type="text"
                                placeholder="Search courses by name, topic, or keywords..."
                                className="w-full h-[50px] border-[1.5px] border-[#ddd8ce] rounded-[50px] bg-[#faf9f7] pl-[46px] pr-5 text-[14px] text-[#4a4a4a] outline-none focus:border-[#c0b8ae] focus:ring-[3px] focus:ring-[rgba(180,165,145,0.15)]"
                            />
                        </div>
                        {/* Select */}
                        <div className="relative flex items-center sm:ml-4">
                            <FaFilter className="absolute left-[16px] z-10 bg-[#E5E5E8] p-[4px] rounded-full w-[23px] h-[23px] text-[#7a7065]" />

                            <select
                                className="h-[50px] w-full sm:w-[145px] border-[1.5px] border-[#ddd8ce] rounded-[50px] bg-[#faf9f7] pl-[50px] pr-5 text-[14px] font-medium text-[#3d3730] appearance-none outline-none cursor-pointer focus:border-[#c0b8ae] focus:ring-[3px] focus:ring-[rgba(180,165,145,0.15)]"
                            >
                                <option>All Levels</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            {/* == // Search Section == */}


            {/* == Featured Programs Section == */}
            <section className="my-[60px]">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-[var(--head-font)] text-[var(--secondary-color)] text-[50px] mb-[15px] leading-[105%]">
                            Featured Programs
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        {
                            loadingCourses ? (
                                <div className="col-span-3 text-center py-10">
                                    <Spinner />
                                </div>
                            ) : (
                                featuredCourses.map((course) => (
                                    <div className="relative h-[580px] bg-white rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-[203px] object-cover"
                                        />

                                        <div className="p-5">
                                            <h2 className="text-[18px] text-[#000] font-semibold leading-[100%]">
                                                {course.title}
                                            </h2>


                                            <div
                                                className="prose max-w-none text-[16px] leading-[140%] font-normal text-black mt-4 w-full overflow-hidden line-clamp-2 break-words"
                                                dangerouslySetInnerHTML={{
                                                    __html: course.description,
                                                }}
                                            />

                                            <div className="grid grid-cols-2 gap-x-[10px] gap-y-[7px] mt-5">
                                                <div className="flex items-center gap-2 text-[18px] text-[var(--secondary-color)]">
                                                    <img src="/assets/Images/check-icon.png" alt="" className="w-5" />
                                                    <span>{course.duration}</span>
                                                </div>

                                                <div className="flex items-center gap-2 text-[18px] text-[var(--secondary-color)]">
                                                    <img src="/assets/Images/check-icon.png" alt="" className="w-5" />
                                                    <span>{course.max_students} Max</span>
                                                </div>

                                                <div className="flex items-center gap-2 text-[18px] text-[var(--secondary-color)]">
                                                    <img src="/assets/Images/check-icon.png" alt="" className="w-5" />
                                                    <span>{course.modules} Modules</span>
                                                </div>

                                                <div className="flex items-center gap-2 text-[18px] text-[var(--secondary-color)]">
                                                    <img src="/assets/Images/check-icon.png" alt="" className="w-5" />
                                                    <span>{course.ce_credits} CE Credits</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-0 w-full">
                                            <div className="flex justify-between items-end px-5 pb-5">
                                                <div>
                                                    <div className="text-[18px] text-[#505050]">Investment</div>
                                                    <div className="text-[28px] font-medium text-[var(--secondary-color)]">
                                                        ${course.investment}
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-[18px] text-[#505050]">Availability</div>
                                                    <div className="text-[18px] font-medium text-[#1A8233]">
                                                        {
                                                            course.seats_left > 0 ? (
                                                                <div className="text-[18px] font-medium text-[#1A8233]">
                                                                    {course.seats_left} seats left
                                                                </div>
                                                            ) : (
                                                                <div className="text-[18px] font-medium text-red-500">
                                                                    Full - Join Waitlist
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-[10px] px-5 pb-5">
                                                {
                                                    course.seats_left > 0 ? (
                                                        <button
                                                            onClick={() => handleEnroll(course)}
                                                            className="flex justify-center items-center w-full text-center bg-[var(--secondary-color)] text-white rounded-[8px] py-[11px] hover:bg-[var(--primary-color)] transition-all duration-500"
                                                        >
                                                            Enroll Now
                                                        </button>
                                                    ) : (
                                                        <Link
                                                            href="#"
                                                            className="flex justify-center items-center w-full text-center border border-red-500 text-red-500 rounded-[8px] py-[11px] hover:bg-red-500 hover:text-white transition-all duration-500"
                                                        >
                                                            Join Waitlist
                                                        </Link>
                                                    )
                                                }

                                                <Link
                                                    href={`/web/courses/detail/${course.id}`}
                                                    className="border border-[var(--secondary-color)] text-[var(--secondary-color)] rounded-[8px] px-5 py-[11px]"
                                                >
                                                    Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            )
                        }

                    </div>
                </div>
            </section>
            {/* == // Featured Programs Section == */}


            {/* == All Programs == */}
            <section className="mt-[60px] bg-[var(--light-gold2)] pt-[60px] pb-[70px]">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-[var(--head-font)] text-[var(--secondary-color)] text-[50px] mb-[15px] leading-[105%]">
                            All Programs
                        </h2>
                        <h6 className="text-[#000c] text-[20px] mb-[15px] leading-[138%]">Comprehensive training pathways for every <br /> stage of your career</h6>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        {loadingCourses ? (
                            <div className="col-span-3 flex justify-center py-20">
                                <Spinner size="lg" color="warning" />
                            </div>
                        ) : (
                            courses.map((course) => (
                                <div className="relative bg-white rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-[203px] object-cover"
                                    />

                                    <div className="p-5">
                                        <h2 className="text-[18px] font-semibold leading-[100%]">
                                            {course.title}
                                        </h2>



                                        <div
                                            className="prose max-w-none text-[16px] leading-[140%] font-normal text-black mt-4 w-full overflow-hidden line-clamp-2 break-words"
                                            dangerouslySetInnerHTML={{
                                                __html: course.description,
                                            }}
                                        />

                                        <div className="grid grid-cols-3 gap-x-[10px] gap-y-[7px] mt-5">
                                            <div className="flex items-center gap-2">
                                                <img src="/assets/Images/check-icon.png" alt="" className="w-4" />
                                                <span className="text-[16px] text-[rgba(0, 0, 0, 0.7)]">{course.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <img src="/assets/Images/check-icon.png" alt="" className="w-4" />
                                                <span className="text-[16px] text-[rgba(0, 0, 0, 0.7)]"> {course.ce_credits} CE</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[16px] text-[rgba(26,_130,_51,_1)]">{course.seats_left > 0 ? (
                                                    <span className="text-[16px] text-[rgba(26,130,51,1)]">
                                                        {course.seats_left} seats
                                                    </span>
                                                ) : (
                                                    <span className="text-[16px] text-red-600">
                                                        Waitlist
                                                    </span>
                                                )}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="left-0 w-full">
                                        <div className="flex gap-[10px] px-5 pb-5">
                                            <Link
                                                key={course.id}
                                                href={`/web/courses/detail/${course.id}`}
                                                className="flex justify-center items-center w-full text-center bg-[var(--secondary-color)] text-white rounded-[8px] py-[11px] hover:bg-[var(--primary-color)] transition-all duration-500"
                                            >
                                                View Details
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            ))
                        )}


                    </div>
                </div>
            </section>
            {/* == // All Programs Section == */}


            {/* == Aesthetic Dentistry Section == */}
            <section className="bg-[var(--secondary-color)] py-[60px]">
                <div className="container">
                    <div className="row grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-6">
                            <h2 className="font-[var(--head-font)] text-white text-[50px] mb-[30px] leading-[105%]">Learn from the Best in Aesthetic Dentistry</h2>
                            <p className='text-[20px] leading-[138%] font-normal text-[rgba(255,_255,_255,_0.8)] mt-4 mb-[30px]'>Our faculty comprises internationally recognized experts with decades of combined experience in aesthetic dentistry, implantology, and full arch rehabilitation.</p>
                            <div className="flex items-center mb-2">
                                <img
                                    src="/assets/Images/check-icon.png"
                                    alt="image"
                                    className='w-5 mr-2'
                                />
                                <p className='text-[20px] leading-[138%] font-normal text-[rgba(255,_255,_255,_0.8)]'>Board-certified specialists and diplomates</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <img
                                    src="/assets/Images/check-icon.png"
                                    alt="image"
                                    className='w-5 mr-2'
                                />
                                <p className='text-[20px] leading-[138%] font-normal text-[rgba(255,_255,_255,_0.8)]'>Published authors and researchers</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <img
                                    src="/assets/Images/check-icon.png"
                                    alt="image"
                                    className='w-5 mr-2'
                                />
                                <p className='text-[20px] leading-[138%] font-normal text-[rgba(255,_255,_255,_0.8)]'>Active clinical practice with 1000+ cases annually</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <img
                                    src="/assets/Images/check-icon.png"
                                    alt="image"
                                    className='w-5 mr-2'
                                />
                                <p className='text-[20px] leading-[138%] font-normal text-[rgba(255,_255,_255,_0.8)]'>International lecturers and KOLs</p>
                            </div>
                            <div className="w-full mt-10">
                                <Link href="#" class="w-[70%] block text-center bg-[var(--primary-color)] text-white rounded-[8px] py-[11px] hover:bg-[var(--secondary-color)] transition-all duration-500">Meet Our Faculty</Link>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <img
                                src="/assets/Images/Aesthetic-Dentistry.png"
                                alt="image"
                                className='w-full rounded-lg h-[600px] object-cover'
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* == // Aesthetic Dentistry Section == */}


            {/* == Learn Anytime, Anywhere Section == */}
            <section className="mt-[60px] ">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="max-w-2xl mx-auto text-center mb-10">
                        <h2
                            className="text-[50px] font-medium mb-4 text-[var(--secondary-color)]"
                        >
                            Learn Anytime, Anywhere
                        </h2>
                        <p className="text-[#000c] text-[20px] mb-[15px] leading-[138%]">
                            Access our comprehensive video library with over 500 hours of
                            premium content. From foundational techniques to advanced
                            masterclasses, learn at your own pace with unlimited access.
                        </p>
                    </div>


                    {/* Tab Nav */}
                    <div
                        className="flex p-6 bg-white mx-16 rounded-xl shadow-md flex-wrap justify-evenly gap-2 mb-8"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-full text-[16px] font-medium  tracking-wide transition-all duration-300 ${activeTab === tab.id
                                    ? "bg-[var(--primary-color)] text-white"
                                    : "text-black  bg-[#F5F2EC] hover:bg-[var(--secondary-color)] hover:text-[#ffffff]"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div>
                        {/* Top row: image + info */}
                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                            {/* Image */}
                            <div className="md:w-1/2 relative rounded-xl overflow-hidden">
                                <img
                                    src="/assets/Images/SurgicalProcedures.png"
                                    alt="Video Thumbnail"
                                    className="w-full h-[320px] object-cover rounded-xl"
                                />
                                {/* Play button */}
                                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-white/85 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:scale-110 transition-all duration-300">
                                    <svg
                                        className="w-[26px] h-[26px] fill-[#C9A84C]"
                                        viewBox="0 0 24 24"
                                    >
                                        <polygon points="5,3 19,12 5,21" />
                                    </svg>
                                </button>
                            </div>

                            {/* Info */}
                            <div className="md:w-1/2 flex flex-col justify-center gap-6">
                                <div>
                                    <h4 className="font-[var(--head-font)] text-[40px] leading-[100%] mb-4">
                                        {current.title}
                                    </h4>
                                    <p className="text-[#000c] text-[18px] leading-[140%]">
                                        {current.description}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex-1 text-center rounded-xl py-4 px-2 bg-[var(--light-gold2)]">
                                        <h4
                                            className="font-medium mb-3 text-[40px] leading-[100%] text-[var(--primary-color)]"
                                        >
                                            {current.totalVideos}
                                        </h4>
                                        <p className="text-[18px] font-normal text-black m-0">
                                            Total Videos
                                        </p>
                                    </div>
                                    <div
                                        className="flex-1 text-center rounded-xl py-4 px-2 bg-[var(--light-gold2)]"
                                    >
                                        <h4
                                            className="font-medium mb-3 text-[40px] leading-[100%] text-[var(--primary-color)]"

                                        >
                                            {current.modules}
                                        </h4>
                                        <p className="text-[18px] font-normal text-black m-0">
                                            Modules
                                        </p>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div>
                                    <Link
                                        href="#"
                                        className="inline-block px-12 py-3 rounded-lg font-medium text-white text-sm tracking-wide hover:opacity-90 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] transition-all duration-500 ease-in-out"
                                    >
                                        {current.browseLabel}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Bottom cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {current.cards.map((card, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl p-5 bg-[var(--light-gold2)]"
                                >
                                    <p
                                        className="text-[16px] font-normal mb-2  text-[var(--primary-color)]"
                                    >
                                        {card.count}
                                    </p>
                                    <h4
                                        className="font-normal mb-2 text-[25px] "

                                    >
                                        {card.title}
                                    </h4>
                                    <p
                                        className=" mb-4 text-[18px] text-black/50"

                                    >
                                        {card.desc}
                                    </p>
                                    <Link href="#" className="text-[var(--primary-color)] pb-[2px] text-[18px] font-medium hover:text-[var(--secondary-color)] transition-all">
                                        Watch Videos
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* == // Learn Anytime, Anywhere Section == */}


            {/* == FAQ Section == */}
            <section className='mt-[50px] bg-[var(--light-gold2)] py-[50px]'>
                <div className="container">
                    <div className="row">
                        <div className="max-w-2xl mx-auto text-center mb-10">
                            <h2 className="text-[50px] font-medium mb-4 text-[var(--secondary-color)]">Frequently Asked Questions</h2>
                            <p className="text-[#000c] text-[20px] mb-[15px] leading-[138%]">Everything you need to know about AAI courses</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-2"></div>
                            <div className="col-span-8">
                                <Accordion
                                    variant="splitted"
                                    className=""
                                >
                                    {items.map((item) => (
                                        <AccordionItem
                                            aria-label={item.title}
                                            title={
                                                <span
                                                    className="text-[20px] leading-[138%] text-[var(--secondary-color)]"
                                                    style={{ fontFamily: "Inter, sans-serif" }}
                                                >
                                                    {item.title}
                                                </span>
                                            }
                                        >
                                            {item.content}
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                            <div className="col-span-2"></div>
                        </div>
                    </div>
                </div>
            </section>
            {/* == // FAQ Section == */}
        </>
    )
}
