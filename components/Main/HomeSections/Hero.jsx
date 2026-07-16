import { Link } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { getHeroBanner } from "../../../utils/fetchApi";

export default function Hero() {
const [banner, setBanner] = useState(null);
const [loading, setLoading] = useState(true);
const fetchBanner = async () => {
  try {
    setLoading(true);

    const res = await getHeroBanner();

    if (res.status) {
      setBanner(res.banner);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <section
      className="
        relative
        overflow-hidden
        h-[calc(100vh-63px)]
        md:h-[calc(100vh-85px)]
        lg:h-[calc(100vh-95px)]
      "
    >
      {/* Background Image */}
      {/* Background */}
{loading ? (
  <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse" />
) : (
  <img
    src={banner?.image}
    alt="Banner"
    className="absolute inset-0 w-full h-full object-cover"
  />
)}

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-5 lg:px-4">
          <div className="w-full lg:w-7/12">

         {loading ? (
  <div className="animate-pulse">

    {/* Heading */}
    <div className="h-12 md:h-16 w-3/4 bg-gray-300 rounded mb-4"></div>
    <div className="h-12 md:h-16 w-2/3 bg-gray-300 rounded mb-8"></div>

    {/* Subtitle */}
    <div className="space-y-3">
      <div className="h-5 bg-gray-300 rounded w-full"></div>
      <div className="h-5 bg-gray-300 rounded w-11/12"></div>
      <div className="h-5 bg-gray-300 rounded w-8/12"></div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 mt-10">
      <div className="h-12 w-44 bg-gray-300 rounded-full"></div>
      <div className="h-12 w-40 bg-gray-300 rounded-full"></div>
    </div>

  </div>
) : (
  <>
    <h1
      className="
        font-[var(--head-font)]
        text-[34px]
        sm:text-[42px]
        md:text-[50px]
        lg:text-[63px]
        leading-[105%]
        text-[var(--secondary-color)]
      "
    >
      {banner?.title?.split("|").map((part, index) => (
        <span
          key={index}
          className={index === 1 ? "block text-[#c8a96a]" : "block"}
        >
          {part.trim()}
        </span>
      ))}
    </h1>

    <h6
      className="
        mt-4
        max-w-[620px]
        text-[16px]
        sm:text-[18px]
        md:text-[20px]
        leading-[160%]
        text-[var(--secondary-color)]
      "
    >
      {banner?.subtitle}
    </h6>

    <div className="mt-8 md:mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4">
      <Link
        href={banner?.button1_link || "#"}
        className="
          inline-flex
          justify-center
          items-center
          gap-2
          rounded-full
          bg-[#c8a96a]
          px-6
          lg:px-8
          py-3
          lg:py-4
          text-[16px]
          lg:text-[18px]
          font-medium
          text-[#262626]
          transition-all
          duration-300
          hover:bg-[#b8934e]
        "
      >
        {banner?.button1_text}
        <FaArrowRight />
      </Link>

      <Link
        href={banner?.button2_link || "#"}
        className="
          inline-flex
          justify-center
          items-center
          rounded-full
          border
          border-[#c8a96a]
          px-6
          lg:px-8
          py-3
          lg:py-4
          text-[16px]
          lg:text-[18px]
          font-medium
          text-[#c8a96a]
          transition-all
          duration-300
          hover:bg-[#c8a96a]
          hover:text-white
        "
      >
        {banner?.button2_text}
      </Link>
    </div>
  </>
)}

          </div>
        </div>
      </div>
    </section>
  );
}