import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Spinner, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../../Breadcrumb/PageTitle";
import Table from "../../../Table/Table";
import { fetchDoctorsByFilter } from "../../../../utils/fetchApi";
import { LanguageContext } from "../../../../context/LanguageContext";
import { FaEye } from "react-icons/fa";
import { Link } from "@heroui/react";
import { Head } from "../../../../layouts/head";

export default function Doctor() {
  const { translateText } = useContext(LanguageContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");

  const columns = [
    { Header: "S.No.", accessor: "serial", sort: false, Cell: ({ row }) => row.index + 1 },
    { Header: "Doctor Name", accessor: "name", sort: true },
    { Header: "Mobile", accessor: "mobile", sort: false },
    { Header: "Email", accessor: "email", sort: false },
    { Header: "Specialization", accessor: "specialization", sort: false },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ({ row }) => {
        const doctorId = row.original.id;
        return (
          <div className="d-flex gap-2 justify-content-center">
            <Link href={`/uPerson/services/doctor/doctorDetail/${doctorId}`}>
              <FaEye className="text-primary" />
            </Link>
          </div>
        );
      },
    },
  ];

  const loadDoctors = async (type = "All") => {
    setLoading(true);

    // Example: fixed lat/long for now (later replace with navigator.geolocation)
    const latitude = 28.5480;
    const longitude = 77.3520;

    const response = await fetchDoctorsByFilter({ filter_type: type, latitude, longitude });

    if (response?.status && response?.data) {
      const transformed = response.data.map((doc) => ({
        id: doc.id,
        name: doc.name,
        mobile: doc.mobile ? `${doc.country_code} ${doc.mobile}` : "N/A",
        email: doc.email,
        specialization: doc.specialization,
      }));
      setDoctors(transformed);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDoctors(filterType);
  }, [filterType]);

  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "All", value: 1000 },
  ];

  return (
    <div className="m-10">
      <Head title="Doctor" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/uPerson/dashboard" },
          { label: "Doctor", active: true },
        ]}
        title={translateText("Doctor")}
      />

      {/* 🔹 Filter Dropdown */}
      <Row className="mb-3">
        <Col md={3}>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Doctors</option>
            <option value="Nearby">Nearby Doctors</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Table
                  columns={columns}
                  data={doctors}
                  pageSize={10}
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
    </div>
  );
}
