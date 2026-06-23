import { Link ,Spinner} from "@heroui/react";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaCheck,
  FaFolderOpen,
  FaPhoneAlt,
  FaLinkedinIn,
  FaHeartbeat,
  FaUsers,
  FaShieldAlt,
  FaLaptopMedical,
  FaDesktop,
  FaArrowRight,
} from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { GiGrowth } from "react-icons/gi";
import { useRouter } from "next/router";
import { getSingleFaculty ,getCourses } from "../../../utils/fetchApi";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchFaculty();
        fetchCourses();
    }
  }, [id]);

  const fetchFaculty = async () => {
    try {
      setLoading(true);

      const response = await getSingleFaculty(id);

      if (response?.status) {
        setFaculty(response.faculty);
      }
    } catch (error) {
      console.error("Faculty Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
  try {
    const response = await getCourses();

    if (response?.status) {
      setCourses(response.courses || []);
    }
  } catch (error) {
    console.error("Course Error:", error);
  }
};

const facultyCourses = courses.filter(
  (course) => course.faculty_id === faculty?.id
);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner size="lg" color="warning"/>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="py-20 text-center">
        Faculty not found
      </div>
    );
  }
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 px-4 py-14">
        {/* Background Shapes */}
        <div className="absolute -right-16 -top-16 h-96 w-96 rounded-full bg-amber-500/10"></div>
        <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-amber-500/5"></div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row">
          {/* Image */}
          <div className="relative shrink-0">
            <img
              src={faculty?.image}
              alt={faculty?.name}
              className="h-52 w-52 rounded-full border-4 border-amber-500 object-cover shadow-[0_0_0_8px_rgba(245,158,11,0.15)]"
            />

            {/* Verified Badge */}
            <div className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-slate-900 bg-amber-500">
              <FaCheck className="text-sm text-slate-900" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">

            {/* Name */}
            <h1 className="mb-2 text-4xl font-bold text-white lg:text-5xl">
              {faculty?.name}
            </h1>

            {/* Designation */}
            <p className="mb-2 text-lg italic text-amber-400">
              {faculty?.designation}
            </p>

            {/* Qualification */}
            <div className="mb-6 inline-block rounded-md bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-white/75">
              {faculty?.qualification}
            </div>

            {/* Stats */}
            <div className="mb-8 flex flex-wrap justify-center gap-8 lg:justify-start">



              <div className="hidden h-10 w-px bg-white/15 md:block"></div>

              <div>
                <h3 className="text-3xl font-bold text-amber-400">8</h3>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                  Programs
                </p>
              </div>
              <div className="hidden h-10 w-px bg-white/15 md:block"></div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">

              <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-amber-500 hover:text-amber-400">
                <HiChatBubbleLeftRight />
                Contact Faculty
              </button>

              <Link
                href={faculty?.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:border-amber-500 hover:bg-amber-500/20 hover:text-amber-400"
              >
                <FaLinkedinIn />
              </Link>

              <Link
                href={`mailto:${faculty?.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:border-amber-500 hover:bg-amber-500/20 hover:text-amber-400"
              >
                <FaEnvelope />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-[1fr_320px]">

        {/* MAIN COLUMN */}
        <div>

          {/* ABOUT */}
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 inline-block border-b-2 border-amber-500 pb-3 text-2xl font-bold text-slate-900">
              About Dr. Harry Ashitey
            </h2>

            <div className="space-y-4 text-[15px] leading-8 text-slate-600">
              <div
                className="space-y-4 text-[15px] leading-8 text-slate-600"
                dangerouslySetInnerHTML={{
                  __html: faculty?.bio || "",
                }}
              />
            </div>
          </div>



          {/* SPECIALIZATIONS */}
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 inline-block border-b-2 border-amber-500 pb-3 text-2xl font-bold text-slate-900">
              Areas of Specialization
            </h2>

            <div className="flex flex-wrap gap-3">
              {faculty?.specialization?.split(",").map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-slate-800"
                >
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  {item.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* PROGRAMS */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 inline-block border-b-2 border-amber-500 pb-3 text-2xl font-bold text-slate-900">
              Programs by {faculty?.name}
            </h2>

            <div className="space-y-4">
    {facultyCourses?.length > 0 ? (
      facultyCourses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:shadow-md md:flex-row md:items-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-amber-300 bg-amber-50 text-amber-600">
            <FaLaptopMedical size={22} />
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-slate-900">
              {course.title}
            </h4>

            <p className="text-sm text-gray-500">
              {course.duration} • {course.modules} Modules •{" "}
              {course.ce_credits} CE Credits
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900">
              ${course.investment}
            </span>

            <Link
                href={`/web/courses/detail/${course.id}`}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View
            </Link>
          </div>
        </div>
      ))
    ) : (
      <div className="rounded-lg border border-dashed border-gray-300 py-8 text-center text-gray-500">
        No programs available for this faculty.
      </div>
    )}
  </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:sticky lg:top-20">


          {/* Contact */}
          <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">
              Contact Information
            </h4>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <Link href={`mailto:${faculty?.email}`} className="font-medium text-black">
                    {faculty?.email}
                  </Link>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>

                  <Link href={`tel:${faculty?.phone}`} className="font-medium text-black">
                    {faculty?.phone}
                  </Link>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <FaLinkedinIn />
                </div>
                <div>
                  <p className="text-xs text-gray-400">LinkedIn</p>
                  <Link
                    href={faculty?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-black"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}
