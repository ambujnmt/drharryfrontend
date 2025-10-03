import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../Breadcrumb/PageTitle";
import Table from "../Table/Table";
import { fetchDoctorBookings, fetchProfile } from "../../utils/fetchApi";
import { LanguageContext } from "../../context/LanguageContext";
import { Head } from "../../layouts/head";
import { useUser } from "../../context/UserContext";

export default function Total() {
  const { translateText } = useContext(LanguageContext);
  const { user } = useUser(); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      Header: "S.No.",
      accessor: "serial",
      sort: false,
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Patient",
      accessor: "patient_name",
      sort: true,
      Cell: ({ row }) => (
        <div>
          <div className="fw-bold">{row.original.patient_name}</div>
          <small className="text-muted">{row.original.email}</small>
        </div>
      ),
    },
    {
      Header: "Booking Date",
      accessor: "booking_date",
      sort: true,
    },
    {
      Header: "Start Time",
      accessor: "start_time",
      sort: false,
    },
    {
      Header: "End Time",
      accessor: "end_time",
      sort: false,
    },
    {
      Header: "Status",
      accessor: "status",
      sort: false,
      Cell: ({ row }) => {
        const status = row.original.status?.toLowerCase();
        let badgeClass = "bg-secondary";
        if (status === "confirmed") badgeClass = "bg-success";
        else if (status === "cancelled") badgeClass = "bg-danger";
        else if (status === "pending") badgeClass = "bg-warning text-dark";

        return (
          <span className={`badge ${badgeClass}`}>
            {row.original.status}
          </span>
        );
      },
    },
  ];

useEffect(() => {
  if (!user || !user.user_id) return;

  const getBookings = async () => {
    setLoading(true);
    try {
      const response = await fetchDoctorBookings(user.user_id);

      if (Array.isArray(response)) {
        // Sort by booked_at descending → latest bookings first
        response.sort((a, b) => new Date(b.booked_at) - new Date(a.booked_at));

        const withPatientProfiles = await Promise.all(
          response.map(async (b) => {
            try {
              const profile = await fetchProfile(b.user_id);
              const p = profile?.data || {};
              return {
                ...b,
                patient_name: p.name,
                email: p.email,
              };
            } catch {
              return {
                ...b,
                patient_name: "N/A",
                email: "N/A",
              };
            }
          })
        );

        setBookings(withPatientProfiles);
      }
    } catch (err) {
      console.error("Error fetching bookings", err);
    } finally {
      setLoading(false);
    }
  };

  getBookings();
}, [user]);


  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "All", value: 1000 },
  ];

  return (
    <div>
      <Head title="Total Bookings" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/doctor/dashboard" },
          { label: "Total Bookings", active: true },
        ]}
        title={translateText("Total Bookings")}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : bookings.length === 0 ? (
                <Alert variant="info" className="text-center">
                  No bookings found.
                </Alert>
              ) : (
                <Table
                  columns={columns}
                  data={bookings}
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
