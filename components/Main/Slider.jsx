import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from "../../context/LanguageContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Slider1 from './Slider1';
import Slider2 from './Slider2';
import Slider3 from './Slider3';
import Slider4 from './Slider4';

export default function Slider() {
  const { locale } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [<Slider1 />, <Slider2 />, <Slider3 />, <Slider4 />];

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="sliderSection relative min-h-screen flex flex-col justify-between">
      {slides[currentSlide]}

      {/* Dots */}
      <div className="w-full flex justify-center mt-4 absolute bottom-8 md:bottom-10 lg:-bottom-[28]  xl:bottom-16 md:left-1/2 md:transform md:-translate-x-1/2 space-x-2 z-20">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`md:w-3 md:h-3 h-2 w-2 rounded-full border border-gray-200 inline-block cursor-pointer ${currentSlide === index ? "bg-yellow-400" : "bg-gray-300"}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Arrows */}
      <div className="w-full flex  mt-4 space-x-2 z-20 absolute bottom-2 md:bottom-10 lg:-bottom-[28] xl:bottom-10 xl:right-[20%] right-[5%] md:right-[14%] justify-end">
        <button
          onClick={goToPrev}
          className="w-8 h-8 bg-[#5274F6] text-white rounded-full flex items-center justify-center"
        >
          <FaChevronLeft size={16} />
        </button>

        <button
          onClick={goToNext}
          className="w-8 h-8 bg-[#FFBA1B] text-white rounded-full flex items-center justify-center"
        >
          <FaChevronRight size={16} />
        </button>
      </div>
    </section>

  );
}
