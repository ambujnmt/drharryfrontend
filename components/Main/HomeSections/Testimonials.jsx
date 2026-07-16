import React from "react";
import Link from "next/link";

export default function Testimonials() {

  const testimonials = [
    {
      name: "Dr. Robert Chen",
      position: "Cosmetic Dentistry Specialist Beverly Hills, CA",
      review:
        "AAI transformed my practice and my approach to aesthetic dentistry. The live patient training was invaluable—I immediately implemented new techniques that elevated my case acceptance and patient satisfaction. The investment has returned tenfold.",
    },
    {
      name: "Dr. Robert Chen",
      position: "Cosmetic Dentistry Specialist Beverly Hills, CA",
      review:
        "AAI transformed my practice and my approach to aesthetic dentistry. The live patient training was invaluable—I immediately implemented new techniques that elevated my case acceptance and patient satisfaction. The investment has returned tenfold.",
    },
    {
      name: "Dr. Robert Chen",
      position: "Cosmetic Dentistry Specialist Beverly Hills, CA",
      review:
        "AAI transformed my practice and my approach to aesthetic dentistry. The live patient training was invaluable—I immediately implemented new techniques that elevated my case acceptance and patient satisfaction. The investment has returned tenfold.",
    },
  ];


  return (
    <section className="my-[60px] md:my-[80px] lg:my-[100px]">

      <div className="container mx-auto px-4">


        {/* Heading */}

        <div className="max-w-[700px] mx-auto text-center">

          <h2
            className="
            font-[var(--head-font)]
            text-[32px]
            sm:text-[40px]
            md:text-[45px]
            lg:text-[50px]
            leading-[105%]
            text-[var(--secondary-color)]
            mb-[15px]
            "
          >
            Trusted by Leading Practitioners
          </h2>


          <h6
            className="
            text-[16px]
            sm:text-[17px]
            md:text-[18px]
            leading-[138%]
            text-black/80
            "
          >
            Hear from doctors who have transformed their practices and elevated
            their skills through our programs.
          </h6>


        </div>



        {/* Testimonials */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          lg:gap-8
          mt-[35px]
          lg:mt-[50px]
          "
        >

          {
            testimonials.map((item,index)=>(

              <div
                key={index}
                className="
                bg-[var(--light-gold2)]
                rounded-[7px]
                p-5
                lg:p-[25px]
                "
              >


                {/* Quote */}

                <img
                  src="/assets/Images/inverted-comma1.png"
                  alt="Quote"
                  className="
                  block
                  w-[32px]
                  sm:w-[35px]
                  lg:w-[40px]
                  h-auto
                  mb-[15px]
                  lg:mb-[20px]
                  "
                />



                {/* Stars */}

                <img
                  src="/assets/Images/star-img.png"
                  alt="Stars"
                  className="
                  w-[150px]
                  sm:w-[170px]
                  lg:w-[190px]
                  h-auto
                  mb-[15px]
                  "
                />



                {/* Review */}

                <p
                  className="
                  text-[15px]
                  sm:text-[16px]
                  lg:text-[18px]
                  leading-[138%]
                  text-[var(--text-color3)]
                  mb-0
                  "
                >
                  "{item.review}"
                </p>



                {/* Divider */}

                <div
                  className="
                  border-t
                  border-[var(--secondary-color)]
                  mt-[30px]
                  lg:mt-[40px]
                  "
                />



                {/* Client */}

                <div
                  className="
                  flex
                  items-center
                  mt-[20px]
                  lg:mt-[23px]
                  "
                >

                  <img
                    src="/assets/Images/customer-img.png"
                    alt={item.name}
                    className="
                    w-[60px]
                    h-[60px]
                    sm:w-[70px]
                    sm:h-[70px]
                    lg:w-[80px]
                    lg:h-[80px]
                    rounded-full
                    object-cover
                    mr-[15px]
                    lg:mr-[20px]
                    "
                  />


                  <div>

                    <h5
                      className="
                      font-[var(--head-font)]
                      text-[18px]
                      sm:text-[19px]
                      lg:text-[20px]
                      leading-[138%]
                      text-black
                      mb-[2px]
                      "
                    >
                      {item.name}
                    </h5>


                    <p
                      className="
                      text-[13px]
                      sm:text-[14px]
                      leading-[138%]
                      font-normal
                      text-black/50
                      mb-0
                      "
                    >
                      {item.position}
                    </p>


                  </div>


                </div>


              </div>

            ))
          }


        </div>



        {/* Button */}

        <div className="text-center mt-[40px] lg:mt-[50px]">

          <Link
            href="#"
            className="
            inline-block
            border
            border-[var(--secondary-color)]
            text-[var(--secondary-color)]
            px-7
            lg:px-[32px]
            py-3
            lg:py-[15px]
            rounded-[10px]
            transition-all
            duration-500
            hover:bg-[var(--secondary-color)]
            hover:text-white
            text-[15px]
            lg:text-[16px]
            "
          >
            Read More Reviews
          </Link>

        </div>


      </div>

    </section>
  );
}