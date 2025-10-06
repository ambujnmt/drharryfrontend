import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { Card, Col, Row, Spinner, Badge, Button } from "react-bootstrap";
import PageTitle from "../../components/Breadcrumb/PageTitle";
import { fetchBookingById, fetchProfile } from "../../utils/fetchApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { Head } from "../../layouts/head";
import dayjs from "dayjs";

export default function Notification() {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setLoading(true);
      const singleBooking = await fetchBookingById(id);
      if (!singleBooking) {
        setBooking(null);
        setLoading(false);
        return;
      }
      setBooking(singleBooking);

      if (singleBooking?.doctor_id) {
        const profileRes = await fetchProfile(singleBooking.doctor_id);
        setDoctor(profileRes?.data || null);
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center p-5">
        <div className="alert alert-warning">
          <h4 className="alert-heading">Booking Not Found</h4>
          <p>The requested booking could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head title="Notification Details" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/uPerson/dashboard" },
          { label: "Notification", active: true },
        ]}
        title="Notification Details"
      />

      <Row className="g-4">
        {/* Doctor Info Card */}
        <Col xl={4} lg={5}>
          <Card className="shadow-sm border-0 h-100 text-center p-4">
            <div className="mb-4">
              {doctor?.profile_img ? (
                <img
                  src={doctor.profile_img}
                  alt={doctor.name}
                  className="rounded-circle img-fluid shadow-sm"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              ) : (
                <FaUser className="text-primary" style={{ fontSize: "80px" }} />
              )}
            </div>
            <h3 className="mb-2">{doctor?.name || "Dr. Unknown"}</h3>
            <p className="text-muted">{doctor?.email || "No email available"}</p>
            <Badge
              bg={
                booking.status === "pending"
                  ? "warning"
                  : booking.status === "cancelled"
                  ? "danger"
                  : "success"
              }
              className="px-3 py-2 text-uppercase"
            >
              {booking.status}
            </Badge>
          </Card>
        </Col>

        {/* Booking Info Card */}
        <Col xl={8} lg={7}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-light">
              <h5 className="mb-0 text-primary d-flex align-items-center">
                Booking Information
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-4">
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <FaCalendarAlt className="me-3 text-success mt-1" />
                    <div>
                      <label className="text-muted">Date</label>
                      <div>{dayjs(booking.booking_date).format("DD MMM YYYY")}</div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <FaClock className="me-3 text-warning mt-1" />
                    <div>
                      <label className="text-muted">Time</label>
                      <div>
                        {booking.start_time} - {booking.end_time}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <FaEnvelope className="me-3 text-info mt-1" />
                    <div>
                      <label className="text-muted">Doctor Email</label>
                      <div>{doctor?.email}</div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <FaPhone className="me-3 text-primary mt-1" />
                    <div>
                      <label className="text-muted">Doctor Phone</label>
                      <div>{doctor?.mobile}</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Close Button */}
      <Row className="mt-4">
        <Col className="text-center">
          <Button
            variant="secondary"
            className="px-5 py-2"
            onClick={() => router.push("/uPerson/dashboard")}
          >
            Close
          </Button>
        </Col>
      </Row>
    </div>
  );
}
