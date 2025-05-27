import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchProfile, updateProfileApi } from '../../utils/fetchApi';
import { Input } from '@heroui/react';

export default function UpdateProfile() {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        gender: '',
        birthday: '',
        user_type_value: '',
        profile_img: null,
    });

    const [previewImg, setPreviewImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState(null);
    const [errors, setErrors] = useState({});
    const [initialLoading, setInitialLoading] = useState(true); // for profile fetch loading

    useEffect(() => {
        if (id) {
            setInitialLoading(true); // Start loader
            fetchProfile(id).then((res) => {
                if (res.status) {
                    const user = res.data;
                    setFormData({
                        name: user.name || '',
                        email: user.email || '',
                        mobile: user.mobile || '',
                        address: user.address || '',
                        gender: user.gender || '',
                        birthday: user.birthday || '',
                        user_type_value: user.user_type_value || '',
                        profile_img: null,
                    });
                    setPreviewImg(user.profile_img);
                }
                setInitialLoading(false); // End loader
            }).catch((err) => {
                setInitialLoading(false); // End loader even if error
            });
        }
    }, [id]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected File:", file); // <-- Add this

        setFormData((prev) => ({ ...prev, profile_img: file }));
        setPreviewImg(URL.createObjectURL(file));
    };


    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Required';
        if (!formData.mobile) {
            newErrors.mobile = 'Required';
        } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            newErrors.mobile = 'Invalid';
        }
        if (!formData.address) newErrors.address = 'Required';
        if (!formData.gender) newErrors.gender = 'Required';
        if (!formData.birthday) newErrors.birthday = 'Required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMsg(null);
        setErrors({});

        if (!validate()) return;

        setLoading(true);

        const submitData = new FormData();
        submitData.append('user_id', id);
        submitData.append('name', formData.name);
        submitData.append('mobile', formData.mobile);
        submitData.append('address', formData.address);
        submitData.append('gender', formData.gender);
        if (formData.birthday) {
            submitData.append('birthday', formData.birthday);
        }
        if (formData.profile_img) {
            submitData.append('profile_img', formData.profile_img);
        }

        try {
            const res = await updateProfileApi(submitData);
            setLoading(false);

            if (res.status) {
                setResponseMsg({ type: 'success', text: res.message }); // ✅ show success
                setTimeout(() => {
                    router.push(`/user/profile/${id}`);
                }, 2000); // Delay to show message
            } else {
                setResponseMsg({ type: 'error', text: res.message }); // ✅ show error
                if (res.errors) {
                    setErrors(res.errors);
                }
            }
        } catch (error) {
            setLoading(false);
            setResponseMsg({ type: 'error', text: "Something went wrong, please try again." });
        }
    };


    if (initialLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }



    return (
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-10 ">
            <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
            {responseMsg && (
                <p className={`mt-4 text-center font-semibold ${responseMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {responseMsg.text}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                {previewImg && (
                    <div>
                        <img src={previewImg} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full" />
                    </div>
                )}
                <div>
                    <label className="block font-medium">Profile Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Input
                            label="Name"
                            labelPlacement="outside"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type='text'
                            variant="bordered"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <Input
                            variant="bordered"
                            label="Email"
                            labelPlacement="outside"
                            name="email"
                            type='text'
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Input
                            type='text'
                            label="User Type"
                            labelPlacement="outside"
                            name="user_type_value"
                            value={formData.user_type_value}
                            onChange={handleChange}
                            variant="bordered"
                            disabled
                        />
                    </div>
                    <div>
                        <Input
                            type='number'
                            variant="bordered"
                            label="Mobile"
                            labelPlacement="outside"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                        {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1.5">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-200 px-2 py-1.5 rounded-xl"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>
                    <div>
                        <Input
                            variant="bordered"
                            label="Birthday"
                            labelPlacement="outside"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            type="date"
                        />
                        {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>}
                    </div>
                </div>

                <div>
                    <label className="block">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        type='text'
                        className="w-full border-2 border-gray-200 px-2 py-1.5 rounded-xl"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                            : 'Update'}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push(`/user/profile/${id}`)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>


            </form>
        </div>
    );
}
