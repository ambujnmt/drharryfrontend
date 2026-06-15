import { Link } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { getFaculty } from "../../../utils/fetchApi";

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
  fetchFaculty();
}, []);

const fetchFaculty = async () => {
  try {
    const res = await getFaculty();

    if (res.status) {
      const activeFaculty = res.faculty.filter(
        (item) => item.status === 1
      );

      setFaculty(activeFaculty);
    }
  } catch (err) {
    console.log(err);
  }
};


const stripHtml = (html) => {
  if (!html) return "";

  const doc = new DOMParser().parseFromString(
    html,
    "text/html"
  );

  return doc.body.textContent || "";
};
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
                  className={`w-full object-cover rounded-[15px] grayscale-[2] hover:grayscale-0 transition-all duration-500 ${member.large ? "h-[360px]" : "h-[330px]"
                    }`}
                />

                <div className="py-[20px]">
                  <h4 className="text-[24px] font-medium text-[var(--secondary-color)] mb-[10px]">
                    {member.name}
                  </h4>

                  <span className="text-[var(--primary-color)] block mb-[20px]">
                    {member.designation}
                  </span>

                  <p className="mt-[6px] mb-0 text-[16px] leading-[138%] text-[var(--text-color3)] w-full overflow-hidden line-clamp-3 break-words">
                    {stripHtml(member.bio)}
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