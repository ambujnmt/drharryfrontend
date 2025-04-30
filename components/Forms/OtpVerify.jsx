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
    const [loading, setloading] = useState(false);
    const [apiResult, setApiResult] = useState(null);
    const { userEmail } = useUser(); // Get the dynamic email from context
    console.log("User email on OTP page:", userEmail);  // Ensure it prints the correct email

    // useEffect(() => {
    //     if (user?.email) {
    //         setEmail(user.email);
    //     }
    // }, [user]);

    const handleOtpVerify = async () => {
        console.log("Sending OTP verify data:", { userEmail, otp: enteredOtp });

        setloading(true);

        try {
            const result = await verifyOtp({
                email: userEmail,  // Use 'email' instead of 'userEmail' if that's expected
                otp: enteredOtp
            });

            setApiResult(result);

            if (result.status) {
                // const token = result.data.token;
                // setAuthToken(token); // Store in context
                // localStorage.setItem("authToken", token);

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
            setloading(false);
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
                <div className="w-full md:w-1/2  flex flex-col justify-start">
                    <div className="flex justify-center items-center xl:gap-4 gap-2 mb-6">
                        <h2 className="font-normal uppercase text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px]  text-center text-white">{translateText("register")}</h2>
                        <span className="rounded-[25px] bg-[#FFBA1B] py-1 xl:w-28 lg:w-24  w-16  font-normal uppercase text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px]  text-center text-white">{translateText("login")}</span>
                    </div>
                    <p className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center text-white my-20">{translateText("enter_otp")}</p>
                    {message && (
                        <p className="text-center text-white text-sm md:text-lg mb-4">{message}</p>
                    )}
                    {/* {apiResult && (
                        <div className="mt-4 bg-white text-black p-4 rounded-lg max-w-full overflow-auto">
                            <pre className="text-sm">{JSON.stringify(apiResult, null, 2)}</pre>
                        </div>
                    )} */}

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
                    <button
                        onClick={handleOtpVerify}
                        disabled={loading}
                        className="font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] py-2 w-full flex items-center justify-center bg-[#FFBA1B] "
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            translateText("verify")
                        )}
                    </button>

                    <Link ref={otpLinkRef} href="/login" className="hidden" />
                </div>
            </div>
        </div>
    );
}