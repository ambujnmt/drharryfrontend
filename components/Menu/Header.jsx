import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaCog } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "@heroui/link";
import { FaBell } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";
import { LanguageContext } from "../../context/LanguageContext"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";


export default function Header({ menuOpen, toggleMenu }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    const { switchLanguage, locale, translateText } = useContext(LanguageContext);

    const [clientLocale, setClientLocale] = useState("");

    useEffect(() => {
        setClientLocale(locale.toUpperCase()); 
    }, [locale]); 

    const notifications = [
        { id: 1, heading: "New Message", description: "New message from John", isNew: true },
        { id: 2, heading: "Report Approved", description: "Your report has been approved", isNew: true },
        { id: 3, heading: "Meeting Scheduled", description: "Meeting scheduled for Monday", isNew: false },
        { id: 4, heading: "New Comment", description: "New comment on your post", isNew: false },
    ];

    const newNotificationCount = notifications.filter(n => n.isNew).length;


    return (
        <div className="bg-[#3a81e6] text-white flex justify-between sticky top-0 z-50 items-center p-3 ">
            <button onClick={toggleMenu} className="text-white text-xl p-2">
                {menuOpen ? <FaBars /> : <RxCross2 />}
            </button>

            <div className="flex items-center justify-end relative">
                <HiUserCircle className="text-2xl cursor-pointer mr-3" />

                <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
                    {/* Notification Bell */}
                    <div className="relative" onClick={() => setNotificationOpen(!notificationOpen)}>
                        <IoMdNotifications />
                        {newNotificationCount > 0 && (
                            <span className="absolute -top-2 -right-1 animate-pulse bg-red-500 text-white text-xs px-1 rounded-full">
                                {newNotificationCount}
                            </span>
                        )}

                        {/* Notification Dropdown */}
                        {notificationOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-md border border-gray-200">
                                <div className="p-2 font-semibold text-[20px] border-b">{translateText("notifications")}</div>
                                <div className="h-auto overflow-hidden">
                                    {notifications.slice(0, 4).map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start p-3 text-sm ${notification.isNew ? "bg-gray-100" : ""} hover:bg-gray-200 cursor-pointer`}
                                        >
                                            <FaBell className="text-blue-500 text-lg mr-3 mt-1" />
                                            <div>
                                                <div className="font-medium text-black text-base">{notification.heading}</div>
                                                <div className="text-gray-600 text-xs">{notification.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <Link href="#" className="text-center p-2 border-t cursor-pointer rounded-b-md flex justify-center bg-[#3a81e6] text-white font-semibold">
                                        {translateText("view_more")}
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Settings Icon */}
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="text-xl my-1 cursor-pointer"
                    >
                        <FaCog />
                    </button>

                    {/* Settings Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute top-8 right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
                            <ul className="text-sm">
                                <li className="p-2 hover:bg-gray-200 hover:rounded-t-md cursor-pointer">{translateText("profile")}</li>
                                <li className="p-2 hover:bg-gray-200 cursor-pointer">{translateText("settings")}</li>
                                <li className="p-2 hover:bg-gray-200 hover:rounded-b-md cursor-pointer">{translateText("logout")}</li>
                            </ul>
                        </div>
                    )}

                    {/* Language Switcher */}
                    <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="text-white">Language</Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new" className=" px-2 py-1" onClick={() => switchLanguage("en")}>English</DropdownItem>
                                <DropdownItem key="copy" className=" px-2 py-1" onClick={() => switchLanguage("fr")}>French</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
