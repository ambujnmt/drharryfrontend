import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { adminLogin } from "../../utils/fetchApi"
import { Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import { useAdmin } from "../../context/AdminContext"; 
import { useUser } from "../../context/UserContext";
import {Head} from "../../layouts/head"


export default function AdminLogin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const { switchLanguage, locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");
    const [loading, setLoading] = useState(false);
  const { user } = useUser(); // get user context
const [checking, setChecking] = useState(true);
const [isLoadingUser, setIsLoadingUser] = useState(true);


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
    const [successMessage, setSuccessMessage] = useState("");

    const { admin, loginAdmin } = useAdmin();

useEffect(() => {
  // Simulate async check or just wait for context to settle
  if (user !== undefined && admin !== undefined) {
    setIsLoadingUser(false);
  }
}, [user, admin]);

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
            setLoading(true);
            try {
                const response = await adminLogin(formData.email, formData.password);

                loginAdmin(response.data, formData.email); // store admin info dynamically
                console.log("Logged in admin:", response.data);  // ✅ Check this shows correct data

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
                setLoading(false);
            }
        }
    };

    return (
        
        <div
        className="relative w-screen h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://nmtdevserver.com/welli/blurflower.png')" }}
        >
        <Head title="Admin Login" />
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

                    </form>
                </div>
            </div>
        </div>
    );
}
