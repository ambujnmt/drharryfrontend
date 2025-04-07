import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input, Select, SelectItem } from "@heroui/react";
import { registerUser } from "../../utils/fetchApi"


export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    user_type: ""
  });

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
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
    { key: "1", label: 'Doctor' },
    { key: "2", label: 'Social Worker' },
    { key: "3", label: 'Patient' },
    { key: "4", label: 'User' },
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    try {
      const { name, email, password, c_password, user_type } = formData;
  
      const userData = await registerUser(name, email, password, c_password, user_type);
  
      setFormData({
        name: "",
        email: "",
        password: "",
        c_password: "",
        user_type: ""
      });
      setErrors({});
  
      router.push({
        pathname: "/login",
        query: { name: userData?.name || name },
      });
  
    } catch (err) {
    
      if (err?.details) {
        const fieldErrors = {};
        for (const field in err.details) {
          fieldErrors[field] = err.details[field][0]; 
        }
        setErrors(fieldErrors);
      } else {
        setErrors({ api: err.message || "Something went wrong. Please try again." });
      }
    }
    
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-200 via-blue-100 to-yellow-100">
     <div className="absolute top-5 right-5">
     <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" color="primary" className="text-blue-600">
              {translateText("language")}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="en" onClick={() => switchLanguage("en")}>English</DropdownItem>
            <DropdownItem key="fr" onClick={() => switchLanguage("fr")}>French</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
        </div>
      <div className="lg:mt-20 md:mt-20 mt-20 xl:mt-0 flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg"
            alt="Signup Illustration"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">{translateText("signup")}</h2>
          {errors.api && <p className="text-red-500 text-sm mb-4">{errors.api}</p>}
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">

              <div className="pb-2">
                <Input
                  label={translateText("name")}
                  type="name"
                  name="name"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="">
                <Input
                  label={translateText("email")}
                  type="email"
                  name="email"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            <div className="grid md:grid-cols-2 grid-cols-1 pb-3 md:gap-4 gap-1">

              <div className="relative">
                <Input
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter password"
                  variant="bordered"
                  type={show ? 'text' : 'password'}
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />

                <button
                  type="button"
                  className="absolute top-8 right-3 text-gray-500"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className=" relative">
                <Input
                  label="Confirm Password"
                  labelPlacement="outside"
                  placeholder="Confirm password"
                  variant="bordered"
                  type={show ? 'text' : 'password'}
                  name="c_password"
                  onChange={handleChange}
                  value={formData.c_password}
                />

                <button
                  type="button"
                  className="absolute top-8 right-3 text-gray-500"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
                {errors.c_password && <p className="text-red-500 text-sm mt-1">{errors.c_password}</p>}
              </div>
            </div>

            <div className="pb-4">
              <Select
                className="max-w-full"
                label="User Type"
                placeholder="Select User Type"
                labelPlacement="outside"
                variant="bordered"
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
              {errors.user_type && <p className="text-red-500 text-sm">{errors.user_type}</p>}
            </div>
            
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              {translateText("signup")}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            {translateText("alreadyHaveAccount")} <Link href="/login" className="text-blue-600">{translateText("login")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
