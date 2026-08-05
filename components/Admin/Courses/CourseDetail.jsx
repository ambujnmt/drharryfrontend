import React, { useMemo, useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import Table from "../../Table/Table";
import { getSingleCourse } from "../../../utils/fetchApi";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/router";
import PageTitle from "../../Breadcrumb/PageTitle";

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");


  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await getCourses();

      if (res.status) {
        const mappedData = res.courses.map((item) => ({
          ...item,

          investment: `$${item.investment}`,

          seats:
            item.seats_left > 0
              ? `${item.seats_left} Seats Left`
              : "0 Seats",

          status: item.status === 1 ? "Active" : "Inactive",
        }));

        setAllCourses(mappedData);
        setCourseData(mappedData);
      } else {
        setMessage(res.message);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourse = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const res = await getSingleCourse(id);

      if (res.status) {
        setCourse(res.course);
      } else {
        setMessage(res.message);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  if (message) {
    return (
      <div className="text-center text-red-600 mt-10">
        {message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EC] p-6">

      <Head title="Course Detail" />

      <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)] mb-2">
        Course Detail
      </h1>

      <p className="text-[#505050] text-[12px] md:text-[12px] lg:text-[16px] mb-8">
        View complete information about this course.
      </p>

      <PageTitle
        breadCrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Manage Courses', path: '/admin/courses/courseList' },
          { label: 'Course Detail', active: true },
        ]}
        title="Course Detail"
      />
      <div className="bg-white rounded-xl shadow-md p-3 md:p-6 lg:p-8">

        {/* Top Course Info */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          <div
            className="
        w-full
        sm:w-[300px]
        md:w-[350px]
        mx-auto
        lg:mx-0
    "
          >
            {course.media_type === "video" ? (
              <>
                {/* Thumbnail */}
                <img
                  src={course.image}
                  className="
                    w-full
                    h-[220px]
                    md:h-[250px]
                    rounded-xl
                    object-cover
                    mb-4
                "
                />

                {/* Video */}
                {course.video && (
                  <video
                    controls
                    className="
                        w-full
                        rounded-xl
                    "
                  >
                    <source src={course.video} controls type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </>
            ) : (
              <img
                src={course.image}
                className="
                w-full
                h-[220px]
                md:h-[250px]
                rounded-xl
                object-cover
            "
              />
            )}
          </div>

          <div className="flex-1">

            <h2 className="text-2xl md:text-3xl font-bold text-[var(--secondary-color)] mb-4">
              {course.title}
            </h2>


            <div className="mt-2 mb-4">
              <span className="text-gray-500">
                Faculty :
              </span>

              <span className="font-semibold text-[var(--primary-color)] ml-1">
                {course.faculty?.name}
              </span>
            </div>


            <div
              className="prose max-w-none text-[#505050] overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: course.description,
              }}
            />

          </div>

        </div>


        {/* Course Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-10">


          {[
            ["Duration", `${course.duration} Days`],
            ["Investment", `$${course.investment}`],
            ["Seats Left", course.seats_left],
            ["Max Students", course.max_students],
            ["Modules", course.modules],
            ["CE Credits", course.ce_credits],
            ["Course Order", course.course_order],
            ["Faculty", course.faculty?.name],
            ["Media Type", course.media_type === "video" ? "Video" : "Image"],
          ].map((item, index) => (
            <div key={index}>
              <p className="text-gray-500 text-sm">
                {item[0]}
              </p>

              <h5 className="font-semibold text-[var(--secondary-color)]">
                {item[1]}
              </h5>
            </div>
          ))}


          <div>
            <p className="text-gray-500 text-sm">
              Status
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm ${course.status == 1
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {course.status == 1 ? "Active" : "Inactive"}
            </span>

          </div>



          <div>

            <p className="text-gray-500 text-sm">
              Featured
            </p>


            <span
              className={`px-3 py-1 rounded-full text-sm ${course.featured == 1
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
                }`}
            >

              {course.featured == 1 ? "Yes" : "No"}

            </span>

          </div>


        </div>



        {/* Learning Objectives */}
        <div className="mt-10">

          <h3 className="text-xl md:text-2xl font-semibold text-[var(--secondary-color)] mb-4">
            Learning Objectives
          </h3>


          <div
            className="prose max-w-none overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: course.learning_objectives,
            }}
          />

        </div>



        {/* Ideal For */}
        <div className="mt-10">

          <h3 className="text-xl md:text-2xl font-semibold text-[var(--secondary-color)] mb-4">
            Ideal For
          </h3>


          <p className="text-[#505050] leading-7">
            {course.ideal_for}
          </p>

        </div>




        {/* Course Highlights */}
        <div className="mt-10">

          <h3 className="text-xl md:text-2xl font-semibold text-[var(--secondary-color)] mb-4">
            Course Highlights
          </h3>


          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

            {course.course_highlights?.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3"
              >

                <span className="text-green-600 text-xl">
                  ✓
                </span>

                <span className="text-[#505050] font-medium">
                  {item}
                </span>

              </li>
            ))}

          </ul>

        </div>





        {/* Faculty */}
        <div className="mt-10 bg-[#F5F2EC] rounded-xl p-4 md:p-6">


          <h3 className="text-xl md:text-2xl font-semibold text-[var(--secondary-color)] mb-6">
            Faculty
          </h3>


          <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">


            <img
              src={`https://site2demo.in/harry/public/uploads/faculty/${course.faculty?.image}`}
              className="
          w-28
          h-28
          md:w-32
          md:h-32
          rounded-full
          object-cover
          flex-shrink-0
        "
            />


            <div className="text-center md:text-left">


              <h4 className="text-xl md:text-2xl font-bold">
                {course.faculty?.name}
              </h4>


              <p className="text-[var(--primary-color)] mt-1">
                {course.faculty?.designation}
              </p>


              <p className="text-gray-600 mt-2">
                {course.faculty?.specialization}
              </p>



              <div
                className="prose max-w-none mt-4"
                dangerouslySetInnerHTML={{
                  __html: course.faculty?.bio,
                }}
              />


            </div>


          </div>


        </div>


      </div>

    </div>
  );
}