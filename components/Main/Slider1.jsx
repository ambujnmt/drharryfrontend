import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from "../../context/LanguageContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import Slider2 from './Slider2';
import { IoLanguage } from "react-icons/io5";


export default function Slider() {
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const [showSlider2, setShowSlider2] = useState(false);

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  if (showSlider2) {
    return <Slider2 />;
  }

  return (
    <section className="sliderSection relative">
       <div className="absolute top-2 right-2">
            <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
              <Dropdown>
                <DropdownTrigger>
                  <button variant="bordered" color="primary" className="text-blue-600 border-2 border-[#5274F6] bg-white">
                    <IoLanguage/>
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="en" onClick={() => switchLanguage("en")}>English</DropdownItem>
                  <DropdownItem key="ita" onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
      {/* Desktop Image */}
      <img
        src="https://nmtdevserver.com/welli/slider1.png"
        className="w-full xl:h-screen h-auto hidden md:block"
        alt="Slider Image Desktop"
      />

      {/* Mobile Image */}
      <img
        src="https://nmtdevserver.com/welli/slider1mobile.png"
        className="w-full h-full md:h-screen block md:hidden"
        alt="Slider Image Mobile"
      />

      <div className="mt-3 absolute xl:top-2/3 lg:top-3/4 top-[22rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[#313131] w-[100%] md:w-auto px-4 md:px-0">
        <h1 className='font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl'>
          {translateText("all your analyses always with you")}
        </h1>
        <p className='font-light text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px] my-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        </p>

      </div>
    </section>
  );
}
