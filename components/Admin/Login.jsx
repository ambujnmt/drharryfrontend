import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { adminLogin } from "../../utils/fetchApi"
import { Input } from "@heroui/react";
import { useAdmin } from "../../context/AdminContext";
import { useUser } from "../../context/UserContext";
import { Head } from "../../layouts/head"
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useUser(); // get user context
    const [checking, setChecking] = useState(true);
    const [isLoadingUser, setIsLoadingUser] = useState(true);


    const validate = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };
    const [successMessage, setSuccessMessage] = useState("");

    const { admin, loginAdmin } = useAdmin();

    useEffect(() => {
        // Simulate async check or just wait for context to settle
        if (user !== undefined && admin !== undefined) {
            setIsLoadingUser(false);
        }
    }, [user, admin]);

    useEffect(() => {
        // wait one tick to simulate loading context or read localStorage yourself
        setChecking(false);
    }, []);

    if (checking) {
        return null; // or spinner
    }

    // if (admin || user) {
    //     router.replace("/dashboard");
    //     return null;
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            const response = await adminLogin(
                formData.email,
                formData.password
            );

            loginAdmin(response.user, response.token);

            setSuccessMessage(response.message);
            setErrors({});

            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);

        } catch (err) {
            setErrors({
                api: err.message,
            });

            setTimeout(() => {
                setErrors({});
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Admin Login" />

            <div
                className="min-h-screen flex bg-cover bg-center"

            >
                {/* Left Side */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-[var(--secondary-color)]">
                    <div className="absolute inset-0 bg-black/30"></div>

                    <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                        <h1 className="text-6xl font-semibold mb-6">
                            Welcome Back
                        </h1>

                        <h6 className="text-lg text-gray-200 leading-8 max-w-lg">
                            Access your administration dashboard and manage your
                            platform with confidence. Secure, elegant and built
                            for professionals.
                        </h6>

                        <div className="mt-10 w-24 h-1 bg-[var(--primary-color)]"></div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6">


                    {/* Login Card */}
                    <div
                        className="
            w-full
            max-w-md
            bg-white/95
            backdrop-blur-md
            rounded-3xl
            shadow-2xl
            p-8 md:p-10
          "
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-4xl text-[var(--secondary-color)] mb-2">
                                Admin Login
                            </h2>

                            <h6 className="text-gray-500">
                                Sign in to continue
                            </h6>
                        </div>

                        {successMessage && (
                            <div className="mb-5  rounded-lg ">
                                <p className="text-green-700 text-center font-medium">
                                    {successMessage}
                                </p>
                            </div>
                        )}

                        {errors.api && (
                            <div className="mb-5 rounded-lg ">
                                <p className="text-red-600 text-center">
                                    {errors.api}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Email */}
                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="underlined"
                                    label={
                                        <span className="text-[#000] ">
                                            Email
                                            <span className="text-red-500 ml-1">*</span>
                                        </span>
                                    }
                                    classNames={{
                                        label: "text-[var(--text-color2)] h-[50px]",
                                        input: "text-[var(--secondary-color)] font-medium",

                                    }}
                                />

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    variant="underlined"
                                    label={
                                        <span className="text-[#000]">
                                            Password
                                            <span className="text-red-500 ml-1">*</span>
                                        </span>
                                    }
                                    endContent={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-gray-500 hover:text-[var(--primary-color)] transition-colors"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash size={18} />
                                            ) : (
                                                <FaEye size={18} />
                                            )}
                                        </button>
                                    }
                                    classNames={{
                                        label: "text-[var(--text-color2)] h-[50px]",
                                        input: "text-[var(--secondary-color)] font-medium",
                                    }}
                                />

                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="
                w-full
                py-3
                rounded-full
                bg-[var(--primary-color)]
                text-white
                font-semibold
                transition-all
                duration-300
                hover:shadow-lg
                hover:-translate-y-1
                disabled:opacity-70
                hover:bg-[var(--secondary-color)]
              "
                            >
                                {loading ? (
                                    <div className="flex justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    "Login"
                                )}
                            </button>

                        </form>

                        <div className="mt-8 text-center">
                            <div className="w-16 h-[2px] bg-[var(--primary-color)] mx-auto"></div>

                            <p className="mt-4 text-sm text-gray-500">
                                Admin Portal
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
