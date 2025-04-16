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
        
        try {
            const result = await createNewPasswordApi(registeredUserEmail, formData.password);
    
            setSuccessMessage(locale === "ita" ? result.message_italian : result.message);
    
            setFormData({ password: "", c_password: "" });
    
            setTimeout(() => {
                linkRef.current?.click();
            }, 1000);
            
        } catch (err) {
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

            <div className="lg:mt-4 md:mt-6 mt-10 xl:mt-0 flex justify-center md:flex-row rounded-lg w-full overflow-hidden">
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
                            className="font-bold w-full text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] border-1 border-white  py-2"
                        >
                            {translateText("enter")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
