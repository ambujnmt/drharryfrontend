import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaUsers,
  FaClock,
  FaAward,
  FaPlay,
  FaChevronDown,
  FaHeart,
  FaCheckCircle,
  FaFileAlt,
  FaBook,
  FaVideo,
  FaComments,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { getSingleCourse, getSingleFaculty } from "../../../utils/fetchApi";
import { Link, Spinner } from "@heroui/react";
import { useUser } from "../../../context/UserContext";

export default function CourseHero() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [openSections, setOpenSections] = useState({
    module1: true,
    module2: false,
    module3: false,
  });
  const [faculty, setFaculty] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const handleEnroll = (course) => {
    if (user) {
      router.push(`/web/enrollement/submitForm/${course.id}`);
    } else {
      router.push("/login");
    }
  };

  const fetchCourse = async () => {
    try {
      setLoading(true);

      const res = await getSingleCourse(id);

      setCourse(res.course);

      // Fetch faculty details
      if (res.course.faculty_id) {
        fetchFaculty(res.course.faculty_id);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaculty = async (facultyId) => {
    try {
      const res = await getSingleFaculty(facultyId);

      console.log(res);

      setFaculty(res.faculty);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const switchTab = (tab) => setActiveTab(tab);
  if (loading) {
    return <div className="py-20 text-center"><Spinner color="warning" /></div>;
  }
  return (
    <section>
      {/* HERO */}
      <div className="bg-[#0d1b2e] py-10">

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-end">

          {/* LEFT */}
          <div>

            <h1 className="text-white text-[30px] font-bold leading-tight mb-4 font-serif">
              {course?.title}
            </h1>


            <div
              className="text-white/70 text-[15px] leading-7 max-w-[600px] mb-6 line-clamp-4"
              dangerouslySetInnerHTML={{
                __html: course?.description,
              }}
            />
            {/* STATS */}
            <div className="flex flex-wrap gap-4 mb-6">


              <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white/70 text-sm">
                <FaClock className="text-[var(--primary-color)]" />
                {course?.duration} Hours • {course?.modules} Modules
              </div>

              <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white/70 text-sm">
                <FaAward className="text-[var(--primary-color)]" />
                <strong className="text-white">
                  {course?.ce_credits}
                </strong>{" "}
                CE Credits
              </div>
            </div>

            {/* INSTRUCTOR */}
            <div className="flex items-center gap-3 text-white/60 text-sm mb-8">
              <div className="w-9 h-9 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-[#0d1b2e] font-bold">
                {course?.faculty?.name?.charAt(0)}
              </div>

              Taught by

              <span className="text-[var(--primary-color)] font-semibold">
                {course?.faculty?.name}
              </span>
            </div>

            {/* TABS */}
            <div className="flex border-t border-white/10">
              {["overview", "faculty", "objectives"].map((tab) => (
                <div
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`px-5 py-3 text-sm cursor-pointer border-b-2 transition whitespace-nowrap ${activeTab === tab
                    ? "text-[var(--primary-color)] border-[var(--primary-color)]"
                    : "text-white/60 border-transparent hover:text-white"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              ))}
            </div>


          </div>
          {/* RIGHT ENROLL CARD */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden sticky top-20 self-start">

            {/* THUMB */}
            <div className="relative aspect-video bg-gradient-to-br from-[#0d1b2e] to-[#243352] flex items-center justify-center cursor-pointer">
              <div className="absolute inset-0 "></div>
              <img
                src={course?.image}
                alt={course?.title}
                className="w-full h-full object-cover"
              />

            </div>

            {/* BODY */}
            <div className="p-5">

              <div className="mb-2">
                <span className="text-[30px] font-serif font-bold text-[#0d1b2e]">
                  ${course?.investment}
                </span>

              </div>

              <p className="text-red-600 text-sm font-medium mb-4">
                ⚡  <strong>{course?.seats_left} seats left</strong>
              </p>


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



              {/* INCLUDES */}
              <div className="border-t pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">
                  Course Highlights
                </h4>

                <div className="space-y-2 text-sm text-gray-700">
                  {course?.course_highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaAward className="text-[var(--primary-color)]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="mt-8 container py-4">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-10 text-sm text-gray-700">

            {/* WHAT YOU'LL LEARN */}
            <div>
              <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
                What You'll Learn
              </h2>

              <div
                className="bg-yellow-50 p-6 rounded-lg"
                dangerouslySetInnerHTML={{
                  __html: course?.learning_objectives,
                }}
              />
            </div>



            {/* DESCRIPTION */}
            <div>
              <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
                Course Description
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: course?.description,
                }}
              />
            </div>
          </div>
        )}

        {/* FACULTY TAB */}
        {activeTab === "faculty" && (
          <div className="text-gray-800">

            <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
              Meet the Faculty
            </h2>

            <div className="bg-white border rounded-lg p-6 shadow-sm">

              <img
                src={faculty?.image}
                alt={faculty?.name}
                className="w-28 h-28 rounded-full object-cover mb-4"
              />

              <h3 className="text-2xl font-semibold">
                {faculty?.name}
              </h3>

              <p className="text-[var(--primary-color)] mt-1">
                {faculty?.designation}
              </p>

              <p className="mt-3 text-gray-700">
                <strong>Qualification:</strong> {faculty?.qualification}
              </p>

              <p className="mt-2 text-gray-700">
                <strong>Specialization:</strong> {faculty?.specialization}
              </p>

              <p className="mt-2 text-gray-700">
                <strong>Email:</strong> {faculty?.email}
              </p>

              <p className="mt-2 text-gray-700">
                <strong>Phone:</strong> {faculty?.phone}
              </p>

              <p className="mt-2 text-gray-700">
                <strong>LinkedIn:</strong>

                <a
                  href={faculty?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 ml-2"
                >
                  {faculty?.linkedin}
                </a>
              </p>

              <div
                className="mt-5 leading-7 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: faculty?.bio,
                }}
              />
            </div>

          </div>
        )}

        {/* OBJECTIVES TAB */}
        {activeTab === "objectives" && (
          <div className="space-y-8">

            {/* Course Objectives */}
            <div>
              <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
                Course Objectives
              </h2>

              <div
                className="bg-gray-50 p-6 rounded-lg leading-8 text-gray-700 prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: course?.learning_objectives,
                }}
              />
            </div>

            {/* Ideal For */}
            <div>
              <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
                Ideal For
              </h2>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-7">
                  {course?.ideal_for}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}