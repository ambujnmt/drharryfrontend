import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { Link, Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";


export default function Otp() {
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);

  const [clientLocale, setClientLocale] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const hiddenLinkRef = useRef(null);

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!enteredEmail) {
      alert("Please enter your email.");
      return;
    }

    // Optional: Store email for later use
    localStorage.setItem("userEmail", enteredEmail);

    // Proceed to verification page
    hiddenLinkRef.current?.click();
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
      <div className="lg:mt-4 md:mt-6 mt-10 xl:-mt-32 flex justify-center md:flex-row rounded-lg w-full overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-start">
        
          <p className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center text-white my-10 xl:my-20">{translateText("recover_password")}</p>
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
            className="font-bold uppercase text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center rounded-[600px] bg-[#FFBA1B] py-2"
          >
            <span className="text-white">{translateText("after_you")}</span>
          </button>

          {/* Hidden Link - triggers only if email is entered */}
          <Link ref={hiddenLinkRef} href="/resendOtp" className="hidden" />
        </div>
      </div>
    </div>
  );
}
