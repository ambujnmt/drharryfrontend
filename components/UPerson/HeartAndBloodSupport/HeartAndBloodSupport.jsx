import React from "react";
import { Link } from "@heroui/react";


export default function HeartAndBloodSupport() {
  const items = [
    {
      id: 1,
      img: "https://nmtdevserver.com/welli/blood%20status.png",
      href: "/heartAndBloodSupport/hemoglobin",
    },
    {
      id: 2,
      img: "https://nmtdevserver.com/welli/heart%20status.png",
      href: "/heartAndBloodSupport/heartStatus",
    },
    {
      id: 3,
      img: "https://nmtdevserver.com/welli/medicine%20status.png",
      href: "/heartAndBloodSupport/medicineStatus",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="flex items-center justify-center rounded-full bg-[#ffbb1c] p-4"
        >
          <img
            src={item.img}
            alt="status"
            className="h-10 w-10 object-contain"
          />
        </Link>
      ))}
    </div>
  );
}
