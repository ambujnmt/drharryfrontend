import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from "../../context/LanguageContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Slider2 from './Slider2';

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
        src="assets/images/slider4.png"
        className="w-full xl:h-screen h-auto hidden md:block"
        alt="Slider Image Desktop"
      />

      {/* Mobile Image */}
      <img
        src="assets/images/slider4mobile.png"
        className="w-full h-full md:h-screen block md:hidden"
        alt="Slider Image Mobile"
      />

      <div className="mt-3 absolute xl:top-1/2 lg:top-3/4 top-[22.5rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[#313131] w-[100%] md:w-auto px-4 md:px-0">
        <h1 className='font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl'>
        Let's get started
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
