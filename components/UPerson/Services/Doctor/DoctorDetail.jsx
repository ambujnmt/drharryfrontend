import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Card, Col, Row, Spinner, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../../Breadcrumb/PageTitle";
import { LanguageContext } from "../../../../context/LanguageContext";
import { fetchProfile,
  fetchDoctorWeeklySlots,
  fetchDoctorAvailableSlots,
bookDoctorSlot
} from "../../../../utils/fetchApi";
import { Head } from "../../../../layouts/head";
import Tmodal from "../../../Tmodal/Tmodal";
import { useUser } from "../../../../context/UserContext";

export default function DoctorDetail() {
  const { translateText } = useContext(LanguageContext);
  const router = useRouter();
  const { id } = router.query;
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weeklySlots, setWeeklySlots] = useState([]); // days doctor works
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState(null);
  const { user } = useUser();
const userId = user?.user_id;



useEffect(() => {
    if (!id) return;
    const getDoctor = async () => {
      setLoading(true);
      try {
        const response = await fetchProfile(id);
        if (response?.status && response?.data) {
          setDoctor(response.data);

          // also fetch weekly availability
          const weekly = await fetchDoctorWeeklySlots(id);
          if (weekly?.status) {
            setWeeklySlots(weekly.data);
          }
        }
      } catch (error) {
        console.error("Error fetching doctor detail:", error);
      }
      setLoading(false);
    };
    getDoctor();
  }, [id]);

useEffect(() => {
    if (!doctor?.id || !selectedDate) return;
    setSlotsLoading(true);
    fetchDoctorAvailableSlots(doctor.id, selectedDate)
      .then((res) => {
        if (res.status && res.data) setAvailableSlots(res.data);
        else setAvailableSlots([]);
      })
      .finally(() => setSlotsLoading(false));
  }, [doctor?.id, selectedDate]);

  // helper: generate next 7 days
  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push({
        date: d.toISOString().split("T")[0], // YYYY-MM-DD
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        full: d.toLocaleDateString("en-US", { weekday: "long" }),
      });
    }
    return days;
  };

  const upcomingDays = getNext7Days();


  const InfoCard = ({ icon, title, value, colorClass = "text-primary" }) => (
    <div className="d-flex align-items-center p-3 border rounded-3 bg-light mb-3">
      <div className={`me-3 ${colorClass}`} style={{ fontSize: "1.5rem" }}>
        {icon}
      </div>
      <div className="flex-grow-1">
        <small className="text-muted text-uppercase fw-semibold">{title}</small>
        <div className="fw-bold">{value}</div>
      </div>
    </div>
  );

const to24HourFormat = (time12h) => {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") hours = "00";
  if (modifier === "PM") hours = String(parseInt(hours, 10) + 12).padStart(2, "0");
  return `${hours}:${minutes}:00`; // append seconds
};


const handleConfirmBooking = async () => {
  if (!selectedSlot || !selectedDate || !userId) return;

  setBookingLoading(true);
  setBookingMessage(null);

  try {
    const res = await bookDoctorSlot({
      doctor_id: doctor.id,
      user_id: userId,
      booking_date: selectedDate,
      start_time: to24HourFormat(selectedSlot.time),
    });

    setBookingLoading(false);
    setBookingMessage(res?.message);

    if (res?.status) {
      // Update slot locally to mark as booked
      setAvailableSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.time === selectedSlot.time
            ? { ...slot, status: "booked" }
            : slot
        )
      );

      // Auto-close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setSelectedSlot(null);
        setBookingMessage(null);
      }, 2000);
    }
  } catch (error) {
    console.error("Booking API error:", error);
    setBookingMessage("Something went wrong while booking.");
    setBookingLoading(false);
  }
};

  return (
    <div className="m-10">
      <Head title="Doctor Detail" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/uPerson/dashboard" },
          { label: "Doctor", path: "/uPerson/services/doctor/doctor" },
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
                    {/* <AddAppointment onSlotAdded={handleSlotAdded} doctorId={doctor.id} /> */}
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
                <div className="d-flex gap-2 mb-4 overflow-auto">
                  {upcomingDays.map((d) => {
                    const isAvailable = weeklySlots.some(
                      (slot) =>
                        slot.day_of_week.toLowerCase() === d.full.toLowerCase()
                    );
                    return (
                      <div
                        key={d.date}
                        className={`px-3 py-2 rounded-pill text-center cursor-pointer ${
                          isAvailable
                            ? "bg-[#5274f6] text-white"
                            : "bg-light text-muted"
                        } ${
                          selectedDate === d.date ? "border border-dark" : ""
                        }`}
                        style={{ minWidth: "80px" }}
                        onClick={() => isAvailable && setSelectedDate(d.date)}
                      >
                        <div className="fw-bold">{d.day}</div>
                        <small>{d.date}</small>
                      </div>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div>
                    {slotsLoading ? (
                      <div className="text-center py-3">
                        <Spinner animation="border" variant="primary" />
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="d-flex flex-wrap gap-2">
                      {availableSlots.map((slot, i) => (
  <span
    key={i}
    onClick={() => slot.status === "available" && setSelectedSlot(slot)}
    className={`px-3 py-2 rounded-pill border cursor-pointer ${
      selectedSlot?.time === slot.time
        ? "bg-primary text-white"
        : slot.status === "available"
        ? "bg-success text-white"
        : "bg-secondary text-light" // booked or unavailable
    }`}
  >
    {slot.time}
  </span>
))}

                      </div>
                    ) : (
                      <p className="text-muted">
                        No slots available for this date.
                      </p>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          </Row>

            <Row className="mt-4">
            <Col className="text-center">
              <Button
                style={{
                  backgroundColor: "#5274f6",
                  border: "none",
                  borderRadius: "50px",
                  padding: "10px 30px",
                  fontWeight: "500",
                }}
                disabled={!selectedSlot}
                onClick={() => setIsModalOpen(true)}
              >
                Make an appointment
              </Button>
            </Col>
          </Row>

          {/* Modal */}
     <Tmodal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title={
    !bookingMessage
      ? `Are you sure you want to book this appointment`
      : bookingMessage
  }
  footer={
    !bookingMessage ? (
      <>
        <Button
          variant="secondary"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirmBooking}
          disabled={bookingLoading}
        >
          {bookingLoading ? "Booking..." : "Confirm"}
        </Button>
      </>
    ) : null // ✅ No Close button when success message is displayed
  }
>
</Tmodal>


        </>
      ) : null}
    </div>

  );
}