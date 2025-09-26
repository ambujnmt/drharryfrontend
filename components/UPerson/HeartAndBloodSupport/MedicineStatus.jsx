import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../../components/Breadcrumb/PageTitle";
import Table from "../../../components/Table/Table"; // ✅ your reusable Table
import { FaPen } from "react-icons/fa";
import { Head } from "../../../layouts/head";

export default function MedicineStatus() {
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);

  // ✅ Dummy medicine data
  useEffect(() => {
    setLoading(true);
    const dummyData = [
      {
        id: 1,
        name: "Paracetamol",
        type: "Tablet",
        date: "2025-09-20",
        time: "09:00 AM - 09:00 PM",
      },
      {
        id: 2,
        name: "Amoxicillin",
        type: "Capsule",
        date: "2025-09-21",
        time: "08:00 AM - 08:00 PM",
      },
      {
        id: 3,
        name: "Ibuprofen",
        type: "Tablet",
        date: "2025-09-22",
        time: "07:30 AM - 07:30 PM",
      },
    ];
    setMedicines(dummyData);
    setLoading(false);
  }, []);

  // ✅ Table columns
  const columns = [
    {
      Header: "S.No.",
      accessor: "serial",
      sort: false,
      Cell: ({ row }) => row.index + 1,
    },
    { Header: "Medicine Name", accessor: "name", sort: true },
    { Header: "Type", accessor: "type", sort: true },
    { Header: "Date", accessor: "date", sort: true },
    { Header: "Time", accessor: "time", sort: false },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: () => (
        <div className="text-center">
          <FaPen className="text-secondary cursor-pointer" />
        </div>
      ),
    },
  ];

  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "All", value: 1000 },
  ];

  return (
    <div>
      {/* ✅ Page Head */}
      <Head title="Medicines" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/uPerson/dashboard" },
          { label: "Medicines", active: true },
        ]}
        title="Medicines"
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

      {/* Medicines Table Section */}
      <Row className="mt-4">
        <Col>
          <h4 className="text-md font-normal mb-3">Your Medications</h4>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Table
                  columns={columns}
                  data={medicines}
                  pageSize={5}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={true}
                  isSearchable={true}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Medication Button */}
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
            Add medication
          </Button>
        </Col>
      </Row>
    </div>
  );
}
