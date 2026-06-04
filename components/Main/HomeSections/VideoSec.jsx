import { Link } from "@heroui/react";
import { useState } from "react";

const tabs = [
    {
        id: "surgical",
        label: "Surgical videos",
        content: {
            title: "Surgical Procedures",
            description:
                "Advanced surgical techniques and protocols. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "154+",
            modules: "3",
            browseLabel: "Browse Surgical Procedure",
            cards: [
                {
                    count: "85+ procedures",
                    title: "Surgical Videos",
                    desc: "Step-by-step surgical demonstrations with expert commentary",
                },
                {
                    count: "42+ videos",
                    title: "Implant Placement",
                    desc: "Surgical protocols for optimal implant positioning",
                },
                {
                    count: "27+ videos",
                    title: "Soft Tissue Management",
                    desc: "Step-by-step surgical demonstrations with expert commentary",
                },
            ],
        },
    },
    {
        id: "smile",
        label: "Smile design tutorials",
        content: {
            title: "Smile Design Tutorials",
            description:
                "Master the art of digital smile design. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "98+",
            modules: "4",
            browseLabel: "Browse Smile Design",
            cards: [
                {
                    count: "40+ tutorials",
                    title: "Digital Smile Design",
                    desc: "Create stunning smile makeovers using digital tools and techniques",
                },
                {
                    count: "33+ videos",
                    title: "Shade Matching",
                    desc: "Precision shade selection and matching techniques for natural results",
                },
                {
                    count: "25+ videos",
                    title: "Mock-up Techniques",
                    desc: "Hands-on mock-up workflows for predictable smile transformations",
                },
            ],
        },
    },
    {
        id: "crown",
        label: "Crown prep",
        content: {
            title: "Crown Prep",
            description:
                "Master precise crown preparation techniques. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "120+",
            modules: "3",
            browseLabel: "Browse Crown Prep",
            cards: [
                {
                    count: "50+ videos",
                    title: "Preparation Techniques",
                    desc: "Achieve ideal margins and reduction with proven prep techniques",
                },
                {
                    count: "38+ videos",
                    title: "Impression Taking",
                    desc: "Accurate impression workflows for predictable crown outcomes",
                },
                {
                    count: "32+ videos",
                    title: "Temporary Restorations",
                    desc: "Fabricate and cement high-quality temporaries with ease",
                },
            ],
        },
    },
    {
        id: "veneer",
        label: "Veneer cementation",
        content: {
            title: "Veneer Cementation",
            description:
                "Perfect your veneer bonding protocol. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "86+",
            modules: "3",
            browseLabel: "Browse Veneer Cementation",
            cards: [
                {
                    count: "35+ videos",
                    title: "Surface Preparation",
                    desc: "Optimal etching and bonding surface prep for long-lasting veneers",
                },
                {
                    count: "28+ videos",
                    title: "Resin Selection",
                    desc: "Choosing the right cement shade and viscosity for each case",
                },
                {
                    count: "23+ videos",
                    title: "Finishing & Polishing",
                    desc: "Achieve flawless margins and high-gloss finish every time",
                },
            ],
        },
    },
    {
        id: "fullarch",
        label: "Full arch workflow",
        content: {
            title: "Full Arch Workflow",
            description:
                "Advanced full arch treatment planning and delivery. Access comprehensive video tutorials, step-by-step procedures, and expert demonstrations in this category.",
            totalVideos: "154+",
            modules: "3",
            browseLabel: "Browse Full Arch Workflow",
            cards: [
                {
                    count: "85+ procedures",
                    title: "Surgical Videos",
                    desc: "Step-by-step surgical demonstrations with expert commentary",
                },
                {
                    count: "42+ videos",
                    title: "Implant Placement",
                    desc: "Surgical protocols for optimal implant positioning",
                },
                {
                    count: "27+ videos",
                    title: "Soft Tissue Management",
                    desc: "Step-by-step surgical demonstrations with expert commentary",
                },
            ],
        },
    },
];

