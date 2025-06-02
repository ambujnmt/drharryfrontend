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
  const [loading, setloading] = useState(false);

  const { registeredUserEmail } = useRegisteredUser();


  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

const handleOtpVerify = async (e) => {
  e.preventDefault();

  setErrorMessage("");
  setSuccessMessage("");

  if (!enteredOtp.trim()) {
    setErrorMessage("Please enter the OTP sent to your email");
    return;
  }

  setloading(true);

  try {
    const response = await verifyResendOtpApi(registeredUserEmail, enteredOtp);

    setloading(false);

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
    setloading(false);
    setSuccessMessage("");
    setErrorMessage(error.message);
  }
};


  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://nmtdevserver.com/welli/blurflower.png')" }}
    >      <div className="absolute top-2 right-2">
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

      <div className="bg-[#5274F6] w-full md:max-w-xl lg:max-w-3xl  md:mx-10 lg:mx-20  p-6 md:p-12 flex items-center justify-center h-[100vh]">
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
            disabled={loading}
            onClick={handleOtpVerify}
            className="font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] py-2 w-full flex items-center justify-center bg-[#FFBA1B]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              translateText("verify")
            )}
          </button>

          {/* Hidden navigation link */}
          <Link ref={otpLinkRef} href="/newPassword" className="hidden" />
        </div>
      </div>
    </div>
  );
}
