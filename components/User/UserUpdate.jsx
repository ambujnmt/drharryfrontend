import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUsers, updateUser } from '../../utils/fetchApi';

export default function UserUpdate() {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");

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
        console.log("Router ID:", id); // 👈 Debug log

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

        console.log("Form data before validation:", formData);

        if (!validate()) return;

        const res = await updateUser(id, formData);

        if (res?.status === true) {
            console.log("✅ API Success Message:", res.message); // ✅ Print success message

            setStatusMessage(res.message);
            setStatusType("success");

            setTimeout(() => {
                router.replace('/user/userList'); // cleaner than reload
            }, 1500);
        } else {
            console.error("❌ API Error Message:", res?.message); // helpful in debugging
            setStatusMessage(res?.message);
            setStatusType("error");
        }
    };


    if (loading) return <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;


    const nonEditableFields = [
        'id', 'password', 'otp', 'otp_expiry', 'access_token', 'device_token',
        'remember_token', 'email_verified_at', 'phone_verified_at',
        'created_at', 'updated_at'
    ];

    const fieldLabels = {
        name: 'Name',
        mobile: 'Mobile Number',
        country_code: 'Country Code',
        email: 'Email Address',
        social_id: 'Social ID',
        provider: 'Provider',
        user_type: 'User Type',
        gender: 'Gender',
        birthday: 'Date of Birth',
        address: 'Address',
        profile_img: 'Profile Image URL',
        status: 'Account Status',
    };

    return (
        <div className=" mx-auto mt-10 bg-white shadow-md p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Update User</h2>

            {statusMessage && (
                <div
                    className={`p-4 mb-4 text-center text-white rounded-md ${statusType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                    {statusMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Dynamically render fields */}
                {Object.entries(formData).map(([key, value]) => {
                    if (nonEditableFields.includes(key)) return null;

                    return (
                        <div key={key}>
                            <label className="block text-sm font-medium capitalize">
                                {fieldLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </label>
                            {key === 'user_type' ? (
                                <select
                                    name={key}
                                    value={value || ''}
                                    onChange={handleChange}
                                    placeholder="Select User Type"
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="2">Social Worker</option>
                                    <option value="3">Patient</option>
                                    <option value="4">User</option>
                                    <option value="1" hidden>Doctor</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    value={value || ''}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            )}
                            {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                        </div>
                    );
                })}


                {/* Submit Button */}
            </form>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 w-full mt-4 block mx-auto"
                >
                    Update User
                </button>
        </div>
    );
}
