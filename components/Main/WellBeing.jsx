import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from "../../context/LanguageContext";

export default function WellBeing() {

    const { switchLanguage, locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    // Replace these with your actual image URLs
    const images = [
        "https://nmtdevserver.com/welli/heartWellbeing.png", 
        "https://nmtdevserver.com/welli/handWellbeing.png", 
        "https://nmtdevserver.com/welli/flowerWellbeing.png", 
        "https://nmtdevserver.com/welli/heartWellbeing.png", 
        "https://nmtdevserver.com/welli/handWellbeing.png", 
        "https://nmtdevserver.com/welli/flowerWellbeing.png"
    ];

    const text = [
        translateText("Individual Therapy"), 
        translateText("Family Counselling"), 
        translateText("Couples Therapy"), 
        translateText("Children Therapy"), 
        translateText("Group Counselling"), 
        translateText("Career Counselling")
    ];

    const colors = [
        "bg-[#FFBA1B]", 
        "bg-[rgb(0,79,229)]", 
        "bg-[#FFBA1B]", 
        "bg-[rgb(0,79,229)]", 
        "bg-[#FFBA1B]", 
        "bg-[rgb(0,79,229)]"
    ];

    return (
        <div className="container mx-auto px-6 pb-8 md:px-12 md:pb-14 lg:px-16 lg:pb-20">
            <div className="relative w-full pb-16 px-4">
                <div className="bg-gray-100 rounded-2xl p-8 py-20 relative max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10">
                        {translateText("your well-being is essential")}
                    </h1>
                </div>

                <div className="grid grid-cols-3 gap-16 -mt-10 mx-20">
                    {images.map((imageSrc, index) => (
                        <div
                            key={index}
                            className={`py-10 px-5 flex flex-col items-start justify-start rounded-xl shadow-lg ${colors[index]} relative z-10`}
                        >
                            <img src={imageSrc} alt={text[index]} className="w-8 h-8 mb-2" />
                            <p className="text-center text-lg font-medium text-white my-3">{text[index]}</p>
                            <span className="text-xs font-normal text-white">Read More</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 lg:gap-0 items-center">
                {/* Image */}
                <div>
                    <img
                        src="https://nmtdevserver.com/welli/wellBeingimg.png"
                        alt="About Us"
                        className="w-full h-auto rounded-lg lg:ml-[5%] relative z-10"
                    />
                </div>

                {/* Yellow Box */}
                <div className="bg-[rgb(0,79,229)] p-4 md:p-10 lg:p-14 rounded-3xl shadow-lg ">
                    <h2 className="lg:text-4xl md:text-3xl text-xl font-semibold text-white mb-4">
                        {translateText("technology that Takes care of you")}
                    </h2>
                    <p className="text-white text-sm py-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis libero, sit amet
                        convallis nulla suscipit sit amet. In ac efficitur libero.
                    </p>
                    <div className='mt-5 text-white space-y-4'>
                        <div className='flex gap-2'>
                            <h2 className='text-2xl font-bold'>01</h2>
                            <p className='text-lg'>{translateText("Building Resilience")}</p>
                        </div>
                        <div className='flex gap-2'>
                            <h2 className='text-2xl font-bold'>02</h2>
                            <p className='text-lg'>{translateText("Mental Well-being")}</p>
                        </div>
                        <div className='flex gap-2'>
                            <h2 className='text-2xl font-bold'>03</h2>
                            <p className='text-lg'>{translateText("Emotional Resilience")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
