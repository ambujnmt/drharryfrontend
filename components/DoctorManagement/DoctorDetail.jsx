import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Card, Col, Row, Spinner, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../Breadcrumb/PageTitle";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchProfile, fetchDoctorSlots } from "../../utils/fetchApi";
import AddAppointment from "./AddAppointment";
import Table from "../Table/Table";
import EditSlot from "./EditSlot";
import { Head } from "../../layouts/head";

export default function DoctorDetail() {
  const { translateText } = useContext(LanguageContext);
  const router = useRouter();
  const { id } = router.query;
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const getDoctor = async () => {
      setLoading(true);
      try {
        const response = await fetchProfile(id);
        if (response?.status && response?.data) {
          setDoctor(response.data);
        }
      } catch (error) {
        console.error("Error fetching doctor detail:", error);
      }
      setLoading(false);
    };
    getDoctor();
  }, [id]);

  useEffect(() => {
    if (doctor?.id) {
      setSlotsLoading(true);
      fetchDoctorSlots(doctor.id).then((res) => {
        if (res.status && res.data) setSlots(res.data);
        setSlotsLoading(false);
      });
    }
  }, [doctor?.id]);

  const handleSlotAdded = (newSlot) => {
  setSlots((prev) => [...prev, newSlot]); // add to the end
};


  const handleSlotDeleted = (slotId) => {
  setSlots((prev) => prev.filter((s) => s.id !== slotId));
};

  const slotColumns = [
    { Header: "S.No.", accessor: "serial", Cell: ({ row }) => row.index + 1 },
    { Header: "Day", accessor: "day_of_week" },
    { Header: "Start Time", accessor: "start_time" },
    { Header: "End Time", accessor: "end_time" },
    { Header: "Duration (min)", accessor: "slot_duration_minutes" },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        const slotData = row.original;
        return (
          <div className="d-flex gap-2 cursor-pointer">
            {/* You can replace this with a modal or inline UpdateSlot component */}
            <EditSlot slot={slotData} doctorId={slotData.doctor_id} onSlotUpdated={(updatedSlot) => {
              setSlots((prev) =>
                prev.map((s) => (s.id === updatedSlot.id ? updatedSlot : s))
              );
            }} 
             onSlotDeleted={handleSlotDeleted}
            />
          </div>
        );
      },
    },
  ];

  const InfoCard = ({ icon, title, value, colorClass = "text-primary" }) => (
    <div className="d-flex align-items-center p-3 border rounded-3 bg-light mb-3">
      <div className={`me-3 ${colorClass}`} style={{ fontSize: "1.5rem" }}>
        {icon}
      </div>
      <div className="flex-grow-1">
        <small className="text-muted text-uppercase fw-semibold">{title}</small>
        <div className="fw-bold">{value || "N/A"}</div>
      </div>
    </div>
  );

  return (
    <div className="m-10">
      <Head title="Doctor Detail" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Doctor List", path: "/doctorManagement/doctorList" },
          { label: "Doctor Detail", active: true },
        ]}
        title={translateText("Doctor Detail")}
      />

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : doctor ? (
        <>
          {/* Header Section */}
          <Card className="shadow-sm border-0 mb-4 overflow-hidden">
            <div
              className="position-relative"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                height: "150px"
              }}
            >
              <div className="position-absolute bottom-0 start-0 w-100 p-4">
                <Row className="align-items-end">
                  <Col xs="auto">
                    <div className="position-relative">
                      <img
                        src={
                          doctor.profile_img ||
                          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=facee"
                        }
                        alt={doctor.name}
                        className="rounded-circle border border-4 border-white shadow"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          transform: "translateY(50%)"
                        }}
                      />
                      <Badge
                        bg={doctor.status === 1 ? "success" : "danger"}
                        className="position-absolute -bottom-8 end-0 border border-white"
                        style={{ transform: "translate(25%, 75%)" }}
                      >
                        {doctor.status === 1 ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </Col>
                  <Col className="text-white">
                    <h2 className="fw-bold mb-1">{doctor.name}</h2>
                    {doctor.specialization && (
                      <Badge bg="light" text="dark" className="mt-2">
                        {doctor.specialization}
                      </Badge>
                    )}
                  </Col>
                  <Col xs="auto">
                    <AddAppointment onSlotAdded={handleSlotAdded} doctorId={doctor.id} />
                  </Col>
                </Row>
              </div>
            </div>
            <Card.Body style={{ paddingTop: "40px" }}>

            </Card.Body>
          </Card>

          {/* Main Content */}
          <Row>
            {/* Contact Information */}
            <Col lg={12} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <Card.Header className="bg-white border-bottom-0 pt-4 pb-3">
                  <h5 className="fw-bold mb-0 d-flex align-items-center">
                    <i className="bi bi-person-lines-fill text-primary me-2"></i>
                    Contact Information
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard
                      icon="✉️"
                      title="Email Address"
                      value={doctor.email}
                      colorClass="text-primary"
                    />
                    <InfoCard
                      icon="📱"
                      title="Mobile Number"
                      value={`${doctor.country_code || ""} ${doctor.mobile || ""}`}
                      colorClass="text-success"
                    />
                    <InfoCard
                      icon="⚧️"
                      title="Gender"
                      value={doctor.gender}
                      colorClass="text-info"
                    />
                    <InfoCard
                      icon="📍"
                      title="Address"
                      value={doctor.address}
                      colorClass="text-warning"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Description */}
            {doctor.description && (
              <Col xs={12} className="mb-4">
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-white border-bottom-0 pt-4 pb-3">
                    <h5 className="fw-bold mb-0 d-flex align-items-center">
                      <i className="bi bi-file-text-fill text-primary me-2"></i>
                      About Doctor
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="p-4 bg-light rounded-3">
                      <p className="mb-0 lh-lg">{doctor.description}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )}

            {/* Doctor Slots Table */}
            <Col xs={12} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-white border-bottom-0 pt-4 pb-3">
                  <h5 className="fw-bold mb-0 d-flex align-items-center">
                    <i className="bi bi-clock-history text-primary me-2"></i>
                    Slots
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
                    <p className="text-muted text-center mb-0">No slots added.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : null}
    </div>
  );
}