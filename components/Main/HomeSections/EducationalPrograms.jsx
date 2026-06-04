import { Link } from '@heroui/react'
import React from 'react'
 
export default function EducationalPrograms() {
    return (
        <>
            <section className="mt-[90px]">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="w-full">
                            <div className="text-center">
                                <h2 className='font-[var(--head-font)] text-[var(--secondary-color)] text-[50px] mb-[15px] leading-[105%]'>Educational Programs</h2>
                                <h6 className='text-[#000c] text-[20px] mb-[15px] leading-[138%]'>
                                    Comprehensive training across five core pillars <br />
                                    of aesthetic and implant dentistry
                                </h6>
                            </div>
                        </div>
                    </div>
 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {/* Card 1 */}
                        <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] overflow-hidden">
                            <img
                            src="/assets/images/SmileDesign-Veneers.png"
                            alt="Smile Design & Veneers"
                            className="w-full h-[200px] object-cover rounded-t-[12px]"
                            />
 
                            <div className="p-5">
                                <h4 className="text-[28px] leading-[100%] font-medium text-black">
                                    Smile Design & Veneers
                                </h4>
 
                                <p className="text-[16px] leading-[140%] font-normal text-black mt-4">
                                    Lorem Ipsum has been the industry's standard dummy text ever since
                                    the 1500s
                                </p>
 
                                <ul className="mt-4">
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Facial Analysis
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Smile design
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Photography
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Veneer prep
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Temporization
                                    </li>
                                </ul>
 
                                <Link
                                    href="#"
                                    className="block text-center bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white text-[16px] rounded-[8px] py-[9px] mt-5 transition-all duration-500 ease-in-out"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
 
                        {/* Card 2 */}
                        <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] overflow-hidden">
                            <img
                            src="/assets/images/Crown-Preparation-Mastery.png"
                            alt="Crown Preparation Mastery"
                            className="w-full h-[200px] object-cover rounded-t-[12px]"
                            />
 
                            <div className="p-5">
                                <h4 className="text-[28px] leading-[100%] font-medium text-black">
                                    Crown Preparation Mastery
                                </h4>
 
                                <p className="text-[16px] leading-[140%] font-normal text-black mt-4">
                                    Lorem Ipsum has been the industry's standard dummy text ever since
                                    the 1500s
                                </p>
 
                                <ul className="mt-4">
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/Images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Anterior crowns
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/Images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Posterior crowns
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/Images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Margin design
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/Images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Occlusion
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/Images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Adhesion
                                    </li>
                                </ul>
 
                                <Link
                                    href="#"
                                    className="block text-center bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white text-[16px] rounded-[8px] py-[9px] mt-5 transition-all duration-500 ease-in-out"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] overflow-hidden">
                            <img
                            src="/assets/images/Digital-Dentistry.png"
                            alt="Digital Dentistry"
                            className="w-full h-[200px] object-cover rounded-t-[12px]"
                            />
 
                            <div className="p-5">
                                <h4 className="text-[28px] leading-[100%] font-medium text-black">
                                    Digital Dentistry
                                </h4>
 
                                <p className="text-[16px] leading-[140%] font-normal text-black mt-4">
                                    Lorem Ipsum has been the industry's standard dummy text ever since
                                    the 1500s
                                </p>
 
                                <ul className="mt-4">
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    IOS scanning
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Photogrammetry
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Exocad
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Smile design software
                                    </li>
                                    <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                    <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                    Digital workflows
                                    </li>
                                </ul>
 
                                <Link
                                    href="#"
                                    className="block text-center bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white text-[16px] rounded-[8px] py-[9px] mt-5 transition-all duration-500 ease-in-out"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
 
                        {/* Card 4 */}
                        <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] overflow-hidden">
                        <img
                            src="/assets/images/Full-Arch-Rehabilitation.png"
                            alt="Full Arch Rehabilitation"
                            className="w-full h-[200px] object-cover rounded-t-[12px]"
                        />
 
                        <div className="p-5">
                            <h4 className="text-[28px] leading-[100%] font-medium text-black">
                            Full Arch Rehabilitation
                            </h4>
 
                            <p className="text-[16px] leading-[140%] font-normal text-black mt-4">
                            Lorem Ipsum has been the industry's standard dummy text ever since
                            the 1500s
                            </p>
 
                            <ul className="mt-4">
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                All-on-X
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                Surgery
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                Prosthetics
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                Immediate load
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                FP1/FP3 workflows
                            </li>
                            </ul>
 
                            <Link
                                href="#"
                                className="block text-center bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white text-[16px] rounded-[8px] py-[9px] mt-5 transition-all duration-500 ease-in-out"
                            >
                                Learn More
                            </Link>
                        </div>
                        </div>
 
                        {/* Card 5 */}
                        <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] overflow-hidden">
                        <img
                            src="/assets/images/Functional-Occlusion.png"
                            alt="Functional Occlusion / VDO"
                            className="w-full h-[200px] object-cover rounded-t-[12px]"
                        />
 
                        <div className="p-5">
                            <h4 className="text-[28px] leading-[100%] font-medium text-black">
                            Functional Occlusion / VDO
                            </h4>
 
                            <p className="text-[16px] leading-[140%] font-normal text-black mt-4">
                            Lorem Ipsum has been the industry's standard dummy text ever since
                            the 1500s
                            </p>
 
                            <ul className="mt-4">
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                Full mouth rehab
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                Kois-inspired concepts
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                Vertical dimension
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                Function-first treatment planning
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2">
                                <img src="/assets/images/check-icon.png" alt="image" className="w-[18px] mr-2" />
                                Facial Analysis
                            </li>
                            </ul>
 
                            <Link
                                href="#"
                                className="block text-center bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white text-[16px] rounded-[8px] py-[9px] mt-5 transition-all duration-500 ease-in-out"
                            >
                                Learn More
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
 