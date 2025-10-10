import React, { useContext, useEffect, useState } from "react";
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
import { LanguageContext } from "../../context/LanguageContext";
import { Head } from "../../layouts/head";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchUsers, fetchPatientAssignments } from "../../utils/fetchApi";
import StatisticsWidget from "./StatisticsWidget";
import { FaRegUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineSick } from "react-icons/md";
import { Link } from "@heroui/react";
import { FiUsers } from "react-icons/fi";

const COLORS = ["#FBA518", "#27667B", "#3A7D44", "#4ECDC4", "#FF6B6B"];

export default function Dashboard() {
  const { locale } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const [radius, setRadius] = useState(100);
  const [chartHeight, setChartHeight] = useState(300);
  const [userCounts, setUserCounts] = useState({
    totalUsers: 0,
    doctors: 0,
    socialWorkers: 0,
    patients: 0,
    users: 0,
  });
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  // 📊 Responsive chart sizes
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

  // 🧩 Fetch user data
  useEffect(() => {
    const loadUsers = async () => {
      const result = await fetchUsers();
      if (result?.status && Array.isArray(result.data)) {
        const users = result.data;
        const totalUsers = users.length;
        const doctors = users.filter((u) => u.user_type === 1).length;
        const socialWorkers = users.filter((u) => u.user_type === 2).length;
        const patients = users.filter((u) => u.user_type === 3).length;
        const normalUsers = users.filter((u) => u.user_type === 4).length;

        setUserCounts({ totalUsers, doctors, socialWorkers, patients, users: normalUsers });
      }
    };
    loadUsers();
  }, []);

  // 📅 Fetch schedule data for Bar Chart
  useEffect(() => {
    const loadSchedules = async () => {
      const data = await fetchPatientAssignments();
      if (Array.isArray(data)) {
        const dayCounts = {
          Mon: 0,
          Tues: 0,
          Wed: 0,
          Thur: 0,
          Fri: 0,
          Sat: 0,
          Sun: 0,
          Every: 0,
        };

        const dayMap = {
          Monday: "Mon",
          Tuesday: "Tues",
          Wednesday: "Wed",
          Thursday: "Thur",
          Friday: "Fri",
          Saturday: "Sat",
          Sunday: "Sun",
          Everyday: "Every",
        };

        data.forEach((item) => {
          if (Array.isArray(item.schedule_day)) {
            item.schedule_day.forEach((day) => {
              const shortKey = dayMap[day];
              if (shortKey && dayCounts[shortKey] !== undefined) {
                dayCounts[shortKey] += 1;
              }
            });
          }
        });

        const formatted = Object.keys(dayCounts).map((day) => ({
          name: day,
          schedules: dayCounts[day],
        }));

        setBarData(formatted);
      }
    };

    loadSchedules();
  }, []);

  // 🍰 Dynamic Pie Data from userCounts
  const pieData = [
    { name: "Doctors", value: userCounts.doctors },
    { name: "Social Workers", value: userCounts.socialWorkers },
    { name: "Patients", value: userCounts.patients },
    { name: "UPerson", value: userCounts.users },
    { name: "Total Users", value: userCounts.totalUsers },
  ];

  return (
    <div className="w-full bg-gray-100 md:p-6 p-0">
      <Head title="Admin Dashboard" />

      {/* 📦 User Statistics */}
      <Row className="g-3 justify-content-center">
        <Col xs={6} md={4} lg={3} xl>
          <Link href="/user/userList" className="w-100 d-block text-decoration-none">
            <StatisticsWidget
              variant="primary"
              description="Doctors"
              stats={userCounts.doctors}
              icon={<FaUserDoctor />}
            />
          </Link>
        </Col>

        <Col xs={6} md={4} lg={3} xl>
          <Link href="/user/userList" className="w-100 d-block text-decoration-none">
            <StatisticsWidget
              variant="success"
              description="Social Workers"
              stats={userCounts.socialWorkers}
              icon={<FaRegUser />}
            />
          </Link>
        </Col>

        <Col xs={6} md={4} lg={3} xl>
          <Link href="/user/userList" className="w-100 d-block text-decoration-none">
            <StatisticsWidget
              variant="warning"
              description="Patients"
              stats={userCounts.patients}
              icon={<MdOutlineSick />}
            />
          </Link>
        </Col>

        <Col xs={6} md={4} lg={3} xl>
          <Link href="/user/userList" className="w-100 d-block text-decoration-none">
            <StatisticsWidget
              variant="info"
              description="UPerson"
              stats={userCounts.users}
              icon={<FiUsers />}
            />
          </Link>
        </Col>

        <Col xs={6} md={4} lg={3} xl>
          <Link href="/user/userList" className="w-100 d-block text-decoration-none">
            <StatisticsWidget
              variant="blue"
              description="Total Users"
              stats={userCounts.totalUsers}
              icon={<FaRegUser />}
            />
          </Link>
        </Col>
      </Row>

      {/* 🧭 GRAPHS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Bar Chart */}
        <div className="bg-white border-1 border-gray-300 rounded-lg md:p-6 p-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Schedules by Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="schedules" fill="#FFA725" barSize={40} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border-1 border-gray-300 rounded-lg md:p-6 p-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">User Distribution</h3>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={radius}
                dataKey="value"
                label
              >
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
    </div>
  );
}
