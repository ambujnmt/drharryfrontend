import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/react";
import { loginUser } from "../../utils/fetchApi"
import { Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import { useUser } from "../../context/UserContext";
import { useAdmin } from "../../context/AdminContext";


export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { admin, loginAdmin } = useAdmin();
  const [checking, setChecking] = useState(true);




  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Email is not a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Required";
    } else if (formData.password.length < 6) {
      newErrors.password = "The password mut be atleast 10 characters.";
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

  const { user, setUser, setUserEmail } = useUser();
  useEffect(() => {
    setChecking(false);
  }, []);

  if (checking) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      try {
        const response = await loginUser(formData.email, formData.password);

        // Save user info
        setUser({
          ...response,
          user_type: response.user_type,
          is_admin: response.is_admin // assuming backend sends this
        });
        setUserEmail(formData.email);

        setFormData({ email: "", password: "" });
        setErrors({});

        // Show success message
        setSuccessMessage(response.message);

        // ✅ Redirect based on role after 2s
        setTimeout(() => {
          if (response.is_admin) {
            router.replace("/dashboard"); // Only admin goes here
          } else {
            switch (response.user_type) {
              case 1:
                router.replace("/doctor/dashboard");
                break;
              case 2:
                router.replace("/socialWorker/dashboard");
                break;
              case 3:
                router.replace("/patient/dashboard");
                break;
              case 4:
                router.replace("/uPerson/dashboard");
                break;
              default:
                router.replace("/"); // fallback for unknown user_type
            }
          }
        }, 2000);

      } catch (err) {
        const errorMessage = locale === "ita" ? err.message_italian : err.message;
        setErrors({ api: errorMessage });
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-center bg-cover bg-center px-4 py-2 relative"

    >


      <div className="w-full max-w-5xl h-[88vh] bg-white rounded-[30px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Side */}

        <div className="flex flex-col justify-center px-8 lg:px-8 py-4">

          <span className="inline-block w-fit px-4 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-sm font-semibold mb-4">
            Student Portal
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary-color)] mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6">
            Login to continue your learning journey.
          </p>

          {successMessage && (
            <p className="text-green-600 text-center mb-3">
              {successMessage}
            </p>
          )}

          {errors.api && (
            <p className="text-red-500 text-center mb-3">
              {errors.api}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

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

            <div>
              <Input
                type="password"
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

            <div className="text-right">
              <Link
                href="/forgottenPassword"
                className="text-sm text-[var(--primary-color)]"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-[var(--primary-color)] text-white font-semibold hover:bg-[var(--secondary-color)] transition duration-300"
            >
              {loading ? (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>

            <Link
              href="/signUp"
              className="w-full h-12 rounded-full border-2 border-[var(--primary-color)] text-[var(--primary-color)] flex items-center justify-center font-semibold  hover:border-2 hover:border-[var(--secondary-color)] hover:text-[var(--secondary-color)] transition"
            >
              Register
            </Link>
          </form>
        </div>

        {/* Right Side */}


<div className="hidden lg:block relative h-full">

  <img
    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    alt="Student Login"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

  {/* Content */}

  <div className="absolute bottom-0 left-0 p-10 text-white">

    <img
      src="/assets/Images/footer-logo.png"
      className="h-14 mb-6"
      alt="Logo"
    />

    <h2 className="text-4xl font-bold mb-3 leading-tight">
      Welcome to
      <br />
      Your Learning
      <br />
      Portal
    </h2>

    <p className="text-white/90 text-lg max-w-md leading-8">
      Continue your educational journey with expert guidance,
      interactive courses and personalized learning resources.
    </p>

  </div>

</div>


      </div>
    </div>
  );



}
