import { Link } from '@heroui/react';
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {


    return (
      <section className="relative">
      {/* Banner Image */}
      <div className="container-fluid p-0">
        <div className="w-full p-0">
          <img
            src="/assets/Images/hero-banner.png"
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
                Redefining Excellence in
                <span className="block text-[#c8a96a]">
                  Aesthetic & Implant
                </span>
                Education
              </h1>

              <h6 className="max-w-[450px] text-[20px] font-normal leading-[138%] text-[var(--secondary-color)] mt-4">
                Premium training in smile design, veneers, digital dentistry,
                crown preparations, and full-arch rehabilitation
              </h6>

              <div className="mt-[50px] flex flex-wrap gap-4">
                <Link
                  href="#"
                  className="bg-[#c8a96a] px-8 py-[15px] rounded-[30px] text-[18px] font-medium text-[#262626] inline-flex items-center gap-2"
                >
                  Explore Courses
                  <FaArrowRight />
                </Link>

                <Link
                  href="#"
                  className="border border-[#c8a96a] text-[#c8a96a] px-8 py-[15px] rounded-[30px] text-[18px] font-medium"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}
