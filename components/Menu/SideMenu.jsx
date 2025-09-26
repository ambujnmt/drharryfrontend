import React, { useContext, useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { MdOutlineSick } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { useAdmin } from "../../context/AdminContext";
import { useUser } from "../../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserDoctor } from "react-icons/fa6";

export default function SideMenu({ isOpen, onClose }) {
  const { locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const { admin, logoutAdmin } = useAdmin();
  const { user, setUser, setUserEmail } = useUser();

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  const isAdminLoggedIn = !!admin;

  return (
    <div
      className={`
        fixed top-0 left-0 z-40 h-[100%] w-64 bg-[#5274F6] text-white flex flex-col transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
      `}
    >
      {/* Mobile Close Button */}
      <div className="lg:hidden p-4 flex justify-end">
        <button onClick={onClose} className="text-white text-2xl">×</button>
      </div>

      {/* Header */}
      <div className="w-full h-auto p-4 flex justify-start items-center  md:mt-0">
        <img
          src="https://nmtdevserver.com/welli/logo.png"
          alt="Welli Logo"
          className="xl:w-[40%] lg:w-[40%] w-[40%] h-auto object-contain"
        />
      </div>


      {/* Scrollable Menu Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="space-y-2 px-2 py-2 sidemenu-ul">
          {/* <li className="p-2 flex items-center rounded">
            <Link href="/dashboard" className="gap-1 text-[15px] text-white !hover:text-black font-medium p-1 flex items-center">
              <MdDashboard />
              {translateText("dashboard")}
            </Link>
          </li> */}

          {/* Role display */}
          {user && user.user_type && (
            <li className="p-2 flex items-center rounded  text-blue-800">
              {user.user_type === 1 && <span>Doctor</span>}
            {user.user_type === 2 && (
  <ul className="list-none m-0 p-0">
    <li className="p-2 flex items-center rounded">
      <Link
        href="/socialWorker/dashboard"
        className="gap-1 text-[15px] text-white !hover:text-black font-medium p-1 flex items-center"
      >
        <MdDashboard />
        {translateText("dashboard")}
      </Link>
    </li>

    <li className="p-2 flex items-center rounded">
      <Link
        href="/socialWorker/assignedPatient"
        className="gap-1 text-[15px] text-white !hover:text-black font-medium p-1 flex items-center"
      >
        <MdOutlineSick />
        {translateText("Assigned Patient")}
      </Link>
    </li>
  </ul>
)}


              {user.user_type === 3 && <span>Patient</span>}
              {user.user_type === 4 && <span>
                   <Link href="/uPerson/dashboard" className="gap-1 text-[15px] text-white !hover:text-black font-medium p-1 flex items-center">
                  <MdOutlineSick />
                  {translateText("Dashboard")}
                </Link>
                </span>}
            </li>
          )}


   {admin && (!user || (typeof user === "object" && Object.keys(user).length === 0)) && (
          <li className="p-2 flex items-center rounded">
            <Link href="/dashboard" className="gap-1 text-[15px] text-white !hover:text-black font-medium p-1 flex items-center">
              <MdDashboard />
              {translateText("dashboard")}
            </Link>
          </li>
          )}


          {admin && (!user || (typeof user === "object" && Object.keys(user).length === 0)) && (
            <Accordion variant="light">
              <AccordionItem
                key="6"
                value="user"
                classNames={{
                  item: "p-2 hover:bg-[#91b4e5] rounded",
                  title: "text-white ",
                  trigger: "py-[0.5rem]",
                  indicator: "text-white"
                }}
                aria-label="User"
                title={
                  <span className="flex items-center gap-2 text-[15px]">
                    <FaUser /> {translateText("user")}
                  </span>
                }
              >
                <ul className="space-y-1 text-[#e1e3e6] sidemenu-ul">
                  <li className="p-2 hover:bg-[#2563eb] rounded">
                    <Link href="/addUser" className="text-[#e1e3e6] text-[15px]">{translateText("addUser")}</Link>
                  </li>
                  <li className="p-2 hover:bg-[#2563eb] rounded">
                    <Link href="/user/userList" className="text-[#e1e3e6] text-[15px]">
                      {translateText("User Managaement")}
                    </Link>
                  </li>
                </ul>
              </AccordionItem>
            </Accordion>
          )}


          {admin && (!user || (typeof user === "object" && Object.keys(user).length === 0)) && (
            <Accordion variant="light">
              <AccordionItem
                key="7"
                value="clinic"
                classNames={{
                  item: "p-2 hover:bg-[#91b4e5] rounded",
                  title: "text-white ",
                  trigger: "py-[0.5rem]",
                  indicator: "text-white"
                }}
                aria-label="Clinic"
                title={
                  <span className="flex items-center gap-2 text-[15px]">
                    <FaUser /> {translateText("Clinic")}
                  </span>
                }
              >
                <ul className="space-y-1 text-[#e1e3e6] sidemenu-ul">
                  <li className="p-2 hover:bg-[#2563eb] rounded">
                    <Link href="/clinic/addClinic" className="text-[#e1e3e6] text-[15px]">{translateText("Add Clinic")}</Link>
                  </li>
                  <li className="p-2 hover:bg-[#2563eb] rounded">
                    <Link href="/clinic/clinicManagement" className="text-[#e1e3e6] text-[15px]">
                      {translateText("Clinic Managaement")}
                    </Link>
                  </li>
                </ul>
              </AccordionItem>
            </Accordion>
          )}

          {admin && (!user || (typeof user === "object" && Object.keys(user).length === 0)) && (
            <Accordion variant="light">
              <AccordionItem
                key="3"
                classNames={{
                  item: "p-2 hover:bg-[#2563eb] rounded",
                  title: "text-white",
                  trigger: "py-[0.5rem]",
                  indicator: "text-white",
                }}
                aria-label="Patient Management"
                title={
                  <span className="flex items-center gap-2 text-[15px]">
                    <MdOutlineSick className="text-xl" /> {translateText("Patient Management")}
                  </span>
                }
              >
                <ul className="space-y-1 text-[#e1e3e6] sidemenu-ul">
                  <li className="p-2 hover:bg-[#2563eb] rounded"><Link href="/patientEntry" className="text-[#e1e3e6] text-[15px]">{translateText("addPatient")}</Link></li>
                  <li className="p-2 hover:bg-[#2563eb] rounded"><Link href="/patient/patientAssignment" className="text-[#e1e3e6] text-[15px]">{translateText("Patient Assignment")}</Link></li>
                  <li className="p-2 hover:bg-[#2563eb] rounded"><Link href="/patient/assignedPatients" className="text-[#e1e3e6] text-[15px]">{translateText("Assigned Patient")}</Link></li>
                  <li className="p-2 hover:bg-[#2563eb] rounded"><Link href="/patient/patientScheduling" className="text-[#e1e3e6] text-[15px]">{translateText("Patient Scheduling")}</Link></li>
                </ul>
              </AccordionItem>
            </Accordion>
          )}

          {admin && (!user || (typeof user === "object" && Object.keys(user).length === 0)) && (
            <Accordion variant="light">
              <AccordionItem
                key="3"
                classNames={{
                  item: "p-2 hover:bg-[#2563eb] rounded",
                  title: "text-white",
                  trigger: "py-[0.5rem]",
                  indicator: "text-white",
                }}
                aria-label="Doctor Management"
                title={
                  <span className="flex items-center gap-2 text-[15px]">
                    <FaUserDoctor className="text-xl" /> {translateText("Doctor Management")}
                  </span>
                }
              >
                <ul className="space-y-1 text-[#e1e3e6] sidemenu-ul">
                  <li className="p-2 hover:bg-[#2563eb] rounded"><Link href="/doctorManagement/doctorList" className="text-[#e1e3e6] text-[15px]">{translateText("Doctor List")}</Link></li>

                </ul>
              </AccordionItem>
            </Accordion>
          )}
        </ul>
      </div>
    </div>
  );
}


