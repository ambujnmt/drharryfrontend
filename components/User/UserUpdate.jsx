import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUsers, updateUser, changeUserStatus } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import PageTitle from '../Breadcrumb/PageTitle';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form } from "react-bootstrap";
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from "react-icons/io5";
import { Head } from '../../layouts/head';

export default function UserUpdate() {
    const router = useRouter();
    const { id } = router.query;
    const { locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");
    const [previewImg, setPreviewImg] = useState("");


    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];

            if (!file.type.startsWith("image/")) {
                setErrors({ profile_img: "Please upload a valid image." });
                return;
            }

            setPreviewImg(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, profile_img: file })); // ✅ Add this line
            setErrors((prev) => ({ ...prev, profile_img: null }));

        }
    }, []);



    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        multiple: true
    });

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);


    useEffect(() => {
        const getUserFromList = async () => {
            const allUsers = await fetchUsers();
            if (allUsers?.data && id) {
                const foundUser = allUsers.data.find(u => u.id.toString() === id.toString());
                if (foundUser) {
                    setFormData({
                        ...foundUser,
                        password: '********' // display dummy asterisks
                    });

                    if (foundUser.profile_img) {
                        setPreviewImg(foundUser.profile_img);
                    }
                }
            }

            setLoading(false);
        };
        if (id) getUserFromList();
    }, [id]);


    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setErrors(prev => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name?.trim()) newErrors.name = 'Required';
        if (!formData.email) newErrors.email = 'Required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.mobile) newErrors.mobile = 'Required';
        else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be 10 digits';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        try {
            const formPayload = new FormData();

            for (let key in formData) {
                const value = formData[key];

                if (
                    value === undefined ||
                    value === null ||
                    value === '' ||
                    (typeof value === 'string' && value.trim() === '')
                ) {
                    continue;
                }

                if (key === "profile_img" && value instanceof File) {
                    formPayload.append(key, value);
                } else {
                    formPayload.append(key, value);
                }
            }


            const res = await updateUser(id, formPayload, true);

            if (res?.status === true) {
                const statusUpdate = await changeUserStatus(id, formData.status);

                if (statusUpdate.status === true) {
                    setStatusMessage(res?.message || res?.message_italian);
                    setStatusType("success");
                    setTimeout(() => {
                        router.replace('/user/userList');
                    }, 1500);
                } else {
                    setStatusMessage("Status update failed.");
                    setStatusType("error");
                }
            } else {
                setStatusMessage(res?.message);
                setStatusType("error");
            }
        } catch (error) {
            console.error("Update error:", error);
            setStatusMessage("An unexpected error occurred while updating.");
            setStatusType("error");
        } finally {
            setLoading(false);
        }
    };

    const nonEditableFields = [
        'id', 'otp', 'otp_expiry', 'access_token', 'device_token',
        'remember_token', 'email_verified_at', 'phone_verified_at',
        'created_at', 'updated_at'
    ];

    const fieldLabels = {
        name: translateText("name"),
        mobile: translateText("mobile_number"),
        country_code: translateText("Country Code"),
        email: translateText("email_address"),
        social_id: translateText("Social ID"),
        password: translateText("password"),
        provider: translateText("Provider"),
        user_type: translateText("user_type"),
        gender: translateText("gender"),
        birthday: translateText("date_of_birth"),
        address: translateText("address"),
        profile_img: translateText("Profile Image URL"),
        status_value: translateText("Account Status"),
    };


    return (
        <div>
             <Head title="User Update" />
            <PageTitle
                breadCrumbItems={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "User List", path: "/user/userList" },
                    { label: "Update User", active: true },
                ]}
                title={translateText("Update User")}
            />
            <Card>
                <Card.Body>
                    <div>

                        {statusMessage && (
                            <div
                                className={` mb-4 text-center ${statusType === 'success' ? 'text-green-500' : 'text-red-500'}`}
                            >
                                {statusMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(formData).map(([key, value]) => {
                                    if (nonEditableFields.includes(key)) return null;
                                    if (key === 'profile_img') return null;

                                    if (key === 'status') {
                                        return (
                                            <input
                                                key="status"
                                                type="hidden"
                                                name="status"
                                                value={value || ''}
                                                readOnly
                                            />
                                        );
                                    }

                                    if (key === 'status_value') {
                                        return (
                                            <div key="status_value">

                                                <Form.Group controlId="status_value">
                                                    <Form.Label className='text-sm text-gray-500'>
                                                        {fieldLabels[key]?.toString() || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                                    </Form.Label>
                                                    <Form.Select
                                                        name="status_value"
                                                        value={formData.status_value || ''}
                                                        onChange={(e) => {
                                                            const selected = e.target.value;
                                                            const statusMap = {
                                                                Active: 1,
                                                                Inactive: 2,
                                                                Suspended: 3
                                                            };
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                status_value: selected,
                                                                status: statusMap[selected],
                                                            }));
                                                        }}
                                                        className="border-1 border-gray-300 rounded-md"
                                                    >
                                                        <option value="Active">{translateText("Active")}</option>
                                                        <option value="Inactive">{translateText("Inactive")}</option>
                                                        <option value="Suspended">{translateText("Suspended")}</option>
                                                    </Form.Select>
                                                    {errors.userType && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
                                                    )}
                                                </Form.Group>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={key}>
                                            <Form.Label className="block text-sm text-gray-500  capitalize labelfix">
                                                {fieldLabels[key]?.toString() || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}

                                            </Form.Label>

                                            {key === 'user_type' ? (

                                                <Form.Group controlId="user_type" >
                                                    <Form.Select
                                                        name={key}
                                                        value={value}
                                                        onChange={handleChange}
                                                        className="border-1 border-gray-300 rounded-md"
                                                    >
                                                        <option value="2">{translateText("social_worker")}</option>
                                                        <option value="3">{translateText("patient")}</option>
                                                        <option value="4">{translateText("user")}</option>
                                                        <option value="1" hidden>{translateText("doctor")}</option>
                                                    </Form.Select>
                                                    {errors.userType && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
                                                    )}
                                                </Form.Group>
                                            ) : key === 'gender' ? (
                                                <Form.Group controlId="gender" >
                                                    <Form.Select
                                                        name={key}
                                                        value={value}
                                                        onChange={handleChange}
                                                        className="border-1 border-gray-300 rounded-md"
                                                    >

                                                        <option value="Male">{translateText("Male")}</option>
                                                        <option value="Female">{translateText("Female")}</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            ) : (

                                                <Form.Group controlId={key}>

                                                    <Form.Control
                                                        type={key === 'password' ? 'password' : 'text'}
                                                        name={key}
                                                        value={value}
                                                        onChange={handleChange}
                                                        className="border border-gray-300 rounded-md"
                                                    />
                                                    {errors[key] && (
                                                        <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                                                    )}
                                                </Form.Group>

                                            )}

                                            {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                                        </div>
                                    );
                                })}

                                <div className="col-span-2">
                                    <Form.Group>
                                        <Form.Label className="text-sm text-gray-500">
                                            {fieldLabels.profile_img}
                                        </Form.Label>

                                        {previewImg && (
                                            <a href={previewImg} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={previewImg}
                                                    alt="Profile Preview"
                                                    className="h-24 w-24 object-cover border rounded-full my-2"
                                                />
                                            </a>
                                        )}

                                        <div
                                            {...getRootProps()}
                                            className="border border-dotted rounded p-5 text-center"
                                            style={{ cursor: 'pointer', background: '#f8f9fa' }}
                                        >
                                            <input {...getInputProps()} />
                                            {
                                                isDragActive ? (
                                                    <p>Drop the files here ...</p>
                                                ) : (
                                                    <div>
                                                        <IoCloudUploadOutline className="block m-auto text-[30px] text-gray-500" />
                                                        <p className="mt-2 text-[23px] font-medium mb-1">Drop your images here, or click to browse</p>
                                                        <small className="text-[13px] text-gray-500">(1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed)</small>
                                                    </div>
                                                )
                                            }
                                        </div>

                                    </Form.Group>
                                </div>

                            </div>

                            {/* Submit & Cancel Buttons */}
                            <div className="flex justify-center gap-2 mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    ) : (
                                        translateText("Update")
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.push('/user/userList')}
                                    className="btn btn-secondary"                                >
                                    {translateText("Cancel")}
                                </button>
                            </div>
                        </form>

                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
