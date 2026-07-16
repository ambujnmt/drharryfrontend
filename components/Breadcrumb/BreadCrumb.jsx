import React from "react";
import { Link } from "@heroui/react";

export default function BreadCrumb({
  title = "Page Title",
  breadcrumb = ["Home", "Page"],
}) {
  return (
<section
  className="relative w-full h-[300px] md:h-[300px] bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: "url('/assets/Images/Breadcrumb.png')",
  }}
>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
          {title}
        </h1>

        <div className="flex justify-center items-center gap-2 text-sm md:text-base">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              {index !== 0 && (
                <span className="text-gray-300">/</span>
              )}

              <span
                className={
                  index === breadcrumb.length - 1
                    ? "text-[#d4af37]"
                    : "text-white hover:text-[#d4af37] cursor-pointer"
                }
              >
                {item}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}