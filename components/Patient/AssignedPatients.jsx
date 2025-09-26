import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { fetchSocialWorkersWithPatients, deleteAssignedScheduler } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useDisclosure, Button } from '@heroui/react';
import Table from '../Table/Table';
import PageTitle from '../Breadcrumb/PageTitle';
import Tmodal from '../Tmodal/Tmodal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Head } from '../../layouts/head';

const sizePerPageList = [
  { text: "5", value: 5 },
  { text: "10", value: 10 },
  { text: "25", value: 25 },
  { text: "All", value: 1000 },
];

export default function AssignedPatients() {
  const [assignedList, setAssignedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const { translateText } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const columns = [
    {
      Header: "S.No.",
      accessor: "serial",
      sort: false,
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Social Worker",
      accessor: "workerName",
      sort: true,
    },
    {
      Header: "Patient",
      accessor: "patientName",
      sort: true,
    },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex gap-2 justify-center items-center">
            <Link href="#">
              <FaPen className="text-primary" />
            </Link>
            <button
              type="button"
              onClick={() => {
                setSelectedWorkerId(item.workerId);
                setSelectedPatientId(item.patientId);
                onOpen();
              }}
              aria-label="Delete assigned patient"
            >
              <MdDelete className="text-danger" size={18} />
            </button>
          </div>
        );
      },
    },
  ];

  const loadData = async () => {
    setLoading(true);
    const response = await fetchSocialWorkersWithPatients();
    if (response.status && Array.isArray(response.data)) {
      const transformed = response.data
        .filter(worker => worker.user_type === 2)
        .flatMap(worker =>
          (Array.isArray(worker.patients) ? worker.patients : []).map(patient => ({
            workerId: worker.user_id,
            workerName: worker.name,
            patientId: patient.patient_id,
            patientName: patient.name,
          }))
        );
      setAssignedList(transformed);
    } else {
      setAssignedList([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('userTypeChanged', loadData);
    return () => window.removeEventListener('userTypeChanged', loadData);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!selectedWorkerId || !selectedPatientId) return;

    setDeleteLoading(true);
    const res = await deleteAssignedScheduler({
      user_id: selectedWorkerId,
      patient_id: selectedPatientId,
    });

    setMessage(res.message);
    setMessageType(res.status ? "success" : "error");

    if (res.status) {
      setAssignedList(prev =>
        prev.filter(item =>
          !(item.workerId === selectedWorkerId && item.patientId === selectedPatientId)
        )
      );
    }

    setSelectedWorkerId(null);
    setSelectedPatientId(null);
    setDeleteLoading(false);
    onClose();

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };


  return (
    <div className="m-4">
       <Head title="Assigned Patient" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Assigned Patients", path: "/assigned-patients", active: true },
        ]}
        title={translateText("Assigned Patients")}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {message && (
                <div
                  className={`mt-3  text-center fw-semibold ${messageType === "success" ? "text-success" : "text-danger"
                    }`}
                >
                  {message}
                </div>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Table
                  columns={columns}
                  data={assignedList}
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
        title={translateText("Are you sure you want to remove this assigned patient?")}
        footer={
          <>
            <Button color="danger" variant="light" onPress={onClose}>
              {translateText("Cancel")}
            </Button>
            <Button disabled={deleteLoading} color="primary" onPress={handleDeleteConfirm}>
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
