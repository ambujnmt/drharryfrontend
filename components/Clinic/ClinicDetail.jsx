import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaGlobe,
  FaUserMd,
} from "react-icons/fa";
import { Card, Col, Row, Spinner, Badge } from "react-bootstrap";
import PageTitle from "../../components/Breadcrumb/PageTitle";
import { fetchClinicById, fetchClinicSlots } from "../../utils/fetchApi";
import "bootstrap/dist/css/bootstrap.min.css";
import AddAppointment from "./AddAppointment";
import Table from "../../components/Table/Table"; // ✅ your reusable Table
import EditSlot from "./EditSlot";
import { Head } from "../../layouts/head";

export default function ClinicDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ slots state
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getClinic = async () => {
      setLoading(true);
      const res = await fetchClinicById(id);
      if (res?.data) setClinic(res.data);
      setLoading(false);
    };

    getClinic();
  }, [id]);

  // ✅ fetch clinic slots
  useEffect(() => {
    if (!id) return;

    setSlotsLoading(true);
    fetchClinicSlots(id).then((res) => {
      if (res?.status && res?.data) {
        setSlots(res.data);
      } else {
        setSlots([]);
      }
      setSlotsLoading(false);
    });
  }, [id]);

  // ✅ slot columns
  const slotColumns = [
    { Header: "S.No.", accessor: "serial", Cell: ({ row }) => row.index + 1 },
    { Header: "Day", accessor: "day_of_week" },
    { Header: "Start Time", accessor: "start_time" },
    { Header: "End Time", accessor: "end_time" },
    { Header: "Duration (min)", accessor: "slot_duration_minutes" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <EditSlot
          slot={row.original}
          clinicId={id}
          onSlotUpdated={(updatedSlot) => {
            setSlots((prev) =>
              prev.map((s) => (s.id === updatedSlot.id ? updatedSlot : s))
            );
          }}
          onSlotDeleted={(slotId) => {
            setSlots((prev) => prev.filter((s) => s.id !== slotId));
          }}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="text-center p-5">
        <div className="alert alert-warning">
          <h4 className="alert-heading">Clinic Not Found</h4>
          <p>The requested clinic could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head title="Clinic Detail" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Clinic Management", path: "/clinic/clinicManagement" },
          { label: "Clinic Detail", path: `/clinicDetail/${id}`, active: true },
        ]}
        title="Clinic Detail"
      />

      <Row className="g-4">
        {/* Clinic Header */}
        <Col xl={4} lg={5}>
          <Card className="shadow-sm border-0 h-100 text-center p-4">
            <div className="mb-4">
              {clinic.image ? (
                <img
                  src={clinic.image}
                  alt={clinic.clinic_name}
                  className="rounded img-fluid shadow-sm"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              ) : (
                <FaUserMd className="text-primary" style={{ fontSize: "80px" }} />
              )}
            </div>
            <h3 className="mb-2">{clinic.clinic_name}</h3>
            <p className="text-muted">{clinic.email}</p>
            <Badge bg={clinic.status === 1 ? "success" : "danger"} className="px-3 py-2">
              {clinic.status === 1 ? "Active" : "Inactive"}
            </Badge>
          </Card>
        </Col>

        {/* Clinic Info */}
        <Col xl={8} lg={7}>
          <Card className="shadow-sm border-0 h-100">
            <div className="flex justify-between bg-light py-1">
              <Card.Header className="bg-light">
                <h5 className="mb-0 text-primary d-flex align-items-center">
                  <FaUserMd className="me-2" /> Clinic Information
                </h5>
              </Card.Header>
              <Card.Header className="bg-light">
                <AddAppointment clinicId={clinic.id} onSlotAdded={(newSlot) => setSlots((prev) => [...prev, newSlot])} />
              </Card.Header>
            </div>
            <Card.Body className="p-4">
              <Row className="g-4">
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <FaEnvelope className="me-3 text-success mt-1" />
                    <div>
                      <label className="text-muted">Email</label>
                      <div>{clinic.email}</div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <FaPhone className="me-3 text-info mt-1" />
                    <div>
                      <label className="text-muted">Phone</label>
                      <div>{clinic.phone || "Not Provided"}</div>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex align-items-start">
                    <FaMapMarkerAlt className="me-3 text-danger mt-1" />
                    <div>
                      <label className="text-muted">Location</label>
                      <div>{clinic.location}</div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <FaGlobe className="me-3 text-primary mt-1" />
                    <div>
                      <label className="text-muted">Timezone</label>
                      <div>
                        {clinic.timezone} ({clinic.tz_offset})
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Clinic Description & Timeline */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-light border-0 py-3">
              <h5 className="mb-0 text-primary d-flex align-items-center">
                <FaClock className="me-2" /> Additional Information
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col md={12} className="mb-4">
                  <h6 className="text-muted">Description</h6>
                  <p>{clinic.description}</p>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center mb-3">
                    <FaCalendarAlt className="text-success me-3" />
                    <div>
                      <small className="text-muted">Created At</small>
                      <div className="fw-medium">
                        {new Date(clinic.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center mb-3">
                    <FaClock className="text-warning me-3" />
                    <div>
                      <small className="text-muted">Updated At</small>
                      <div className="fw-medium">
                        {new Date(clinic.updated_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ✅ Slots Section (new card outside Additional Information) */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-light border-0 py-3">
              <h5 className="mb-0 text-primary d-flex align-items-center">
                <FaClock className="me-2" /> Clinic Slots
              </h5>
            </Card.Header>
            <Card.Body>
              {slotsLoading ? (
                <div className="text-center py-3">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : slots.length ? (
                <Table
                  columns={slotColumns}
                  data={slots}
                  pageSize={5}
                  sizePerPageList={[
                    { text: "5", value: 5 },
                    { text: "10", value: 10 },
                    { text: "25", value: 25 },
                    { text: "All", value: 1000 },
                  ]}
                  isSortable={true}
                  pagination={true}
                  isSearchable={true}
                />
              ) : (
                <p className="text-muted text-center mb-0">
                  No slots added.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </div>
  );
}
