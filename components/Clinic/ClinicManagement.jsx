import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../Breadcrumb/PageTitle";
import Table from "../Table/Table";
import { fetchClinics, deleteClinic } from "../../utils/fetchApi";
import { LanguageContext } from "../../context/LanguageContext";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { Link, Button, useDisclosure } from "@heroui/react";
import Tmodal from "../Tmodal/Tmodal";

export default function ClinicManagement() {
  const { translateText } = useContext(LanguageContext);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const [message, setMessage] = useState(null); // ✅ store API messages
  const [messageType, setMessageType] = useState("success"); // "success" | "danger"
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = [
    {
      Header: "S.No.",
      accessor: "serial",
      sort: false,
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Clinic Name",
      accessor: "clinic_name",
      sort: true,
    },
    {
      Header: "Email",
      accessor: "email",
      sort: false,
    },
    {
      Header: "Phone",
      accessor: "phone",
      sort: false,
    },
    {
      Header: "Status",
      accessor: "status",
      sort: true,
      Cell: ({ value }) => (
        <span
          className={`text-white px-2 py-1 rounded-3xl ${value === "Active" ? "bg-success" : "bg-danger"
            }`}
        >
          {value}
        </span>
      ),
    },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ({ row }) => {
        const clinicId = row.original.id;
        return (
          <div className="d-flex gap-2 justify-content-center">
            <Link href={`/clinic/clinicDetail/${clinicId}`}>
              <FaEye className="text-primary" />
            </Link>
            <Link href={`/clinic/clinicUpdate/${clinicId}`}>
              <FaPen className="text-secondary" />
            </Link>
            <button
              onClick={() => {
                setSelectedClinicId(clinicId);
                onOpen();
              }}
            >
              <FaTrash className="text-danger" />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getClinics = async () => {
      setLoading(true);
      const response = await fetchClinics();
      if (response?.data) {
        const transformed = response.data.map((clinic) => ({
          id: clinic.id,
          clinic_name: clinic.clinic_name,
          email: clinic.email,
          phone: clinic.phone,
          status: clinic.status === 1 ? "Active" : "Inactive",
        }));
        setClinics(transformed);
      }
      setLoading(false);
    };
    getClinics();
  }, []);

  // ✅ delete handler with UI message
  const handleDeleteConfirm = async () => {
    if (!selectedClinicId) return;

    setDeleteLoading(true);
    const response = await deleteClinic(selectedClinicId);

    if (response?.status) {
      setClinics((prev) =>
        prev.filter((clinic) => clinic.id !== selectedClinicId)
      );
      setMessage(response.message);
      setMessageType("success");
    } else {
      setMessage(response?.message);
      setMessageType("danger");
    }

    setDeleteLoading(false);
    onClose();

    // clear selected id
    setSelectedClinicId(null);

    // auto-hide message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "All", value: 1000 },
  ];

  return (
    <div className="m-10">
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Clinic List", active: true },
        ]}
        title={translateText("Clinic List")}
      />

      {/* ✅ Show message banner */}
      {message && (
        <p
          className={`my-2 text-center ${messageType === "success" ? "text-success" : "text-danger"
            }`}
        >
          {message}
        </p>
      )}


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
                  data={clinics}
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

      {/* Delete Confirmation Modal */}
      <Tmodal
        isOpen={isOpen}
        onClose={onClose}
        title={translateText(
          "Are you sure you want to delete this clinic information?"
        )}
        footer={
          <>
            <Button color="danger" variant="light" onPress={onClose}>
              {translateText("Cancel")}
            </Button>
            <Button
              disabled={deleteLoading}
              color="primary"
              onPress={handleDeleteConfirm}
            >
              {deleteLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                translateText("Confirm")
              )}
            </Button>
          </>
        }
      />
    </div>
  );
}
