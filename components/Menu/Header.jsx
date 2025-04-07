import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaCog, FaBell } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { LanguageContext } from "../../context/LanguageContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Link } from "@heroui/link";

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
    <div className="bg-[#3a81e6] text-white flex justify-between lg:justify-end items-center p-3 sticky top-0 z-50">
      <button onClick={toggleMenu} className="text-white text-xl p-2 lg:hidden block ">
        {menuOpen ? <RxCross2 /> : <FaBars />}
      </button>

      <div className="flex  items-center space-x-4 text-2xl relative">
        <HiUserCircle className="cursor-pointer" />

        <div className="relative" onClick={() => setNotificationOpen(!notificationOpen)}>
          <IoMdNotifications />
          {newNotificationCount > 0 && (
            <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse">
              {newNotificationCount}
            </span>
          )}

          {notificationOpen && (
            <div className="absolute -right-32 top-8 mt-2 w-64 bg-white text-black shadow-lg rounded-md border">
              <div className="p-2 font-semibold border-b">{translateText("notifications")}</div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3 text-sm ${n.isNew ? "bg-gray-100" : ""} hover:bg-gray-200`}>
                    <div className="font-medium text-base">{n.heading}</div>
                    <div className="text-gray-600 text-xs">{n.description}</div>
                  </div>
                ))}
              </div>
              <Link href="#" className="text-center block p-2 bg-[#3a81e6] text-white font-semibold rounded-b-md">
                {translateText("view_more")}
              </Link>
            </div>
          )}
        </div>

        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaCog />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-40 bg-white text-black shadow-lg rounded-md z-50">
            <ul className="text-sm">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">{translateText("profile")}</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">{translateText("settings")}</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">{translateText("logout")}</li>
            </ul>
          </div>
        )}

        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="text-white text-sm">Language</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={() => switchLanguage("en")}>English</DropdownItem>
            <DropdownItem onClick={() => switchLanguage("fr")}>French</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
