import React from 'react'
 
export default function EnrollmentProcess() {
    return (
        <>
            <section className="mt-[60px]">
                <div className="container mx-auto">
                    {/* Heading */}
                    <div className="text-center">
                    <h2 className="font-[var(--head-font)] text-[var(--secondary-color)] text-[50px] mb-[15px] leading-[105%]">
                        Simple, Secure Enrollment Process
                    </h2>
 
                    <h6 className="text-[#000c] text-[20px] mb-[15px] leading-[138%]">
                        Getting started is easy. Our streamlined registration process ensures
                        <br />
                        you can secure your spot and begin your educational journey quickly.
                    </h6>
                    </div>
 
                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[70px]">
                   
                    {/* Card 1 */}
                        <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] p-[15px]">
                            <img
                            src="/assets/Images/user-icon1.png"
                            alt="Apply for Course"
                            className="w-[60px] h-auto mb-[15px]"
                            />
 
                            <h4 className="text-[28px] leading-[100%] font-medium text-black mb-4">
                            Apply for Course
                            </h4>
 
                            <p className="text-[16px] leading-[140%] text-black mb-0">
                            Browse our course catalog and submit your application online. Quick
                            approval process with response within 24 hours.
                            </p>
                        </div>
 
                        {/* Card 2 */}
                        <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] p-[15px]">
                            <img
                            src="/assets/Images/user-icon1.png"
                            alt="Seat Reservation"
                            className="w-[60px] h-auto mb-[15px]"
                            />
 
                            <h4 className="text-[28px] leading-[100%] font-medium text-black mb-4">
                            Seat Reservation
                            </h4>
 
                            <p className="text-[16px] leading-[140%] text-black mb-0">
                            Reserve your spot with a deposit. Limited seats ensure personalized
                            attention and optimal learning experience.
                            </p>
                        </div>
 
                        {/* Card 3 */}
                        <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] p-[15px]">
                            <img
                            src="/assets/Images/user-icon1.png"
                            alt="Payment Processing"
                            className="w-[60px] h-auto mb-[15px]"
                            />
 
                            <h4 className="text-[28px] leading-[100%] font-medium text-black mb-4">
                            Payment Processing
                            </h4>
 
                            <p className="text-[16px] leading-[140%] text-black mb-0">
                            Secure payment portal with flexible options. Choose full payment or
                            installment plans that fit your budget.
                            </p>
                        </div>
 
                        {/* Card 4 */}
                        <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] p-[15px]">
                            <img
                            src="/assets/Images/user-icon1.png"
                            alt="Confirmation & Access"
                            className="w-[60px] h-auto mb-[15px]"
                            />
 
                            <h4 className="text-[28px] leading-[100%] font-medium text-black mb-4">
                            Confirmation & Access
                            </h4>
 
                            <p className="text-[16px] leading-[140%] text-black mb-0">
                            Receive instant confirmation and access to pre-course materials. Join
                            our community and start learning.
                            </p>
                        </div>
 
                    </div>
                </div>
            </section>
        </>
    )
}
 