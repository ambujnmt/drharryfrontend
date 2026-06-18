import { Link, Spinner } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { getCourses } from '../../../utils/fetchApi'

export default function EducationalPrograms() {
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

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

    useEffect(() => {
        fetchCourses();
    }, []);
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
                        {
                            loadingCourses ? (
                                <div className="col-span-3 text-center py-10">
                                    <Spinner color="warning" />
                                </div>
                            ) : (
                                courses.map((course) => (
                                    <div className="rounded-[10px] shadow-[rgba(0,0,0,0.20)_0px_2px_12px] overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-[200px] object-cover rounded-t-[12px]"
                                        />

                                        <div className="p-5">
                                            <h4 className="text-[20px] leading-[100%] font-semibold text-black">
                                                {course.title}
                                            </h4>

                                           
                                            <div
                                                className="prose max-w-none text-[16px] leading-[140%] font-normal text-black mt-4 w-full overflow-hidden line-clamp-2 break-words"
                                                dangerouslySetInnerHTML={{
                                                    __html: course.description,
                                                }}
                                            />

                                          <ul className="mt-4">
    {course?.course_highlights?.map((highlight, index) => (
        <li
            key={index}
            className="flex items-center text-[18px] text-[var(--secondary-color)] mt-2"
        >
            <img
                src="/assets/Images/check-icon.png"
                alt="image"
                className="w-[18px] mr-2"
            />

            {highlight}
        </li>
    ))}
</ul>

                                            <Link
                                                href={`/web/courses/detail/${course.id}`}
                                                className="block text-center bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white text-[16px] rounded-[8px] py-[9px] mt-5 transition-all duration-500 ease-in-out"
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
            </section>
        </>
    )
}
