import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { Input, Select, SelectItem } from "@heroui/react";
import { registerUser } from "../../utils/fetchApi"
import { IoLanguage } from "react-icons/io5";
import { useUser } from "../../context/UserContext"; // adjust the path


export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    user_type: ""
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);

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
    if (!formData.user_type) {
      newErrors.user_type = "User type is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const user_type = [
    { key: "1", label: translateText("doctor") },
    { key: "2", label: translateText("social_worker") },
    { key: "3", label: translateText("patient") },
    { key: "4", label: translateText("user") },
  ];

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

    try {
      const { name, email, password, c_password, user_type } = formData;

      const response = await registerUser(name, email, password, c_password, user_type);

      const successMsg =
        locale === "ita"
          ? response?.message_italian
          : response?.message;
      setSuccessMessage(successMsg);

      const registeredEmail = email;
      setUserEmail(registeredEmail);

      setTimeout(() => {
        router.push("/otpVerification");
      }, 3000);

      setFormData({
        name: "",
        email: "",
        password: "",
        c_password: "",
        user_type: ""
      });
      setErrors({});

    } catch (err) {
      if (err?.details) {
        const fieldErrors = {};
        for (const field in err.details) {
          fieldErrors[field] = err.details[field][0]; // show only the first message
        }
        setErrors(fieldErrors);
      } else {
        setErrors({ api: err.message });
      }

      setSuccessMessage(""); // Clear success message on error
    }

  };



  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#5274F6]">
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
      <div className="lg:mt-4 md:mt-6 mt-10 xl:mt-0 flex justify-center md:flex-row  rounded-lg  w-full  overflow-hidden">

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
            <div>
              <Select
                className="max-w-full mb-2 selectmargin"
                classNames={{
                  label: "text-[#fff]",
                  trigger: "text-white",
                  base: "margin-top-[0px]"
                }}
                label={translateText("user_type")}
                labelPlacement="outside"
                variant="underlined"
                name="user_type"
                selectedKeys={formData.user_type ? new Set([formData.user_type]) : new Set()}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0];
                  setFormData((prev) => ({ ...prev, user_type: selectedKey }));
                  setErrors((prevErrors) => ({ ...prevErrors, user_type: "" }));
                }}
              >
                {user_type.map((g) => (
                  <SelectItem key={g.key} value={g.key}>
                    {g.label}
                  </SelectItem>
                ))}
              </Select>
              {errors.user_type && <p className="text-gray-300 my-1 text-sm">{errors.user_type}</p>}
            </div>

            <button type="submit" onClick={handleSubmit} className="font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-1 xl:my-3 text-center text-white rounded-[600px] bg-[#FFBA1B] py-2">
              {translateText("register")}
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
