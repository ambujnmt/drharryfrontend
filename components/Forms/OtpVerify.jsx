import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { Link, Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import { verifyOtp } from "../../utils/fetchApi"
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";




export default function Otp() {
    const { switchLanguage, locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const otpLinkRef = useRef(null);

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiResult, setApiResult] = useState(null);
    const { userEmail } = useUser();

    useEffect(() => {
        if (userEmail) {
            setEmail(userEmail);
        } else if (router.isReady && router.query.email) {
            setEmail(router.query.email);
        }
    }, [router.isReady, userEmail, router.query.email]);


    const handleOtpVerify = async () => {
      
        setIsLoading(true);

        try {
            const result = await verifyOtp({
                email,
                otp: enteredOtp
            });
            setApiResult(result);

            if (result.status) {
                const successMsg = locale === "ita" ? result.message_italian : result.message;
                setMessage(successMsg);

                setTimeout(() => {
                    otpLinkRef.current?.click();
                }, 3000);
            } else {
                let errorMsg = result.message;
                if (result.message === "Validation Error." && result.data?.otp?.[0]) {
                    errorMsg = locale === "ita" ? result.message_italian : result.data.otp[0];
                } else {
                    errorMsg = locale === "ita" ? result.message_italian : result.message;
                }
                setMessage(errorMsg);
            }
        } catch (error) {
            // Use API-provided error if available
            let errorMsg = "";

            if (error?.response?.data?.message) {
                errorMsg = locale === "ita"
                    ? error.response.data.message_italian || error.response.data.message
                    : error.response.data.message;
            } else if (error?.message) {
                errorMsg = error.message; // Use the technical error only if necessary
            }

            setMessage(errorMsg);
        } finally {
            setIsLoading(false);
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
            <div className="lg:mt-4 md:mt-6 mt-10 xl:-mt-32 flex justify-center md:flex-row  rounded-lg  w-full  overflow-hidden">
                <div className="w-full md:w-1/2  flex flex-col justify-start">
                    <div className="flex justify-center items-center xl:gap-4 gap-2 mb-6">
                        <h2 className="font-normal uppercase text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px]  text-center text-white">{translateText("register")}</h2>
                        <span className="rounded-[25px] bg-[#FFBA1B] py-1 xl:w-28 lg:w-24  w-16  font-normal uppercase text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px]  text-center text-white">{translateText("login")}</span>
                    </div>
                    <p className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center text-white my-20">{translateText("enter_otp")}</p>
                    {message && (
                        <p className="text-center text-white text-sm md:text-lg mb-4">{message}</p>
                    )}

                    <div>
                        <Input
                            classNames={{
                                input: "text-black text-center",
                            }}
                            placeholder="OTP"
                            type="number"
                            variant="none"
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value)}
                            className="font-bold text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center bg-white text-white rounded-[600px] border-1 border-white "
                        />
                    </div>

                    {/* <button
                        onClick={handleOtpVerify}
                        className="font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] bg-[#FFBA1B] py-2"
                    >
                        {translateText("verify")}
                    </button> */}


                    <button
                        onClick={handleOtpVerify}
                        disabled={isLoading}
                        className={`font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] py-2 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFBA1B]"
                            }`}
                    >
                        {isLoading ? "Verifying..." : translateText("verify")}
                    </button>

                    <Link ref={otpLinkRef} href="/login" className="hidden" />
                </div>
            </div>
        </div>
    );
}