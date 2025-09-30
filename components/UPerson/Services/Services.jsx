import React from 'react';
import { Link } from "@heroui/react"; // ✅ Import Link

export default function Services() {
  const services = [
    {
      img: "https://nmtdevserver.com/welli/doctor.png",
      text: "Doctors",
      href: "/uPerson/services/doctor/doctor"
    },
    {
      img: "https://nmtdevserver.com/welli/outpatient.png",
      text: "Clinics",
      href: "#"
    },
    {
      img: "https://nmtdevserver.com/welli/protection.png",
      text: "Diagnostics",
      href: "#"
    },
  ];

  return (
    <div className="pt-4">
      <h2 className="text-2xl font-bold mb-6">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="flex flex-col items-center justify-center rounded-3xl bg-[rgb(107,216,217)] p-6 hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[rgb(132,228,229)] mb-4">
              <img src={service.img} alt={service.text} className="w-10 h-10" />
            </div>
            <span className="text-white font-light">{service.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
