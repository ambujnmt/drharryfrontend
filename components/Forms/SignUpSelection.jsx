import { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { Link } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";


export default function SignupSelection() {

  const { switchLanguage, locale, translateText } = useContext(LanguageContext);

  const [clientLocale, setClientLocale] = useState("");

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);



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
      <div className="lg:mt-4 md:mt-6 mt-10 xl:mt-0 flex justify-center md:flex-row  rounded-lg  w-full  overflow-hidden">

        <div className="w-full md:w-1/2  flex flex-col justify-center">
          <h2 className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl mb-8 text-center text-white">{translateText("welcome")}</h2>
          <img src="https://nmtdevserver.com/welli/logo.png" className="w-[35%] mb-10 items-center mx-auto" alt="" />
          <p className="font-normal text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px] my-4 text-center text-white">{translateText("your health at your fingertips!")}</p>
          <p className="font-normal uppercase text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px] my-3 text-center text-white">{translateText("register_with")}</p>
          <div className="font-bold text-[10px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-1 text-center rounded-[600px] bg-[#FFBA1B] py-1"><Link href="/emailSignUp" className="text-white uppercase">{translateText("email")}</Link></div>
          <div className="font-bold text-[12px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-1 text-center text-white rounded-[600px] bg-[rgb(0,79,229)] py-2 uppercase">{translateText("facebook")}</div>
          <div className="font-bold text-[12px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-1 text-center text-white rounded-[600px] bg-[rgb(0,79,229)] py-2 uppercase"><Link href="/loginGoogle" className="text-white uppercase">{translateText("googleLogin")}</Link></div>
          <div className="font-bold text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-1 uppercase  text-center text-white ">{translateText("or")}</div>
          <div className="font-bold text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-1 text-center text-white rounded-[600px] bg-[#FFBA1B] py-1"><Link href="/login" className="text-white uppercase">{translateText("login")}</Link></div>
        </div>
      </div>
    </div>
  );
}
