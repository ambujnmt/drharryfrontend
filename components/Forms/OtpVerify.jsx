import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { Link, Input } from "@heroui/react";

export default function Otp() {
    const { switchLanguage, locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const otpLinkRef = useRef(null);

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
        alert("Your OTP is 12345");
    }, [locale]);

    const handleOtpVerify = () => {
        if (enteredOtp === "12345") {
            otpLinkRef.current?.click(); 
        } else {
            alert("Incorrect OTP. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-[#5274F6]">
            <div className="absolute top-5 right-5">
                <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered" color="primary" className="text-blue-600 bg-white">
                                {translateText("language")}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="en" onClick={() => switchLanguage("en")}>English</DropdownItem>
                            <DropdownItem key="ita" onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="lg:mt-20 md:mt-20 mt-20 xl:-mt-32 flex justify-center md:flex-row  rounded-lg  w-full  overflow-hidden">
                <div className="w-full md:w-1/2  flex flex-col justify-start">
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <h2 className="font-normal uppercase text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px]  text-center text-white">{translateText("register")}</h2>
                        <span className="rounded-[25px] bg-[#FFBA1B] py-1 w-28 font-normal uppercase text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px]  text-center text-white">{translateText("login")}</span>
                    </div>
                    <p className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center text-white my-20">{translateText("enter_otp")}</p>
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
                        className="font-bold text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] bg-[#FFBA1B] py-2"
                    >
                        {translateText("verify")}
                    </button>

                    {/* Hidden Link to /dashboard */}
                    <Link ref={otpLinkRef} href="/dashboard" className="hidden" />
                </div>
            </div>
        </div>
    );
}
