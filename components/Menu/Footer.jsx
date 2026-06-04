import React, { useContext, useEffect, useState } from "react";
import { Link } from "@heroui/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
 
export default function Footer() {
 
 
 
  return (
 
    <section>
      <div className="container-fluid mx-auto py-20 bg-[#163554]">
        <div className="flex justify-center">
          <div className="w-full lg:w-8/12 md:w-8/12">
            <div className="text-center">
              <h3 className="text-[50px] text-[#fff]  mb-6">
                Ready to Transform Your Practice?
              </h3>
 
              <p className="text-lg text-[#fff] mb-8 max-w-3xl mx-auto">
                Join the elite community of dentists who are mastering aesthetic
                dentistry and building thriving practices. Your journey to
                excellence starts here.
              </p>
 
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/apply-now"
                  className="inline-block bg-[var(--primary-color)] text-white text-[16px] font-normal leading-[100%] px-5 py-[13px] rounded-[10px] mr-[15px] transition-all duration-500 ease-in-out hover:bg-[var(--secondary-color)]"
                >
                  Apply Now
                </Link>
  <Link
                  href="/apply-now"
                  className="inline-block border text-white text-[16px] font-normal leading-[100%] px-5 py-[13px] rounded-[10px] mr-[15px] transition-all duration-500 ease-in-out hover:bg-[var(--secondary-color)]"
                >
                  Read More Reviews
                </Link>
           
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <section className="bg-[var(--secondary-color)] pt-[60px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 */}
          <div>
            <img
              src="/assets/Images/footer-logo.png"
              alt="image"
              className="w-auto h-auto mb-5"
            />
 
            <p className="text-[#e1e1e1] text-[18px] font-extralight leading-[138%]">
              Elevating the art and science of aesthetic dentistry through
              world-class education and mentorship.
            </p>
 
            <div className="mt-[10px]">
              <ul className="flex items-center">
                <li>
                  <Link
                    href="#"
                    className="w-[45px] h-[45px] mr-[10px] rounded-full bg-white/10 flex items-center justify-center text-white text-[18px]"
                  >
                    <FaFacebookF />
                  </Link>
                </li>
 
                <li>
                  <Link
                    href="#"
                    className="w-[45px] h-[45px] mr-[10px] rounded-full bg-white/10 flex items-center justify-center text-white text-[18px]"
                  >
                    <FaInstagram />
                  </Link>
                </li>
 
                <li>
                  <Link
                    href="#"
                    className="w-[45px] h-[45px] rounded-full bg-white/10 flex items-center justify-center text-white text-[18px]"
                  >
                    <FaYoutube />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
 
          {/* Programs */}
          <div>
            <h4 className="text-[25px] font-normal text-white leading-[138%] mb-[30px] ">
              Programs
            </h4>
 
            <ul className="space-y-3">
              <li className="list-none  font-extralight text-[18px] leading-[138%]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Smile Design Mastery</Link>
              </li>
 
              <li className="list-none  font-extralight text-[18px] leading-[138%]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Veneers & Crown Prep</Link>
              </li>
 
              <li className="list-none  font-extralight text-[18px] leading-[138%]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Digital Dentistry</Link>
              </li>
 
              <li className="list-none  font-extralight text-[18px] leading-[138%]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Full Arch Restoration</Link>
              </li>
 
              <li className="list-none  font-extralight text-[18px] leading-[138%]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Live Patient Training</Link>
              </li>
            </ul>
          </div>
 
          {/* Resources */}
          <div>
            <h4 className="text-[25px] font-normal text-white leading-[138%] mb-[30px] ">
              Resources
            </h4>
 
            <ul className="space-y-3">
              <li className=" font-extralight text-[18px]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">About AAI</Link>
              </li>
 
              <li className=" font-extralight text-[18px]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Our Faculty</Link>
              </li>
 
              <li className=" font-extralight text-[18px]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Membership Plans</Link>
              </li>
 
              <li className=" font-extralight text-[18px]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Case Studies</Link>
              </li>
 
              <li className=" font-extralight text-[18px]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Student Portal</Link>
              </li>
            </ul>
          </div>
 
          {/* Contact */}
          <div>
            <h4 className="text-[25px] font-normal text-white leading-[138%] mb-[30px]">
              Contact Us
            </h4>
 
            <ul className="space-y-4">
              <li className="">
                <Link className="text-[#e1e1e1] font-normal hover:text-[var(--primary-color)] text-[22px]  leading-[138%]" href="#" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  123 Excellence Boulevard Los Angeles, CA 90001
                </Link>
              </li>
 
              <li className="font-[var(--head-font)] text-[25px]  leading-[138%]">
                <Link className="text-[#e1e1e1] font-normal hover:text-[var(--primary-color)] text-[22px]  leading-[138%]" href="#" style={{ fontFamily: '"Cormorant Garamond", serif' }}>(888) 555-1234</Link>
              </li>
 
              <li className="font-[var(--head-font)] text-[25px]  leading-[138%]">
                <Link className="text-[#e1e1e1] font-normal hover:text-[var(--primary-color)] text-[22px]  leading-[138%]" href="#" style={{ fontFamily: '"Cormorant Garamond", serif' }}>info@aai-institute.com</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
 
      {/* Copyright */}
      <div className="mt-[120px] border-t border-[#8b8b8b]/40 py-[15px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#e1e1e1] font-extralight text-[18px] mb-0">
              2026 Alliance Institute. All right reserved
            </p>
 
            <ul className="flex flex-wrap items-center">
              <li className="mr-[18px]  font-extralight text-[18px]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Privacy Policy</Link>
              </li>
 
              <li className="mr-[18px]  font-extralight text-[18px]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Terms of Services</Link>
              </li>
 
              <li className=" font-extralight text-[18px]">
                <Link className="text-[#e1e1e1] hover:text-[var(--primary-color)]" href="#">Accredition</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
}
 
 