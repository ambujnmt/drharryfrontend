import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Link } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { loginUser } from "../../utils/fetchApi"
import { Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
  


export default function ForgetPass() {
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
        <div className="w-full md:w-1/2  flex flex-col justify-center items-center">
    <img src="https://nmtdevserver.com/welli/attention.png" className="w-[25%] h-auto mb-24" alt="" />
          <h2 className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl text-center mb-10 text-white">{translateText("wrong_pass")}</h2>
          
            <div
              type="submit"
              className="font-bold w-full uppercase text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] bg-[#FFBA1B] py-2"
            ><Link className="text-white" href="/passwordChangeVerify">
              {translateText("recover")}
            </Link>
            </div>
            <div

              className="font-bold w-full text-[11px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center  uppercase rounded-[600px] border-1 border-white py-2"
            >
              <Link className="text-white" href="/signupWith">{translateText("try_again")}
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
