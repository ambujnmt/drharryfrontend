import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaCog } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure } from "@heroui/react";
import { Link } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import Tmodal from "../../Tmodal/Tmodal"
import { useUser } from "../../../context/UserContext";
import { useAdmin } from "../../../context/AdminContext";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProfile, fetchDoctorBookings, fetchUserBookings } from "../../../utils/fetchApi";

export default function AdminHeader({ menuOpen, toggleMenu }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { admin, logoutAdmin } = useAdmin();
    const { user, logout } = useUser();
    const [notifications, setNotifications] = useState([]);



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


    const handleLogout = () => {
        setLoading(true);

        setTimeout(() => {
            if (admin) {
                logoutAdmin();
                setLoading(false);
                onClose();
                router.replace("/admin/login");
            } else if (user) {
                logout();
                setLoading(false);
                onClose();
                router.replace("/");
            }
        }, 1500);
    };

    const newNotificationCount = notifications.filter((n) => n.isNew).length;

    const isAdminLoggedIn = !!admin;

    return (
        <div
            className="
    bg-[var(--secondary-color)]
    border-b-4
    border-[var(--primary-color)]
    shadow-sm
    flex
    justify-between
    lg:justify-end
    items-center
    px-4
    py-[18px]
    sticky
    top-0
    z-50
  "
        >      <button
            onClick={toggleMenu}
            className="
    lg:hidden
    flex
    items-center
    justify-center
    w-11
    h-11
    rounded-xl
    bg-[var(--secondary-color)]
    text-white
    hover:bg-[var(--primary-color)]
    hover:text-[var(--secondary-color)]
    transition-all
  "
        >
                {menuOpen ? <RxCross2 /> : <FaBars />}
            </button>

            <div className="flex items-center gap-4 relative">
                {/* {admin && (!user || (typeof user === "object" && Object.keys(user).length === 0)) && (
                    <Link
                        href="/admin/passChange"
                        className="
  bg-[var(--primary-color)]
  text-white
  px-5
  py-2.5
  rounded-full
  text-sm
  font-medium
  hover:bg-[var(--secondary-color)]
  hover:text-[var(--secondary-color)]
  transition-all
  hover:border-2
"
                    >
                        Change Password
                    </Link>
                )} */}


                {user && (user.user_id || user.id) && (
                    <Link
                        href={`/user/profile/${user.user_id || user.id}`}
                        className="
  flex
  items-center
  justify-center
  w-11
  h-11
  rounded-full
  bg-[var(--light-gold2)]
  text-[var(--secondary-color)]
  hover:bg-[var(--primary-color)]
  transition-all
"
                    >
                        <HiUserCircle />
                    </Link>
                )}




                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="
    w-11
    h-11
    rounded-full
    bg-[var(--primary-color)]
    text-white
    flex
    items-center
    justify-center
  hover:bg-[var(--secondary-color)]
  hover:text-[var(--secondary-color)]
  transition-all
  hover:border-2
  "
                >
                    <FaCog size={18} />
                </button>

                {dropdownOpen && (
                    <div
                        className="
    absolute
    right-0
    top-14
    w-56
    bg-white
    rounded-2xl
    border
    border-[var(--light-gold)]
    shadow-xl
    overflow-hidden
    z-5
    pt-3
  "
                    >            <ul className="text-sm !pl-0">

                            <li className="hover:bg-[var(--light-gold2)] transition-all"><Button
                                className="
    w-full
    justify-start
    bg-transparent
    text-[var(--text-color2)]
    hover:bg-transparent
  "
                                onPress={onOpen}
                            >
                                Logout
                            </Button></li>
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
                                className="bg-[var(--primary-color)]"
                                onPress={handleLogout}
                                isDisabled={loading}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Confirm"
                                )}
                            </Button>

                        </>
                    }
                />

            </div>
        </div>
    );
}
