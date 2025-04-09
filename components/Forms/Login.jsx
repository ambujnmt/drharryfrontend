import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { loginUser } from "../../utils/fetchApi"
import { Input} from "@heroui/react";


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

  const [successMessage, setSuccessMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const userData = await loginUser(formData.email, formData.password);

        setFormData({ email: "", password: "" });
        setErrors({});

        setSuccessMessage("Login successfully! Redirecting...");

        // Delay redirection for 2 seconds
        setTimeout(() => {
          router.push({
            pathname: "/dashboard",
          });
        }, 2000);

      } catch (err) {
        setErrors({ api: err.message });
      }
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#5274F6]">
      <div className="absolute top-5 right-5">
        <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" color="primary" className="text-blue-600 bg-white">{translateText("language")}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="en" className=" px-2 py-1" onClick={() => switchLanguage("en")}>English</DropdownItem>
              <DropdownItem key="ita" className=" px-2 py-1" onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="lg:mt-20 md:mt-20 mt-20 xl:mt-0 flex justify-center md:flex-row  rounded-lg  w-full  overflow-hidden">

        <div className="w-full md:w-1/2  flex flex-col justify-center">
          <h2 className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center mb-20 text-white">{translateText("login")}</h2>
          {successMessage && (
            <p className="text-yellow-500 font-semibold text-lg text-center my-4">
              {successMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
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
              />
              {errors.email && <p className="text-gray-300 mt-1 text-sm">{errors.email}</p>}
            </div>
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
            <p className="text-start text-sm text-white mt-2 mb-16">
              {translateText("password_forgot")}
            </p>
            {errors.api && <p className="text-red-500 text-sm mb-4">{errors.api}</p>}
            <button
              type="submit"
              className="font-bold w-full text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] bg-[#FFBA1B] py-2"
            >
              {translateText("login")}
            </button>
            <div

              className="font-bold w-full text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center  rounded-[600px] border-1 border-white py-2"
            >
              <Link className="text-white" href="/signupWith">{translateText("register")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
