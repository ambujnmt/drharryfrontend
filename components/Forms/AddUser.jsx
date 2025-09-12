import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { addUser } from "../../utils/fetchApi";
import { Card, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from "../Breadcrumb/PageTitle";

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

useEffect(() => {
    setClientLocale(locale.toUpperCase());
    // Remove validation here to prevent auto-errors on language switch
}, [locale]);

    const usertype = [
        { key: "1", label: "Doctor" },
        { key: "2", label: "Social Worker" },
        { key: "3", label: "Patient" },
        { key: "4", label: "User" },
    ];

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Required";
        if (!formData.email) {
            newErrors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.userType) newErrors.userType = "Required";
        if (!password) newErrors.password = "Required";
        if (!confirm) newErrors.confirm = "Required";
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

        setLoading(true);

        const apiData = {
            name: formData.name,
            email: formData.email,
            password: password,
            user_type: formData.userType,
        };

        const result = await addUser(apiData);

        if (result.status) {
            setShowSuccess(true);
            setSuccessMessage(result.message);
            setTimeout(() => setShowSuccess(false), 3000);

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
        <div className="m-4">
            <PageTitle
                            breadCrumbItems={[
                                { label: "Dashboard", path: "/dashboard" },
                                { label: "Add User", active: true },
                            ]}
                            title={translateText("Add User")}
                        />
            <Card>
                <Card.Body>
                    <div className="">
                        <div className="md:p-2">
                            <form onSubmit={handleSubmit}>
                                {showSuccess && (
                                    <div className="my-5 text-center text-green-500 relative">
                                        <span className="block sm:inline">{successMessage}</span>
                                    </div>
                                )}
                                {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

                                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-sm text-gray-500">{translateText("full_name")}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder={translateText("enter_name")}
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="border-1 border-gray-300 rounded-md"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-sm text-gray-500">{translateText("email")}</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder={translateText("enter_email")}
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border-1 border-gray-300 rounded-md"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </Form.Group>
                                </div>

                                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label  className="text-sm text-gray-500">{translateText("password")}</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    setErrors((prev) => ({ ...prev, password: "" }));
                                                }}
                                                className="border-1 border-gray-300 rounded-md"
                                            />
                                            <InputGroup.Text
                                                className="cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </InputGroup.Text>
                                        </InputGroup>
                                        {errors.password && (
                                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label  className="text-sm text-gray-500">{translateText("c_password")}</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type={showConfirm ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                value={confirm}
                                                onChange={(e) => {
                                                    setConfirm(e.target.value);
                                                    setErrors((prev) => ({ ...prev, confirm: "" }));
                                                }}
                                                className="border-1 border-gray-300 rounded-md"
                                            />
                                            <InputGroup.Text
                                                className="cursor-pointer"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                            >
                                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                            </InputGroup.Text>
                                        </InputGroup>
                                        {errors.confirm && (
                                            <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>
                                        )}
                                    </Form.Group>

                                </div>

                             <Form.Group controlId="userType" className="mb-3">
  <Form.Label className="text-sm text-gray-500">
    {translateText("user_type")}
  </Form.Label>
  <Form.Select
    name="userType"
    value={formData.userType}
    onChange={(e) => {
      setFormData((prev) => ({
        ...prev,
        userType: e.target.value,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, userType: "" }));
    }}
    className="border-1 border-gray-300 rounded-md"
  >
    <option value="">Select User Type</option>
    {usertype.map((g) => (
      <option key={g.key} value={g.key}>
        {g.label}
      </option>
    ))}
  </Form.Select>
  {errors.userType && (
    <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
  )}
</Form.Group>


                                <button 
                                disabled={loading}
                                type="submit"
                                className="btn btn-primary"
                                
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
                </Card.Body>
            </Card>
        </div>
    );
}
