import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { Link, Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import { resendOtpApi } from "../../utils/fetchApi";
import { useRegisteredUser } from "../../context/RegisteredUserContext"; // Import the context

export default function Otp() {
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  const { setRegisteredUser } = useRegisteredUser(); // Access the setRegisteredUser function
  const [clientLocale, setClientLocale] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");  
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setloading] = useState(false); 
  const [isError, setIsError] = useState(false); 
  const hiddenLinkRef = useRef(null);

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!enteredEmail) {
      alert("Please enter your email.");
      return;
    }

    setloading(true);

    try {
      const response = await resendOtpApi(enteredEmail);

      setloading(false);

      if (response.status) {
        const successMsg = locale === 'ita' ? response.message_italian : response.message;
        setSuccessMessage(successMsg);
        setIsError(false);
        setErrorMessage("");

        // Set the registered user email in the context
        setRegisteredUser(enteredEmail);  // Update context with entered email

        setTimeout(() => {
          hiddenLinkRef.current?.click();
        }, 1000);
      } else {
        setSuccessMessage("");
        setIsError(true);
        const errorMsg = locale === 'ita' ? response.message_italian : response.message;
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      setloading(false);
      setSuccessMessage("");
      setIsError(true);
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
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <p className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center text-white my-10 xl:my-20">{translateText("recover_password")}</p>
          {successMessage && !isError && (
            <p className="text-center my-4 text-white">{successMessage}</p>
          )}

          {isError && errorMessage && (
            <p className="text-center my-4 text-white">{errorMessage}</p>
          )}
          <div>
            <Input
              classNames={{ input: "text-black text-center", }}
              placeholder={translateText("enter_email")}
              variant="none"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              className="font-bold text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center bg-white text-white rounded-[600px] border-1 border-white"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] py-2 w-full flex items-center justify-center bg-[#FFBA1B]"
          >
               {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
            translateText("after_you")
          )}
          </button>

          {/* Hidden Link - triggers only if email is entered */}
          <Link ref={hiddenLinkRef} href="/resendOtp" className="hidden" />
        </div>
      </div>
    </div>
  );
}
