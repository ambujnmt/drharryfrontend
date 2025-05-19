import React, { useContext, useEffect, useState } from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { addUser } from "../../utils/fetchApi";

export default function AddUser() {
    const { translateText, locale } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        userType: "",
    });
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
        if (Object.keys(errors).length > 0) validate();
    }, [locale]);

    const usertype = [
        { key: "1", label: "Doctor" },
        { key: "2", label: "Social Worker" },
        { key: "3", label: "Patient" },
        { key: "4", label: "User" },
    ];


    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = translateText("full_name") + " " + translateText("required_field");
        if (!formData.email) {
            newErrors.email = translateText("emailRequired");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = translateText("invalid_email");
        }
        if (!formData.userType) newErrors.userType = translateText("user_type") + " " + translateText("required_field");
        if (!password) newErrors.password = translateText("password_required");
        if (!confirm) newErrors.confirm = translateText("confirm_password_required");
        if (password && confirm && password !== confirm) {
            newErrors.confirm = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true); // Show button spinner

        const apiData = {
            name: formData.name,
            email: formData.email,
            password: password,
            user_type: formData.userType, // This is now "1", "2", etc.
        };

        const result = await addUser(apiData);

        if (result.status) {
            setShowSuccess(true);
            setSuccessMessage(result.message);
            setTimeout(() => setShowSuccess(false), 3000);

            // Clear form
            setFormData({ name: "", email: "", userType: "" });
            setPassword("");
            setConfirm("");
            setErrors({});
        } else {
            setErrors({ api: result.message });
        }

        setLoading(false);
    };

    return (
        <div className="w-full bg-gray-100 md:p-6 p-0">
            <div className="w-full space-y-5 bg-white shadow-lg rounded-lg p-4 ">
                <div className="md:p-4">
                    <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 text-center">Add Users</h2>
                    <form onSubmit={handleSubmit}>
                        {showSuccess && (
                            <div className=" my-5 text-center text-green-500 relative">
                                <span className="block sm:inline">{successMessage}</span>
                            </div>
                        )}
                        {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    name="name"
                                    label={translateText("full_name")}
                                    labelPlacement="outside"
                                    placeholder={translateText("enter_name")}
                                    variant="bordered"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    name="email"
                                    label={translateText("email")}
                                    labelPlacement="outside"
                                    placeholder={translateText("enter_email")}
                                    variant="bordered"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
                            <div className="mb-4 relative">
                                <Input
                                    label="Password"
                                    labelPlacement="outside"
                                    placeholder="Enter password"
                                    variant="bordered"
                                    type={show ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                            <div className="mb-4 relative">
                                <Input
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    type={show ? "text" : "password"}
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                />
                                {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <Select
                                className="max-w-full"
                                label="User Type"
                                placeholder="Select User Type"
                                labelPlacement="outside"
                                variant="bordered"
                                name="userType"
                                selectedKeys={new Set([formData.userType])}
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0];
                                    setFormData((prev) => ({
                                        ...prev,
                                        userType: value,
                                    }));
                                    setErrors((prevErrors) => ({ ...prevErrors, userType: "" }));
                                }}
                            >
                                {usertype
                                    .filter((g) => g.key !== "1") // Hides Doctor
                                    .map((g) => (
                                        <SelectItem key={g.key} value={g.key}>
                                            {g.label}
                                        </SelectItem>
                                    ))}
                            </Select>
                            {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
                        </div>


                        <button
                            disabled={loading}
                            type="submit"
                            className="w-28 md:mt-4 mt-2 block mx-auto bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                            ) : (
                                translateText("submit")
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
