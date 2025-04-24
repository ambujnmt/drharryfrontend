import React, { useContext, useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoLanguage } from "react-icons/io5";
import { LanguageContext } from "../../context/LanguageContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Link } from "@heroui/react";

export default function HomeHeader() {
    const { switchLanguage, locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="homepageheader bg-white  w-full">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                {/* Logo */}

                <img src="https://nmtdevserver.com/welli/logoBlue.png" className="xl:w-[10%] w-[25%] md:w-[15%] lg:w-[10%]" alt="Logo" />


                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6 xl:ml-40">
                    <a href="#home" className="text-[#FFBA1B] hover:text-[#FFBA1B]">{translateText("home")}</a>
                    <a href="#menu" className="text-black hover:text-[#FFBA1B]">{translateText("menu")}</a>
                    <a href="#services" className="text-black hover:text-[#FFBA1B]">{translateText("services")}</a>
                    <a href="#contact" className="text-black hover:text-[#FFBA1B]">{translateText("contacts")}</a>
                </nav>

                {/* Buttons */}
                <div className="hidden lg:flex items-center space-x-4 lg:mr-10">
                    <div className="font-bold text-[10px] md:text-[14px] lg:text-[16px] xl:text-[16px] xl:px-10 lg:px-4 my-1 text-center rounded-[600px] bg-[#FFBA1B] py-1"><Link href="/signupWith" className="text-white uppercase">{translateText("register")}</Link></div>
                    <div className="font-bold text-[12px] md:text-[14px] lg:text-[16px] xl:text-[16px] xl:px-10 lg:px-4  my-1 text-center text-white rounded-[600px] bg-[rgb(0,79,229)] py-1 uppercase"><Link href="/login" className="text-white uppercase">{translateText("login")}</Link></div>
                </div>

                <div className="absolute md:top-5 md:right-12 right-12 top-3 xl:right-3 xl:top-7 lg:top-6 lg:right-3">
                    <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
                        <Dropdown>
                            <DropdownTrigger>
                                <button variant="bordered" color="primary" className="text-[rgb(0,79,229)] border-2 border-[#5274F6] bg-white">
                                    <IoLanguage />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="en" onClick={() => switchLanguage("en")}>English</DropdownItem>
                                <DropdownItem key="ita" onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>

                {/* Mobile Toggle Button */}
                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white px-4 py-4 space-y-4 shadow relative z-10">
                    <a href="#home" className="block text-[#FFBA1B] hover:text-[#FFBA1B]">Home</a>
                    <a href="#menu" className="block text-black hover:text-[#FFBA1B]">Menu</a>
                    <a href="#services" className="block text-black hover:text-[#FFBA1B]">Services</a>
                    <a href="#contact" className="block text-black hover:text-[#FFBA1B]">Contact</a>
                    <div className="font-bold text-[10px] md:text-[14px] lg:text-[16px] xl:text-[16px] xl:px-10 lg:px-4 my-1 text-center rounded-[600px] bg-[#FFBA1B] py-1"><Link href="/signupWith" className="text-white uppercase">{translateText("register")}</Link></div>
                    <div className="font-bold text-[12px] md:text-[14px] lg:text-[16px] xl:text-[16px] xl:px-10 lg:px-4  my-1 text-center text-white rounded-[600px] bg-[rgb(0,79,229)] py-1 uppercase"><Link href="/login" className="text-white uppercase">{translateText("login")}</Link></div>
                </div>
            )}
        </section>
    );
}

