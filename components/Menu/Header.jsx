import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaCog } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { LanguageContext } from "../../context/LanguageContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure } from "@heroui/react";
import { Link } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import Tmodal from "../Tmodal/Tmodal"
import { useUser } from "../../context/UserContext";
import { useAdmin } from "../../context/AdminContext";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProfile, fetchDoctorBookings,fetchUserBookings  } from "../../utils/fetchApi";

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
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

useEffect(() => {
  const loadUserOrDoctorNotifications = async () => {
    try {
      // Doctor panel notifications
      if (user?.user_type === 1) {
        const bookings = await fetchDoctorBookings(user.user_id);
        const today = new Date();

        // Show only upcoming pending bookings
        const pendingBookings = bookings.filter((b) => {
          const bookingDate = new Date(b.booking_date);
          return (
            b.status === "pending" &&
            bookingDate >= today.setHours(0, 0, 0, 0)
          );
        });

        const mapped = await Promise.all(
          pendingBookings.map(async (b) => {
            const profile = await fetchProfile(b.user_id);
            return {
              id: b.id,
              heading: "New Booking",
              description: `${profile?.data?.name} booked a slot on ${b.booking_date}`,
              details: b,
              isNew: true,
            };
          })
        );

        setNotifications(mapped);
      }

      // 👇 User panel notifications
     else if (user?.user_type === 4) {
  const bookings = await fetchUserBookings(user.user_id); // ✅ new API for users

  const mapped = await Promise.all(
    bookings.map(async (b) => {
      const doctorProfile = await fetchProfile(b.doctor_id);

      let heading = "";
      let description = "";

      if (b.status === "confirmed") {
        heading = "Booking Confirmed";
        description = `Your booking with Dr. ${doctorProfile?.data?.name} on ${b.booking_date} has been confirmed.`;
      } else if (b.status === "cancelled") {
        heading = "Booking Cancelled";
        description = `Your booking with Dr. ${doctorProfile?.data?.name} on ${b.booking_date} was cancelled.`;
      } else {
        return null;
      }

      return {
        id: b.id,
        heading,
        description,
        details: b,
        isNew: true,
      };
    })
  );

  setNotifications(mapped.filter(Boolean));
}


      // Other user types
      else if (user?.user_type === 2) {
        setNotifications([
          { id: 1, heading: "Social Worker Info", description: "Your cases updates will appear here.", isNew: false },
        ]);
      } else if (user?.user_type === 3) {
        setNotifications([
          { id: 2, heading: "Patient Info", description: "Your appointment updates will appear here.", isNew: false },
        ]);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  if (user) loadUserOrDoctorNotifications();
}, [user]);


  const newNotificationCount = notifications.filter((n) => n.isNew).length;

  const isAdminLoggedIn = !!admin;

  return (
    <div className="bg-[#5274f6] text-white flex justify-between lg:justify-end items-center p-3 sticky top-0 z-50">
      <button onClick={toggleMenu} className="text-white text-xl p-2 lg:hidden block ">
        {menuOpen ? <RxCross2 /> : <FaBars />}
      </button>

      <div className="flex  items-center space-x-4 text-2xl relative">
        {admin && (!user || (typeof user === "object" && Object.keys(user).length === 0)) && (
          <Link
            href="/admin/passChange"
            className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Change Password
          </Link>
        )}


        {user && (
          <Link href={`/user/profile/${user.user_id}`} className="cursor-pointer text-white text-2xl">
            <HiUserCircle />
          </Link>
        )}



        <div className="relative" onClick={() => setNotificationOpen(!notificationOpen)}>
          <IoMdNotifications className="cursor-pointer" />
          {newNotificationCount > 0 && (
            <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse">
              {newNotificationCount}
            </span>
          )}

          {notificationOpen && (
            <div className="absolute -right-20 top-9 mt-2 w-72 bg-white text-black shadow-lg rounded-md border z-50">
              <div className="p-2 font-semibold border-b">{translateText("notifications")}</div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-3 text-gray-500 text-sm">No notifications</div>
                ) : (
                  notifications.map((n) => (
                 <Link
  key={n.id}
  href={
    user?.user_type === 1
      ? `/doctor/notification/${n?.details?.id}`
      : `/uPerson/notification/${n?.details?.id}`
  }
  className={`block p-3 text-sm cursor-pointer ${
    n.isNew ? "bg-gray-100" : ""
  } hover:bg-gray-200`}
>
  <div className="font-medium text-base">{n.heading}</div>
  <div className="text-gray-600 text-xs">{n.description}</div>
</Link>

                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaCog />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-40 bg-white text-black shadow-lg rounded-md  z-50">
            <ul className="text-sm !pl-0">
              <li className="px-4 py-3 hover:bg-gray-200 cursor-pointer ">{translateText("settings")}</li>
              <li className=" hover:bg-gray-200 hover:rounded-b-md cursor-pointer"><Button className="w-full bg-white flex justify-start hover:bg-gray-200" onPress={onOpen}>{translateText("logout")}</Button></li>
            </ul>
          </div>
        )}

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
