import React, { useState } from "react";
import {
    FaStar,
    FaUsers,
    FaClock,
    FaAward,
    FaPlay,
    FaChevronDown,
    FaHeart,
    FaCheckCircle,
    FaFileAlt,
    FaBook,
    FaVideo,
    FaComments,
} from "react-icons/fa";

export default function CourseHero() {
    const [activeTab, setActiveTab] = useState("overview");
    const [openSections, setOpenSections] = useState({
        module1: true,
        module2: false,
        module3: false,
    });

    const toggleSection = (key) => {
        setOpenSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const switchTab = (tab) => setActiveTab(tab);

    return (
        <section>
            {/* HERO */}
            <div className="bg-[#0d1b2e] py-4">

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-end">

                {/* LEFT */}
                <div>
                    <div className="inline-block bg-[rgba(201,168,76,0.18)] text-[#c9a84c] text-[11px] font-bold uppercase tracking-[1.5px] px-4 py-1 rounded-full border border-[rgba(201,168,76,0.35)] mb-4">
                        Advanced Program • 154+ Videos
                    </div>

                    <h1 className="text-white text-[34px] font-bold leading-tight mb-4 font-serif">
                        Full Arch Workflow: Digital Planning &amp; Delivery
                    </h1>

                    <p className="text-white/70 text-[15px] leading-7 max-w-[600px] mb-6">
                        Advanced full arch treatment planning and delivery. Access comprehensive video tutorials,
                        step-by-step procedures, and expert demonstrations in implantology, prosthodontics, and complete arch rehabilitation.
                    </p>

                    {/* STATS */}
                    <div className="flex flex-wrap gap-4 mb-6">

                        <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white/70 text-sm">
                            <FaStar className="text-[#c9a84c]" />
                            <strong className="text-white">4.9</strong>
                            <span className="text-[#c9a84c]">★★★★★</span>
                            (1,240 reviews)
                        </div>

                        <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white/70 text-sm">
                            <FaUsers className="text-[#c9a84c]" />
                            <strong className="text-white">3,820</strong> enrolled
                        </div>

                        <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white/70 text-sm">
                            <FaClock className="text-[#c9a84c]" />
                            <strong className="text-white">154</strong> Videos • <strong className="text-white">3</strong> Modules
                        </div>

                        <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white/70 text-sm">
                            <FaAward className="text-[#c9a84c]" />
                            <strong className="text-white">40</strong> CE Credits
                        </div>
                    </div>

                    {/* INSTRUCTOR */}
                    <div className="flex items-center gap-3 text-white/60 text-sm mb-8">
                        <div className="w-9 h-9 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0d1b2e] font-bold">
                            D
                        </div>
                        Taught by{" "}
                        <a className="text-[#c9a84c] font-semibold" href="#">
                            Dr. Michael Harrison, DDS
                        </a>{" "}
                        &amp;{" "}
                        <a className="text-[#c9a84c] font-semibold" href="#">
                            Dr. Sophia Patel, MDent
                        </a>
                    </div>

                    {/* TABS */}
                    <div className="flex border-t border-white/10">
                        {["overview",  "faculty", "objectives"].map((tab) => (
                            <div
                                key={tab}
                                onClick={() => switchTab(tab)}
                                className={`px-5 py-3 text-sm cursor-pointer border-b-2 transition whitespace-nowrap ${activeTab === tab
                                    ? "text-[#c9a84c] border-[#c9a84c]"
                                    : "text-white/60 border-transparent hover:text-white"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </div>
                        ))}
                    </div>

                
                </div>
                {/* RIGHT ENROLL CARD */}
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden sticky top-20 self-start">

                    {/* THUMB */}
                    <div className="relative aspect-video bg-gradient-to-br from-[#0d1b2e] to-[#243352] flex items-center justify-center cursor-pointer">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=60')] bg-cover bg-center opacity-40"></div>

                        <div className="w-[60px] h-[60px] bg-[#c9a84c] rounded-full flex items-center justify-center shadow-lg z-10 hover:scale-110 transition">
                            <FaPlay className="text-white ml-1" />
                        </div>

                        <div className="absolute bottom-2 left-3 text-xs text-white bg-black/50 px-2 py-1 rounded">
                            ▶ Preview course intro
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="p-5">

                        <div className="mb-2">
                            <span className="text-[30px] font-serif font-bold text-[#0d1b2e]">
                                $1,500
                            </span>
                            <span className="line-through text-gray-400 ml-2">$2,200</span>
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                32% off
                            </span>
                        </div>

                        <p className="text-red-600 text-sm font-medium mb-4">
                            ⚡ Only <strong>4 seats left</strong> at this price
                        </p>

                        <button className="w-full bg-[#0d1b2e] text-white py-3 rounded-lg font-semibold mb-2 hover:bg-[#243352]">
                            Enroll Now
                        </button>

                        <button className="w-full border border-gray-300 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:border-[#c9a84c] hover:text-[#c9a84c] mb-3">
                            <FaHeart /> Add to Wishlist
                        </button>

                        <p className="text-center text-xs text-gray-500 mb-4">
                            30-day money-back guarantee · No questions asked
                        </p>

                        {/* INCLUDES */}
                        <div className="border-t pt-4">
                            <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">
                                This program includes
                            </h4>

                            <div className="space-y-2 text-sm text-gray-700">

                                <div className="flex items-center gap-2">
                                    <FaCheckCircle className="text-[#c9a84c]" />
                                    154 on-demand video lectures
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaBook className="text-[#c9a84c]" />
                                    3 comprehensive modules
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaVideo className="text-[#c9a84c]" />
                                    Lifetime access on all devices
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaAward className="text-[#c9a84c]" />
                                    Certificate + 40 CE Credits
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaComments className="text-[#c9a84c]" />
                                    Private community forum access
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
            </div>

              {/* TAB CONTENT */}
{/* TAB CONTENT */}
<div className="mt-8 container py-4">

  {/* OVERVIEW TAB */}
  {activeTab === "overview" && (
    <div className="space-y-10 text-sm text-gray-700">

      {/* WHAT YOU'LL LEARN */}
      <div>
        <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
          What You'll Learn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-yellow-50 p-6 rounded-lg text-gray-800">
          {[
            "Master digital workflow for full arch cases",
            "Understand occlusal concepts",
            "Execute implant placement protocols",
            "Design digital restorations",
            "Soft tissue management",
            "Guided surgery principles",
            "Handle complex cases",
            "Build scalable workflow",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">✔</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* REQUIREMENTS */}
      <div>
        <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
          Requirements
        </h2>

        <ul className="space-y-2 text-gray-700">
          {[
            "Active dental license (DDS, DMD, or equivalent)",
            "Basic implantology experience",
            "Digital dentistry familiarity (optional)",
            "Computer or tablet access",
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-yellow-500">●</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* DESCRIPTION */}
      <div>
        <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
          Course Description
        </h2>

        <p className="mb-3 text-gray-700 leading-relaxed">
          This comprehensive program walks you through full arch implant workflow
          from diagnosis to final delivery.
        </p>
        <p className="mb-3 text-gray-700 leading-relaxed">
          Real patient cases, real complications, and real decision-making steps
          are demonstrated throughout.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether beginner or advanced clinician, this course builds a scalable clinical system.
        </p>
      </div>

      {/* STATS */}
      <div>
        <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
          Program at a Glance
        </h2>

        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { num: "154+", label: "Videos" },
            { num: "3", label: "Modules" },
            { num: "40", label: "CE Credits" },
          ].map((s, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg">
              <div className="text-yellow-600 text-2xl font-bold">{s.num}</div>
              <div className="text-gray-600 text-xs uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )}

  {/* FACULTY TAB */}
  {activeTab === "faculty" && (
    <div className="text-gray-800">
      <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
        Meet the Faculty
      </h2>

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <h3 className="text-gray-900 font-semibold">Dr. Michael Harrison</h3>
          <p className="text-gray-600 text-sm mt-1">
            Oral Surgeon & Full Arch Specialist
          </p>
          <p className="mt-3 text-gray-700 text-sm leading-relaxed">
            Board-certified oral surgeon with 18 years of experience in implantology
            and full arch rehabilitation.
          </p>
        </div>

        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <h3 className="text-gray-900 font-semibold">Dr. Sophia Patel</h3>
          <p className="text-gray-600 text-sm mt-1">
            Prosthodontist & Digital Dentistry Expert
          </p>
          <p className="mt-3 text-gray-700 text-sm leading-relaxed">
            International KOL focusing on CAD/CAM workflows and prosthetic design.
          </p>
        </div>
      </div>
    </div>
  )}

  {/* OBJECTIVES TAB */}
  {activeTab === "objectives" && (
    <div className="text-gray-800">
      <h2 className="text-gray-900 text-lg font-semibold mb-4 border-b border-yellow-500 inline-block pb-2">
        Course Objectives
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <ul className="space-y-3">
          {[
            "Enable clinicians to perform full arch implant cases confidently",
            "Teach step-by-step digital workflow integration",
            "Improve surgical precision and prosthetic outcomes",
            "Reduce complications through guided protocols",
            "Build predictable long-term treatment planning skills",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-gray-700">
              <span className="text-yellow-500 font-bold">✔</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )}

</div>
        </section>
    );
}