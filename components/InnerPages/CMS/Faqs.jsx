'use client';

import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from "@heroui/react";
import { fetchFaqs } from "../../../utils/fetchApi";

export default function Faqs() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFaqs();
    }, []);

    const getFaqs = async () => {
        try {
            const response = await fetchFaqs();

            if (response.success) {
                setItems(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <section className="mt-[50px] bg-[var(--light-gold2)] py-[50px]">

            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="max-w-2xl mx-auto text-center mb-10">

                    <h2
                        className="
                            text-[32px]
                            md:text-[42px]
                            lg:text-[50px]
                            font-medium
                            mb-4
                            leading-[105%]
                            text-[var(--secondary-color)]
                        "
                    >
                        Frequently Asked Questions
                    </h2>

                    <p
                        className="
                            text-[#000c]
                            text-[16px]
                            md:text-[18px]
                            lg:text-[20px]
                            mb-[15px]
                            leading-[138%]
                        "
                    >
                        Everything you need to know about AAI courses
                    </p>

                </div>

                <div className="grid grid-cols-12 gap-4">

                    <div className="hidden lg:block col-span-2"></div>

                    <div
                        className="
                            col-span-12
                            md:col-span-10
                            md:col-start-2
                            lg:col-span-8
                            lg:col-start-3
                        "
                    >

                        {loading ? (

                            <div className="text-center py-10">
                                Loading FAQs...
                            </div>

                        ) : (

                            <Accordion
                                variant="splitted"
                                className="w-full"
                            >

                                {items.map((item) => (

                                    <AccordionItem
                                        key={item.id}
                                        aria-label={item.question}
                                        title={
                                            <span
                                                className="
                                                    text-[16px]
                                                    md:text-[18px]
                                                    lg:text-[20px]
                                                    leading-[138%]
                                                    text-[var(--secondary-color)]
                                                "
                                                style={{
                                                    fontFamily: "Inter, sans-serif"
                                                }}
                                            >
                                                {item.question}
                                            </span>
                                        }
                                    >

                                        <p
                                            className="
                                                text-[14px]
                                                md:text-[16px]
                                                leading-[140%]
                                            "
                                        >
                                            {item.answer}
                                        </p>

                                    </AccordionItem>

                                ))}

                            </Accordion>

                        )}

                    </div>

                    <div className="hidden lg:block col-span-2"></div>

                </div>

            </div>

        </section>

    );
}