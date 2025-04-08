import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from "../../context/LanguageContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Slider1 from './Slider1';

export default function Slider() {
    const { switchLanguage, locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");
    const [showSlider1, setShowSlider1] = useState(false);

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    // If showSlider2 is true, show only Slider2 component
    if (showSlider1) {
        return <Slider1 />;
    }
    return (
        <div>
            <section className="sliderSection relative">
                {/* Desktop Image */}
                <img
                    src="assets/images/slider2.png"
                    className="w-full xl:h-screen h-auto  hidden md:block"
                    alt="Slider Image Desktop"
                />
                {/* Mobile Image */}

                <div className="mt-3 absolute xl:top-24 lg:top-3/4 md:top-[6rem] top-[11.5rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[#313131] w-[100%] md:w-auto px-4 md:px-0">
                    <h1 className='font-bold text-md md:text-2xl lg:text-3xl xl:text-4xl'>Value trend</h1>
                    <p className='font-light text-[11px] md:text-[14px] lg:text-[16px] xl:text-[17px] my-3'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    </p>


                    <img
                        src="assets/images/slider2mobile.png"
                        className="w-full h-full md:h-screen block md:hidden"
                        alt="Slider Image Mobile"
                    />
                </div>
            </section>

            {/* <div className='relative'>
                <div className="mt-2 absolute left-1/2 transform -translate-x-1/2 xl:bottom-[90px] md:-bottom-30 -bottom-[418px] flex justify-center gap-4">
                    <div className="flex space-x-2">
                        <span className="md:w-3 md:h-3 h-2 w-2 border-1 border-gray-200 rounded-full bg-gray-300 inline-block"></span>
                        <span className="md:w-3 md:h-3 h-2 w-2 border-1 border-gray-200 rounded-full bg-yellow-400 inline-block"></span>
                        <span className="md:w-3 md:h-3 h-2 w-2 border-1 border-gray-200 rounded-full bg-gray-300  inline-block"></span>
                        <span className="md:w-3 md:h-3 h-2 w-2 border-1 border-gray-200 rounded-full bg-gray-300  inline-block"></span>
                    </div>
                </div>

                <div className="flex absolute xl:left-[72%] md:left-[69.5%] left-[82.5%]  transform -translate-x-2/3 md:-bottom-32 -bottom-[490px] xl:bottom-[58px] justify-end space-x-2 mt-10 md:mt-0 ml-4">
                    <button className="w-8 h-8 bg-[#5274F6] text-white rounded-full flex items-center justify-center"
                        onClick={() => setShowSlider1(true)}
                    >
                        <FaChevronLeft size={16} />
                    </button>
                    <button className="w-8 h-8 bg-[#FFBA1B] text-white rounded-full flex items-center justify-center">
                        <FaChevronRight size={16} />
                    </button>
                </div>
            </div> */}
        </div>
    )
}
