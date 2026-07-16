import React from "react";

export default function About() {
  return (
    <section className="mt-[50px] md:mt-[60px] lg:mt-[70px]">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Left Content */}
          <div>

            <h2
              className="
                font-[var(--head-font)]
                text-[28px]
                md:text-[35px]
                lg:text-[50px]
                leading-[105%]
                text-[var(--secondary-color)]
                mb-[15px]
              "
            >
              Setting the Standard in
              <span className="block text-[var(--secondary-color)]">
                Aesthetic Dentistry
              </span>
              Education
            </h2>


            <div className="mt-6 md:mt-8 lg:mt-[40px]" />


            <p
              className="
                text-[13px]
                md:text-[15px]
                lg:text-[18px]
                font-normal
                leading-[138%]
                text-[var(--text-color3)]
                mb-[20px]
                lg:mb-[25px]
              "
            >
              The Alliance Aesthetic Institute represents the pinnacle of
              advanced dental education, combining world-class faculty
              expertise with hands-on clinical training to elevate the
              practice of aesthetic and implant dentistry worldwide.
            </p>


            <p
              className="
                text-[13px]
                md:text-[15px]
                lg:text-[18px]
                font-normal
                leading-[138%]
                text-[var(--text-color3)]
                mb-[20px]
                lg:mb-[25px]
              "
            >
              Founded by leading clinicians and educators, AAI was
              established with a singular mission: to bridge the gap between
              theoretical knowledge and clinical mastery. Our comprehensive
              curriculum encompasses smile design, veneer artistry, crown
              preparation techniques, digital workflow integration, and
              full-arch rehabilitation protocols.
            </p>


            <p
              className="
                text-[13px]
                md:text-[15px]
                lg:text-[18px]
                font-normal
                leading-[138%]
                text-[var(--text-color3)]
                mb-[20px]
                lg:mb-[25px]
              "
            >
              What sets us apart is our commitment to intimate, hands-on
              learning experiences. With limited class sizes and live patient
              courses, every participant receives personalized mentorship
              from internationally recognized experts who are actively
              practicing at the highest level of the profession.
            </p>

          </div>


          {/* Right Image */}
          <div className="relative mt-8 md:mt-0">

            <img
              src="/assets/Images/about-img.png"
              alt="About"
              className="
                relative
                w-full
                md:w-[90%]
                lg:w-[90%]
                h-[420px]
                sm:h-[500px]
                md:h-[520px]
                lg:h-[580px]
                object-cover
                rounded-[15px]
                ml-auto
              "
            />


           

          </div>


        </div>

      </div>
    </section>
  );
}