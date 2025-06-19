import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaCog } from "react-icons/fa";
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
              <li className="p-2 hover:bg-gray-200 cursor-pointer">{translateText("settings")}</li>
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



// import React from "react";
// import { Link } from "react-router-dom";

// // components
// import TopbarSearch from "../TopbarSearch";
// import MaximizeScreen from "../MaximizeScreen";
// import AppsDropdown from "@/components/AppsDropdown/";
// // import LanguageDropdown from "@/components/LanguageDropdown";
// import NotificationDropdown from "../NotificationDropdown";
// import ProfileDropdown from "../ProfileDropdown";
// import CreateNew from "../CreateNew";
// import MegaMenu from "../MegaMenu";
// // import profilePic from "@/assets/images/users/user-1.jpg";
// // import avatar4 from "@/assets/images/users/user-4.jpg";
// // import logoSm from "@/assets/images/logo-sm.png";
// // import logoDark from "@/assets/images/logo-dark.png";
// // import logoDark2 from "@/assets/images/logo-dark-2.png";
// // import logoLight from "@/assets/images/logo-light.png";
// // import logoLight2 from "@/assets/images/logo-light-2.png";
// import { useViewport } from "../../hooks/useViewport ";
// import { useLayoutContext } from "../../context/useLayoutContext";
// import { toggleDocumentAttribute } from "../../context/useLayoutContext";
// // get the notifications
// const Notifications = [{
//   id: 1,
//   text: "Cristina Pride",
//   subText: "Hi, How are you? What about our next meeting",
//   // avatar: profilePic
// }, {
//   id: 2,
//   text: "Caleb Flakelar commented on Admin",
//   subText: "1 min ago",
//   icon: "mdi mdi-comment-account-outline",
//   bgColor: "primary"
// }, {
//   id: 3,
//   text: "Karen Robinson",
//   subText: "Wow ! this admin looks good and awesome design",
//   // avatar: avatar4
// }, {
//   id: 4,
//   text: "New user registered.",
//   subText: "5 hours ago",
//   icon: "mdi mdi-account-plus",
//   bgColor: "warning"
// }, {
//   id: 5,
//   text: "Caleb Flakelar commented on Admin",
//   subText: "1 min ago",
//   icon: "mdi mdi-comment-account-outline",
//   bgColor: "info"
// }, {
//   id: 6,
//   text: "Carlos Crouch liked Admin",
//   subText: "13 days ago",
//   icon: "mdi mdi-heart",
//   bgColor: "secondary"
// }];

// // get the profilemenu
// const ProfileMenus = [{
//   label: "My Account",
//   icon: "fe-user",
//   redirectTo: "#"
// }, {
//   label: "Settings",
//   icon: "fe-settings",
//   redirectTo: "#"
// }, {
//   label: "Lock Screen",
//   icon: "fe-lock",
//   redirectTo: "/auth/lock-screen"
// }, {
//   label: "Logout",
//   icon: "fe-log-out",
//   redirectTo: "/auth/logout"
// }];

// // dummy search results
// const SearchResults = [{
//   id: 1,
//   title: "Analytics Report",
//   icon: "uil-notes",
//   redirectTo: "#"
// }, {
//   id: 2,
//   title: "How can I help you?",
//   icon: "uil-life-ring",
//   redirectTo: "#"
// }, {
//   id: 3,
//   icon: "uil-cog",
//   title: "User profile settings",
//   redirectTo: "#"
// }];
// const otherOptions = [{
//   id: 1,
//   label: "New Projects",
//   icon: "fe-briefcase"
// }, {
//   id: 2,
//   label: "Create Users",
//   icon: "fe-user"
// }, {
//   id: 3,
//   label: "Revenue Report",
//   icon: "fe-bar-chart-line-"
// }, {
//   id: 4,
//   label: "Settings",
//   icon: "fe-settings"
// }, {
//   id: 4,
//   label: "Help & Support",
//   icon: "fe-headphones"
// }];

// // get mega-menu options
// const MegaMenuOptions = [{
//   id: 1,
//   title: "UI Components",
//   menuItems: ["Widgets", "Nestable List", "Range Sliders", "Masonry Items", "Sweet Alerts", "Treeview Page", "Tour Page"]
// }, {
//   id: 2,
//   title: "Applications",
//   menuItems: ["eCommerce Pages", "CRM Pages", "Email", "Calendar", "Team Contacts", "Task Board", "Email Templates"]
// }, {
//   id: 3,
//   title: "Extra Pages",
//   menuItems: ["Left Sidebar with User", "Menu Collapsed", "Small Left Sidebar", "New Header Style", "Search Result", "Gallery Pages", "Maintenance & Coming Soon"]
// }];
// const Topbar = ({
//   hideLogo,
//   navCssClasses
// }) => {
//   const {
//     width
//   } = useViewport();
//   const {
//     menu,
//     orientation,
//     changeMenuSize,
//     themeCustomizer
//   } = useLayoutContext();
//   const navbarCssClasses = navCssClasses || "";
//   const containerCssClasses = !hideLogo ? "container-fluid" : "";

