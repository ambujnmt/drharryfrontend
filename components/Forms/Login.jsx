import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import  {loginUser} from "../../utils/fetchApi"

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  const validate = () => {
    let newErrors = {};
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (!formData.email) {
      newErrors.email = translateText("emailRequired");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = translateText("invalidEmail");
    }

    if (!formData.password) {
      newErrors.password = translateText("passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = translateText("passwordMinLength");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     setFormData({ email: "", password: "" });
  //     setErrors({});
  //     router.push("/dashboard");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const userData = await loginUser(formData.email, formData.password);
  
        setFormData({ email: "", password: "" });
        setErrors({});
  
        router.push({
          pathname: "/dashboard",
        });
  
      } catch (err) {
        setErrors({ api: err.message });
      }
    }
  };
  

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-yellow-100 p-4">
      <div className="absolute top-5 right-5">
        <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" color="primary" className="text-blue-600">{translateText("language")}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new" className=" px-2 py-1" onClick={() => switchLanguage("en")}>English</DropdownItem>
              <DropdownItem key="copy" className=" px-2 py-1" onClick={() => switchLanguage("fr")}>French</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="lg:mt-20 md:mt-20 mt-20 xl:mt-0 flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            alt="Login Illustration"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">{translateText("login")}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">{translateText("email")}</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{translateText("password")}</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {errors.api && <p className="text-red-500 text-sm mb-4">{errors.api}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {translateText("login")}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            {translateText("alreadyHaveAccount")} <Link href="/signup" className="text-blue-600">{translateText("signup")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
