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

      <h1 className="text-[42px] text-[var(--secondary-color)] mb-2">
        Course Detail
      </h1>

      <p className="text-[#505050] mb-8">
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
      <div className="bg-white rounded-xl shadow-md p-8">

        <div className="flex gap-8">

          <img
            src={course.image}
            className="w-[350px] h-[250px] rounded-xl object-cover"
          />

          <div className="flex-1">

            <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-4">
              {course.title}
            </h2>

            <div className="mt-2 mb-4">
              <span className="text-gray-500">Faculty : </span>

              <span className="font-semibold text-[var(--primary-color)]">
                {course.faculty?.name}
              </span>
            </div>

            <div
              className="prose max-w-none text-[#505050]"
              dangerouslySetInnerHTML={{
                __html: course.description,
              }}
            />

          </div>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

  <div>
    <p className="text-gray-500">Duration</p>
    <h5>{course.duration} Days</h5>
  </div>

  <div>
    <p className="text-gray-500">Investment</p>
    <h5>${course.investment}</h5>
  </div>

  <div>
    <p className="text-gray-500">Seats Left</p>
    <h5>{course.seats_left}</h5>
  </div>

  <div>
    <p className="text-gray-500">Max Students</p>
    <h5>{course.max_students}</h5>
  </div>

  <div>
    <p className="text-gray-500">Modules</p>
    <h5>{course.modules}</h5>
  </div>

  <div>
    <p className="text-gray-500">CE Credits</p>
    <h5>{course.ce_credits}</h5>
  </div>

  <div>
    <p className="text-gray-500">Course Order</p>
    <h5>{course.course_order}</h5>
  </div>

  <div>
    <p className="text-gray-500">Faculty</p>
    <h5>{course.faculty?.name}</h5>
  </div>

  <div>
    <p className="text-gray-500">Status</p>

    <span
      className={`px-3 py-1 rounded-full text-sm ${
        course.status == 1
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {course.status == 1 ? "Active" : "Inactive"}
    </span>
  </div>

  <div>
    <p className="text-gray-500">Featured</p>

    <span
      className={`px-3 py-1 rounded-full text-sm ${
        course.featured == 1
          ? "bg-yellow-100 text-yellow-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {course.featured == 1 ? "Yes" : "No"}
    </span>
  </div>

</div>

<div className="mt-10">

  <h3 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">
    Learning Objectives
  </h3>

  <div
    className="prose max-w-none"
    dangerouslySetInnerHTML={{
      __html: course.learning_objectives,
    }}
  />

</div>

<div className="mt-10">

  <h3 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">
    Ideal For
  </h3>

  <p className="text-[#505050] leading-7">
    {course.ideal_for}
  </p>

</div>

<div className="mt-10 bg-[#F5F2EC] rounded-xl p-6">

  <h3 className="text-2xl font-semibold text-[var(--secondary-color)] mb-6">
    Faculty
  </h3>

  <div className="flex gap-5 items-start">

    <img
      src={`https://site2demo.in/harry/public/uploads/faculty/${course.faculty?.image}`}
      className="w-32 h-32 rounded-full object-cover"
    />

    <div>

      <h4 className="text-2xl font-bold">
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