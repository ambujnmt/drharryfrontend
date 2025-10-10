import React, { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { LanguageContext } from "../../context/LanguageContext";
import { Head } from "../../layouts/head";
import { Row, Col } from "react-bootstrap";
import StatisticsWidget from "../Dashboard/StatisticsWidget";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FiBarChart2, FiCpu } from "react-icons/fi";
import { fetchDoctorBookings } from "../../utils/fetchApi";
import { useUser } from "../../context/UserContext";
import { MdToday, MdUpcoming } from "react-icons/md";
import { Link, Skeleton } from "@heroui/react";   // ✅ HeroUI Skeleton

const COLORS = ["#FBA518", "#27667B", "#3A7D44"];

export default function Dashboard() {
  const { locale } = useContext(LanguageContext);
  const { user, loading } = useUser();

  const [clientLocale, setClientLocale] = useState("");
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    upcoming: 0,
    today: 0,
    reports: 0,
    total: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true); // ✅ skeleton control

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  useEffect(() => {
    if (!user || !user.user_id) return;

    const loadBookings = async () => {
      try {
        setLoadingStats(true); // show skeleton while loading
        const data = await fetchDoctorBookings(user.user_id);

        const bookingsArray = Array.isArray(data) ? data : data.bookings || [];
        setBookings(bookingsArray);

        const today = new Date().toISOString().split("T")[0];
        const confirmed = bookingsArray.filter(b => b.status?.toLowerCase() === "confirmed");
        const upcoming = confirmed.filter(b => b.booking_date?.slice(0, 10) >= today);
        const todayBookings = confirmed.filter(b => b.booking_date?.slice(0, 10) === today);
        const cancelled = bookingsArray.filter(b => b.status?.toLowerCase() === "cancelled");

        setStats({
          upcoming: upcoming.length,
          today: todayBookings.length,
          reports: cancelled.length,
          total: bookingsArray.length,
        });
      } catch (err) {
        console.error("Error loading bookings", err);
      } finally {
        setLoadingStats(false); // hide skeleton
      }
    };

    loadBookings();
  }, [user]);

  // Inside Dashboard component

// Function to compute monthly data for bar chart
const getMonthlyTrends = () => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 const barData = months.map((month, idx) => {
 const BookingsCount = bookings.filter(b => {
  const date = new Date(b.booking_date);
  return date.getMonth() === idx && b.status?.toLowerCase() === "confirmed";
}).length;

const PatientsCount = bookings.filter(b => {
  const date = new Date(b.booking_date);
  return date.getMonth() === idx && b.status?.toLowerCase() === "cancelled";
}).length;

  return { name: month, Bookings: BookingsCount, Patients: PatientsCount };
});

  return barData;
};

// Function to compute data for pie chart
const getPieData = () => {
  const activeBookings = bookings.filter(b => b.status?.toLowerCase() === "confirmed").length;
  const cancelledBookings = bookings.filter(b => b.status?.toLowerCase() === "cancelled").length;
  const totalBookings = bookings.length;

  return [
    { name: "Active Bookings", value: activeBookings },
    { name: "Cancelled Bookings", value: cancelledBookings },
    { name: "Total Bookings", value: totalBookings },
  ];
};


  if (loading) {
    return <p className="text-center mt-5">Loading Dashboard...</p>;
  }

  return (
    <div className="w-full bg-gray-100 md:p-6 p-0">
      <Head title="Doctor's Dashboard" />

      {/* 🔥 Dynamic Stats Section with Skeleton */}
      <Row>
        {loadingStats ? (
          // Skeleton layout
          <>
            {[1, 2, 3, 4].map((i) => (
              <Col md={6} xl={3} key={i} className="mb-4">
                <Skeleton className="h-[120px] w-full rounded-lg" />
              </Col>
            ))}
          </>
        ) : (
          <>
            <Col md={6} xl={3}>
              <Link href="/doctor/upComing">
                <StatisticsWidget
                  variant="blue"
                  description="Upcoming Bookings"
                  stats={stats.upcoming}
                  icon={<MdUpcoming />}
                />
              </Link>
            </Col>
            <Col md={6} xl={3}>
              <Link href="/doctor/today">
                <StatisticsWidget
                  variant="success"
                  description="Today's Bookings"
                  stats={stats.today}
                  icon={<MdToday />}
                />
              </Link>
            </Col>
            <Col md={6} xl={3}>
              <Link href="/doctor/report">
                <StatisticsWidget
                  variant="warning"
                  description="Reports (Cancelled)"
                  stats={stats.reports}
                  icon={<FiBarChart2 />}
                />
              </Link>
            </Col>
            <Col md={6} xl={3}>
              <Link href="/doctor/total">
                <StatisticsWidget
                  variant="info"
                  description="Total Bookings"
                  stats={stats.total}
                  icon={<FiCpu />}
                />
              </Link>
            </Col>
          </>
        )}
      </Row>

      {/* Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Bar Chart */}
<div className="bg-white border-1 border-gray-300 rounded-lg md:p-6 p-3">
  <h3 className="text-lg font-semibold mb-4 text-gray-700">Patients and Bookings</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={getMonthlyTrends()}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="Bookings" fill="#FFA725" />
      <Bar dataKey="Patients" fill="#211C84" />
    </BarChart>
  </ResponsiveContainer>
</div>

{/* Pie Chart */}
<div className="bg-white border-1 border-gray-300 rounded-lg md:p-6 p-3">
  <h3 className="text-lg font-semibold mb-4 text-gray-700">Monthly Booking Distribution</h3>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={getPieData()}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >
        {getPieData().map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
