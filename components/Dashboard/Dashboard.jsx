import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";

import {
  FaUserInjured,
  FaCalendarCheck,
  FaTooth,
  FaDollarSign,
} from "react-icons/fa";

import { MdMedicalServices } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { Head } from "../../layouts/head";

const COLORS = [
  "#c8a96a",
  "#0a2342",
  "#d9c08a",
  "#2b405c",
  "#e7d7b2",
];

export default function Dashboard() {
const stats = [
  {
    title: "Total Students",
    value: "1,248",
    icon: <FaUserInjured />,
    bg: "bg-[#0a2342]",
  },
  {
    title: "Active Courses",
    value: "48",
    icon: <FaCalendarCheck />,
    bg: "bg-[#c8a96a]",
  },
  {
    title: "Faculty Members",
    value: "12",
    icon: <FaTooth />,
    bg: "bg-[#2b405c]",
  },
  {
    title: "Certifications Issued",
    value: "867",
    icon: <MdMedicalServices />,
    bg: "bg-[#d3b77a]",
  }
];

const courseEnrollmentData = [
  { month: "Jan", enrollments: 45 },
  { month: "Feb", enrollments: 52 },
  { month: "Mar", enrollments: 68 },
  { month: "Apr", enrollments: 59 },
  { month: "May", enrollments: 76 },
  { month: "Jun", enrollments: 82 },
];

  const treatmentData = [
  { name: "Smile Design", value: 35 },
  { name: "Implantology", value: 25 },
  { name: "Digital Dentistry", value: 20 },
  { name: "Veneers", value: 12 },
  { name: "Others", value: 8 },
];
  return (
    <div className="min-h-screen bg-[#F5F2EC] p-6">
      <Head title="Dental Clinic Dashboard" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl  text-[#0a2342] font-semibold">
          Dental Clinic Dashboard
        </h1>

        <p className="text-[#2B2B2B] text-[16px] font-[Inter]">
          Welcome back. Here's an overview of your clinic performance.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-[15px] px-3 py-3 shadow-lg border border-[#eee]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#2B2B2B] text-[15px] font-[Inter]">
                  {item.title}
                </p>

                <h3 className="text-[30px] text-[#0a2342] font-semibold mt-2">
                  {item.value}
                </h3>
              </div>

              <div
                className={`${item.bg} w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-[20px]`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        {/* Appointments Chart */}
        <div className="bg-white rounded-[15px] p-6 shadow-lg">
          <h3 className="text-2xl font-[Cormorant_Garamond] text-[#0a2342] mb-5">
            Monthly Enrollments
          </h3>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={courseEnrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="enrollments"
                fill="#c8a96a"
                radius={[8, 8, 0, 0]}
                barSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Treatments Chart */}
        <div className="bg-white rounded-[15px] p-6 shadow-lg">
          <h3 className="text-2xl font-[Cormorant_Garamond] text-[#0a2342] mb-5">
            Course Distribution
          </h3>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={treatmentData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >
                {treatmentData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[15px] p-6 shadow-lg mt-10">
        <h3 className="text-3xl font-[Cormorant_Garamond] text-[#0a2342] mb-5">
          Recent Activity
        </h3>

       <div className="space-y-4">
  <div className="border-b pb-3">
    <p className="font-[Inter] text-[#2B2B2B]">
      25 students enrolled in Smile Design Mastery.
    </p>
  </div>

  <div className="border-b pb-3">
    <p className="font-[Inter] text-[#2B2B2B]">
      New faculty member added to Implantology Department.
    </p>
  </div>

  <div className="border-b pb-3">
    <p className="font-[Inter] text-[#2B2B2B]">
      Advanced Veneers Workshop registration opened.
    </p>
  </div>

  <div>
    <p className="font-[Inter] text-[#2B2B2B]">
      40 certificates issued this month.
    </p>
  </div>
</div>
      </div>
    </div>
  );
}