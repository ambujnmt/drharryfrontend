import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../Breadcrumb/PageTitle";
import Table from "../Table/Table";
import { fetchDoctorBookings, fetchProfile } from "../../utils/fetchApi";
import { LanguageContext } from "../../context/LanguageContext";
import { Head } from "../../layouts/head";
import { useUser } from "../../context/UserContext";

export default function Today() {
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
      Cell: ({ row }) => (
        <span className="badge bg-success text-white">
          {row.original.status}
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (!user || !user.user_id) return;

    const getBookings = async () => {
      setLoading(true);
      try {
        const response = await fetchDoctorBookings(user.user_id);

        if (Array.isArray(response)) {
          // today's date in YYYY-MM-DD
          const today = new Date().toISOString().split("T")[0];

          // Only confirmed + today's
          const todaysBookings = response.filter(
            (b) =>
              b.status?.toLowerCase() === "confirmed" &&
              b.booking_date?.slice(0, 10) === today
          );

          // Fetch patient profiles
          const withProfiles = await Promise.all(
            todaysBookings.map(async (b) => {
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

          setBookings(withProfiles);
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
      <Head title="Today's Bookings" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/doctor/dashboard" },
          { label: "Today's Bookings", active: true },
        ]}
        title={translateText("Today's Bookings")}
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
                  No meetings scheduled for today.
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