const GOLD = "#C9A84C";
const LIGHT_GOLD = "#FDF6E3";

export default function VideoSection() {
    const [activeTab, setActiveTab] = useState("fullarch");

    const current = tabs.find((t) => t.id === activeTab).content;

    return (
        <section className="mt-[60px] ">
            <div className="container mx-auto">
                {/* Header */}
                <div className="max-w-2xl mx-auto text-center mb-10">
                    <h2
                        className="text-[50px] font-medium mb-4 text-[#000]"
                    >
                        Learn Anytime, Anywhere
                    </h2>
                    <p className="text-[20px] text-[#000] leading-relaxed">
                        Access our comprehensive video library with over 500 hours of
                        premium content. From foundational techniques to advanced
                        masterclasses, learn at your own pace with unlimited access.
                    </p>
                </div>

                {/* Tab Nav */}
                <div
                    className="flex p-6 bg-white mx-16 rounded-xl shadow-md flex-wrap justify-evenly gap-2 mb-8"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2.5 rounded-full text-[16px] font-medium  tracking-wide transition-all duration-300 ${activeTab === tab.id
                                    ? "bg-[var(--primary-color)] text-white"
                                    : "text-black  bg-[#F5F2EC] hover:bg-[var(--secondary-color)] hover:text-[#ffffff]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div>
                    {/* Top row: image + info */}
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        {/* Image */}
                        <div className="md:w-1/2 relative rounded-xl overflow-hidden">
                           <img
    src="/assets/Images/SurgicalProcedures.png"
    alt="Video Thumbnail"
    className="w-full h-[320px] object-cover rounded-xl"
/>
                            {/* Play button */}
                            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-white/85 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:scale-110 transition-all duration-300">
                                <svg
                                    className="w-[26px] h-[26px] fill-[#C9A84C]"
                                    viewBox="0 0 24 24"
                                >
                                    <polygon points="5,3 19,12 5,21" />
                                </svg>
                            </button>
                        </div>

                        {/* Info */}
                        <div className="md:w-1/2 flex flex-col justify-center gap-6">
                            <div>
                                <h4 className="font-[var(--head-font)] text-[38px] leading-none">
                                    {current.title}
                                </h4>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    {current.description}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex-1 text-center rounded-xl py-4 px-2 bg-[var(--light-gold2)]">
                                    <h4
                                        className="font-medium mb-3 text-[40px] leading-[100%] text-[var(--primary-color)]"
                                    >
                                        {current.totalVideos}
                                    </h4>
                                    <p className="text-[18px] font-normal text-black m-0">
                                        Total Videos
                                    </p>
                                </div>
                                <div
                                    className="flex-1 text-center rounded-xl py-4 px-2 bg-[var(--light-gold2)]"
                                >
                                    <h4
                                        className="font-medium mb-3 text-[40px] leading-[100%] text-[var(--primary-color)]"
                                     
                                    >
                                        {current.modules}
                                    </h4>
                                    <p className="text-[18px] font-normal text-black m-0">
                                        Modules
                                    </p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div>
                                <Link
                                    href="#"
                                    className="inline-block px-12 py-3 rounded-lg font-medium text-white text-sm tracking-wide transition-opacity hover:opacity-90 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)]"
                                >
                                    {current.browseLabel}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {current.cards.map((card, i) => (
                            <div
                                key={i}
                                className="rounded-xl p-5 bg-[var(--light-gold2)]"
                            >
                                <p
                                    className="text-[16px] font-normal mb-2  text-[var(--primary-color)]"
                                >
                                    {card.count}
                                </p>
                                <h4
                                    className="font-normal mb-2 text-[25px] "
                           
                                >
                                    {card.title}
                                </h4>
                                <p
                                    className=" mb-4 text-[18px] text-black/50"
                           
                                >
                                    {card.desc}
                                </p>
                                <Link href="#" className="text-[var(--primary-color)]  pb-[2px] text-[18px] font-medium hover:opacity-70 transition-all">
                                    Watch Videos
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
