import React, { useContext, useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { RiPageSeparator } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { BsBag } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdContactPhone,MdOutlineSick,MdDashboard  } from "react-icons/md";
import { Link } from "@heroui/link";
import { LanguageContext } from "../../context/LanguageContext";

export default function SideMenu() {

  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  
    const [clientLocale, setClientLocale] = useState("");
  
    useEffect(() => {
      setClientLocale(locale.toUpperCase());
    }, [locale]);


  return (
    <div className="h-screen w-64 bg-blue-500 text-white sticky top-0 flex flex-col ">
      {/* Header / Brand */}
      <div className="p-4 text-xl font-semibold border-b border-[#3a81e6]">
        {translateText("menu")}
      </div>

      {/* Scrollable Menu Items */}
      <div className="flex-1 overflow-y-auto custom-scrollbar ">
        <ul className="space-y-2 p-4">
          <li key="1" className="p-2 flex items-center  hover:bg-[#91b4e5] rounded"><Link href="/dashboard" className="text-white gap-1"><MdDashboard />
            {translateText("dashboard")}</Link></li>
          <li key="2" className="p-2 flex items-center gap-1 hover:bg-[#91b4e5] rounded"><RiPageSeparator />
            {translateText("pages")}</li>

          <Accordion variant="light">
            <AccordionItem
              key="3"
              classNames={{
                item: "p-2 hover:bg-[#91b4e5] rounded",
                title: "text-white",
                trigger: "py-[0.5rem]",
                indicator: "text-white",
              }}
              aria-label="Profile"
              title={
                <span className="flex items-center gap-2">
                  <ImProfile /> {translateText("profile")}
                </span>
              }
            >
              <ul className="space-y-1 text-[#e1e3e6]">
                <li className="p-2 hover:bg-[#91b4e5] rounded"><Link href="/signup" className="text-[#e1e3e6]">{translateText("signUp")}</Link></li>
                <li className="p-2 hover:bg-[#91b4e5] rounded"><Link href="/login" className="text-[#e1e3e6]">{translateText("login")}</Link></li>
              </ul>
            </AccordionItem>
          </Accordion>
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
                  <MdOutlineSick  /> {translateText("patient")}
                </span>
              }
            >
              <ul className="space-y-1 ">
                <li className="p-2 hover:bg-[#91b4e5]  rounded"><Link href="/patientEntry" className="text-[#e1e3e6]">{translateText("addPatient")}</Link></li>
                <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("patientList")}</li>
                <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("patientDetails")}</li>
              </ul>
            </AccordionItem>
          </Accordion>
          <Accordion variant="light">
            <AccordionItem
              key="5"
              classNames={{
                item: "p-2 hover:bg-[#91b4e5] rounded",
                title: "text-white",
                trigger: "py-[0.5rem]",
                indicator: "text-white"
              }}
              aria-label="Order"
              title={
                <span className="flex items-center gap-2">
                  <BsBag /> {translateText("order")}
                </span>
              }
            >
              <ul className="space-y-1 text-[#e1e3e6]">
                <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("orderList")}</li>
                <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("orderDetails")}</li>
                <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("addOrder")}</li>
              </ul>
            </AccordionItem>
          </Accordion>
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
                <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("addUser")}</li>
                <li className="p-2 hover:bg-[#91b4e5] rounded">{translateText("login")}</li>
              </ul>
            </AccordionItem>
          </Accordion>

          <li key="7" className="p-2 flex items-center gap-2 hover:bg-[#91b4e5] rounded"><MdContactPhone /> {translateText("contact")}</li>

        </ul>
      </div>
    </div>
  );
}
