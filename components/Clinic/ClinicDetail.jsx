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
import { fetchClinicById } from "../../utils/fetchApi";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ClinicDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
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
    <div >
      {/* ✅ Page Title + Breadcrumb */}
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Clinic Management", path: "/clinic/clinicManagement" },
          { label: "Clinic Detail", path: `/clinicDetail/${id}`, active: true },
        ]}
        title="Clinic Detail"
      />

      <Row className="g-4">
        {/* Clinic Header Card */}
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
                <FaUserMd
                  className="text-primary"
                  style={{ fontSize: "80px" }}
                />
              )}
            </div>
            <h3 className="mb-2">{clinic.clinic_name}</h3>
            <p className="text-muted">{clinic.email}</p>
            <Badge
              bg={clinic.status === 1 ? "success" : "danger"}
              className="px-3 py-2"
            >
              {clinic.status === 1 ? "Active" : "Inactive"}
            </Badge>
          </Card>
        </Col>

        {/* Clinic Information Card */}
        <Col xl={8} lg={7}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-light border-0 py-3">
              <h5 className="mb-0 text-primary d-flex align-items-center">
                <FaUserMd className="me-2" /> Clinic Information
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-4">
                <Col md={6}>
                  <div className="d-flex align-items-start">
                    <FaEnvelope className="me-3 text-success mt-1" />
                    <div>
                      <label className="text-muted">Email</label>
                      <div>
                        <a
                          href={`mailto:${clinic.email}`}
                          className="text-decoration-none"
                        >
                          {clinic.email}
                        </a>
                      </div>
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
    </div>
  );
}
