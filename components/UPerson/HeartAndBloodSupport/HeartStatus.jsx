import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../../../components/Breadcrumb/PageTitle";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css"
import { Head } from "../../../layouts/head";

export default function HeartStatus() {
    // ✅ Dummy chart data
    const data = [
        { month: "Jan", value: 80 },
        { month: "Feb", value: 95 },
        { month: "Mar", value: 110 },
        { month: "Apr", value: 130 },
        { month: "May", value: 120 },
        { month: "Jun", value: 140 },
    ];

    return (
        <div>
            {/* ✅ Page Head */}
            <Head title="Heart Rate" />
            <PageTitle
                breadCrumbItems={[
                    { label: "Dashboard", path: "/uPerson/dashboard" },
                    { label: "Heart Rate", path: "/heartStatus", active: true },
                ]}
                title="Heart Rate"
            />

            <Row className="mt-4">
                <Col>
                    {/* Information Section */}
                    <h4 className="text-md font-normal mb-3">Information</h4>
                    <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                        quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                    </p>
                    <p className="text-muted">
                        Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
                        massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
                        sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos.
                    </p>
                </Col>
            </Row>

            {/* Trend Section */}
            <Row className="mt-4">
                <Col>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-normal">Trend</h4>
                        <div>
                            <select
                                className="px-3 py-2 rounded-md text-white text-sm focus:outline-none"
                                style={{ backgroundColor: "rgb(82, 116, 246)", width: "90px" }}
                            >
                                <option>Days</option>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-1">
                        <h5 className="font-bold">82-117</h5><span className="text-xs mt-1.5 font-bold">bpm</span>
                    </div>

                    <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={data}>
                                <XAxis dataKey="month" />
                                <YAxis
                                    domain={[50, 150]}
                                    ticks={[50, 70, 90, 110, 130, 150]}
                                />
                                <Tooltip />
                                <Bar dataKey="value" fill="#5274f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>

         
            {/* Capsule Grid Section */}
<Row className="mt-4">
  <Col>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Capsule 1 */}
      <div className="flex justify-between items-center px-4 py-3 rounded-full text-white"
        style={{ backgroundColor: "rgb(255, 187, 28)" }}
      >
        <span className="font-medium">Range</span>
        <div className="flex gap-1">
          <h5 className="font-bold mb-0">76-120</h5>
          <span className="text-xs mt-1.5 font-bold">bpm</span>
        </div>
      </div>

      {/* Capsule 2 */}
      <div className="flex justify-between items-center px-4 py-3 rounded-full text-white"
        style={{ backgroundColor: "rgb(255, 187, 28)" }}
      >
        <span className="font-medium">Rest</span>
        <div className="flex gap-1">
          <h5 className="font-bold mb-0">81</h5>
          <span className="text-xs mt-1.5 font-bold">bpm</span>
        </div>
      </div>

      {/* Capsule 3 */}
      <div className="flex justify-between items-center px-4 py-3 rounded-full text-white"
        style={{ backgroundColor: "rgb(255, 187, 28)" }}
      >
        <span className="font-medium">Comminated</span>
        <div className="flex gap-1">
          <h5 className="font-bold mb-0">96</h5>
          <span className="text-xs mt-1.5 font-bold">bpm</span>
        </div>
      </div>
    </div>

    {/* Second Row (2 cols) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mx-32">
      {/* Capsule 4 */}
      <div className="flex justify-between items-center px-4 py-3 rounded-full text-white"
        style={{ backgroundColor: "rgb(255, 187, 28)" }}
      >
        <span className="font-medium">Exerxise</span>
        <div className="flex gap-1">
          <h5 className="font-bold mb-0">105</h5>
          <span className="text-xs mt-1.5 font-bold">bpm</span>
        </div>
      </div>

      {/* Capsule 5 */}
      <div className="flex justify-between items-center px-4 py-3 rounded-full text-white"
        style={{ backgroundColor: "rgb(255, 187, 28)" }}
      >
        <span className="font-medium">Sleep</span>
        <div className="flex gap-1">
          <h5 className="font-bold mb-0">78</h5>
          <span className="text-xs mt-1.5 font-bold">bpm</span>
        </div>
      </div>
    </div>
  </Col>
</Row>

        </div>
    );
}
