import React, { useContext, useEffect, useState } from "react";
import { FaChartBar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Row, Col } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { LanguageContext } from "../../context/LanguageContext";
import { Head } from "../../layouts/head";
import { useUser } from "../../context/UserContext";
import {
  fetchNotificationsByYear,
  fetchAssignedPatientForSocialWorker,
} from "../../utils/fetchApi";
import "bootstrap/dist/css/bootstrap.min.css";
import StatisticsWidget from "../Dashboard/StatisticsWidget";
import { MdOutlineSick } from "react-icons/md";
import { Link } from "@heroui/react";
import { Skeleton } from "@heroui/react";

export default function Dashboard() {
  const { locale } = useContext(LanguageContext);
  const { user } = useUser();

  const [chartData, setChartData] = useState([]);
  const [chartHeight, setChartHeight] = useState(300);
  const [loadingChart, setLoadingChart] = useState(true);
  const [patientsCount, setPatientsCount] = useState(0);
  const [loadingPatients, setLoadingPatients] = useState(true);

  // 📊 Responsive Chart Height
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 600) setChartHeight(200);
      else if (width < 900) setChartHeight(250);
      else setChartHeight(300);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 📬 Fetch Notifications
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const userId = user?.id || user?.user_id;
        const currentYear = new Date().getFullYear();

        const notifications = await fetchNotificationsByYear(userId, currentYear);

        if (!notifications || notifications.length === 0) {
          setChartData([]);
          return;
        }

        const monthCounts = Array(12).fill(0);
        notifications.forEach((n) => {
          const sentDate = new Date(n.sent_at);
          if (!isNaN(sentDate)) {
            const month = sentDate.getMonth();
            monthCounts[month]++;
          }
        });

        const formattedData = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ].map((name, i) => ({
          name,
          notifications: monthCounts[i],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setLoadingChart(false);
      }
    };

    loadNotifications();
  }, [user]);

  // 🧍‍♂️ Fetch Assigned Patient Count
  useEffect(() => {
    const getPatients = async () => {
      if (!user?.user_id) return;
      try {
        setLoadingPatients(true);
        const response = await fetchAssignedPatientForSocialWorker(user.user_id);
        setPatientsCount(response?.length || 0);
      } catch (error) {
        console.error("Error fetching assigned patients:", error);
      } finally {
        setLoadingPatients(false);
      }
    };
    getPatients();
  }, [user]);

  return (
    <div className="w-full bg-gray-100 md:p-6 p-0">
      <Head title="Social Worker's Dashboard" />

      {/* --- STATISTICS BOXES --- */}
      <Row>
        <Col md={6} xl={3}>
          {loadingPatients ? (
            <div className=" bg-white rounded-lg shadow-sm">
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ) : (
            <Link href="/socialWorker/assignedPatient">
              <StatisticsWidget
                variant="blue"
                description="Assigned Patients"
                stats={patientsCount}
                icon={<MdOutlineSick />}
                progress={60}
              />
            </Link>
          )}
        </Col>

        {/* <Col md={6} xl={3}>
          <StatisticsWidget
            variant="success"
            description="January's Sales"
            stats="1576"
            icon={<FiShoppingCart />}
            progress={49}
          />
        </Col> */}
      </Row>

      {/* --- CHART SECTION --- */}
      <div className="bg-white border border-gray-300 rounded-lg md:p-6 p-3 mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <FaChartBar className="text-blue-600" />
          Monthly Notification Trends ({new Date().getFullYear()})
        </h3>

        {loadingChart ? (
          <Skeleton className="h-[300px] w-full rounded-lg" />
        ) : chartData.length === 0 ? (
          <p className="text-gray-500">No data available for this year.</p>
        ) : (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="notifications"
                fill="#3B82F6"
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
