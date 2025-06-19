// import React, { useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { fetchUsers } from '../../utils/fetchApi';
// import { LanguageContext } from "../../context/LanguageContext";
// import { FaEye } from "react-icons/fa";
// import { Link } from '@heroui/react';
// import PageTitle from '../Breadcrumb/PageTitle';
// import { Card, Col, Row, Spinner } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';


// export default function UserDetail() {
//     const router = useRouter();
//     const { id } = router.query;
//     const { locale, translateText } = useContext(LanguageContext);
//     const [clientLocale, setClientLocale] = useState("");

//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setClientLocale(locale.toUpperCase());
//     }, [locale]);

//     useEffect(() => {
//         const getUserDetail = async () => {
//             if (!id) return; // Wait until `id` is available
//             setLoading(true);
//             const response = await fetchUsers();
//             if (response?.data) {
//                 const foundUser = response.data.find(u => u.id.toString() === id);
//                 if (foundUser) {
//                     const { id, ...userWithoutId } = foundUser;
//                     setUser(userWithoutId);
//                 }
//             }
//             setLoading(false);
//         };

//         getUserDetail();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     if (!user) {
//         return <div className="p-4">User not found.</div>;
//     }

//     return (
//         <div>

//          <PageTitle
//                 breadCrumbItems={[
//                     { label: "Dashboard", path: "/dashboard" },
//                     { label: "User List", path: "/user/userList" },
//                     { label: "User Detail", path: "/user/userDetail", active: true },
//                 ]}
//                 title={translateText("User Detail")} // Or just "Users"
//             />
//         <Card>

//         <div className="">
           
//             <div className="w-full space-y-5 bg-white shadow-lg rounded-lg ">
//                 <div className="">
                  
//                     <ul className="space-y-2 text-gray-700">
//                         {Object.entries(user).map(([key, value]) => {
//                             if (key === 'status' || key === "user_type") return null;
//                             if (key === 'profile_img') {
//                                 return (
//                                     <li key={key} className='items-center flex gap-2'
//                                     >
//                                         <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong>{' '}
//                                         {value ? (
//                                             <Link
//                                                 href={value}
//                                                 target="_blank"
//                                             >
//                                                 <FaEye />
//                                             </Link>
//                                         ) : (
//                                             "No profile picture uploaded"
//                                         )}
//                                     </li>
//                                 );
//                             }

//                             return (
//                                 <li key={key}>
//                                     <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {value}
//                                 </li>
//                             );
//                         })}


//                     </ul>
//                 </div>
//             </div>
//         </div>
//         </Card>
//         </div>
//     );
// }




