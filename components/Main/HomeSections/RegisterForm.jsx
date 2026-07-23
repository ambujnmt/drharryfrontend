import React, { useEffect, useRef, useState } from 'react'
import { getCourses, submitEnrollment } from "../../../utils/fetchApi";
import { useUser } from '../../../context/UserContext';
import { Link, Spinner } from '@heroui/react';

export default function RegisterForm() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        course_id: "",
        full_name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        gender: "",
        qualification: "",
        message: "",
        photo: null,
        document: null,
    });
    const { user, loading: userLoading } = useUser();
    const photoRef = useRef();
    const documentRef = useRef();
    useEffect(() => {
        fetchCourses();
    }, []);
    const isLoggedIn = !!user;
    const seatsFull = selectedCourse?.seats_left <= 0;
    const disableForm = !isLoggedIn || seatsFull || loading;
    const fetchCourses = async () => {
        try {
            const res = await getCourses();

            if (res.status) {
                setCourses(res.courses);

                if (res.courses.length > 0) {
                    setSelectedCourse(res.courses[0]);
                    setFormData((prev) => ({
                        ...prev,
                        course_id: res.courses[0].id,
                    }));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        if (!isLoggedIn) {
            setErrorMessage("Please login first.");
            return;
        }

        if (seatsFull) {
            setErrorMessage("This course is currently full.");
            return;
        }
        try {
            const payload = new FormData();

            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null) {
                    payload.append(key, formData[key]);
                }
            });

            const res = await submitEnrollment(payload);

            if (res.status) {
                setSuccessMessage(res.message);

                setFormData({
                    course_id: selectedCourse?.id || "",
                    full_name: user?.name || user?.full_name || "",
                    email: user?.email || "",
                    phone: "",
                    address: "",
                    dob: "",
                    gender: "",
                    qualification: "",
                    message: "",
                    photo: null,
                    document: null,
                });
                if (photoRef.current) {
                    photoRef.current.value = "";
                }

                if (documentRef.current) {
                    documentRef.current.value = "";
                }
            } else {
                setErrorMessage(res.message);
                setSuccessMessage("");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Something went wrong");
            setSuccessMessage("");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                full_name: user.name || user.full_name || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);
    return (
        <>
            <section className="mt-[70px] mb-[70px]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left Content */}
                        <div className="lg:col-span-5 lg:sticky lg:top-[150px] self-start">
                            <div className="head-sec">
                                <h2 className="font-[var(--head-font)] text-[var(--secondary-color)] md:text-[40px] text-[30px] lg:text-[50px] mb-[15px] leading-[105%]">
                                    Register in Minutes
                                </h2>

                                <h6 className="text-[#000c] text-[20px] mb-[15px] leading-[138%]">
                                    Our intuitive registration system makes enrollment quick and
                                    hassle-free. Choose your course, select your preferred dates, and
                                    complete payment—all in one seamless experience.
                                </h6>
                            </div>

                            <ul className="mt-5 space-y-4">
                                <li className="flex items-center text-[18px] text-[var(--secondary-color)]">
                                    <img
                                        src="/assets/Images/check-icon.png"
                                        alt=""
                                        className="w-[18px] mr-2"
                                    />
                                    Secure Payment
                                </li>

                                <li className="flex items-center text-[18px] text-[var(--secondary-color)]">
                                    <img
                                        src="/assets/Images/check-icon.png"
                                        alt=""
                                        className="w-[18px] mr-2"
                                    />
                                    Waitlist Priority
                                </li>

                                <li className="flex items-center text-[18px] text-[var(--secondary-color)]">
                                    <img
                                        src="/assets/Images/check-icon.png"
                                        alt=""
                                        className="w-[18px] mr-2"
                                    />
                                    Flexible Payment Plans
                                </li>
                            </ul>
                        </div>

                        {/* Right Form */}
                        <div className="lg:col-span-7">
                            <div className="shadow-[rgba(0,0,0,0.20)_0px_2px_12px] rounded-b-[11px]">

                                {/* Header */}
                                <div className="bg-[var(--secondary-color)] p-5 rounded-t-[11px]">
                                    <h4 className="text-[28px] font-[var(--head-font)] text-white mb-[6px]">
                                        Course Registration
                                    </h4>

                                    <p className="text-[18px] text-white/90 font-light mb-0">
                                        Secure your seat today
                                    </p>
                                </div>
                                {successMessage && (
                                    <div className=" text-green-700 text-center my-4">
                                        {successMessage}
                                    </div>
                                )}

                                {errorMessage && (
                                    <div className=" text-red-700 text-center my-4">
                                        {errorMessage}
                                    </div>
                                )}
                                {!isLoggedIn && (
                                    <div className=" text-red-700 text-center my-4">
                                        Please login to register for this course.
                                    </div>
                                )}

                                {seatsFull && (
                                    <div className="bg-yellow-100 text-yellow-700 p-3 rounded mb-4">
                                        This course is full. Join the waiting list.
                                    </div>
                                )}
                                {/* Form */}
                                <form onSubmit={handleSubmit} className="bg-[var(--light-gold2)] p-5 rounded-b-[11px]">

                                    {/* Program Selection */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                        <p className="text-[20px] leading-[138%] mb-0" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                                            Your selected program
                                        </p>

                                        <select
                                            required
                                            className="border border-gray-300 rounded-lg px-4 py-2 bg-white w-full md:w-[350px]"
                                            value={formData.course_id}
                                            onChange={(e) => {
                                                const course = courses.find(
                                                    (item) => item.id === Number(e.target.value)
                                                );

                                                setSelectedCourse(course);

                                                setFormData((prev) => ({
                                                    ...prev,
                                                    course_id: e.target.value,
                                                }));
                                            }}
                                        >
                                            <option value="">Select Course</option>

                                            {courses.map((course) => (
                                                <option key={course.id} value={course.id}>
                                                    {course.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Program Card */}
                                    <div className="flex flex-col md:flex-row bg-white mt-4 p-4 border-2 border-[var(--primary-color)] rounded-[15px]">

                                        <img
                                            src={selectedCourse?.image}
                                            alt=""
                                            className="w-full md:w-[122px] h-[111px] object-cover rounded-[10px] md:mr-[30px]"
                                        />

                                        <div className="mt-4 md:mt-0">
                                            <p className="text-[18px] font-medium mb-0">
                                                {selectedCourse?.title}
                                            </p>

                                            <span className="text-[16px] text-black/70">
                                                Duration: {selectedCourse?.duration}
                                            </span>


                                        </div>
                                    </div>
                                    {/* Personal Info */}
                                    <div className="mt-[25px]">
                                        <p className="text-[20px] leading-[138%] mb-0" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                                            Personal Information
                                        </p>

                                        <div className="mt-4">
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                                <input
                                                    required
                                                    type="text"
                                                    name="full_name"
                                                    value={formData.full_name}
                                                    readOnly={isLoggedIn}
                                                    disabled={disableForm}
                                                    onChange={handleChange}
                                                    placeholder="Your Name"
                                                    className={`w-full h-[52px] border border-[#0a23429e] rounded-[10px] px-4 mb-3 ${isLoggedIn ? "bg-gray-100 cursor-not-allowed" : "bg-transparent"
                                                        }`}
                                                />

                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    readOnly={isLoggedIn}
                                                    disabled={disableForm}
                                                    onChange={handleChange}
                                                    placeholder="Your E-mail"
                                                    className={`w-full h-[52px] border border-[#0a23429e] rounded-[10px] px-4 mb-3 ${isLoggedIn ? "bg-gray-100 cursor-not-allowed" : "bg-transparent"
                                                        }`}
                                                />
                                            </div>


                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>


                                                <input
                                                    disabled={disableForm}
                                                    required
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Phone Number"
                                                    className="w-full h-[52px] border border-[#0a23429e] rounded-[10px] px-4 mb-3 bg-transparent"
                                                />

                                                <input
                                                    disabled={disableForm}
                                                    required
                                                    type="text"
                                                    name="qualification"
                                                    value={formData.qualification}
                                                    onChange={handleChange}
                                                    placeholder="Qualification"
                                                    className="w-full h-[52px] border border-[#0a23429e] rounded-[10px] px-4 mb-3 bg-transparent"
                                                />
                                            </div>

                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                                <input
                                                    disabled={disableForm}
                                                    required
                                                    type="date"
                                                    name="dob"
                                                    value={formData.dob}
                                                    onChange={handleChange}
                                                    className="w-full h-[52px] border border-[#0a23429e] rounded-[10px] px-4 mb-3 bg-transparent"
                                                />

                                                <select
                                                    disabled={disableForm}
                                                    required
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    className="w-full h-[52px] border border-[#0a23429e] rounded-[10px] px-4 mb-3 bg-transparent"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>


                                                <textarea
                                                    disabled={disableForm}
                                                    required
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    placeholder="Address"
                                                    className="w-full border border-[#0a23429e] rounded-[10px] p-4 mb-3 bg-transparent"
                                                />


                                                <textarea
                                                    disabled={disableForm}
                                                    required
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Message"
                                                    className="w-full border border-[#0a23429e] rounded-[10px] p-4 mb-3 bg-transparent"
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>

                                                <div>

                                                    <label htmlFor="">Photo</label>
                                                    <input
                                                        disabled={disableForm}
                                                        ref={photoRef}
                                                        required
                                                        type="file"
                                                        name="photo"
                                                        accept="image/*"
                                                        onChange={handleChange}
                                                        className="w-full border border-[#0a23429e] rounded-[10px] p-3 mb-3 bg-transparent"
                                                    />

                                                </div>
                                                <div>

                                                    <label htmlFor="">Document</label>
                                                    <input
                                                        disabled={disableForm}
                                                        ref={documentRef}
                                                        required
                                                        type="file"
                                                        name="document"
                                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                        onChange={handleChange}
                                                        className="w-full border border-[#0a23429e] rounded-[10px] p-3 mb-3 bg-transparent"
                                                    />

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Seat Availability */}
                                    <div className="mt-5">
                                        <p className="text-[20px] leading-[138%] mb-0" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                                            Seat Available
                                        </p>

                                        <div className="flex items-center border border-[#0a23429e] rounded-[10px] p-4 mt-3">
                                            <img
                                                src="/assets/Images/user-icon2.png"
                                                alt=""
                                                className="w-[65px] mr-5"
                                            />

                                            <div className="w-full">
                                                <p className="text-[16px] text-[var(--secondary-color)] mb-2">
                                                    <b className="text-[19px] text-[#1A8233]">
                                                        {selectedCourse?.seats_left}
                                                    </b>{" "}
                                                    Seat Remaining
                                                </p>

                                                <div className="w-full h-[10px] bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#1A8233]"
                                                        style={{
                                                            width: `${selectedCourse
                                                                ? ((selectedCourse.max_students -
                                                                    selectedCourse.seats_left) /
                                                                    selectedCourse.max_students) *
                                                                100
                                                                : 0
                                                                }%`,
                                                        }}
                                                    />
                                                </div>

                                                <span className="text-[18px] text-[var(--secondary-color)]">
                                                    Filling Fast Reserve your seat now
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Options */}
                                    <div className="mt-6">

                                        {!isLoggedIn ? (
                                            <Link
                                                href="/login"
                                                className="block w-full text-center bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white text-[16px] rounded-[8px] py-[9px] mt-5 transition-all duration-500 ease-in-out"
                                            >
                                                Login Required
                                            </Link>
                                        ) : (
                                            <button
                                                disabled={loading || seatsFull}
                                                type="submit"
                                                className={`w-full text-white text-[16px] rounded-[8px] py-[9px] mt-5 transition-all duration-500 ease-in-out ${seatsFull
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-[var(--secondary-color)] hover:bg-[var(--primary-color)]"
                                                    }`}
                                            >
                                                {loading ? (
                                                    <div className="flex justify-center items-center">
                                                        <Spinner size="sm" color='white' />
                                                    </div>
                                                ) : seatsFull ? (
                                                    "Join Waiting List"
                                                ) : (
                                                    "Submit"
                                                )}
                                            </button>
                                        )}

                                        <p className="text-center text-[18px] text-gray-500 mt-3">
                                            Secured by 256-bit SSL encryption
                                        </p>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}