//   /**
//    * Toggle the leftmenu when having mobile screen
//    */
//   const handleLeftMenuCallBack = () => {
//     if (width < 1140) {
//       if (menu.size === 'full') {
//         showLeftSideBarBackdrop();
//         toggleDocumentAttribute("class", "sidebar-enable");
//       } else {
//         changeMenuSize('full');
//       }
//     } else if (menu.size === "condensed") {
//       changeMenuSize('default');
//     } else if (menu.size === 'full') {
//       showLeftSideBarBackdrop();
//       toggleDocumentAttribute("class", "sidebar-enable");
//     } else if (menu.size === 'fullscreen') {
//       changeMenuSize('default');
//       toggleDocumentAttribute("class", "sidebar-enable");
//     } else {
//       changeMenuSize('condensed');
//     }
//   };

//   // create backdrop for leftsidebar
//   function showLeftSideBarBackdrop() {
//     const backdrop = document.createElement("div");
//     backdrop.id = "custom-backdrop";
//     backdrop.className = "offcanvas-backdrop fade show";
//     document.body.appendChild(backdrop);
//     if (document.getElementsByTagName("html")[0]?.getAttribute("dir") !== "rtl") {
//       document.body.style.overflow = "hidden";
//       if (width > 1140) {
//         document.body.style.paddingRight = "15px";
//       }
//     }
//     backdrop.addEventListener("click", function () {
//       toggleDocumentAttribute("class", "sidebar-enable", true);
//       changeMenuSize('full');
//       hideLeftSideBarBackdrop();
//     });
//   }
//   function hideLeftSideBarBackdrop() {
//     const backdrop = document.getElementById("custom-backdrop");
//     if (backdrop) {
//       document.body.removeChild(backdrop);
//       document.body.style.overflow = "visible";
//     }
//   }
//   return <React.Fragment>
//     <div className={`navbar-custom ${navbarCssClasses}`}>
//       <div className={`topbar ${containerCssClasses}`}>
//         <div className="topbar-menu d-flex align-items-center gap-1">
//           {!hideLogo && <div className="logo-box">
//             <Link to="/" className="logo logo-dark text-center">
//               <span className="logo-sm">
//                 {/* <img src={logoSm} alt="" height="22" /> */}
//               </span>
//               <span className="logo-lg">
//                 {/* <img src={orientation === 'two-column' ? logoDark2 : logoDark} alt="" height="20" /> */}
//               </span>
//             </Link>
//             <Link to="/" className="logo logo-light text-center">
//               <span className="logo-sm">
//                 {/* <img src={logoSm} alt="" height="22" /> */}
//               </span>
//               <span className="logo-lg">
//                 {/* <img src={orientation === 'two-column' ? logoLight2 : logoLight} alt="" height="20" /> */}
//               </span>
//             </Link>
//           </div>}

//           <button className="button-toggle-menu" onClick={handleLeftMenuCallBack}>
//             <i className="mdi mdi-menu" />
//           </button>

//           <div className="dropdown d-none d-xl-block">
//             <CreateNew otherOptions={otherOptions} />
//           </div>

//           <div className="dropdown dropdown-mega d-none d-xl-block">
//             <MegaMenu subMenus={MegaMenuOptions} />
//           </div>
//         </div>

//         <ul className="topbar-menu d-flex align-items-center">
//           <li className="app-search dropdown d-none d-lg-block">
//             <TopbarSearch items={SearchResults} />
//           </li>
//           {/* <li className="dropdown d-inline-block d-lg-none">
//                          <SearchDropdown />
//                          </li> */}
//           <li className="dropdown d-none d-lg-inline-block">
//             <MaximizeScreen />
//           </li>
//           <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
//             <AppsDropdown />
//           </li>
//           {/* <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
//             <LanguageDropdown />
//           </li> */}
//           <li className="dropdown notification-list">
//             <NotificationDropdown notifications={Notifications} />
//           </li>
//           <li className="dropdown">
//             <ProfileDropdown   username={"Geneva"} userTitle={"Founder"} />

//             {/* <ProfileDropdown  menuItems={ProfileMenus} username={"Geneva"} userTitle={"Founder"} /> */}
//           </li>
//           <li>
//             <button className="nav-link dropdown-toggle right-bar-toggle waves-effect waves-light btn btn-link shadow-none" onClick={themeCustomizer.toggle}>
//               <i className="fe-settings noti-icon font-22"></i>
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </React.Fragment>;
// };
// export default Topbar;