import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUsers } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import { FaEye, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaBirthdayCake, FaClock } from "react-icons/fa";
import { Link } from '@heroui/react';
import PageTitle from '../Breadcrumb/PageTitle';
import { Card, Col, Row, Spinner, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    useEffect(() => {
        const getUserDetail = async () => {
            if (!id) return;
            setLoading(true);
            const response = await fetchUsers();
            if (response?.data) {
                const foundUser = response.data.find(u => u.id.toString() === id);
                if (foundUser) {
                    const { id, ...userWithoutId } = foundUser;
                    setUser(userWithoutId);
                }
            }
            setLoading(false);
        };

        getUserDetail();
    }, [id]);

    const getFieldIcon = (key) => {
        switch (key) {
            case 'name': return <FaUser className="text-primary" />;
            case 'email': return <FaEnvelope className="text-success" />;
            case 'mobile': return <FaPhone className="text-info" />;
            case 'country_code': return <FaPhone className="text-info" />;
            case 'address': return <FaMapMarkerAlt className="text-danger" />;
            case 'birthday': return <FaBirthdayCake className="text-warning" />;
            case 'created_at': return <FaCalendarAlt className="text-secondary" />;
            case 'updated_at': return <FaClock className="text-secondary" />;
            default: return <FaUser className="text-muted" />;
        }
    };

    const formatFieldName = (key) => {
        return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const formatFieldValue = (key, value) => {
        if (!value || value === '' || value === null) {
            return <span className="text-muted fst-italic">Not provided</span>;
        }
        
        if (key === 'created_at' || key === 'updated_at') {
            return new Date(value).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        if (key === 'email') {
            return <a href={`mailto:${value}`} className="text-decoration-none">{value}</a>;
        }
        
        if (key === 'mobile' && user?.country_code) {
            return `${user.country_code} ${value}`;
        }
        
        return value;
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Loading user details...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center p-5">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">User Not Found</h4>
                    <p>The requested user could not be found.</p>
                    <hr />
                    <p className="mb-0">Please check the user ID and try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <PageTitle
                breadCrumbItems={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "User List", path: "/user/userList" },
                    { label: "User Detail", path: "/user/userDetail", active: true },
                ]}
                title={translateText("User Detail")}
            />

            <Row className="g-4">
                {/* User Profile Header */}
                <Col xl={4} lg={5}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body className="text-center p-4">
                            <div className="position-relative d-inline-block mb-4">
                                <div 
                                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                                    style={{ width: '120px', height: '120px', fontSize: '48px' }}
                                >
                                    {user.profile_img ? (
                                        <img 
                                            src={user.profile_img} 
                                            alt="Profile" 
                                            className="rounded-circle w-100 h-100 object-fit-cover"
                                        />
                                    ) : (
                                        <FaUser className="text-white" />
                                    )}
                                </div>
                                {user.profile_img && (
                                    <Link
                                        href={user.profile_img}
                                        target="_blank"
                                        className="position-absolute bottom-0 end-0 bg-white rounded-circle p-2 shadow-sm"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <FaEye className="text-primary" />
                                    </Link>
                                )}
                            </div>
                            
                            <h3 className="mb-1">{user.name || 'Unknown User'}</h3>
                            <p className="text-muted mb-3">{user.email || 'No email provided'}</p>
                            
                            {user.gender && (
                                <Badge bg="light" text="dark" className="px-3 py-2">
                                    {user.gender}
                                </Badge>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* User Details */}
                <Col xl={8} lg={7}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Header className="bg-light border-0 py-3">
                            <h5 className="mb-0 text-primary flex items-center">
                                <FaUser className="me-2" />
                                User Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Row className="g-4">
                                {Object.entries(user).map(([key, value]) => {
                                    // Skip fields that are displayed in the profile section
                                    if (['status', 'user_type', 'profile_img', 'name', 'email', 'gender'].includes(key)) {
                                        return null;
                                    }

                                    return (
                                        <Col md={6} key={key}>
                                            <div className="d-flex align-items-start">
                                                <div className="me-3 mt-1">
                                                    {getFieldIcon(key)}
                                                </div>
                                                <div className="flex-grow-1">
                                                    <label className="form-label text-muted mb-1 medium fw-medium">
                                                        {formatFieldName(key)}
                                                    </label>
                                                    <div className="text-muted !text-sm">
                                                        {formatFieldValue(key, value)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Additional Information */}
            <Row className="mt-4">
                <Col>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-light border-0 py-3">
                            <h5 className="mb-0 text-primary flex items-center">
                                <FaClock className="me-2" />
                                Account Timeline
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Row>
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-3">
                                        <FaCalendarAlt className="text-success me-3" />
                                        <div>
                                            <small className="text-muted">Account Created</small>
                                            <div className="fw-medium">
                                                {user.created_at ? formatFieldValue('created_at', user.created_at) : 'Not available'}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-3">
                                        <FaClock className="text-warning me-3" />
                                        <div>
                                            <small className="text-muted">Last Updated</small>
                                            <div className="fw-medium">
                                                {user.updated_at ? formatFieldValue('updated_at', user.updated_at) : 'Not available'}
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