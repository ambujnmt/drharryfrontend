import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from "../../context/LanguageContext";

export default function Discovery() {

    const { switchLanguage, locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    const items = [
        { number: "15", text: "Years\nExperience" },
        { number: "145", text: "Problem\nSolved" },
        { number: "95", text: "Expert\nPsychologist" },
        { number: "1000+", text: "Good\nReviews" },
    ];
    return (
        <div className="container mx-auto px-6 pb-8 text-center md:px-12 md:pb-14 lg:px-16 lg:pb-20">
            {/* Heading */}
            <h1 className="text-3xl  md:text-4xl lg:text-5xl font-bold text-center ">{translateText("our discovery of hope inspires change")}</h1>

            <p className='text-sm my-10 lg:my-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <div className="bg-[#6bd8d9] rounded-xl p-10 w-full max-w-4xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="text-3xl font-bold text-white">{item.number}</div>
                            <div className="text-sm font-light text-white mt-1"> {item.text.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br />
                                </span>
                            ))}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
