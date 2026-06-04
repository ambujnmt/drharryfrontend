import { Link } from "@heroui/react";
import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
 
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <header className="sticky top-0 z-[9999] w-full bg-white shadow-sm">
      <div className="">
        <div className="container mx-auto">
          <div className="flex items-center justify-between pt-1">
 
            {/* Logo */}
            <div className="flex items-center min-w-[185px]">
              <Link href="/">
                <img
                  src="/assets/Images/harry-logo.png"
                  alt="Logo"
                  className="h-auto max-w-[185px]"
                />
              </Link>
            </div>
 
            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center">
              <nav>
                <ul className="flex items-center">
                  <li className="mx-[15px]">
                    <Link
                      href="#"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]"
                    >
                      About
                    </Link>
                  </li>
 
                  <li className="mx-[15px] relative group">
                    <Link
                      href="#"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]"
                    >
                      Courses
                      <FaChevronDown className="text-xs" />
                    </Link>
                  </li>
 
                  <li className="mx-[15px]">
                    <Link
                      href="#"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Faculty
                    </Link>
                  </li>
 
                  <li className="mx-[15px]">
                    <Link
                      href="#"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Programs
                    </Link>
                  </li>
 
                  <li className="mx-[15px]">
                    <Link
                      href="#"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Membership
                    </Link>
                  </li>
 
                  <li className="mx-[15px]">
                    <Link
                      href="#"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Events
                    </Link>
                  </li>
 
                  <li className="mx-[15px]">
                    <Link
                      href="#"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Contact
                    </Link>
                  </li>
 
                  <li className="ml-5">
                    <Link
                      href="#"
                      className="inline-block text-[18px] font-normal transition-all duration-500 ease-in-out hover:bg-[var(--secondary-color)] rounded-full bg-[var(--primary-color)] px-7 py-2 text-white"
                    >
                      Apply Now
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
 
            {/* Mobile Toggle */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-[50px] w-[50px] items-center justify-center rounded bg-white shadow-md"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>
 
      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Courses</Link></li>
              <li><Link href="#">Faculty</Link></li>
              <li><Link href="#">Programs</Link></li>
              <li><Link href="#">Membership</Link></li>
              <li><Link href="#">Events</Link></li>
              <li><Link href="#">Contact</Link></li>
 
              <li>
                <Link
                  href="#"
                  className="inline-block text-[15px] rounded-full bg-[#c8a96a] px-6 py-3 text-white font-semibold"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
 