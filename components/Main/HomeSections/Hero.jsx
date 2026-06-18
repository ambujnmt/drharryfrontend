import { Link } from '@heroui/react';
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { getHeroBanner } from '../../../utils/fetchApi';

export default function Hero() {
const [banner, setBanner] = useState(null);

const fetchBanner = async () => {
  try {
    const res = await getHeroBanner();

    if (res.status) {
      setBanner(res.banner);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchBanner();
}, []);

    return (
      <section className="relative">
      {/* Banner Image */}
      <div className="container-fluid p-0">
        <div className="w-full p-0">
          <img
            src={banner?.image}
            alt="image"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto px-4">
        <div className="flex">
          <div className="lg:w-7/12 md:w-7/12 absolute top-[80px]">
            <div>
            <h1 className="font-[var(--head-font)] text-[63.01px] leading-[102%] text-[var(--secondary-color)]">
  {banner?.title?.split("|").map((part, index) => (
    <span
      key={index}
      className={index === 1 ? "block text-[#c8a96a]" : "block"}
    >
      {part.trim()}
    </span>
  ))}
</h1>



              <h6 className="max-w-[450px] text-[20px] font-normal leading-[138%] text-[var(--secondary-color)] mt-4">
                 {banner?.subtitle}
              </h6>

              <div className="mt-[50px] flex flex-wrap gap-4">
                <Link
                  href={banner?.button1_link || "#"}
                  className="bg-[#c8a96a] px-8 py-[15px] rounded-[30px] text-[18px] font-medium text-[#262626] inline-flex items-center gap-2"
                >
                    {banner?.button1_text}
                  <FaArrowRight />
                </Link>

                <Link
                  href={banner?.button2_link || "#"}
                  className="border border-[#c8a96a] text-[#c8a96a] px-8 py-[15px] rounded-[30px] text-[18px] font-medium"
                >
                  {banner?.button2_text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}
