import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Breadcrumb/BreadCrumb";
import { Input, Link, Spinner } from "@heroui/react";
import { fetchContact, submitContactEnquiry } from "../../../utils/fetchApi";

import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";

export default function ContactUs() {
    const [loading, setLoading] = useState(true);
    const [contact, setContact] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [responseType, setResponseType] = useState("");
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        loadContact();
    }, []);

    const loadContact = async () => {
        try {
            const res = await fetchContact();
            setContact(res.data || {});
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.phone || !form.email || !form.message) {
            setResponseType("error");
            setResponseMessage("Please fill all fields.");

            setTimeout(() => {
                setResponseMessage("");
                setResponseType("");
            }, 3000);

            return;
        }

        try {
            setSubmitting(true);

            const res = await submitContactEnquiry(form);

            setResponseType("success");
            setResponseMessage(res.message);

            setForm({
                name: "",
                phone: "",
                email: "",
                message: "",
            });

            setTimeout(() => {
                setResponseMessage("");
                setResponseType("");
            }, 3000);
        } catch (error) {
            setResponseType("error");
            setResponseMessage(
                error.message
            );

            setTimeout(() => {
                setResponseMessage("");
                setResponseType("");
            }, 3000);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="py-32 flex justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <>
            <BreadCrumb
                title="Contact Us"
                breadcrumb={["Home", "Contact Us"]}
            />

            <section className="max-w-7xl mx-auto px-5 py-8 md:py-12 lg:py-20">

                <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 lg:mb-16">

                    <p className="uppercase tracking-[3px] text-[#C89B3C] font-semibold">
                        Contact Us
                    </p>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl  font-bold mt-4">
                        Choose Your Preferred Contact Method
                    </h2>

                    <p className="text-gray-600 mt-5 text-sm md:text-md lg:text-lg">
                        Multiple channels designed for your convenience.
                        All inquiries routed to specialized teams for faster resolution.
                    </p>

                </div>

                {/* FORM */}
                {responseMessage && (
                    <div
                        className={`mb-5 text-center font-medium ${responseType === "success"
                            ? " text-green-700"
                            : " text-red-700"
                            }`}
                    >
                        {responseMessage}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl rounded-3xl p-5 md:p-7 lg:p-10"
                >

                    <div >
                        <div className="grid md:grid-cols-3 gap-6">

                            <Input
                                className="xs:w-fit md:w-full border rounded-xl"
                                placeholder="Full Name"
                                value={form.name}
                                variant="primary"
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />

                            <Input
                                className="xs:w-fit md:w-full border rounded-xl"
                                placeholder="Phone Number"
                                variant="primary"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />

                            <Input
                                className="xs:w-fit md:w-full border rounded-xl"
                                placeholder="Email Address"
                                value={form.email}
                                variant="primary"
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        <div className="mt-5">
                            <textarea
                                rows={6}
                                className="w-full border rounded-xl p-4 resize-none"
                                placeholder="Message"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-8 bg-black text-white px-10 py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {submitting ? (
                            <>
                                <Spinner size="sm" color="white" />
                                Sending...
                            </>
                        ) : (
                            "Send Message"
                        )}
                    </button>

                </form>

                {/* CONTACT CARDS */}

                <div className="grid md:grid-cols-3 gap-8 mt-20">

                    <div className="border rounded-2xl p-8 text-center">

                        <FaMapMarkerAlt className="mx-auto text-3xl mb-4 text-[#C89B3C]" />

                        <h4 className="font-bold text-xl mb-3">Location</h4>

                        <p>{contact.location}</p>

                    </div>

                    <div className="border rounded-2xl p-8 text-center">

                        <FaPhoneAlt className="mx-auto text-3xl mb-4 text-[#C89B3C]" />

                        <h4 className="font-bold text-xl mb-3">Call Us</h4>

                        <Link
                            href={`tel:${contact.phone}`}
                            className="hover:text-[#C89B3C] text-black"
                        >
                            {contact.phone}
                        </Link>

                    </div>

                    <div className="border rounded-2xl p-8 text-center">

                        <FaEnvelope className="mx-auto text-3xl mb-4 text-[#C89B3C]" />

                        <h4 className="font-bold text-xl mb-3">Email</h4>

                        <Link
                            href={`mailto:${contact.email}`}
                            className="hover:text-[#C89B3C] text-black"
                        >
                            {contact.email}
                        </Link>

                    </div>

                    <div className="border rounded-2xl p-8 text-center">

                        <FaFacebookF className="mx-auto text-3xl mb-4 text-[#C89B3C]" />

                        <h4 className="font-bold text-xl mb-3">Facebook</h4>

                        <Link
                            href={contact.facebook}
                            target="_blank"
                            rel="noreferrer"
                            className="text-black hover:text-[#C89B3C]"
                        >
                            Visit Facebook
                        </Link>

                    </div>

                    <div className="border rounded-2xl p-8 text-center">

                        <FaInstagram className="mx-auto text-3xl mb-4 text-[#C89B3C]" />

                        <h4 className="font-bold text-xl mb-3">Instagram</h4>

                        <Link
                            href={contact.instagram}
                            target="_blank"
                            rel="noreferrer"
                             className="text-black hover:text-[#C89B3C]"
                        >
                            Visit Instagram
                        </Link>

                    </div>

                    <div className="border rounded-2xl p-8 text-center">

                        <FaYoutube className="mx-auto text-3xl mb-4 text-[#C89B3C]" />

                        <h4 className="font-bold text-xl mb-3">YouTube</h4>

                        <Link
                            href={contact.youtube}
                            target="_blank"
                            rel="noreferrer"
                             className="text-black hover:text-[#C89B3C]"
                        >
                            Visit YouTube
                        </Link>

                    </div>

                </div>

                {/* MAP */}


            </section>
            <div className="">
       <iframe
    title="Google Map"
    src={`https://www.google.com/maps?q=${encodeURIComponent(contact.location)}&output=embed`}
    className="w-full h-[500px]"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
/>
            </div>
        </>
    );
}