import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from "../../context/LanguageContext";
import Slider2 from './Slider2';
import { Link } from "@heroui/react";



export default function Slider() {
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const [showSlider2, setShowSlider2] = useState(false);

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  // If showSlider2 is true, show only Slider2 component
  if (showSlider2) {
    return <Slider2 />;
  }

  // Otherwise, show the main slider content
  return (

    <section className="sliderSection relative">
  

      {/* Desktop Image */}
      <img
        src="https://nmtdevserver.com/welli/slider4.png"
        className="w-full h-screen hidden md:block opacity-[0.2]"
        alt="Slider Image Desktop"
      />

      {/* Mobile Image */}
      <img
        src="https://nmtdevserver.com/welli/slider4mobile.png"
        className="w-full h-full md:h-screen block md:hidden opacity-[0.2]"
        alt="Slider Image Mobile"
      />

      <div className="mt-3 absolute xl:top-1/2 lg:top-3/4 top-[15rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[#313131] w-[100%] md:w-auto px-4 md:px-0">
        <h1 className='font-bold text-md md:text-xl lg:text-2xl xl:text-3xl'>
          {translateText("let's get started")}
        </h1>
        <p className='font-light text-[11px] md:text-[12px] lg:text-[14px] xl:text-[15px] my-4 max-w-[80%] md:max-w-max mx-auto'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        </p>
        <div className='flex justify-center gap-3'>
        <div className="font-bold text-[10px] md:text-[14px] lg:text-[16px] xl:text-[16px] xl:px-10 lg:px-4 px-2 my-1 text-center rounded-[600px] bg-[#FFBA1B] py-1"><Link href="/signupWith" className="text-white uppercase">{translateText("register")}</Link></div>
        <div className="font-bold text-[10px] md:text-[14px] lg:text-[16px] xl:text-[16px] xl:px-10 lg:px-4 px-3 my-1 text-center text-white rounded-[600px] bg-[rgb(0,79,229)] py-1 uppercase"><Link href="/login" className="text-white uppercase">{translateText("login")}</Link></div>
        </div>
      </div>
    </section>
  );
}
