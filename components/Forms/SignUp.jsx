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
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  const [loading, setloading] = useState(false);

  const [clientLocale, setClientLocale] = useState("");

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name?.trim()) {
      newErrors.name = `${translateText("full_name")} ${translateText("required_field")}`;
    }
    if (!formData.email) {
      newErrors.email = translateText("emailRequired") || "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = translateText("invalidEmail") || "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.c_password) {
      newErrors.c_password = "Confirm Password is required";
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

      const successMsg = locale === "ita" ? response?.message_italian : response?.message;
      setSuccessMessage(successMsg);

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
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://nmtdevserver.com/welli/blurflower.png')" }}
    >
      <div className="absolute top-2 right-2">
        <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
          <Dropdown>
            <DropdownTrigger>
              <button variant="bordered" color="primary" className="text-blue-600 border-2 border-[#5274F6] bg-white">
                <IoLanguage />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="en" onClick={() => switchLanguage("en")}>English</DropdownItem>
              <DropdownItem key="ita" onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="bg-[#5274F6] w-full md:max-w-xl lg:max-w-3xl  md:mx-10 lg:mx-20  p-6 md:p-12 flex items-center justify-center h-[100vh]">

        <div className="w-full md:w-1/2  flex flex-col justify-center">
          <p className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl text-center text-white">{translateText("register")}</p>
          {errors.email && <p className="text-white my-3 text-lg">{errors.email}</p>}
          {successMessage && (
            <p className="text-white my-3 text-lg">{successMessage}</p>
          )}
          {errors.api && errors.api !== "Validation Error." && (
            <p className="text-white my-3 text-lg">{errors.api}</p>
          )}



          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className=" w-full  gap-2">
              <Input
                label={translateText("name")}
                type="name"
                name="name"
                variant="underlined"
                classNames={{
                  label: "text-white",
                }}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-gray-300 mt-1 text-sm">{errors.name}</p>}
            </div>
            <div className=" w-full  gap-2">
              <Input
                label={translateText("email")}
                type="email"
                name="email"
                variant="underlined"
                classNames={{
                  label: "text-white",
                  input: "text-white"
                }}
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
              />


              {errors.email && <p className="text-gray-300 mt-1 text-sm">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div >
                <Input
                  label={translateText("password")}
                  variant="underlined"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  classNames={{
                    label: "text-white",
                    input: "text-white"
                  }}
                />
                {errors.password && <p className="text-gray-300 text-sm mt-1">{errors.password}</p>}
              </div>
              <div>
                <Input
                  label={translateText("c_password")}
                  classNames={{
                    label: "text-white text-[13px]",
                    input: "text-white"
                  }}
                  variant="underlined"
                  type="password"
                  name="c_password"
                  onChange={handleChange}
                  value={formData.c_password}
                />
                {errors.c_password && <p className="text-gray-300 text-sm mt-1">{errors.c_password}</p>}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="relative flex items-center justify-center font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-3 xl:my-3 text-center text-white rounded-[600px] bg-[#FFBA1B] py-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                translateText("register")
              )}
            </button>

            <button className="font-bold text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-1 xl:my-3 text-center rounded-[600px] border-1 border-white py-2">
              <Link className="text-white" href="/login">{translateText("login")}</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
