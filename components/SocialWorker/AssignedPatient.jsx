import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../Breadcrumb/PageTitle";
import Table from "../Table/Table";
import { useUser } from "../../context/UserContext";
import { fetchAssignedPatientForSocialWorker } from "../../utils/fetchApi";

export default function AssignedPatient() {
  const { user } = useUser();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { Header: "S.No.", accessor: "serial", sort: false, Cell: ({ row }) => row.index + 1 },
    { Header: "Name", accessor: "name", sort: true },
    {
  Header: "Email",
  accessor: "email",
  sort: true,
  Cell: ({ value }) => (
    <div style={{
      maxWidth: "150px",    // adjust width as needed
      whiteSpace: "normal",
      wordBreak: "break-word"
    }}>
      {value}
    </div>
  ),
},
    {
      Header: "Mobile",
      accessor: "mobile",
      sort: false,
      Cell: ({ row }) => (row.original.mobile ? `${row.original.country_code || ""} ${row.original.mobile}` : "N/A"),
    },
    {
      Header: "Status",
      accessor: "status_value",
      sort: true,
      Cell: ({ value }) => (
        <span className={`text-white px-2 py-1 rounded-3xl ${value === "Active" ? "bg-success" : "bg-danger"}`}>
          {value}
        </span>
      ),
    },
    { Header: "Created At", accessor: "created_at", sort: true, Cell: ({ value }) => (value ? new Date(value).toLocaleDateString() : "N/A") },
    {
      Header: "Schedule Day",
      accessor: "schedule_day",
      sort: false,
      Cell: ({ row }) => (row.original.schedule_day || []).map((day, idx) => <div key={idx}>{day}</div>),
    },
    {
      Header: "Schedule Time",
      accessor: "schedule_time",
      sort: false,
      Cell: ({ row }) => (row.original.schedule_time || []).map((time, idx) => <div key={idx}>{time}</div>),
    },
  ];

  useEffect(() => {
    const getPatients = async () => {
      if (!user?.user_id) return;
      setLoading(true);
      const response = await fetchAssignedPatientForSocialWorker(user.user_id);
      setPatients(response);
      setLoading(false);
    };
    getPatients();
  }, [user]);

  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "All", value: 1000 },
  ];

  return (
    <div className="p-4">
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Assigned Patients", active: true },
        ]}
        title="Assigned Patients"
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
                <div style={{ overflowX: "auto" }}>
                  <Table
                    columns={columns}
                    data={patients}
                    pageSize={10}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    isSearchable={true}
                  />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
