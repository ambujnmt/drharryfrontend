import { useContext, useEffect, useState, useRef } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Link } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { IoLanguage } from "react-icons/io5";
import { verifyResendOtpApi } from "../../utils/fetchApi"; // Your API call
import { useRegisteredUser } from "../../context/RegisteredUserContext"; // Use this if the email is in RegisteredUserContext

export default function ResendOtp() {
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const otpLinkRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const { registeredUserEmail } = useRegisteredUser();


  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    if (!enteredOtp) {
      alert("Please enter OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyResendOtpApi(registeredUserEmail, enteredOtp); 

      setIsLoading(false);

      if (response.status) {
        setSuccessMessage(response.message);
        setErrorMessage("");


        setTimeout(() => {
          otpLinkRef.current?.click(); 
        }, 2000);
      } else {
        setSuccessMessage("");
        setErrorMessage(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#5274F6]">
      <div className="absolute top-2 right-2">
        <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
          <Dropdown>
            <DropdownTrigger>
              <button className="text-blue-600 border-2 border-[#5274F6] bg-white">
                <IoLanguage />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Select Language">
              <DropdownItem key="en" onClick={() => switchLanguage("en")}>English</DropdownItem>
              <DropdownItem key="ita" onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="lg:mt-4 md:mt-6 mt-10 xl:-mt-32 flex justify-center md:flex-row rounded-lg w-full overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <p className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center text-white my-20">
            {translateText("enter_otp")}
          </p>

          {/* <p className="text-white font-lg text-center mt-2">
            Registered Email: {registeredUserEmail }
          </p> */}

          {errorMessage && <p className="text-white font-lg text-center mt-2">{errorMessage}</p>}
          {successMessage && <p className="text-white font-lg text-center mt-2">{successMessage}</p>}
          
          <Input
            classNames={{ input: "text-black text-center" }}
            placeholder="OTP"
            type="number"
            variant="none"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            className="font-bold text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center bg-white rounded-[600px] border-1 border-white"
          />

          <button
            onClick={handleOtpVerify}
            className="font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] bg-[#FFBA1B] py-2"
          >
            {translateText("verify")}
          </button>

          {/* Hidden navigation link */}
          <Link ref={otpLinkRef} href="/newPassword" className="hidden" />
        </div>
      </div>
    </div>
  );
}
