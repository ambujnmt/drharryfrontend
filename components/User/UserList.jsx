import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from "../Breadcrumb/PageTitle";
import Table from "../Table/Table";
import { fetchUsers } from "../../utils/fetchApi";
import { FaEye, FaPen } from "react-icons/fa";
import { Link } from "@heroui/react";
import { Head } from "../../layouts/head";

const columns = [
    {
        Header: "S.No.",
        accessor: "serial",
        sort: false,
        Cell: ({ row }) => row.index + 1, // Show serial number
    },
    {
        Header: "Name",
        accessor: "name",
        sort: true,
    },
    {
        Header: "Phone Number",
        accessor: "phone",
        sort: false,
    },
    {
        Header: "Gender",
        accessor: "gender",
        sort: false,
    },
    {
        Header: "Email",
        accessor: "email",
        sort: false,
        Cell: ({ value }) => (
            <span
                style={{
                    wordBreak: "break-word",   // ✅ breaks long words
                    whiteSpace: "normal",      // ✅ allows wrapping
                    maxWidth: "200px",         // ✅ adjust as per your table width
                    display: "inline-block"
                }}
            >
                {value}
            </span>
        ),
    },
    {
        Header: "User Type",
        accessor: "user_type",
        sort: true,
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
            const userId = row.original.id;
            return (
                <div className="d-flex gap-2 justify-content-center">
                    <Link href={`/user/userDetail/${userId}`}>
                        <FaEye className="text-primary" />
                    </Link>
                    <Link href={`/user/userUpdate/${userId}`}>
                        <FaPen className="text-secondary" />
                    </Link>
                </div>
            );
        },
    },
];

const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "All", value: 1000 },
];

const Advanced = () => {
    // const { translateText } = useContext(LanguageContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const response = await fetchUsers();
            if (response?.data) {
                const transformed = response.data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    phone: `${user.country_code} ${user.mobile}`,
                    gender: user.gender,
                    email: user.email,
                    user_type: user.user_type_value,
                    status: user.status === 1 ? "Active" : "Inactive",
                }));
                setUsers(transformed);
            }
            setLoading(false);
        };
        getUsers();
    }, []);


    return (
        <div className="m-10">
             <Head title="User List" />
            {/* <PageTitle
                breadCrumbItems={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "User List", path: "/user/userList", active: true },
                ]}
                title={translateText("User List")} // Or just "Users"
            /> */}

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
                                    data={users}
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
};

export default Advanced;