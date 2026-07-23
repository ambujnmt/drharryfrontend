import { Link } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { getFaculty } from "../../../utils/fetchApi";

export default function Faculty() {

  const [faculty, setFaculty] = useState([]);


  useEffect(() => {
    fetchFaculty();
  }, []);



  const fetchFaculty = async () => {
    try {

      const res = await getFaculty();

      if (res.status) {

        const activeFaculty = res.faculty
          .filter((item) => item.status === 1)
          .slice(0, 4);

        setFaculty(activeFaculty);

      }

    } catch (err) {
      console.log(err);
    }
  };




  const stripHtml = (html) => {

    if (!html) return "";

    const doc = new DOMParser().parseFromString(
      html,
      "text/html"
    );

    return doc.body.textContent || "";

  };



  return (

    <section className="bg-[#F3F3F3] py-12 md:py-[70px]">


      <div className="container mx-auto px-4">


        {/* Heading */}

        <div className="text-center">

          <div className="head-sec">


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
              Learn From the Best
            </h2>



            <h6
              className="
                text-center
                text-[16px]
                sm:text-[17px]
                md:text-[18px]
                text-[rgba(0,0,0,0.8)]
              "
            >
              Our distinguished faculty comprises internationally recognized
            </h6>


          </div>

        </div>





        {/* Faculty Grid */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
            lg:gap-8
            mt-10
            lg:mt-[50px]
          "
        >


          {
            faculty.map((member) => (

              <Link
                key={member.id}
                href={`/web/faculty/detail/${member.id}`}
                className="block group"
              >

                <div>


                  <img
                    src={member.image}
                    alt={member.name}
                    className="
                      w-full
                    
                      object-cover
                      rounded-[15px]
                      grayscale-[2]
                      group-hover:grayscale-0
                      transition-all
                      duration-500
                    "
                  />



                  <div className="py-5">


                    <h4
                      className="
                        text-[21px]
                        md:text-[22px]
                        lg:text-[24px]
                        font-medium
                        text-[var(--secondary-color)]
                        mb-[10px]
                        group-hover:text-[var(--primary-color)]
                        transition-colors
                      "
                    >
                      {member.name}
                    </h4>



                    <span
                      className="
                        text-[var(--primary-color)]
                        block
                        mb-[15px]
                        md:mb-[20px]
                      "
                    >
                      {member.designation}
                    </span>



                    <p
                      className="
                        mt-[6px]
                        mb-0
                        text-[15px]
                        md:text-[16px]
                        leading-[138%]
                        text-[var(--text-color3)]
                        overflow-hidden
                        line-clamp-3
                        break-words
                      "
                    >
                      {stripHtml(member.bio)}
                    </p>


                  </div>


                </div>


              </Link>

            ))
          }


        </div>





        {/* Button */}

        <div className="text-center mt-10 lg:mt-[50px]">


          <Link
            href="web/faculty/faculty"
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
              ease-in-out
              hover:bg-[var(--secondary-color)]
              hover:text-white
            "
          >
            Meet All Faculty
          </Link>


        </div>


      </div>


    </section>

  );
}