import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { Card, Col, Row, Spinner, Badge, Button } from "react-bootstrap";
import PageTitle from "../../components/Breadcrumb/PageTitle";
import { fetchBookingById, fetchProfile, confirmDoctorBooking, cancelDoctorBooking } from "../../utils/fetchApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { Head } from "../../layouts/head";
import Tmodal from "../Tmodal/Tmodal";

export default function NotificationDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [booking, setBooking] = useState(null);
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalAction, setModalAction] = useState(""); // "confirm" or "cancel"
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

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

            if (singleBooking?.user_id) {
                const profileRes = await fetchProfile(singleBooking.user_id);
                setPatient(profileRes?.data || null);
            }

            setLoading(false);
        };

        loadData();
    }, [id]);

    const handleModalConfirm = async () => {
        setConfirmLoading(true);
        setModalMessage("");

        try {
            const res = await confirmDoctorBooking(booking.id);

            if (res.status) {
                setModalMessage(res.message);
                setBooking(prev => ({ ...prev, status: "confirmed" })); // Update local state
                setConfirmLoading(false);

                // Wait 2 seconds, then close modal and navigate
                setTimeout(() => {
                    setIsModalOpen(false);
                    router.push("/doctor/dashboard");
                }, 2000);
            } else {
                setModalMessage(res.message);
                setConfirmLoading(false);
            }
        } catch (error) {
            setModalMessage("Something went wrong.");
            setConfirmLoading(false);
        }
    };

    const handleModalCancel = async () => {
        setConfirmLoading(true);
        setModalMessage("");

        try {
            const res = await cancelDoctorBooking(booking.id);

            if (res.status) {
                setModalMessage(res.message);
                setBooking(prev => ({ ...prev, status: "cancelled" })); // Update local state
                setConfirmLoading(false);

                // Wait 2 seconds, then close modal and navigate
                setTimeout(() => {
                    setIsModalOpen(false);
                    router.push("/doctor/dashboard");
                }, 2000);
            } else {
                setModalMessage(res.message);
                setConfirmLoading(false);
            }
        } catch (error) {
            setModalMessage("Something went wrong.");
            setConfirmLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
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
            <Head title="Notification" />
            <PageTitle
                breadCrumbItems={[
                    { label: "Dashboard", path: "/doctor/dashboard" },
                    { label: "Notification", active: true },
                ]}
                title="Notification"
            />

            <Row className="g-4">
                {/* Patient Info Card */}
                <Col xl={4} lg={5}>
                    <Card className="shadow-sm border-0 h-100 text-center p-4">
                        <div className="mb-4">
                            {patient?.profile_img ? (
                                <img
                                    src={patient.profile_img}
                                    alt={patient.name}
                                    className="rounded-circle img-fluid shadow-sm"
                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                />
                            ) : (
                                <FaUser className="text-primary" style={{ fontSize: "80px" }} />
                            )}
                        </div>
                        <h3 className="mb-2">{patient?.name}</h3>
                        <p className="text-muted">{patient?.email}</p>
                        <Badge bg={booking.status === "pending" ? "warning" : "success"} className="px-3 py-2">
                            {booking.status}
                        </Badge>
                    </Card>
                </Col>

                {/* Booking Info Card */}
                <Col xl={8} lg={7}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Header className="bg-light">
                            <h5 className="mb-0 text-primary d-flex align-items-center">Booking Information</h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Row className="g-4">
                                <Col md={6}>
                                    <div className="d-flex align-items-start">
                                        <FaCalendarAlt className="me-3 text-success mt-1" />
                                        <div>
                                            <label className="text-muted">Date</label>
                                            <div>{booking.booking_date}</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="d-flex align-items-start">
                                        <FaClock className="me-3 text-warning mt-1" />
                                        <div>
                                            <label className="text-muted">Time</label>
                                            <div>{booking.start_time} - {booking.end_time}</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="d-flex align-items-start">
                                        <FaEnvelope className="me-3 text-info mt-1" />
                                        <div>
                                            <label className="text-muted">Email</label>
                                            <div>{patient?.email}</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="d-flex align-items-start">
                                        <FaPhone className="me-3 text-primary mt-1" />
                                        <div>
                                            <label className="text-muted">Phone</label>
                                            <div>{patient?.mobile}</div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Action Buttons */}
            <Row className="mt-4">
                <Col className="text-center space-x-3">
                    <Button
                        variant="danger"
                        onClick={() => {
                            setModalMessage("");
                            setModalAction("cancel"); // track modal action
                            setIsModalOpen(true);
                        }}
                        disabled={booking.status === "cancelled"}
                    >
                        {booking.status === "cancelled" ? "Cancelled" : "Cancel"}
                    </Button>

                    <Button
                        variant="success"
                        onClick={() => {
                            setModalMessage("");
                            setModalAction("confirm"); // track modal action
                            setIsModalOpen(true);
                        }}
                        disabled={booking.status === "confirmed"}
                    >
                        {booking.status === "confirmed" ? "Confirmed" : "Confirm"}
                    </Button>

                </Col>
            </Row>

            {/* Confirmation Modal */}
            <Tmodal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Are you sure you want to confirm this booking?"
                footer={null}
            >
                <div className="text-center p-3">
                    {modalMessage && (
                        <div className="mb-3 text-success font-semibold">{modalMessage}</div>
                    )}

                    <div className="d-flex justify-content-end     gap-2">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={confirmLoading}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={modalAction === "confirm" ? handleModalConfirm : handleModalCancel}
                            disabled={confirmLoading}
                        >
                            {confirmLoading ? <Spinner animation="border" size="sm" /> : "Confirm"}
                        </Button>


                    </div>
                </div>
            </Tmodal>
        </div>
    );
}
