// import { useContext, useEffect, useRef, useState } from "react";
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
// import { LanguageContext } from "../../context/LanguageContext";
// import { Link, Input } from "@heroui/react";
// import { IoLanguage } from "react-icons/io5";
// import { useRouter } from "next/router";


// export default function PhoneVerify() {
//     const { switchLanguage, locale, translateText } = useContext(LanguageContext);
//     const [clientLocale, setClientLocale] = useState("");
//     const [enteredOtp, setEnteredOtp] = useState("");
//     const otpLinkRef = useRef(null);

//     useEffect(() => {
//         setClientLocale(locale.toUpperCase());
//     }, [locale]);

//     const router = useRouter();
//     const [message, setMessage] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [apiResult, setApiResult] = useState(null);

//     const handleOtpVerify = async () => {
//         setIsLoading(true);
//         setMessage("");
        
//         if (!enteredOtp || enteredOtp.length < 6) {
//             setMessage("Please enter a valid 6-digit OTP.");
//             setIsLoading(false);
//             return;
//         }
    
//         try {
//             const confirmationResult = window.confirmationResult;
//             const result = await confirmationResult.confirm(enteredOtp);
            
//             // User signed in successfully.
//             const user = result.user;
//             console.log("✅ OTP Verified. User:", user);
//             setMessage("OTP Verified Successfully!");
            
//             // Navigate to login or any other page
//             router.push("/login"); // Or any other route
//         } catch (error) {
//             console.error("❌ OTP verification failed:", error);
//             setMessage("Invalid OTP. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };
    

//     return (
// <div
//       className="relative w-screen h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
//       style={{ backgroundImage: "url('https://nmtdevserver.com/welli/blurflower.png')" }}
//     >            <div className="absolute top-2 right-2">
//                 <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
//                     <Dropdown>
//                         <DropdownTrigger>
//                             <button variant="bordered" color="primary" className="text-blue-600 border-2 border-[#5274F6] bg-white">
//                                 <IoLanguage />
//                             </button>
//                         </DropdownTrigger>
//                         <DropdownMenu aria-label="Static Actions">
//                             <DropdownItem key="en" onClick={() => switchLanguage("en")}>English</DropdownItem>
//                             <DropdownItem key="ita" onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
//                         </DropdownMenu>
//                     </Dropdown>
//                 </div>
//             </div>
//             <div className="bg-[#5274F6] w-full md:max-w-xl lg:max-w-3xl  md:mx-10 lg:mx-20  p-6 md:p-12 flex items-center justify-center h-[100vh]">
//             <div className="w-full md:w-1/2  flex flex-col justify-start">
//                     <div className="flex justify-center items-center xl:gap-4 gap-2 mb-6">
//                         <h2 className="font-normal uppercase text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px]  text-center text-white">{translateText("register")}</h2>
//                         <span className="rounded-[25px] bg-[#FFBA1B] py-1 xl:w-28 lg:w-24  w-16  font-normal uppercase text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px]  text-center text-white">{translateText("login")}</span>
//                     </div>
//                     <p className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center text-white my-20">{translateText("enter_otp")}</p>
//                     {message && (
//                         <p className="text-center text-white text-sm md:text-lg mb-4">{message}</p>
//                     )}
                    

//                     <div>
//                         <Input
//                             classNames={{
//                                 input: "text-black text-center",
//                             }}
//                             placeholder="OTP"
//                             type="number"
//                             variant="none"
//                             value={enteredOtp}
//                             onChange={(e) => setEnteredOtp(e.target.value)}
//                             className="font-bold text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center bg-white text-white rounded-[600px] border-1 border-white "
//                         />
//                     </div>
//                     <button
//                         onClick={handleOtpVerify}
//                         disabled={isLoading}
//                         className={`font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] py-2 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFBA1B]"
//                             }`}
//                     >
//                         {isLoading ? "Verifying..." : translateText("verify")}
//                     </button>

//                     <Link ref={otpLinkRef} href="/login" className="hidden" />
//                 </div>
//             </div>
//         </div>
//     );
// }


import React from 'react'

export default function PhoneVerify() {
  return (
    <div>PhoneVerify</div>
  )
}
