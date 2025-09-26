import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../Breadcrumb/PageTitle";
import Table from "../Table/Table";
import { fetchDoctors } from "../../utils/fetchApi";
import { LanguageContext } from "../../context/LanguageContext";
import { FaEye } from "react-icons/fa";
import { Link } from "@heroui/react";
import { Head } from "../../layouts/head";

export default function DoctorList() {
  const { translateText } = useContext(LanguageContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      Header: "S.No.",
      accessor: "serial",
      sort: false,
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Doctor Name",
      accessor: "name",
      sort: true,
    },
    {
      Header: "Mobile",
      accessor: "mobile",
      sort: false,
    },
    {
      Header: "Email",
      accessor: "email",
      sort: false,
    },
    {
      Header: "Specialization",
      accessor: "specialization",
      sort: false,
    },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ({ row }) => {
        const doctorId = row.original.id;
        return (
          <div className="d-flex gap-2 justify-content-center">
            <Link href={`/doctorManagement/doctorDetail/${doctorId}`}>
              <FaEye className="text-primary" />
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      const response = await fetchDoctors();
      if (response?.status && response?.data) {
        const transformed = response.data.map((doc) => ({
          id: doc.id,
          name: doc.name || "N/A",
          mobile: doc.mobile
            ? `${doc.country_code || ""} ${doc.mobile}`
            : "N/A",
          email: doc.email || "N/A",
          specialization: doc.specialization || "N/A",
        }));
        setDoctors(transformed);
      }
      setLoading(false);
    };
    getDoctors();
  }, []);

  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "All", value: 1000 },
  ];

  return (
    <div className="m-10">
      <Head title="Doctor List" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Doctor List", active: true },
        ]}
        title={translateText("Doctor List")}
      />

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
