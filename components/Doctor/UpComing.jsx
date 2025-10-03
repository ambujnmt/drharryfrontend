import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Spinner, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../Breadcrumb/PageTitle";
import Table from "../Table/Table";
import { fetchDoctorBookings, fetchProfile } from "../../utils/fetchApi";
import { LanguageContext } from "../../context/LanguageContext";
import { Head } from "../../layouts/head";
import { useUser } from "../../context/UserContext";
import { FaPen } from "react-icons/fa";
import { useRouter } from "next/router";

export default function UpComing() {
  const { translateText } = useContext(LanguageContext);
  const { user } = useUser(); // ✅ get logged-in doctor
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
const router = useRouter();

const handleEdit = (booking) => {
  router.push(`/doctor/notification/${booking.id}`);
};
  // Table Columns
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
        <div className="d-flex align-items-center gap-2">
          <div>
            <div className="fw-bold">{row.original.patient_name}</div>
            <small className="text-muted">{row.original.email}</small>
          </div>
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
  {
  Header: "Action",
  accessor: "action",
  sort: false,
  Cell: ({ row }) => (
    <div className="d-flex align-items-center gap-2">
      {/* Edit Icon */}
      <FaPen
        className="text-primary"
        style={{ cursor: "pointer" }}
        onClick={() => handleEdit(row.original)}
      />
    </div>
  ),
}

  ];

useEffect(() => {
  if (!user || !user.user_id) return;

  const getBookings = async () => {
    setLoading(true);
    try {
      const response = await fetchDoctorBookings(user.user_id);

      if (Array.isArray(response)) {
        // Only confirmed bookings
        let confirmedBookings = response.filter(
          (b) => b.status?.toLowerCase() === "confirmed"
        );

        // Sort by booking date + start time descending (newest first)
   // Sort by booked_at descending (latest bookings first)
confirmedBookings.sort((a, b) => new Date(b.booked_at) - new Date(a.booked_at));


        // Fetch patient profiles
        const withPatientProfiles = await Promise.all(
          confirmedBookings.map(async (b) => {
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
      <Head title="Upcoming Bookings" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/doctor/dashboard" },
          { label: "Upcoming Bookings", active: true },
        ]}
        title={translateText("Upcoming Bookings")}
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
