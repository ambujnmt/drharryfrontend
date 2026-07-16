import React from "react";

export default function WhyChoose() {
  return (
    <section className="bg-[var(--secondary-color)] py-12 md:py-[60px] mt-[50px] md:mt-[70px]">

      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center">


          {/* Left Content */}
          <div>

            <h3
              className="
                font-[var(--head-font)]
                text-white
                text-[42px]
                sm:text-[52px]
                md:text-[60px]
                lg:text-[70px]
                leading-[105%]
              "
            >
              Why Dentists
              <br />
              Choose AAI
            </h3>


            <p
              className="
                text-white/80
                text-[16px]
                sm:text-[18px]
                md:text-[20px]
                font-normal
                leading-[138%]
                mt-4
              "
            >
              World-class aesthetic dentistry education with real clinical exposure.
            </p>



            <ul className="mt-6 space-y-4 md:space-y-[17px]">


              <li
                className="
                  flex
                  items-center
                  text-[16px]
                  sm:text-[18px]
                  md:text-[20px]
                  text-white
                  font-normal
                  leading-[138%]
                "
              >
                <img
                  src="/assets/Images/check-icon.png"
                  alt="check"
                  className="w-[16px] md:w-[18px] h-auto mr-3"
                />

                World-Class Faculty
              </li>



              <li
                className="
                  flex
                  items-center
                  text-[16px]
                  sm:text-[18px]
                  md:text-[20px]
                  text-white
                  font-normal
                  leading-[138%]
                "
              >
                <img
                  src="/assets/Images/check-icon.png"
                  alt="check"
                  className="w-[16px] md:w-[18px] h-auto mr-3"
                />

                Live Patient Training
              </li>




              <li
                className="
                  flex
                  items-center
                  text-[16px]
                  sm:text-[18px]
                  md:text-[20px]
                  text-white
                  font-normal
                  leading-[138%]
                "
              >
                <img
                  src="/assets/Images/check-icon.png"
                  alt="check"
                  className="w-[16px] md:w-[18px] h-auto mr-3"
                />

                Comprehensive Curriculum
              </li>




              <li
                className="
                  flex
                  items-center
                  text-[16px]
                  sm:text-[18px]
                  md:text-[20px]
                  text-white
                  font-normal
                  leading-[138%]
                "
              >
                <img
                  src="/assets/Images/check-icon.png"
                  alt="check"
                  className="w-[16px] md:w-[18px] h-auto mr-3"
                />

                Lifetime Learning Access
              </li>




              <li
                className="
                  flex
                  items-center
                  text-[16px]
                  sm:text-[18px]
                  md:text-[20px]
                  text-white
                  font-normal
                  leading-[138%]
                "
              >
                <img
                  src="/assets/Images/check-icon.png"
                  alt="check"
                  className="w-[16px] md:w-[18px] h-auto mr-3"
                />

                Certification & Recognition
              </li>


            </ul>

          </div>




          {/* Right Image */}
          <div className="mt-8 md:mt-0">

            <img
              src="/assets/Images/Why-Dentists-Choose-AAI.png"
              alt="Why Dentists Choose AAI"
              className="
                w-full
                h-auto
              "
            />

          </div>


        </div>

      </div>

    </section>
  );
}