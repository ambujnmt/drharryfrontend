import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaChartBar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { LanguageContext } from "../../context/LanguageContext";
import { Head } from "../../layouts/head"

const barData = [
  { name: "Jan", users: 400, employees: 240 },
  { name: "Feb", users: 300, employees: 139 },
  { name: "Mar", users: 200, employees: 980 },
  { name: "Apr", users: 278, employees: 390 },
  { name: "May", users: 189, employees: 480 },
];

const pieData = [
  { name: "Active Users", value: 400 },
  { name: "Total Users", value: 1000 },
  { name: "Employees", value: 600 },
];

const COLORS = ["#FBA518", "#27667B", "#3A7D44"];

const socialWorkData = [
  { activity: "Food Distribution", count: 120 },
  { activity: "Education Support", count: 80 },
  { activity: "Health Camps", count: 50 },
];

const patientData = [
  { name: "John Doe", visits: 5, status: "Stable" },
  { name: "Jane Smith", visits: 2, status: "Recovering" },
  { name: "Robert Brown", visits: 8, status: "Under Observation" },
];

const criticalPatientData = [
  { name: "Alice Green", icuDays: 10, condition: "Critical" },
  { name: "Michael Lee", icuDays: 7, condition: "Serious" },
  { name: "Emily White", icuDays: 15, condition: "Under Ventilator" },
];

export default function Dashboard() {

  const { switchLanguage, locale, translateText } = useContext(LanguageContext);

  const [clientLocale, setClientLocale] = useState("");

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setRadius(50);
        setChartHeight(200);
      } else if (width < 900) {
        setRadius(80);
        setChartHeight(250);
      } else {
        setRadius(100);
        setChartHeight(300);
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const [radius, setRadius] = useState(100);
  const [chartHeight, setChartHeight] = useState(300);
  return (
    <div className="w-full bg-gray-100 md:p-6 p-0">
      <Head title="Dashboard" />

      <div className="w-full space-y-5 bg-white shadow-lg rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-[#7da0d8] via-[#a7c1e0] to-[#93C5FD] p-6 rounded-lg shadow-lg flex flex-col items-center text-white">
            <FaUser className="text-white text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Active Users</h2>
          </div>
          <div className="bg-gradient-to-r from-[#FBBF24] via-[#FCD34D] to-[#f8e68b] p-6 rounded-lg shadow-lg flex flex-col items-center text-white">
            <FaChartBar className="text-white text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Total Users</h2>
          </div>
          <div className="bg-gradient-to-r from-[#4a6eca] via-[#9cb2e6] to-[#d0d7e6] p-6 rounded-lg shadow-lg flex flex-col items-center text-white">
            <FaPeopleGroup className="text-white text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Employees</h2>
          </div>
        </div>

      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg md:p-6 p-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">User & Employee Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#FFA725" />
              <Bar dataKey="employees" fill="#211C84" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-lg rounded-lg md:p-6 p-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">User Distribution</h3>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={radius} dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {/* Social Work Table - Full Width */}
        <div className="bg-white shadow-lg rounded-lg p-5 overflow-x-auto">
          <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-800">{translateText("activity_tracker_social_work")}</h3>
          <table className="w-full text-sm md:text-base border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 border border-gray-300">{translateText("activity")}</th>
                <th className="p-3 border border-gray-300">{translateText("count")}</th>
              </tr>
            </thead>
            <tbody>
              {socialWorkData.map((row, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-center hover:bg-gray-200`}>
                  <td className="p-3 border border-gray-300">{row.activity}</td>
                  <td className="p-3 border border-gray-300">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Patients & Critical Patients in 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patients Table */}
          <div className="bg-white shadow-lg rounded-lg p-5 overflow-x-auto">
            <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-800">{translateText("activity_tracker_patients")}</h3>
            <table className="w-full text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-[#5CB338] text-white">
                  <th className="p-3 border border-gray-300">{translateText("patient")}</th>
                  <th className="p-3 border border-gray-300">{translateText("visits")}</th>
                  <th className="p-3 border border-gray-300">{translateText("status")}</th>
                </tr>
              </thead>
              <tbody>
                {patientData.map((row, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-center hover:bg-gray-200`}>
                    <td className="p-3 border border-gray-300">{row.name}</td>
                    <td className="p-3 border border-gray-300">{row.visits}</td>
                    <td className="p-3 border border-gray-300">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Critical Patients Table */}
          <div className="bg-white shadow-lg rounded-lg p-5 overflow-x-auto">
            <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-800">{translateText("activity_tracker_critical_patients")}</h3>
            <table className="w-full text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-[#E52020] text-white">
                  <th className="p-3 border border-gray-300">{translateText("patient")}</th>
                  <th className="p-3 border border-gray-300">{translateText("icu_days")}</th>
                  <th className="p-3 border border-gray-300">{translateText("condition")}</th>
                </tr>
              </thead>
              <tbody>
                {criticalPatientData.map((row, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-center hover:bg-gray-200`}>
                    <td className="p-3 border border-gray-300">{row.name}</td>
                    <td className="p-3 border border-gray-300">{row.icuDays}</td>
                    <td className="p-3 border border-gray-300">{row.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  );
}