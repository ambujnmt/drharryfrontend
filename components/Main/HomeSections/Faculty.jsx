import { Link } from "@heroui/react";
import React from "react";

export default function Faculty() {
  const faculty = [
    {
      image: "/assets/images/doctor1.png",
      name: "Dr. Sarah Mitchell",
      role: "Founder & Clinical Director",
      description:
        "Aesthetic Dentistry & Smile Design DDS, MS, AAACD Accredited",
      large: false,
    },
    {
      image: "/assets/images/doctor2.png",
      name: "Dr. James Chen",
      role: "Founder & Clinical Director",
      description:
        "Aesthetic Dentistry & Smile Design DDS, MS, AAACD Accredited",
      large: true,
    },
    {
      image: "/assets/images/doctor1.png",
      name: "Dr. Sarah Mitchell",
      role: "Founder & Clinical Director",
      description:
        "Aesthetic Dentistry & Smile Design DDS, MS, AAACD Accredited",
      large: false,
    },
    {
      image: "/assets/images/doctor2.png",
      name: "Dr. James Chen",
      role: "Founder & Clinical Director",
      description:
        "Aesthetic Dentistry & Smile Design DDS, MS, AAACD Accredited",
      large: true,
    },
  ];

  return (
    <section className="bg-[#F3F3F3] py-[70px]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <div className="head-sec">
            <h2 className="font-[var(--head-font)] text-[50px]  leading-[105%] text-[var(--secondary-color)] mb-[15px]">
              Learn From the Best
            </h2>

            <h6 className="text-center text-[rgba(0,0,0,0.8)] text-[18px]">
              Our distinguished faculty comprises internationally recognized
            </h6>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-[50px]">
          {faculty.map((member, index) => (
            <div key={index}>
              <div>
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full object-cover rounded-[15px] grayscale-[2] hover:grayscale-0 transition-all duration-500 ${
                    member.large ? "h-[360px]" : "h-[330px]"
                  }`}
                />

                <div className="py-[20px]">
                  <h4 className="text-[24px] font-medium text-[var(--secondary-color)] mb-[10px]">
                    {member.name}
                  </h4>

                  <span className="text-[var(--primary-color)] block mb-[20px]">
                    {member.role}
                  </span>

                  <p className="mt-[6px] mb-0 text-[16px] leading-[138%] text-[var(--text-color3)]">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-[50px]">
          <Link
            href="#"
            className="inline-block border border-[var(--secondary-color)] text-[var(--secondary-color)] px-[32px] py-[15px] rounded-[10px] transition-all duration-500 ease-in-out hover:bg-[var(--secondary-color)] hover:text-white"
          >
            Meet All Faculty
          </Link>
        </div>
      </div>
    </section>
  );
}