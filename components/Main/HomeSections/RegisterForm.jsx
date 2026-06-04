import React from 'react'
 
export default function RegisterForm() {
    return (
        <>
            <section className="mt-[70px] mb-[70px]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   
                    {/* Left Content */}
                        <div className="lg:col-span-5 lg:sticky lg:top-[150px] self-start">
                            <div className="head-sec">
                            <h2 className="font-[var(--head-font)] text-[var(--secondary-color)] text-[50px] mb-[15px] leading-[105%]">
                                Register in Minutes
                            </h2>
 
                            <h6 className="text-[#000c] text-[20px] mb-[15px] leading-[138%]">
                                Our intuitive registration system makes enrollment quick and
                                hassle-free. Choose your course, select your preferred dates, and
                                complete payment—all in one seamless experience.
                            </h6>
                            </div>
 
                            <ul className="mt-5 space-y-4">
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)]">
                                <img
                                src="/assets/images/check-icon.png"
                                alt=""
                                className="w-[18px] mr-2"
                                />
                                Secure Payment
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)]">
                                <img
                                src="/assets/images/check-icon.png"
                                alt=""
                                className="w-[18px] mr-2"
                                />
                                Waitlist Priority
                            </li>
 
                            <li className="flex items-center text-[18px] text-[var(--secondary-color)]">
                                <img
                                src="/assets/images/check-icon.png"
                                alt=""
                                className="w-[18px] mr-2"
                                />
                                Flexible Payment Plans
                            </li>
                            </ul>
                        </div>
 
                        {/* Right Form */}
                        <div className="lg:col-span-7">
                            <div className="shadow-[rgba(0,0,0,0.20)_0px_2px_12px] rounded-b-[11px]">
                           
                                {/* Header */}
                                <div className="bg-[var(--secondary-color)] p-5 rounded-t-[11px]">
                                    <h4 className="text-[28px] font-[var(--head-font)] text-white mb-[6px]">
                                    Course Registration
                                    </h4>
 
                                    <p className="text-[18px] text-white/90 font-light mb-0">
                                    Secure your seat today
                                    </p>
                                </div>
 
                                {/* Form */}
                                <form className="bg-[var(--light-gold2)] p-5 rounded-b-[11px]">
                                   
                                    {/* Program Selection */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                    <p className="text-[20px] leading-[138%] mb-0" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                                        Your selected program
                                    </p>
 
                                    <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white">
                                        <option>Select Program</option>
                                        <option>Program 1</option>
                                        <option>Program 2</option>
                                    </select>
                                    </div>
 
                                    {/* Program Card */}
                                    <div className="flex flex-col md:flex-row bg-white mt-4 p-4 border-2 border-[var(--primary-color)] rounded-[15px]">
                                   
                                    <img
                                        src="/assets/images/register-img.png"
                                        alt=""
                                        className="w-full md:w-[133px] h-[122px] object-cover rounded-[10px] md:mr-[30px]"
                                    />
 
                                    <div className="mt-4 md:mt-0">
                                        <p className="text-[18px] font-medium mb-0">
                                        Advanced Smile Design Workshop
                                        </p>
 
                                        <span className="text-[16px] text-black/70">
                                        June 15-17, 2026 • Los Angeles, CA
                                        </span>
 
                                        <div className="flex flex-wrap gap-6 mt-5">
                                        {[1, 2, 3].map((item) => (
                                            <div key={item} className="flex items-center">
                                            <img
                                                src="/assets/images/star-icon.png"
                                                alt=""
                                                className="w-[30px] mr-2"
                                            />
 
                                            <div>
                                                <h6 className="text-[14px] font-medium">
                                                    Certificate
                                                </h6>
 
                                                <p className="text-[14px] text-black/70">
                                                    Included
                                                </p>
                                            </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                    </div>
                                    {/* Personal Info */}
                                    <div className="mt-[25px]">
                                    <p className="text-[20px] leading-[138%] mb-0" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                                        Personal Information
                                    </p>
 
                                    <div className="mt-4">
                                        <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full h-[52px] border border-[#0a23429e] rounded-[10px] px-4 mb-3 bg-transparent"
                                        />
 
                                        <input
                                        type="email"
                                        placeholder="Your E-mail"
                                        className="w-full h-[52px] border border-[#0a23429e] rounded-[10px] px-4 bg-transparent"
                                        />
                                    </div>
                                    </div>
 
                                    {/* Seat Availability */}
                                    <div className="mt-5">
                                    <p className="text-[20px] leading-[138%] mb-0" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                                        Seat Available
                                    </p>
 
                                    <div className="flex items-center border border-[#0a23429e] rounded-[10px] p-4 mt-3">
                                        <img
                                        src="/assets/images/user-icon2.png"
                                        alt=""
                                        className="w-[65px] mr-5"
                                        />
 
                                        <div className="w-full">
                                        <p className="text-[16px] text-[var(--secondary-color)] mb-2">
                                            <b className="text-[19px] text-[#1A8233]">
                                            10 of 20
                                            </b>{" "}
                                            Seat Remaining
                                        </p>
 
                                        <div className="w-full h-[10px] bg-gray-200 rounded-full overflow-hidden">
                                            <div className="w-[45%] h-full bg-[#1A8233]" />
                                        </div>
 
                                        <span className="text-[18px] text-[var(--secondary-color)]">
                                            Filling Fast Reserve your seat now
                                        </span>
                                        </div>
                                    </div>
                                    </div>
 
                                    {/* Payment Options */}
                                    <div className="mt-6">
                                    <p className="text-[20px] leading-[138%] mb-3" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                                        Payment Option
                                    </p>
 
                                    <div className="border border-[var(--primary-color)] rounded-lg p-3 flex justify-between items-center bg-[#f7f7f5]">
                                        <span className="text-[18px] text-[var(--secondary-color)]">
                                        Full Payment
                                        </span>
 
                                        <span className="text-[#585858b8]">$4,500</span>
                                    </div>
 
                                    <div className="border border-gray-300 rounded-lg p-3 flex justify-between items-center bg-[#f8f8f8] mt-3">
                                        <span className="text-[18px] text-gray-500">
                                        3 months Payment
                                        </span>
 
                                        <span className="text-[#585858b8]">1500 / mo</span>
                                    </div>
 
                                    <a
                                        href="#"
                                        className="block text-center bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white text-[16px] rounded-[8px] py-[9px] mt-5 transition-all duration-500 ease-in-out"
                                    >
                                        Proceed to Payment
                                    </a>
 
                                    <p className="text-center text-[18px] text-gray-500 mt-3">
                                        Secured by 256-bit SSL encryption
                                    </p>
                                    </div>
 
                                </form>
                            </div>
                        </div>
 
                    </div>
                </div>
            </section>
        </>
    )
}