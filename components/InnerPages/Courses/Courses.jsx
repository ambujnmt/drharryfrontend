"use client";

import React, { useState, useEffect } from "react";
import { Link, LinkIcon, Spinner, user } from '@heroui/react';
import { FaSearch, FaFilter } from "react-icons/fa";
import { Accordion, AccordionItem } from "@heroui/react";
import { getCourses } from "../../../utils/fetchApi";
import { useRouter } from "next/router";
import { useUser } from "../../../context/UserContext";
import VideoSec from "../../Main/HomeSections/VideoSec"
import Faqs from "../CMS/Faqs";
import BreadCrumb from "../../Breadcrumb/BreadCrumb";

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


const GOLD = "#C9A84C";
const LIGHT_GOLD = "#FDF6E3";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const router = useRouter();
    const { user } = useUser();

    const handleEnroll = (course, type = "enrollment") => {
        if (user) {
            router.push(`/web/enrollement/submitForm/${course.id}?type=${type}`);
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


    return (
        <>
            {/* == Courses Hero Section == */}
            <BreadCrumb
                title="Courses"
                breadcrumb={[
                    "Home",
                    "Courses",
                ]}
            />
            <section
                className="
  relative
  bg-cover
  bg-center
  bg-no-repeat
  sm:py-[100px]
  md:py-[115px]
 mt-12 lg:mt-[70px] py-12 lg:py-[60px] bg-[var(--light-gold2)]
  "
            >

                {/* Overlay */}


                <div className="container mx-auto px-4 relative z-10">

                    <div className="flex justify-center">

                        <div className="w-full lg:w-7/12 text-center">


                            <div>

                                <h1
                                    className="
            text-[var(--primary-color)]
            font-bold
            leading-[105%]
            mb-[20px]
            sm:mb-[25px]
            lg:mb-[30px]
            text-[36px]
            sm:text-[45px]
            md:text-[55px]
            lg:text-[67.14px]
            "
                                >

                                    Transform Your

                                    <span
                                        className="
              block
              text-[var(--primary-color)]
              "
                                    >
                                        Clinical Experience
                                    </span>

                                </h1>



                                <p
                                    className="
            text-[var(--secondary-color)]
            font-light
            text-[14px]
            sm:text-[15px]
            md:text-[16px]
            leading-[140%]
            max-w-[650px]
            mx-auto
            "
                                >
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
            {/* <section className="bg-[var(--light-gold2)] py-[22px]">
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] sm:gap-0 w-full">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#b5aea5] text-[14px] pointer-events-none" />

                            <input
                                type="text"
                                placeholder="Search courses by name, topic, or keywords..."
                                className="w-full h-[50px] border-[1.5px] border-[#ddd8ce] rounded-[50px] bg-[#faf9f7] pl-[46px] pr-5 text-[14px] text-[#4a4a4a] outline-none focus:border-[#c0b8ae] focus:ring-[3px] focus:ring-[rgba(180,165,145,0.15)]"
                            />
                        </div>
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
            </section> */}
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
                                    <div className="relative h-[500px] bg-white rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] overflow-hidden">
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
                                            {/* <div className="flex justify-between items-end px-5 pb-5">
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
                                            </div> */}

                                            <div className="flex gap-[10px] px-5 pb-5">
                                                {
                                                    course.seats_left > 0 ? (
                                                        <button
                                                            onClick={() => handleEnroll(course, "enrollment")}
                                                            className="flex justify-center items-center w-full text-center bg-[var(--secondary-color)] text-white rounded-[8px] py-[11px] hover:bg-[var(--primary-color)] transition-all duration-500"
                                                        >
                                                            Enroll Now
                                                        </button>
                                                    ) : (
                                                        <button
                                                             onClick={() => handleEnroll(course, "waitlist")}
                                                            className="flex justify-center items-center w-full text-center border border-red-500 text-red-500 rounded-[8px] py-[11px] hover:bg-red-500 hover:text-white transition-all duration-500"
                                                        >
                                                            Join Waitlist
                                                        </button>
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
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                        {/* Left Content */}
                        <div>

                            <h2 className="font-[var(--head-font)] text-white 
          text-[36px] md:text-[42px] lg:text-[50px]
          mb-[30px] leading-[105%]">
                                Learn from the Best in Aesthetic Dentistry
                            </h2>


                            <p className="text-[16px] md:text-[18px] lg:text-[20px]
          leading-[138%] font-normal 
          text-[rgba(255,_255,_255,_0.8)] 
          mt-4 mb-[30px]">
                                Our faculty comprises internationally recognized experts with decades
                                of combined experience in aesthetic dentistry, implantology, and full
                                arch rehabilitation.
                            </p>


                            {/* Points */}
                            <div className="flex items-start mb-3">
                                <img
                                    src="/assets/Images/check-icon.png"
                                    alt="image"
                                    className="w-5 mr-2 mt-1"
                                />

                                <p className="text-[16px] md:text-[18px] lg:text-[20px]
            leading-[138%] font-normal 
            text-[rgba(255,_255,_255,_0.8)]">
                                    Board-certified specialists and diplomates
                                </p>
                            </div>


                            <div className="flex items-start mb-3">
                                <img
                                    src="/assets/Images/check-icon.png"
                                    alt="image"
                                    className="w-5 mr-2 mt-1"
                                />

                                <p className="text-[16px] md:text-[18px] lg:text-[20px]
            leading-[138%] font-normal 
            text-[rgba(255,_255,_255,_0.8)]">
                                    Published authors and researchers
                                </p>
                            </div>


                            <div className="flex items-start mb-3">
                                <img
                                    src="/assets/Images/check-icon.png"
                                    alt="image"
                                    className="w-5 mr-2 mt-1"
                                />

                                <p className="text-[16px] md:text-[18px] lg:text-[20px]
            leading-[138%] font-normal 
            text-[rgba(255,_255,_255,_0.8)]">
                                    Active clinical practice with 1000+ cases annually
                                </p>
                            </div>


                            <div className="flex items-start mb-3">
                                <img
                                    src="/assets/Images/check-icon.png"
                                    alt="image"
                                    className="w-5 mr-2 mt-1"
                                />

                                <p className="text-[16px] md:text-[18px] lg:text-[20px]
            leading-[138%] font-normal 
            text-[rgba(255,_255,_255,_0.8)]">
                                    International lecturers and KOLs
                                </p>
                            </div>



                            {/* Button */}
                            <div className="w-full mt-10">

                                <Link
                                    href="#"
                                    className="
            w-full md:w-[80%] lg:w-[70%]
            block text-center
            bg-[var(--primary-color)]
            text-white
            rounded-[8px]
            py-[11px]
            hover:bg-[var(--secondary-color)]
            transition-all duration-500"
                                >
                                    Meet Our Faculty
                                </Link>

                            </div>

                        </div>



                        {/* Right Image */}
                        <div>

                            <img
                                src="/assets/Images/Aesthetic-Dentistry.png"
                                alt="image"
                                className="
          w-full
          rounded-lg
          h-[350px]
          md:h-[450px]
          lg:h-[600px]
          object-cover"
                            />

                        </div>


                    </div>
                </div>
            </section>
            {/* == // Aesthetic Dentistry Section == */}


            {/* == Learn Anytime, Anywhere Section == */}
            <VideoSec />
            {/* == // Learn Anytime, Anywhere Section == */}


            {/* == FAQ Section == */}
            <Faqs />
            {/* == // FAQ Section == */}
        </>
    )
}
