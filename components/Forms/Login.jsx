import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { loginUser } from "../../utils/fetchApi"
import { Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import { useUser } from "../../context/UserContext";
import { useAdmin } from "../../context/AdminContext";


export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const [loading, setLoading] = useState(false);
  const { admin, loginAdmin } = useAdmin();
  const [checking, setChecking] = useState(true);


  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = translateText("invalidEmail");
    }

    if (!formData.password) {
      newErrors.password = "Required";
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
  const [successMessage, setSuccessMessage] = useState("");

  const { user, setUser, setUserEmail } = useUser();
  //   useEffect(() => {
  //     if (user) {
  //     }
  //   }, [user]);

  //  if (user) {
  //   router.push("/dashboard");
  //   return null; // Prevent login form from rendering
  // }

  useEffect(() => {
    // wait one tick to simulate loading context or read localStorage yourself
    setChecking(false);
  }, []);

  if (checking) {
    return null; // or spinner
  }

  if (admin || user) {
    router.replace("/dashboard");
    return null;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true); // Show loader

      try {
        const response = await loginUser(formData.email, formData.password);

        setUser(response);
        setUserEmail(formData.email);

        setFormData({ email: "", password: "" });
        setErrors({});

        const translatedMessage = locale === "ita" ? response.message_italian : response.message;
        setSuccessMessage(translatedMessage);

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);

      } catch (err) {
        const errorMessage = locale === "ita" ? err.message_italian : err.message;
        setErrors({ api: errorMessage });
      } finally {
        setLoading(false); // Hide loader
      }
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
          <h2 className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl text-center mb-10 text-white">{translateText("login")}</h2>
          {successMessage && (
            <p className="text-yellow-500 font-semibold text-lg text-center my-4">
              {successMessage}
            </p>
          )}
          {errors.api && <p className="text-white text-sm mb-4">{errors.api}</p>}
          {/* {user && (
            <div className="text-green-700 bg-green-50 border border-green-200 rounded-md p-4 my-4 text-sm">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Mobile:</strong> {user.mobile}</p>
              <p><strong>User Type:</strong> {user.user_type_value}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Token:</strong> {user.token}</p>
              <p><strong>Status:</strong> {user.status}</p>
              <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</p>
            </div>
          )} */}
          {/* {loading && (
            <div className="flex justify-center items-center my-4">
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          )} */}
          <form onSubmit={handleSubmit}>
            <div className=" w-full  gap-2">
              <Input
                label={
                  <span className="text-white">
                    {translateText("email")} <span className="text-gray-300">*</span>
                  </span>
                }
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
                label={
                  <span className="text-white">
                    {translateText("password")} <span className="text-gray-300">*</span>
                  </span>
                }
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
            <p className="text-start text-sm  mt-2 mb-16">
              <Link className="text-white" href="/forgottenPassword">
                {translateText("password_forgot")}
              </Link>
            </p>
            <button
              type="submit"
              disabled={loading}
              className="font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] py-2 w-full flex items-center justify-center bg-[#FFBA1B] "
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                translateText("login")
              )}
            </button>
            <div

              className="font-bold w-full text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center  uppercase rounded-[600px] border-1 border-white py-2"
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
