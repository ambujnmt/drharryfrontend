import React from "react";
import {Link} from "@heroui/react";

export default function ChoosePlan() {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      description: "perfect for getting started with online learning",
      popular: false,
    },
    {
      name: "Advance",
      price: "$249",
      description: "perfect for getting started with online learning",
      popular: true,
    },
    {
      name: "Elite",
      price: "$499",
      description: "perfect for getting started with online learning",
      popular: false,
    },
  ];

  const features = [
    "Access to video library (100+ courses)",
    "Monthly webinars",
    "Community forum access",
    "Course Completion certification",
  ];

  return (
    <section className="mt-[70px] py-[60px] bg-[var(--light-gold2)]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-[var(--head-font)] text-[50px]  leading-[105%] text-[var(--secondary-color)] mb-[15px]">
            Choose Your Learning Journey
          </h2>

          <h6 className="text-[18px] text-[rgba(0,0,0,0.8)] leading-[138%]">
            Flexible membership options designed to support your
            <br />
            continuing education at every stage of your career.
          </h6>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[50px]">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border border-[var(--primary-color)] rounded-[15px] shadow-[0px_2px_12px_rgba(0,0,0,0.20)] p-[50px_20px] h-full ${
                plan.popular
                  ? "bg-[var(--secondary-color)]"
                  : "bg-white"
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="mb-[15px]">
                  <p className="bg-[var(--primary-color)] text-white text-[18px] leading-[138%] font-normal w-max px-[12px] py-[10px] rounded-[5px] mb-0">
                    Most Popular
                  </p>
                </div>
              )}

              {/* Plan Name */}
              <h6
                className={`font-[var(--head-font)] text-[28px]  leading-[138%] mb-0 ${
                  plan.popular ? "text-white" : ""
                }`}
              >
                {plan.name}
              </h6>

              {/* Price */}
              <h5
                className={`font-[var(--head-font)] text-[29px]  leading-[138%] ${
                  plan.popular ? "text-white" : ""
                }`}
              >
                <span className="text-[50px] font-normal leading-[138%]">
                  {plan.price}
                </span>{" "}
                per month
              </h5>

              {/* Description */}
              <p
                className={`text-[18px] leading-[138%] font-normal mb-0 ${
                  plan.popular ? "text-white" : ""
                }`}
              >
                {plan.description}
              </p>

              {/* Button */}
              <div className="mt-8">
                <Link
                  href="#"
                  className={`block text-center py-[15px] px-[30px] rounded-[10px] text-[18px] font-medium transition-all duration-500 ${
                    plan.popular
                      ? "bg-[var(--primary-color)]  text-white hover:bg-[#fff] hover:text-[var(--primary-color)]"
                      : "bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white "
                  }`}
                >
                  Start Essential
                </Link>
              </div>

              {/* Features */}
              <div className="mt-[30px]">
                <ul className="space-y-4">
                  {features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-3 ${
                        plan.popular
                          ? "text-white font-extralight"
                          : "text-black"
                      }`}
                    >
                      <img
                        src="/assets/Images/check-icon.png"
                        alt="check"
                        className="w-5 h-5 mt-1"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}