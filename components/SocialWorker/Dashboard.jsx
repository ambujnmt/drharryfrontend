import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaChartBar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { LanguageContext } from "../../context/LanguageContext";
import { Head } from "../../layouts/head"
import Statistics from "../Dashboard/Statistics";
import { Row, Col } from "react-bootstrap";
import TopSellingProducts from "../Dashboard/TopSellingProducts"
import 'bootstrap/dist/css/bootstrap.min.css';

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
<Statistics/>
   

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white border-1 border-gray-300 rounded-lg md:p-6 p-3">
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

        <div className="bg-white border-1 border-gray-300  rounded-lg md:p-6 p-3">
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

   
<div className="mt-8">

      <Row>
        {/* <Col xl={6}>
          <RevenueChart />
        </Col> */}
        <Col xl={12 }>
          <TopSellingProducts />
        </Col>
      </Row>
</div>

    </div>
  );
}