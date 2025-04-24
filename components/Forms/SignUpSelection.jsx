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
    <div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://nmtdevserver.com/welli/blurflower.png')" }}
    >
      {/* Language Selector */}
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

      {/* Blue Box Content Area */}
      <div className="bg-[#5274F6] w-full md:max-w-xl lg:max-w-3xl  md:mx-10 lg:mx-20  p-6 md:p-12 flex items-center justify-center h-[100vh]">
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl mb-8 text-center text-white">
            {translateText("welcome")}
          </h2>
          <img src="https://nmtdevserver.com/welli/logo.png" className="w-[35%] mb-10 mx-auto" alt="Logo" />
          <p className="font-normal text-xs md:text-sm lg:text-base xl:text-lg my-4 text-center text-white">
            {translateText("your health at your fingertips!")}
          </p>
          <p className="font-normal uppercase text-xs md:text-sm lg:text-base xl:text-lg my-3 text-center text-white">
            {translateText("register_with")}
          </p>
          <div className="font-bold text-xs md:text-sm lg:text-base xl:text-base my-1 text-center rounded-full bg-[#FFBA1B] py-1">
            <Link href="/emailSignUp" className="text-white uppercase">{translateText("email")}</Link>
          </div>
          <div className="font-bold text-sm md:text-sm lg:text-base xl:text-base my-1 text-center text-white rounded-full bg-[rgb(0,79,229)] py-2 uppercase">
            {translateText("facebook")}
          </div>
          <div className="font-bold text-sm md:text-sm lg:text-base xl:text-base my-1 text-center text-white rounded-full bg-[rgb(0,79,229)] py-2 uppercase">
            <Link href="/loginGoogle" className="text-white uppercase">{translateText("googleLogin")}</Link>
          </div>
          <div className="font-bold text-xs md:text-sm lg:text-base xl:text-base my-1 uppercase text-center text-white">
            {translateText("or")}
          </div>
          <div className="font-bold text-xs md:text-sm lg:text-base xl:text-base my-1 text-center text-white rounded-full bg-[#FFBA1B] py-1">
            <Link href="/login" className="text-white uppercase">{translateText("login")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

