import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { Link } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";
import PhoneInput from 'react-phone-input-2';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../utils/firebase'; // adjust path if needed

export default function Phone() {
    const { switchLanguage, locale, translateText } = useContext(LanguageContext);

    const [clientLocale, setClientLocale] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const hiddenLinkRef = useRef(null);
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    useEffect(() => {
        const initializeRecaptcha = () => {
            console.log("Initializing reCAPTCHA...");
            if (!window.recaptchaVerifier) {
                console.log("Initializing recaptchaVerifier...");
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response) => {
                        console.log("reCAPTCHA solved:", response);
                    },
                    'expired-callback': () => {
                        console.warn("reCAPTCHA expired.");
                    }
                });
        
                window.recaptchaVerifier.render().catch(error => {
                    console.error("reCAPTCHA rendering error:", error);
                });
            } else {
                console.log("reCAPTCHA already initialized.");
            }
        };
        
        initializeRecaptcha(); // Call the function when component is mounted
    
        // Cleanup function to remove the reCAPTCHA verifier when component unmounts
        return () => {
            console.log("Cleaning up recaptchaVerifier...");
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
            }
        };
    }, []); // Empty dependency array to run only on mount
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const sanitizedPhone = `+${phoneNumber.replace(/[^\d+]/g, "")}`;  // Example for an Indian number
        console.log("Formatted Phone Number:", sanitizedPhone);  // Log to check if the number is correct
        
        try {
            const appVerifier = window.recaptchaVerifier;
            const confirmation = await signInWithPhoneNumber(auth, sanitizedPhone, appVerifier);
            window.confirmationResult = confirmation;
            alert("OTP sent!");
            setOtpSent(true);
        } catch (err) {
            console.error("Phone Auth Error:", err);
            if (err.code === 'auth/too-many-requests') {
                alert("Too many requests. Please try again later.");
            } else {
                alert("Failed to send OTP. Check phone number or Firebase project setup.");
            }
        }
    };
    
    
    
    return (
        <div
            className="relative w-screen h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('https://nmtdevserver.com/welli/blurflower.png')" }}
        >
            {/* Language Switcher */}
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

            {/* Main Form */}
            <div className="bg-[#5274F6] w-full md:max-w-xl lg:max-w-3xl  md:mx-10 lg:mx-20  p-6 md:p-12 flex items-center justify-center h-[100vh]">
                <div className="w-full md:w-1/2 flex flex-col justify-start">
                    <div className="flex justify-center items-center xl:gap-4 gap-2 mb-6">
                        <h2 className="font-normal uppercase text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-center text-white">{translateText("register")}</h2>
                        <span className="rounded-[25px] bg-[#FFBA1B] py-1 xl:w-28  w-16 font-normal text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px] uppercase text-center text-white">{translateText("login")}</span>
                    </div>
                    <p className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center text-white my-3 xl:my-20">{translateText("Enter your phone number")}</p>

                    {/* Phone Input */}
                    <div>
                        <PhoneInput
                            country={'in'}
                            value={phoneNumber}
                            onChange={(phone) => setPhoneNumber(phone)} // This should update the state with the correct phone number
                            inputClass="!text-black !text-center !w-full !rounded-full !px-4 !py-2 !text-[14px] md:!text-[16px]"
                            containerClass="!mb-4"
                            buttonClass="!bg-white"
                            className="country-list"
                            inputStyle={{ border: '1px solid white', borderRadius: '600px' }}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="font-bold uppercase text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center rounded-[600px] bg-[#FFBA1B] py-2"
                    >
                        <span className="text-white">{translateText("after_you")}</span>
                    </button>

                    {/* Hidden Link - triggers only if email is entered */}
                    <Link ref={hiddenLinkRef} href="/phoneVerify" className="hidden" />
                </div>
            </div>

            {/* reCAPTCHA container */}
            <div id="recaptcha-container"></div>
        </div>
    );
}
