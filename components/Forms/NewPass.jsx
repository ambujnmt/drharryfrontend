import { useContext, useEffect, useState,useRef  } from "react";
import { Link } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import { LanguageContext } from "../../context/LanguageContext";
import { useRegisteredUser } from "../../context/RegisteredUserContext";
import { createNewPasswordApi } from "../../utils/fetchApi";

export default function NewPass() {
    const [formData, setFormData] = useState({
        password: "",
        c_password: "",
    });

    const linkRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const { switchLanguage, locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");
      const [loading, setloading] = useState(false); 
    

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    const validate = () => {
        let newErrors = {};
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const { registeredUserEmail } = useRegisteredUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) return;
        console.log("registeredUserEmail:", registeredUserEmail);

        if (!registeredUserEmail) {
            setErrors({ api: "Email is required to set a new password." });
            return;
        }
        setloading(true);
        
        try {
            const result = await createNewPasswordApi(registeredUserEmail, formData.password);
            
            setloading(false);

            setSuccessMessage(locale === "ita" ? result.message_italian : result.message);
    
            setFormData({ password: "", c_password: "" });
    
            setTimeout(() => {
                linkRef.current?.click();
            }, 1000);
            
        } catch (err) {
            setloading(false);
            const formattedErrors = {};
            
            if (err.errors?.password) {
                formattedErrors.password = err.errors.password[0];
            }
    
            if (err.errors?.email) {
                formattedErrors.api = err.errors.email[0];
            }
    
            setErrors(formattedErrors);
        }
    };
    
    

    return (
<div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://nmtdevserver.com/welli/blurflower.png')" }}
    >            <div className="absolute top-2 right-2">
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
            <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h2 className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl text-center mb-10 text-white">
                        {translateText("new_pass")}
                    </h2>
                    {errors.api && <p className="text-white text-sm mb-4">{errors.api}</p>}
                    {successMessage && <p className="text-white text-sm mb-4">{successMessage}</p>}

                    <Link href="/successfullPassSet" className="hidden" ref={linkRef} />

                    <form onSubmit={handleSubmit}>
                        <div className="w-full gap-2">
                            <Input
                                label={translateText("password")}
                                variant="underlined"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                classNames={{
                                    label: "text-white",
                                    input: "text-white",
                                }}
                            />
                            {errors.password && <p className="text-gray-300 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="mb-16">
                            <Input
                                label={translateText("c_password")}
                                variant="underlined"
                                type="password"
                                name="c_password"
                                onChange={handleChange}
                                value={formData.c_password}
                                classNames={{
                                    label: "text-white text-[13px]",
                                    input: "text-white",
                                }}
                            />
                            {errors.c_password && <p className="text-gray-300 text-sm mt-1">{errors.c_password}</p>}
                        </div>

                        {errors.api && <p className="text-red-500 text-sm mb-4">{errors.api}</p>}
                        <div className="font-bold w-full text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center uppercase bg-[#FFBA1B] rounded-[600px] py-2">
                            <Link className="text-white" href="/signupWith">
                                {translateText("register")}
                            </Link>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="font-bold w-full text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] border-1 border-white  py-2 flex items-center justify-center"
                        >
                              {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            translateText("enter")
                        )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
