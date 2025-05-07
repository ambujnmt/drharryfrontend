import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaCog, FaBell } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { LanguageContext } from "../../context/LanguageContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure } from "@heroui/react";
import { Link } from "@heroui/link";
import { IoLanguage } from "react-icons/io5";
import Tmodal from "../Tmodal/Tmodal"
import { useUser } from "../../context/UserContext";
import { useAdmin } from "../../context/AdminContext";
import { useRouter } from "next/router";


export default function Header({ menuOpen, toggleMenu }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [clientLocale, setClientLocale] = useState("");
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { admin, logoutAdmin } = useAdmin(); // Access admin data and logout function from AdminContext
  const { user, setUser, setUserEmail } = useUser();

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

  const isAdminLoggedIn = !!admin;

  return (
    <div className="bg-[#3a81e6] text-white flex justify-between lg:justify-end items-center p-3 sticky top-0 z-50">
      <button onClick={toggleMenu} className="text-white text-xl p-2 lg:hidden block ">
        {menuOpen ? <RxCross2 /> : <FaBars />}
      </button>

      <div className="flex  items-center space-x-4 text-2xl relative">
        {admin && (
          <Link
            href="/admin/passChange"
            className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Change Password
          </Link>
        )}


        <HiUserCircle className="cursor-pointer" />

        <div className="relative" onClick={() => setNotificationOpen(!notificationOpen)}>
          <IoMdNotifications />
          {newNotificationCount > 0 && (
            <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse">
              {newNotificationCount}
            </span>
          )}

          {notificationOpen && (
            <div className="absolute -right-20 top-9 mt-2 w-64 bg-white text-black shadow-lg rounded-md border">
              <div className="p-2 font-semibold border-b ">{translateText("notifications")}</div>
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
          <div className="absolute right-0 top-12 w-40 bg-white text-black shadow-lg rounded-md  z-50">
            <ul className="text-sm">
              <li className="p-2 hover:bg-gray-200 hover:rounded-t-md cursor-pointer">{translateText("profile")}</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">{translateText("settings")}</li>
              <li className=" hover:bg-gray-200 hover:rounded-b-md cursor-pointer"><Button className="w-full bg-white flex justify-start hover:bg-gray-200" onPress={onOpen}>{translateText("logout")}</Button></li>
            </ul>
          </div>
        )}




        {/* <Tmodal
          isOpen={isOpen}
          onClose={onClose}
          title="Are you sure you want to logout?"
          footer={
            <>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  setLoading(true); // Start loading
                  // Check if admin is logged in
                  if (admin) {
                    console.log("Admin is logged in. Proceeding to logout.");
                    logoutAdmin();
                    localStorage.removeItem("admin"); // Remove admin from localStorage
                    const adminToken = localStorage.getItem("admin");
                    console.log("Admin Token After Removal: ", adminToken);

                    onClose();
                    setTimeout(() => {
                      router.push("/admin/login");
                    }, 200);
                  }
                  // Check if user is logged in
                  else if (user) {
                    // Clear user data and remove from localStorage
                    setUser(null); // Clears the user state
                    setUserEmail(""); // Clear the user email
                    localStorage.removeItem("user"); // Remove user from localStorage

                    // Log to check if the user token is removed
                    const userToken = localStorage.getItem("user");
                    console.log("User Token After Removal: ", userToken); // Should print null

                    onClose();
                    setTimeout(() => {
                      router.push("/login"); // Redirect to user login
                    }, 200);
                  }
                }}
              >
               {loading ? (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> // Loader
  ) : (
    "Confirm"
  )}
              </Button>
            </>
          }
        /> */}


        <Tmodal
          isOpen={isOpen}
          onClose={onClose}
          title="Are you sure you want to logout?"
          footer={
            <>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  setLoading(true); // Start loading before any actions
                  setLogoutMessage(""); // Clear any old message

                  // Add a timeout to ensure the loading state is visible before processing logout
                  setTimeout(() => {
                    // Check if admin is logged in
                    if (admin) {
                      console.log("Admin is logged in. Proceeding to logout.");
                      logoutAdmin();
                      localStorage.removeItem("admin"); // Remove admin from localStorage
                      setLogoutMessage("You have been successfully logged out!");
                      const adminToken = localStorage.getItem("admin");
                      console.log("Admin Token After Removal: ", adminToken);

                      onClose();
                      setTimeout(() => {
                        router.push("/admin/login");
                        setLoading(false); // Stop loading after redirection
                      }, 200);
                    }
                    // Check if user is logged in
                    else if (user) {
                      // Clear user data and remove from localStorage
                      setUser(null); // Clears the user state
                      setUserEmail(""); // Clear the user email
                      localStorage.removeItem("user"); // Remove user from localStorage

                      // Log to check if the user token is removed
                      const userToken = localStorage.getItem("user");
                      console.log("User Token After Removal: ", userToken); // Should print null

                      onClose();
                      setTimeout(() => {
                        router.push("/login"); // Redirect to user login
                        setLoading(false); // Stop loading after redirection
                      }, 200);
                    }
                  }, 100); // Delay logout actions for spinner to show
                }}
              >
                {logoutMessage && (
                  <p className="text-green-500 text-center font-semibold my-2">
                    {logoutMessage}
                  </p>
                )}
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> // Loader
                ) : (
                  "Confirm"
                )}
              </Button>

            </>
          }
        />


        <Dropdown>
          <DropdownTrigger>
            <button variant="bordered" color="primary" className="text-blue-600 border-2 border-[#5274F6] bg-white">
              <IoLanguage />
            </button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={() => switchLanguage("en")}>English</DropdownItem>
            <DropdownItem onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
