import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from "../../context/LanguageContext";

export default function About() {

    const { switchLanguage, locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);
    return (
        <div className="container mx-auto px-6 py-8  md:px-12 md:py-14 lg:px-16 lg:py-20">
            {/* Heading */}
            <h1 className="text-3xl  md:text-4xl lg:text-5xl font-bold text-center mb-10 lg:mb-16">{translateText("find out what we can do for you")}</h1>

            {/* box1 */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 lg:gap-0 items-center">
                {/* Image */}
                <div>
                    <img
                        src="https://nmtdevserver.com/welli/about1.png"
                        alt="About Us"
                        className="w-full h-auto rounded-lg"
                    />
                </div>

                {/* Yellow Box slightly overlapping the image */}
                <div className="bg-[#FFBA1B] p-4 md:p-10 lg:p-14 rounded-3xl shadow-lg lg:-ml-[10%]">
                    <h2 className="text-2xl font-semibold text-white mb-4">LOREM IPSUM</h2>
                    <p className="text-white text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet
                        convallis nulla suscipit sit amet. In ac efficitur libero. Nam consequat mi a pharetra aliquet. Vivamus
                        viverra ante eget feugiat scelerisque. Cras nec nunc felis. Vestibulum vitae erat et dui euismod gravida
                        vel id augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet convallis nulla suscipit sit amet. In ac efficitur libero. Nam consequat mi a pharetra aliquet. Vivamus
                        viverra ante eget feugiat scelerisque. Cras nec nunc felis. Vestibulum vitae erat et dui euismod gravida
                        vel id augue. <br /><br /><br />
                    </p>
                    <p className="text-white text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet
                        convallis nulla suscipit sit amet. In ac efficitur libero. Nam consequat mi a pharetra aliquet. Vivamus
                        viverra ante eget feugiat scelerisque. Cras nec nunc felis. Vestibulum vitae erat et dui euismod gravida
                        vel id augue.
                    </p>
                </div>
            </div>


            {/* box2 */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 lg:gap-0 items-center py-8 md:py-14 lg:py-20">
                {/* Yellow Box slightly overlapping the image */}
                <div className="bg-[rgb(0,79,229)] p-4 md:p-10 lg:p-14 rounded-3xl shadow-lg lg:-mr-[10%] z-10">
                    <h2 className="text-2xl font-semibold text-white mb-4">LOREM IPSUM</h2>
                    <p className="text-white text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet
                        convallis nulla suscipit sit amet. In ac efficitur libero. Nam consequat mi a pharetra aliquet. Vivamus
                        viverra ante eget feugiat scelerisque. Cras nec nunc felis. Vestibulum vitae erat et dui euismod gravida
                        vel id augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet convallis nulla suscipit sit amet. In ac efficitur libero. Nam consequat mi a pharetra aliquet. Vivamus
                        viverra ante eget feugiat scelerisque. Cras nec nunc felis. Vestibulum vitae erat et dui euismod gravida
                        vel id augue. <br /><br /><br />
                    </p>
                    <p className="text-white text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet
                        convallis nulla suscipit sit amet. In ac efficitur libero. Nam consequat mi a pharetra aliquet. Vivamus
                        viverra ante eget feugiat scelerisque. Cras nec nunc felis. Vestibulum vitae erat et dui euismod gravida
                        vel id augue.
                    </p>
                </div>

                {/* Image */}
                <div>
                    <img
                        src="https://nmtdevserver.com/welli/about2.png"
                        alt="About Us"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </div>


            {/* box3 */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 lg:gap-0 items-center">
                {/* Image */}
                <div>
                    <img
                        src="https://nmtdevserver.com/welli/about3.png"
                        alt="About Us"
                        className="w-full h-auto rounded-lg"
                    />
                </div>

                {/* Yellow Box slightly overlapping the image */}
                <div className="bg-[#FFBA1B] p-4 md:p-10 lg:p-14 rounded-3xl shadow-lg lg:-ml-[10%]">
                    <h2 className="text-2xl font-semibold text-white mb-4">LOREM IPSUM</h2>
                    <p className="text-white text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet
                        convallis nulla suscipit sit amet. In ac efficitur libero. Nam consequat mi a pharetra aliquet. Vivamus
                        viverra ante eget feugiat scelerisque. Cras nec nunc felis. Vestibulum vitae erat et dui euismod gravida
                        vel id augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet convallis nulla suscipit sit amet. In ac efficitur libero. Nam consequat mi a pharetra aliquet. Vivamus
                        viverra ante eget feugiat scelerisque. Cras nec nunc felis. Vestibulum vitae erat et dui euismod gravida
                        vel id augue. <br /><br /><br />
                    </p>
                    <p className="text-white text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet
                        convallis nulla suscipit sit amet. In ac efficitur libero. Nam consequat mi a pharetra aliquet. Vivamus
                        viverra ante eget feugiat scelerisque. Cras nec nunc felis. Vestibulum vitae erat et dui euismod gravida
                        vel id augue.
                    </p>
                </div>
            </div>
        </div>
    )
}
