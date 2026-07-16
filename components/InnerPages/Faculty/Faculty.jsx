import { Link, Spinner } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { getFaculty } from "../../../utils/fetchApi";
import BreadCrumb from "../../Breadcrumb/BreadCrumb";

export default function Detail() {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchFaculty();
    }, []);

    const fetchFaculty = async () => {
        try {
            setLoading(true);

            const res = await getFaculty();

            if (res.status) {
                const activeFaculty = res.faculty.filter(
                    (item) => item.status === 1
                );

                setFaculty(activeFaculty);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
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
        <>
           <BreadCrumb
                      title="Faculty"
                      breadcrumb={[
                        "Home",
                        "Faculty",
                      ]}
                    />
        <div className="container mx-auto py-10">

            {loading ? (
                <div className="flex min-h-[400px] items-center justify-center">
                    <Spinner size="lg" color="warning" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 mt-[50px] md:grid-cols-2 lg:grid-cols-4">
                    {faculty.map((member) => (
                        <Link
                            key={member.id}
                            href={`/web/faculty/detail/${member.id}`}
                            className="block group"
                        >
                            <div>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-[330px] object-cover rounded-[15px] grayscale-[2] group-hover:grayscale-0 transition-all duration-500"
                                />

                                <div className="py-[20px]">
                                    <h4 className="text-[24px] font-medium text-[var(--secondary-color)] mb-[10px] group-hover:text-[var(--primary-color)] transition-colors">
                                        {member.name}
                                    </h4>

                                    <span className="text-[var(--primary-color)] block mb-[20px]">
                                        {member.designation}
                                    </span>

                                    <p className="mt-[6px] mb-0 text-[16px] leading-[138%] text-[var(--text-color3)] overflow-hidden line-clamp-3 break-words">
                                        {stripHtml(member.bio)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
        </>
    );
}
