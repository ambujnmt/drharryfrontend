import React, { useContext, useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { MdOutlineSick } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "@heroui/link";
import { LanguageContext } from "../../context/LanguageContext";
import { useAdmin } from "../../context/AdminContext";
import { useUser } from "../../context/UserContext";



export default function SideMenu({ isOpen, onClose }) {
  const { locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const { admin, logoutAdmin } = useAdmin(); // Access admin data and logout function from AdminContext
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
      <div className="w-full h-auto p-4 flex justify-start items-center mt-5 md:mt-0">
        <img
          src="https://nmtdevserver.com/welli/logo.png"
          alt="Welli Logo"
          className="xl:w-[40%] lg:w-[40%] w-[40%] h-auto object-contain"
        />
      </div>


      {/* Scrollable Menu Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="space-y-2 p-4">
          <li className="p-2 flex items-center hover:bg-[#91b4e5] rounded">
            <Link href="/dashboard" className="text-white gap-1 flex items-center">
              <MdDashboard />
              {translateText("dashboard")}
            </Link>
          </li>

        {admin && (!user || Object.keys(user).length === 0) && (
            <Accordion variant="light">
              <AccordionItem
                key="6"
                classNames={{
                  item: "p-2 hover:bg-[#91b4e5] rounded",
                  title: "text-white ",
                  trigger: "py-[0.5rem]",
                  indicator: "text-white"
                }}
                aria-label="User"
                title={
                  <span className="flex items-center gap-2">
                    <FaUser /> {translateText("user")}
                  </span>
                }
              >
                <ul className="space-y-1 text-[#e1e3e6]">
                  <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("allUsers")}</li>
                  <li className="p-2 hover:bg-[#91b4e5] rounded"><Link href="/addUser" className="text-[#e1e3e6]">{translateText("addUser")}</Link></li>
                  <li className="p-2 hover:bg-[#91b4e5] rounded">
                    <Link href="/user/userList" className="text-[#e1e3e6]">
                      {translateText("User Managaement")}
                    </Link>
                  </li>
                </ul>
              </AccordionItem>
            </Accordion>
          )}

        {admin && (!user || Object.keys(user).length === 0) && (
            <Accordion variant="light">
              <AccordionItem
                key="3"
                classNames={{
                  item: "p-2 hover:bg-[#91b4e5] rounded",
                  title: "text-white",
                  trigger: "py-[0.5rem]",
                  indicator: "text-white",
                }}
                aria-label="Patient Management"
                title={
                  <span className="flex items-center gap-2">
                    <MdOutlineSick className="mb-6 text-xl" /> {translateText("Patient Management")}
                  </span>
                }
              >
                <ul className="space-y-1 text-[#e1e3e6]">
                  <li className="p-2 hover:bg-[#91b4e5]  rounded"><Link href="/patientEntry" className="text-[#e1e3e6]">{translateText("addPatient")}</Link></li>
                  <li className="p-2 hover:bg-[#91b4e5] rounded"><Link href="/patient/patientAssignment" className="text-[#e1e3e6]">{translateText("Patient Assignment")}</Link></li>
                  <li className="p-2 hover:bg-[#91b4e5] rounded"><Link href="/patient/assignedPatients" className="text-[#e1e3e6]">{translateText("Assigned Patient")}</Link></li>
                  <li className="p-2 hover:bg-[#91b4e5] rounded"><Link href="/patient/patientScheduling" className="text-[#e1e3e6]">{translateText("Patient Scheduling")}</Link></li>
                </ul>
              </AccordionItem>
            </Accordion>
          )}

          <Accordion variant="light">
            <AccordionItem
              key="4"
              classNames={{
                item: "p-2 hover:bg-[#91b4e5] rounded",
                title: "text-white", trigger: "py-[0.5rem]",
                indicator: "text-white"
              }}
              aria-label="Patient"
              title={
                <span className="flex items-center gap-2">
                  <MdOutlineSick /> {translateText("patient")}
                </span>
              }
            >
              <ul className="space-y-1 ">
                <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("patientList")}</li>
                <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("patientDetails")}</li>
              </ul>
            </AccordionItem>
          </Accordion>


        </ul>
      </div>
    </div>
  );
}
