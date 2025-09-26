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

export default function Hemoglobin() {
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
      <Head title="Hemoglobin" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/uPerson/dashboard" },
          { label: "Hemoglobin", path: "/hemoglobin", active: true },
        ]}
        title="Hemoglobin"
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
          <h4 className="text-md font-normal mb-3">Trend</h4>
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

      {/* Extra Text */}
      <Row className="mt-4">
        <Col>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            vehicula, orci sit amet hendrerit suscipit, mauris est placerat
            justo, et viverra magna nisl sit amet nulla.
          </p>
        </Col>
      </Row>

      {/* Add Health Data Button */}
      <Row className="mt-4">
        <Col className="text-center">
          <Button
            style={{
              backgroundColor: "#5274f6",
              border: "none",
              borderRadius: "50px",
              padding: "10px 30px",
              fontWeight: "500",
            }}
          >
            Add Health Data
          </Button>
        </Col>
      </Row>
    </div>
  );
}
