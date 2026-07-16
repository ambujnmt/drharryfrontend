import {
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { FaBars, FaTimes, FaChevronDown, FaUser } from "react-icons/fa";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/router";
import Tmodal from "../Tmodal/Tmodal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useUser();

  const [logoutModal, setLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);


  const handleLogout = () => {
    setLogoutLoading(true);

    setTimeout(() => {
      logout();

      setLogoutLoading(false);
      setLogoutModal(false);

      router.push("/");
    }, 1500);
  };
  return (
    <header className="sticky top-0 z-[9999] w-full bg-white shadow-sm">
      <div className="">
        <div className="container mx-auto">
          <div className="flex items-center justify-between pt-1">

            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <img
                  src="/assets/Images/header-logo.png"
                  alt="Logo"
                  className="
        w-[120px]
        sm:w-[145px]
        md:w-[165px]
        lg:w-[185px]
        h-auto
      "
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center lg:ml-[210px]">
              <nav>
                <ul className="flex items-center">
                  <li className="mx-[15px]">
                    <Link
                      href="/web/about/about"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]"
                    >
                      About
                    </Link>
                  </li>

                  <li className="mx-[15px] relative group">
                    <Link
                      href="/web/courses/courses"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]"
                    >
                      Courses
                    </Link>
                  </li>

                  <li className="mx-[15px]">
                    <Link
                      href="/web/faculty/faculty"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Faculty
                    </Link>
                  </li>

                  <li className="mx-[15px]">
                    <Link
                      href="/web/program/program"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Programs
                    </Link>
                  </li>

                  <li className="mx-[15px]">
                    <Link
                      href="/web/membership/membership"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Membership
                    </Link>
                  </li>

                  {/* <li className="mx-[15px]">
                    <Link
                      href="#"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Events
                    </Link>
                  </li> */}

                  <li className="mx-[15px]">
                    <Link
                     href="/web/cms/contactUs"
                      className="text-[18px] leading-[100%] font-normal hover:text-[var(--primary-color)] text-[#000]">
                      Contact
                    </Link>
                  </li>

                  <li className="ml-5">
                    <Link
                      href="/web/cms/contactUs"
                      className="inline-block text-[18px] font-normal transition-all duration-500 ease-in-out hover:bg-[var(--secondary-color)] rounded-full bg-[var(--primary-color)] px-7 py-2 text-white"
                    >
                      Apply Now
                    </Link>
                  </li>


                </ul>
              </nav>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-2">
              
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded bg-white shadow-md"
                >
                  {isOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    radius="full"
                    className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 min-w-0 bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]"
                  >
                    <FaUser size={16} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="User Actions">
                  {user ? (
                    <>
                      {/* <DropdownItem key="profile" href="/profile">
                        Profile
                      </DropdownItem> */}

                      <DropdownItem
                        key="logout"
                        className="bg-[var(--primary-color)]"
                        onPress={() => setLogoutModal(true)}
                      >
                        Logout
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      <DropdownItem key="login" href="/login">
                        Login
                      </DropdownItem>

                      <DropdownItem key="register" href="/signUp">
                        Register
                      </DropdownItem>
                    </>
                  )}
                </DropdownMenu>
              </Dropdown>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden  bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 pb-6">
            <ul className="space-y-4">
              <li><Link href="/web/about/about" className="text-black">About</Link></li>
              <li><Link href="/web/courses/courses" className="text-black">Courses</Link></li>
              <li><Link href="/web/faculty/faculty" className="text-black">Faculty</Link></li>
              <li><Link href="/web/program/program" className="text-black">Programs</Link></li>
              <li><Link href="/web/membership/membership" className="text-black">Membership</Link></li>
              {/* <li><Link href="#" className="text-black">Events</Link></li> */}
              <li><Link href="#" className="text-black">Contact</Link></li>

              <li>
                <Link
                  href="/web/cms/contactUs"
                  className="inline-block text-[15px] rounded-full bg-[#c8a96a] px-6 py-3 text-white font-semibold"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}


      <Tmodal
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
        title="Logout"
        footer={
          <>
            <Button
              variant="light"
              onPress={() => setLogoutModal(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-[var(--primary-color)]"
              onPress={handleLogout}
              isDisabled={logoutLoading}
            >
              {logoutLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Confirm"
              )}
            </Button>
          </>
        }
      >
        Are you sure you want to logout?
      </Tmodal>
    </header>
  );
}
