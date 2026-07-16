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


export default function VideoSection() {

    const [activeTab, setActiveTab] = useState("fullarch");

    const current = tabs.find(
        (t) => t.id === activeTab
    ).content;


    return (
        <section className="mt-[60px] overflow-hidden">

            <div className="container mx-auto px-4">


                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-10">

                    <h2
                        className="
                        text-[32px]
                        sm:text-[38px]
                        md:text-[45px]
                        lg:text-[50px]
                        font-medium
                        mb-4
                        text-[#000]
                        leading-[105%]
                        "
                    >
                        Learn Anytime, Anywhere
                    </h2>


                    <p
                        className="
                        text-[16px]
                        sm:text-[18px]
                        md:text-[20px]
                        text-[#000]
                        leading-relaxed
                        "
                    >
                        Access our comprehensive video library with over 500 hours of
                        premium content. From foundational techniques to advanced
                        masterclasses, learn at your own pace with unlimited access.
                    </p>

                </div>



                {/* Tabs */}

                <div
                    className="
                    flex
                    p-4
                    sm:p-5
                    md:p-6
                    bg-white
                    mx-0
                    lg:mx-16
                    rounded-xl
                    shadow-md
                    flex-wrap
                    justify-center
                    gap-2
                    mb-8
                    "
                >

                    {tabs.map((tab)=>(

                        <button

                            key={tab.id}

                            onClick={() =>
                                setActiveTab(tab.id)
                            }

                            className={`
                            px-4
                            sm:px-5
                            py-2.5
                            rounded-full
                            text-[14px]
                            sm:text-[16px]
                            font-medium
                            transition-all
                            duration-300

                            ${
                            activeTab === tab.id

                            ?

                            "bg-[var(--primary-color)] text-white"

                            :

                            "text-black bg-[#F5F2EC] hover:bg-[var(--secondary-color)] hover:text-white"

                            }

                            `}

                        >

                            {tab.label}

                        </button>

                    ))}

                </div>
                                {/* Tab Content */}

                <div>


                    {/* Image + Content */}

                    <div
                        className="
                        flex
                        flex-col
                        md:flex-row
                        gap-8
                        mb-8
                        "
                    >


                        {/* Image */}

                        <div
                            className="
                            w-full
                            md:w-1/2
                            relative
                            rounded-xl
                            overflow-hidden
                            "
                        >

                            <img
                                src="/assets/Images/SurgicalProcedures.png"
                                alt="Video Thumbnail"
                                className="
                                w-full
                                h-[230px]
                                sm:h-[280px]
                                md:h-[320px]
                                object-cover
                                rounded-xl
                                "
                            />


                            {/* Play Button */}

                            <button
                                className="
                                absolute
                                top-1/2
                                left-1/2
                                -translate-x-1/2
                                -translate-y-1/2
                                w-[55px]
                                h-[55px]
                                sm:w-[65px]
                                sm:h-[65px]
                                md:w-[70px]
                                md:h-[70px]
                                rounded-full
                                bg-white/85
                                flex
                                items-center
                                justify-center
                                shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                                hover:scale-110
                                transition-all
                                "
                            >

                                <svg
                                    className="
                                    w-[22px]
                                    h-[22px]
                                    sm:w-[26px]
                                    sm:h-[26px]
                                    fill-[#C9A84C]
                                    "
                                    viewBox="0 0 24 24"
                                >

                                    <polygon points="5,3 19,12 5,21" />

                                </svg>


                            </button>


                        </div>



                        {/* Info */}

                        <div
                            className="
                            w-full
                            md:w-1/2
                            flex
                            flex-col
                            justify-center
                            gap-5
                            md:gap-6
                            "
                        >


                            <div>

                                <h4
                                    className="
                                    font-[var(--head-font)]
                                    text-[30px]
                                    sm:text-[34px]
                                    md:text-[38px]
                                    leading-none
                                    mb-3
                                    "
                                >

                                    {current.title}

                                </h4>


                                <p
                                    className="
                                    text-gray-600
                                    text-[15px]
                                    sm:text-base
                                    leading-relaxed
                                    "
                                >

                                    {current.description}

                                </p>


                            </div>



                            {/* Stats */}

                            <div
                                className="
                                grid
                                grid-cols-2
                                gap-3
                                sm:gap-4
                                "
                            >

                                <div
                                    className="
                                    text-center
                                    rounded-xl
                                    py-4
                                    px-2
                                    bg-[var(--light-gold2)]
                                    "
                                >

                                    <h4
                                        className="
                                        font-medium
                                        mb-3
                                        text-[30px]
                                        sm:text-[35px]
                                        md:text-[40px]
                                        leading-[100%]
                                        text-[var(--primary-color)]
                                        "
                                    >

                                        {current.totalVideos}

                                    </h4>


                                    <p
                                        className="
                                        text-[15px]
                                        sm:text-[18px]
                                        font-normal
                                        text-black
                                        m-0
                                        "
                                    >

                                        Total Videos

                                    </p>


                                </div>




                                <div
                                    className="
                                    text-center
                                    rounded-xl
                                    py-4
                                    px-2
                                    bg-[var(--light-gold2)]
                                    "
                                >

                                    <h4
                                        className="
                                        font-medium
                                        mb-3
                                        text-[30px]
                                        sm:text-[35px]
                                        md:text-[40px]
                                        leading-[100%]
                                        text-[var(--primary-color)]
                                        "
                                    >

                                        {current.modules}

                                    </h4>


                                    <p
                                        className="
                                        text-[15px]
                                        sm:text-[18px]
                                        font-normal
                                        text-black
                                        m-0
                                        "
                                    >

                                        Modules

                                    </p>


                                </div>


                            </div>




                            {/* Button */}

                            <div>

                                <Link
                                    href="#"
                                    className="
                                    inline-block
                                    px-8
                                    sm:px-10
                                    md:px-12
                                    py-3
                                    rounded-lg
                                    font-medium
                                    text-white
                                    text-sm
                                    bg-[var(--secondary-color)]
                                    hover:bg-[var(--primary-color)]
                                    transition-all
                                    "
                                >

                                    {current.browseLabel}

                                </Link>


                            </div>


                        </div>


                    </div>




                    {/* Bottom Cards */}


                    <div
                        className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-5
                        "
                    >

                        {
                            current.cards.map((card,index)=>(

                                <div
                                    key={index}
                                    className="
                                    rounded-xl
                                    p-5
                                    bg-[var(--light-gold2)]
                                    "
                                >


                                    <p
                                        className="
                                        text-[16px]
                                        font-normal
                                        mb-2
                                        text-[var(--primary-color)]
                                        "
                                    >

                                        {card.count}

                                    </p>



                                    <h4
                                        className="
                                        font-normal
                                        mb-2
                                        text-[22px]
                                        md:text-[25px]
                                        "
                                    >

                                        {card.title}

                                    </h4>



                                    <p
                                        className="
                                        mb-4
                                        text-[16px]
                                        md:text-[18px]
                                        text-black/50
                                        "
                                    >

                                        {card.desc}

                                    </p>



                                    <Link
                                        href="#"
                                        className="
                                        text-[var(--primary-color)]
                                        text-[16px]
                                        md:text-[18px]
                                        font-medium
                                        hover:opacity-70
                                        "
                                    >

                                        Watch Videos

                                    </Link>


                                </div>

                            ))
                        }


                    </div>


                </div>


            </div>

        </section>
    );
}