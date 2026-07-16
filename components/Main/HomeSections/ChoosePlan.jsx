import React, { useEffect, useState } from "react";
import { Link } from "@heroui/react";
import { getPlans } from "../../../utils/fetchApi";

export default function ChoosePlan() {

  const [plans, setPlans] = useState([]);


  useEffect(() => {
    fetchPlans();
  }, []);



  const fetchPlans = async () => {
    try {

      const res = await getPlans();

      if (res?.status) {

        const activePlans = res.data.filter(
          (plan) => plan.status === true || plan.status === 1
        );

        setPlans(activePlans);

      }

    } catch (error) {
      console.error("Error loading plans:", error);
    }
  };



  return (

    <section className="mt-12 lg:mt-[70px] py-12 lg:py-[60px] bg-[var(--light-gold2)]">


      <div className="container mx-auto px-4">



        {/* Heading */}

        <div className="text-center">


          <h2
            className="
              font-[var(--head-font)]
              text-[34px]
              sm:text-[42px]
              md:text-[46px]
              lg:text-[50px]
              leading-[105%]
              text-[var(--secondary-color)]
              mb-[15px]
            "
          >
            Choose Your Learning Journey
          </h2>



          <h6
            className="
              text-[16px]
              sm:text-[17px]
              md:text-[18px]
              text-[rgba(0,0,0,0.8)]
              leading-[138%]
            "
          >
            Flexible membership options designed to support your
            <br className="hidden sm:block" />
            continuing education at every stage of your career.
          </h6>


        </div>





        {/* Plans */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            lg:gap-8
            mt-10
            lg:mt-[50px]
          "
        >



          {plans.map((plan) => (

            <div
              key={plan.id}
              className={`
                border
                border-[var(--primary-color)]
                rounded-[15px]
                shadow-[0px_2px_12px_rgba(0,0,0,0.20)]
                p-6
                lg:p-[50px_20px]
                h-full
                ${
                  plan.is_popular
                    ? "bg-[var(--secondary-color)]"
                    : "bg-white"
                }
              `}
            >



              {/* Badge */}

              {plan.is_popular && (

                <div className="mb-[15px]">

                  <p
                    className="
                      bg-[var(--primary-color)]
                      text-white
                      text-[16px]
                      lg:text-[18px]
                      leading-[138%]
                      font-normal
                      w-max
                      px-3
                      py-2.5
                      rounded-[5px]
                      mb-0
                    "
                  >
                    Most Popular
                  </p>

                </div>

              )}






              {/* Plan Name */}

              <h6
                className={`
                  font-[var(--head-font)]
                  text-[24px]
                  md:text-[26px]
                  lg:text-[28px]
                  leading-[138%]
                  mb-0
                  ${
                    plan.is_popular
                      ? "text-white"
                      : ""
                  }
                `}
              >
                {plan.name}
              </h6>







              {/* Price */}

              <h5
                className={`
                  font-[var(--head-font)]
                  text-[24px]
                  md:text-[27px]
                  lg:text-[29px]
                  leading-[138%]
                  ${
                    plan.is_popular
                      ? "text-white"
                      : ""
                  }
                `}
              >

                <span
                  className="
                    text-[38px]
                    md:text-[45px]
                    lg:text-[50px]
                    font-normal
                    leading-[138%]
                  "
                >
                  ${parseFloat(plan.price)}
                </span>

                {" "}per {plan.duration}

              </h5>







              {/* Description */}

              <p
                className={`
                  text-[16px]
                  md:text-[17px]
                  lg:text-[18px]
                  leading-[138%]
                  font-normal
                  mb-0
                  ${
                    plan.is_popular
                      ? "text-white"
                      : ""
                  }
                `}
              >
                {plan.description}
              </p>







              {/* Button */}

              <div className="mt-8">


                <Link
                  href="#"
                  className={`
                    block
                    text-center
                    py-3
                    lg:py-[15px]
                    px-6
                    lg:px-[30px]
                    rounded-[10px]
                    text-[16px]
                    lg:text-[18px]
                    font-medium
                    transition-all
                    duration-500

                    ${
                      plan.is_popular

                      ? 
                      "bg-[var(--primary-color)] text-white hover:bg-[#fff] hover:text-[var(--primary-color)]"

                      :

                      "bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white"

                    }
                  `}
                >

                  {plan.button_text}

                </Link>


              </div>








              {/* Features */}

              <div className="mt-[30px]">


                <ul className="space-y-4">


                  {plan.features?.map((feature, idx) => (

                    <li
                      key={idx}
                      className={`
                        flex
                        items-start
                        gap-3
                        text-[15px]
                        md:text-[16px]

                        ${
                          plan.is_popular

                          ? "text-white font-extralight"

                          :

                          "text-black"

                        }
                      `}
                    >

                      <img
                        src="/assets/Images/check-icon.png"
                        alt="check"
                        className="w-5 h-5 mt-1 shrink-0"
                      />


                      <span>
                        {feature}
                      </span>


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