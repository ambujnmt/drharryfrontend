import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Input, Select, SelectItem, RadioGroup, Radio, Textarea } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";



export default function AddUser() {

    const { switchLanguage, locale, translateText } = useContext(LanguageContext);

    const [clientLocale, setClientLocale] = useState("");

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
        if (Object.keys(errors).length > 0) {
            validate();
        }
    }, [locale]);



    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        gender: "",
        number: "",
        email: "",
        address: "",


    });
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [show, setShow] = useState(false);

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = translateText("full_name") + " " + translateText("required_field");
        if (!formData.email) {
            newErrors.email = translateText("emailRequired");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = translateText("invalid_email");
        }
        if (!formData.usertype) newErrors.usertype = translateText("gender") + " " + translateText("required_field");
        if (!formData.number) {
            newErrors.number = translateText("phone_number") + " " + translateText("required_field");
        } else if (!/^\d{10}$/.test(formData.number)) {
            newErrors.number = translateText("invalid_phone");
        }
      
        if (!password) newErrors.password = 'Password is required';
        if (!confirm) newErrors.confirm = 'Confirm Password is required';
        if (password && confirm && password !== confirm) {
            newErrors.confirm = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const usertype = [
        { key: "Doctor", label: 'Doctor' },
        { key: "Social Worker", label: 'Social Worker' },
        { key: "Patient", label: 'Patient' },
        { key: "User", label: 'User' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);

            setFormData({
                name: "",
                dob: "",
                gender: "",
                number: "",
                email: "",
                address: "",
            });
            setErrors({});
        }
    };
    return (
        <div className="w-full bg-gray-100 md:p-6 p-0">
            <div className="w-full space-y-5 bg-white shadow-lg rounded-lg p-4 ">
                <div className="md:p-4">
                    <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 text-center">Add Users</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    name="name"
                                    label={translateText("full_name")}
                                    labelPlacement="outside"
                                    placeholder={translateText("enter_name")}
                                    variant="bordered"
                                    className=" focus:ring-blue-500"
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
                                    className=" focus:ring-blue-500"
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
                                    type={show ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <button
                                    type="button"
                                    className="absolute top-9 right-3 text-gray-500"
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                </button>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                            {/* Confirm Password */}
                            <div className="mb-4 relative">
                                <Input
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    type={show ? 'text' : 'password'}
                                    onChange={(e) => setConfirm(e.target.value)}                                    
                                    value={confirm}
                                />
                                <button
                                    type="button"
                                    className="absolute top-9 right-3 text-gray-500"
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                </button>
                                {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
                            <div className="mb-4">
                                <Select
                                    className="max-w-full"
                                    label="User Type"
                                    placeholder="Select User Type"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    name="userType"
                                    selectedKeys={new Set([formData.userType])} // Ensure selectedKeys is a Set
                                    onSelectionChange={(keys) =>
                                        handleChange({ target: { name: "userType", value: Array.from(keys)[0] || "" } })
                                    }
                                >
                                    {usertype.map((g) => (
                                        <SelectItem key={g.key} value={g.key}>
                                            {g.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.usertype && <p className="text-red-500 text-sm">{errors.usertype}</p>}
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-28 md:mt-4 mt-2 block mx-auto bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {translateText("submit")}
                        </button>

                        {showSuccess && (
                            <div
                                className="bg-green-100 border my-5 text-center border-green-400 text-green-700 px-4 py-3 rounded relative"
                                role="alert"
                            >
                                <strong className="font-bold">{translateText("successMessageTitle")} </strong>
                                <span className="block sm:inline">{translateText("successMessage")}</span>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}