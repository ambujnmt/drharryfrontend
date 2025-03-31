import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";

export default function SignupForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userPassword", formData.password);
      setFormData({ email: "", password: "" });
      setErrors({});
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-200 via-blue-100 to-yellow-100">
      <div className="fixed top-5 right-5">
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
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg"
            alt="Signup Illustration"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">{translateText("signup")}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">{translateText("email")}</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700">{translateText("password")}</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
