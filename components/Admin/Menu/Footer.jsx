import React, { useContext, useEffect, useState } from "react";
import { Link } from "@heroui/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
 
export default function AdminFooter() {

  return (
      <section className="bg-[var(--light-gold2)] ">
      {/* Copyright */}
      <div className="  py-[15px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--secondary-color)] font-medium text-[18px] mb-0 mx-auto">
             © 2026 Alliance Institute. All right reserved
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
 
 