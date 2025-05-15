import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUsers, updateUser, changeUserStatus } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";

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

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);


    useEffect(() => {
        const getUserFromList = async () => {
            const allUsers = await fetchUsers();
            if (allUsers?.data && id) {
                const foundUser = allUsers.data.find(u => u.id.toString() === id.toString());
                if (foundUser) {
                    setFormData(foundUser); // get all keys from user object
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
        if (!formData.name?.trim()) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.mobile) newErrors.mobile = 'Mobile is required';
        else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be 10 digits';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true); // Show button spinner

        try {
            const res = await updateUser(id, formData);

            if (res?.status === true) {
                const statusUpdate = await changeUserStatus(id, formData.status);

                if (statusUpdate.status === true) {
                    setStatusMessage(res?.message || res?.message_italian);
                    setStatusType("success");

                    setTimeout(() => {
                        router.replace('/user/userList');
                    }, 1500);
                } else {
                    setStatusMessage(res?.message);
                    setStatusType("error");
                }
            } else {
                setStatusMessage("Update failed.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("An unexpected error occurred while updating.");
            setStatusType("error");
        } finally {
            setLoading(false); // Stop spinner
        }
    };



    const nonEditableFields = [
        'id', 'password', 'otp', 'otp_expiry', 'access_token', 'device_token',
        'remember_token', 'email_verified_at', 'phone_verified_at',
        'created_at', 'updated_at'
    ];

    const fieldLabels = {
        name: translateText("name"),
        mobile: translateText("mobile_number"),
        country_code: translateText("Country Code"),
        email: translateText("email_address"),
        social_id: translateText("Social ID"),
        provider: translateText("Provider"),
        user_type: translateText("user_type"),
        gender: translateText("gender"),
        birthday: translateText("date_of_birth"),
        address: translateText("address"),
        profile_img: translateText("Profile Image URL"),
        status_value: translateText("Account Status"),
    };

    return (
        <div className=" mx-auto mt-10 bg-white shadow-md p-6 rounded-md">
            <h2 className="text-3xl font-semibold mb-4 text-center">{translateText("Update User")}</h2>

            {statusMessage && (
                <div
                    className={` mb-4 text-center ${statusType === 'success' ? 'text-green-500' : 'text-red-500'}`}
                >
                    {statusMessage}
                </div>
            )}


            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">

                    {/* Dynamically render fields */}
                    {Object.entries(formData).map(([key, value]) => {
                        if (nonEditableFields.includes(key)) return null;

                        // Show only status_value, not status
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

                        // Render status_value as a dropdown
                        if (key === 'status_value') {
                            return (
                                <div key="status_value">
                                    <label className="block text-sm font-medium capitalize">
                                        {fieldLabels[key] || 'Status'}
                                    </label>
                                    <select
                                        name="status_value"
                                        value={formData.status_value || ''}
                                        onChange={(e) => {
                                            const selected = e.target.value;

                                            // Map to correct status values for backend
                                            const statusMap = {
                                                Active: 1,
                                                Inactive: 2,
                                                Suspended: 3
                                            };

                                            setFormData((prev) => ({
                                                ...prev,
                                                status_value: selected,
                                                status: statusMap[selected], // set actual value expected by API
                                            }));
                                        }}
                                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-1.5"
                                    >
                                        <option value="Active">{translateText("Active")}</option>
                                        <option value="Inactive">{translateText("Inactive")}</option>
                                        <option value="Suspended">{translateText("Suspended")}</option>
                                    </select>

                                </div>
                            );
                        }

                        // Regular input or select
                        return (
                            <div key={key}>
                                <label className="block text-sm font-medium capitalize">
                                    {fieldLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </label>
                                {key === 'user_type' ? (
                                    <select
                                        name={key}
                                        value={value}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-1.5"
                                    >
                                        <option value="2">{translateText("social_worker")}</option>
                                        <option value="3">{translateText("patient")}</option>
                                        <option value="4">{translateText("user")}</option>
                                        <option value="1" hidden>{translateText("doctor")}</option>
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        name={key}
                                        value={value}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-1.5"
                                    />
                                )}
                                {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                            </div>
                        );
                    })}
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 mt-4 block mx-auto"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                        translateText("Update User")
                    )}
                </button>
            </form>
        </div>
    );
}
