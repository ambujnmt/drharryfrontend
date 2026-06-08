import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { Input } from "@heroui/react";
import { registerUser } from "../../utils/fetchApi";
import { IoLanguage } from "react-icons/io5";
import { useUser } from "../../context/UserContext";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [loading, setloading] = useState(false);

 

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";

    if (!formData.email) {
      newErrors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Required";
    }
    if (!formData.c_password) {
      newErrors.c_password = "Required";
    }
    if (formData.password && formData.c_password && formData.password !== formData.c_password) {
      newErrors.c_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const [successMessage, setSuccessMessage] = useState("");
  const { setUserEmail } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setloading(true); // Start loader

    try {
      const { name, email, password, c_password } = formData;
      const response = await registerUser(name, email, password, c_password);

       setSuccessMessage(response.message);

      setUserEmail(email);

      setTimeout(() => {
        router.push("/otpVerification");
      }, 3000);

      setFormData({ name: "", email: "", password: "", c_password: "" });
      setErrors({});
    } catch (err) {
      if (err?.details) {
        const fieldErrors = {};
        for (const field in err.details) {
          fieldErrors[field] = err.details[field][0];
        }
        setErrors(fieldErrors);
      } else {
        setErrors({ api: err.message });
      }
      setSuccessMessage("");
    } finally {
      setloading(false); // Stop loader
    }
  };



  return (
    <div
      className="flex items-center justify-center bg-cover bg-center px-4 py-4 relative"

    >


      <div className="w-full max-w-6xl  bg-white rounded-[35px] shadow-2xl  grid lg:grid-cols-2">

        {/* Left */}

        {/* Left Image Section */}

        <div className="hidden lg:block relative h-full">

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
            alt="Students"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/35"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-12">

            <img
              src="/assets/Images/footer-logo.png"
              className="h-16 w-fit mb-8"
              alt=""
            />

            <span className="inline-block w-fit px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white mb-5">
              Join Thousands of Learners
            </span>

            <h2 className="text-white text-5xl font-bold leading-tight mb-4">
              Start Your
              <br />
              Learning
              <br />
              Journey
            </h2>

            <p className="text-white/90 text-lg leading-8 max-w-md">
              Create your account and access expert courses,
              faculty guidance, events and a personalized
              learning experience.
            </p>

          </div>

        </div>


        {/* Right */}

        <div className="flex flex-col justify-center px-8 lg:px-10 py-8">

          <span className="inline-block w-fit px-4 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-sm font-semibold mb-4">
            Student Registration
          </span>

          <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-6">
            Fill in your details to get started.
          </p>

          {successMessage && (
            <p className="text-green-600 text-center mb-3">
              {successMessage}
            </p>
          )}

          {errors.api && errors.api !== "Validation Error." && (
            <p className="text-red-500 text-center mb-3">
              {errors.api}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="underlined"
                label={
                  <span className="text-[#000] ">
                    Name
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                }
                classNames={{
                  label: "text-[var(--text-color2)] h-[50px]",
                  input: "text-[var(--secondary-color)] font-medium",

                }}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

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

            <div className="grid grid-cols-2 gap-4">

              <div>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="underlined"
                label={
                  <span className="text-[#000] ">
                    Password
                    <span className="text-red-500 ml-1">*</span>
                  </span>
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

              <div>
                <Input
                  type="password"
                  name="c_password"
                  value={formData.c_password}
                  onChange={handleChange}
                   variant="underlined"
                label={
                  <span className="text-[#000] ">
                   Confirm Password
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                }
                classNames={{
                  label: "text-[var(--text-color2)] h-[50px]",
                  input: "text-[var(--secondary-color)] font-medium",

                }}
                />

                {errors.c_password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.c_password}
                  </p>
                )}
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-[var(--primary-color)] text-white font-semibold hover:bg-[var(--secondary-color)] transition"
            >
              {loading ? (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Register"
              )}
            </button>

            <Link
              href="/login"
              className="w-full h-12 rounded-full border-2 border-[var(--primary-color)] text-[var(--primary-color)] flex items-center justify-center font-semibold hover:bg-[var(--primary-color)] hover:text-white transition"
            >
              Login
            </Link>

          </form>

          <div className="mt-6 text-center">

            <div className="w-16 h-[2px] bg-[var(--primary-color)] mx-auto"></div>

            <p className="mt-4 text-sm text-gray-400">
              Institute Learning Platform
            </p>

          </div>

        </div>

      </div>

    </div>
  );


}
