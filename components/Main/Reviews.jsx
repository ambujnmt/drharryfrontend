import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from "../../context/LanguageContext";
import { Link } from "@heroui/react"
export default function Reviews() {
    const { locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    const cards = [
        {

            bgColor: "bg-[#FFBA1B]",
            name: "Lucky Ferdiand",
            designation: "Psychologist",
        },
        {

            bgColor: "bg-[rgb(0,79,229)]",
            name: "Luis Ferdiand",
            designation: "Family Counsellor",
        },
        {

            bgColor: "bg-[#28C76F]",
            name: "Yustiana",
            designation: "Child Therapist",
        }
    ];

    return (
        <div className="container mx-auto px-6 pb-8 md:px-12 md:pb-14 lg:px-16 lg:pb-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10">
                {translateText("They say about us")}
            </h1>

            <div className="grid grid-cols-3  gap-8">
                {cards.map((card, index) => (
                    <div key={index} className="bg-gray-100 rounded-xl px-6 py-10 w-full  text-center">
                        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${card.bgColor}`}>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{card.name}</h3>
                        <p className="text-gray-400 text-sm font-medium mb-3">{card.designation}</p>
                        <p className="text-sm text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque adipisci exercitationem modi dolores voluptatum, id, eligendi facere consectetur natus totam eaque accusamus similique, eveniet harum. Natus recusandae voluptas repellat nesciunt?</p>
                    </div>
                ))}
            </div>

            <div className="bg-[#28C76F] rounded-xl my-20 px-12 py-16 text-white text-center">
                <h2 className="text-3xl md:text-4xl font-bold">{translateText("Value your health with smart solutions that are always at your fingertips.")}</h2>
                <p className="text-base md:text-sm my-8  mx-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit asperiores nostrum nisi quo libero quasi, neque maiores deserunt facere? Quidem accusamus sint dolorum minima delectus facilis, voluptatibus cumque provident impedit.
                </p>
                <div className='flex justify-center gap-3'>
                    <div className="font-normal text-[10px] md:text-[14px] lg:text-[16px] xl:text-[16px] xl:px-10 lg:px-4 px-2 my-1 text-center rounded-[600px] bg-[#FFBA1B] py-1"><Link href="/signupWith" className="text-white uppercase">{translateText("register")}</Link></div>
                    <div className="font-normal text-[10px] md:text-[14px] lg:text-[16px] xl:text-[16px] xl:px-10 lg:px-4 px-3 my-1 text-center text-white rounded-[600px] bg-[rgb(0,79,229)] py-1 uppercase"><Link href="/login" className="text-white uppercase">{translateText("login")}</Link></div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-16 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left Text Section */}
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            {translateText("Everything you need to feel good")}
                        </h2>
                        <p className="text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn
                        </p>
                    </div>

                    {/* Right Icons Section */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="flex flex-col items-start space-x-3 ">
                            <div>
                                <img src="https://nmtdevserver.com/welli/review1.png" alt="Make an Appointment Icon" className="w-8 h-8  mb-2" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">Make an Appointment</h3>
                                <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col items-start space-x-3">
                            <div>
                                <img src="https://nmtdevserver.com/welli/review2.png" alt="Consultation Icon" className="w-8 h-8 mb-2" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">Consultation</h3>
                                <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col items-start space-x-3">
                            <div>
                                <img src="https://nmtdevserver.com/welli/review3.png" alt="Therapy or Counseling Icon" className="w-8 h-8 mb-2" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">Therapy / Counseling</h3>
                                <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="flex flex-col items-start space-x-3">
                            <div>
                                <img src="https://nmtdevserver.com/welli/review4.png" alt="Final Result Icon" className="w-8 h-8 mb-2" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">Final Result</h3>
                                <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
