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
      return;
    }

    // Proceed to verification page
    hiddenLinkRef.current?.click();
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
          <div className="flex justify-center items-center xl:gap-4 gap-2 mb-6">
            <h2 className="font-normal uppercase text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-center text-white">{translateText("register")}</h2>
            <span className="rounded-[25px] bg-[#FFBA1B] py-1 xl:w-28  w-16 font-normal text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px] uppercase text-center text-white">{translateText("login")}</span>
          </div>
          <p className="font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl text-center text-white my-10 xl:my-20">{translateText("enter_email")}</p>
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
          <Link ref={hiddenLinkRef} href="#" className="hidden" />
        </div>
      </div>
    </div>
  );
}
