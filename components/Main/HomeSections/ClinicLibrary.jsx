import { useState } from "react";

const TABS = [
  { id: "AllCases", label: "All Cases" },
  { id: "Veneers", label: "Veneers" },
  { id: "SmileDesign", label: "Smile Design" },
  { id: "CrownPreparation", label: "Crown Preparation" },
  { id: "FullMouth", label: "Full Mouth Restoration" },
  { id: "AllOnX", label: "All-on-X" },
];

const CASES = {
  AllCases: [
    {
      title: "Full Smile Makeover",
      img: "/assets/images/Implant-Supported-Bridge.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Anterior Aesthetic Crowns",
      img: "/assets/images/Anterior-Aesthetic-Crowns.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Minimal Prep Veneers",
      img: "/assets/images/Minimal-Prep-Veneers.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Complex Smile Rehabilitation",
      img: "/assets/images/Complex-Smile-Rehabilitation.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Digital Smile Design Case",
      img: "/assets/images/Digital-Smile-Design-Case.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Implant-Supported Bridge",
      img: "/assets/images/Implant-Supported-Bridge.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
  ],
  Veneers: [
    {
      title: "Complex Smile Rehabilitation",
      img: "/assets/images/Complex-Smile-Rehabilitation.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Digital Smile Design Case",
      img: "/assets/images/Digital-Smile-Design-Case.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Implant-Supported Bridge",
      img: "/assets/images/Implant-Supported-Bridge.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
  ],
  SmileDesign: [
    {
      title: "Digital Smile Design Case",
      img: "/assets/images/Digital-Smile-Design-Case.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Implant-Supported Bridge",
      img: "/assets/images/Implant-Supported-Bridge.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
  ],
  CrownPreparation: [
    {
      title: "Complex Smile Rehabilitation",
      img: "/assets/images/Complex-Smile-Rehabilitation.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Digital Smile Design Case",
      img: "/assets/images/Digital-Smile-Design-Case.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Implant-Supported Bridge",
      img: "/assets/images/Implant-Supported-Bridge.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
  ],
  FullMouth: [
    {
      title: "Digital Smile Design Case",
      img: "/assets/images/Digital-Smile-Design-Case.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Implant-Supported Bridge",
      img: "/assets/images/Implant-Supported-Bridge.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
  ],
  AllOnX: [
    {
      title: "Implant-Supported Bridge",
      img: "/assets/images/Implant-Supported-Bridge.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
    {
      title: "Digital Smile Design Case",
      img: "/assets/images/Digital-Smile-Design-Case.png",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      doctor: "Dr. James Chen",
      weeks: 6,
    },
  ],
};

function CaseCard({ title, img, desc, doctor, weeks }) {
  return (
    <div className="bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.20)] mb-[30px] overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-[200px] object-cover rounded-t-[10px]"
      />
      <div className="p-5">
        <h4 className="text-[28px]">{title}</h4>
        <p className="text-[16px] text-black mb-2 leading-relaxed">{desc}</p>
        <span className="text-[16px] text-black/50 font-normal leading-[140%]">
          by&nbsp;{doctor}
        </span>
        <div className="mt-[30px] flex items-center justify-between">
          <p className="text-[16px] text-black/50 font-normal leading-[140%] m-0">
            Treatment:&nbsp;{weeks} weeks
          </p>
          <a
            href="#"
            className="text-[var(--primary-color)] text-[18px] transition-all duration-500 hover:text-[var(--secondary-color)]"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ClinicLibrary() {
  const [activeTab, setActiveTab] = useState("AllCases");

  return (
    <section className="bg-[#f5f0e8] py-[70px]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-[50px] leading-[105%] text-gray-900 mb-2">
            Clinical Case Library
          </h2>
          <h6 className="text-[20px] leading-[138%] text-[#000] font-normal ">
            Explore our comprehensive collection of <br />
            documented clinical cases
          </h6>
        </div>

        {/* Tab Nav */}
        <div className="flex p-6 bg-white mx-16 rounded-xl shadow-md flex-wrap justify-evenly gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-[16px] font-medium  tracking-wide transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[var(--primary-color)] text-white"
                  : "text-black  bg-[#F5F2EC] hover:bg-[var(--secondary-color)] hover:text-[#ffffff]" 
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(CASES[activeTab] || []).map((c, i) => (
            <CaseCard key={i} {...c} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-[50px]">
          <a
            href="#"
            className="inline-block text-[var(--secondary-color)] border border-[var(--secondary-color)] px-8 py-[15px] rounded-[10px] transition-all duration-500 hover:bg-[var(--secondary-color)] hover:text-white"
          >
            Load More Cases
          </a>
        </div>
      </div>
    </section>
  );
}
