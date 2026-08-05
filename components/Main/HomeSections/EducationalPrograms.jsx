import { Link, Spinner } from "@heroui/react";
import React, { useEffect, useRef, useState } from "react";
import { getCourses } from "../../../utils/fetchApi";
import Tmodal from "../../Tmodal/Tmodal"

export default function EducationalPrograms() {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [openVideo, setOpenVideo] = useState(false);
const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);

      const res = await getCourses();

      const activeCourses = res.courses.filter(
        (item) => item.status == 1
      );

      setCourses(activeCourses);

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleCloseVideo = () => {

    if (videoRef.current) {

        videoRef.current.pause();

        videoRef.current.currentTime = 0;

    }

    setOpenVideo(false);

};


  useEffect(() => {
    fetchCourses();
  }, []);


  return (
    <section className="mt-[60px] md:mt-[75px] lg:mt-[90px]">

      <div className="container mx-auto px-4">


        {/* Heading */}
        <div className="flex justify-center">

          <div className="w-full">

            <div className="text-center">

              <h2
                className="
                  font-[var(--head-font)]
                  text-[var(--secondary-color)]
                  text-[34px]
                  sm:text-[40px]
                  md:text-[45px]
                  lg:text-[50px]
                  mb-4
                  leading-[105%]
                "
              >
                Educational Programs
              </h2>


              <h6
                className="
                  text-[#000c]
                  text-[16px]
                  sm:text-[18px]
                  md:text-[20px]
                  mb-[15px]
                  leading-[138%]
                "
              >
                Comprehensive training across five core pillars
                <br className="hidden sm:block" />
                of aesthetic and implant dentistry
              </h6>

            </div>

          </div>

        </div>



        {/* Cards */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            lg:gap-8
            mt-8
            lg:mt-12
          "
        >


          {
            loadingCourses ? (

              <div className="col-span-full text-center py-10">
                <Spinner color="warning" />
              </div>

            ) : (

              courses.map((course) => (

                <div
                  key={course.id}
                  className="
                    rounded-[10px]
                    shadow-[rgba(0,0,0,0.20)_0px_2px_12px]
                    overflow-hidden
                    bg-white
                  "
                >


                  {/* Image */}
                  {/* <img
                    src={course.image}
                    alt={course.title}
                    className="
                      w-full
                      object-cover
                      rounded-t-[12px]
                    "
                  /> */}
                  
                  {course.media_type === "image" ? (

<img
    src={course.image}
    alt={course.title}
    className="
        w-full
        object-cover
        rounded-t-[12px]
    "
/>

) : (

<div
    className="
        relative
        cursor-pointer
        overflow-hidden
        rounded-t-[12px]
        group
    "
    onClick={() => {
    setSelectedVideo(course.video);
    setOpenVideo(true);
}}
>

    <img
        src={course.image}
        alt={course.title}
        className="
            w-full
            object-cover
            transition
            duration-300
            group-hover:scale-105
        "
    />

    <div
        className="
            absolute
            inset-0
            bg-black/35
            flex
            justify-center
            items-center
        "
    >

        <div
            className="
                w-16
                h-16
                rounded-full
                bg-white
                flex
                justify-center
                items-center
                shadow-lg
            "
        >

            ▶

        </div>

    </div>

</div>

)}



                  <div className="p-5">


                    <h4
                      className="
                        text-[18px]
                        md:text-[20px]
                        leading-[110%]
                        font-semibold
                        text-black
                      "
                    >
                      {course.title}
                    </h4>



                    <div
                      className="
                        prose
                        max-w-none
                        text-[15px]
                        md:text-[16px]
                        leading-[140%]
                        font-normal
                        text-black
                        mt-4
                        w-full
                        overflow-hidden
                        line-clamp-2
                        break-words
                      "
                      dangerouslySetInnerHTML={{
                        __html: course.description,
                      }}
                    />




                    <ul className="mt-4">

                      {course?.course_highlights?.map(
                        (highlight, index) => (

                          <li
                            key={index}
                            className="
                              flex
                              items-start
                              text-[16px]
                              md:text-[18px]
                              text-[var(--secondary-color)]
                              mt-2
                            "
                          >

                            <img
                              src="/assets/Images/check-icon.png"
                              alt="check"
                              className="
                                w-[16px]
                                md:w-[18px]
                                mr-2
                                mt-1
                                flex-shrink-0
                              "
                            />

                            <span>
                              {highlight}
                            </span>

                          </li>

                        )
                      )}

                    </ul>




                    <Link
                      href={`/web/courses/detail/${course.id}`}
                      className="
                        block
                        text-center
                        bg-[var(--secondary-color)]
                        hover:bg-[var(--primary-color)]
                        text-white
                        text-[15px]
                        md:text-[16px]
                        rounded-[8px]
                        py-[9px]
                        mt-5
                        transition-all
                        duration-500
                        ease-in-out
                      "
                    >
                      Learn More
                    </Link>


                  </div>


                </div>

              ))

            )
          }


        </div>


      </div>
<Tmodal
    isOpen={openVideo}
    onClose={handleCloseVideo}
>
    <div className="p-2">
        {selectedVideo && (
            <video
                ref={videoRef}
                src={selectedVideo}
                controls
                autoPlay
                className="w-full rounded-lg"
            />
        )}
    </div>
</Tmodal>
    </section>
  );
}