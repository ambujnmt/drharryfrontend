import React, { useEffect, useState } from "react";
import { Link } from "@heroui/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { getCourses, fetchContact } from "../../utils/fetchApi";

export default function Footer() {

  const [programs, setPrograms] = useState([]);
  const [contact, setContact] = useState({});
  const fetchPrograms = async () => {
    try {

      const res = await getCourses();

      const latestCourses = res.courses
        .filter((item) => item.status == 1)
        .sort(
          (a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        )
        .slice(0, 5);


      setPrograms(latestCourses);


    } catch (error) {
      console.log(error);
    }
  };

  const fetchContactData = async () => {
    try {
      const res = await fetchContact();

      setContact(res.data || {});

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPrograms();
    fetchContactData();
  }, []);

  return (
    <section>
      {/* CTA Section */}
      <div className="bg-[#163554] py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full lg:w-8/12 text-center">
              <h3 className="text-white text-[32px] sm:text-[38px] md:text-[44px] lg:text-[50px] leading-tight mb-6">
                Ready to Transform Your Practice?
              </h3>

              <p className="text-white text-[16px] md:text-lg max-w-3xl mx-auto mb-8">
                Join the elite community of dentists who are mastering
                aesthetic dentistry and building thriving practices.
                Your journey to excellence starts here.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/web/cms/contactUs"
                  className="w-full sm:w-auto text-center bg-[var(--primary-color)] text-white text-[16px] px-6 py-3 rounded-[10px] transition-all duration-500 hover:bg-[var(--secondary-color)]"
                >
                  Apply Now
                </Link>

                <Link
                  href="#"
                  className="w-full sm:w-auto text-center border border-white text-white text-[16px] px-6 py-3 rounded-[10px] transition-all duration-500 hover:bg-[var(--secondary-color)]"
                >
                  Read More Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <section className="bg-[var(--secondary-color)] pt-14 lg:pt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Column 1 */}
            <div>
              <Link href="/">

              <img
                src="/assets/Images/footer-logo.png"
                alt="Footer Logo"
                className="w-[170px] lg:w-auto h-auto mb-5"
              />
              </Link>
              

              <p className="text-[#e1e1e1] text-[16px] md:text-[18px] font-extralight leading-[1.7]">
                Elevating the art and science of aesthetic dentistry through
                world-class education and mentorship.
              </p>

              <div className="mt-6">
                <ul className="flex items-center gap-3">
                  <li>
                    <Link
                      href={contact.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--primary-color)] transition-all"
                    >
                      <FaFacebookF />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={contact.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--primary-color)] transition-all"
                    >
                      <FaInstagram />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={contact.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--primary-color)] transition-all"
                    >
                      <FaYoutube />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-white text-[22px] md:text-[25px] mb-6">
                Programs
              </h4>

              <ul className="space-y-3">

                {programs.map((course) => (

                  <li key={course.id}>

                    <Link
                      href={`/web/courses/detail/${course.id}`}
                      className="text-[#e1e1e1] text-[16px] md:text-[18px] font-extralight hover:text-[var(--primary-color)]"
                    >

                      {
                        course.title
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")
                      }

                    </Link>

                  </li>

                ))}

              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white text-[22px] md:text-[25px] mb-6">
                Resources
              </h4>

              <ul className="space-y-3">
                {[
                  {
                    title: "About AAI",
                    link: "/web/about/about",
                  },
                  {
                    title: "Our Faculty",
                    link: "/web/faculty/faculty",
                  },
                  // {
                  //   title: "Membership Plans",
                  //   link: "/web/membership/membership",
                  // },
                  {
                    title: "Case Studies",
                    link: "/web/courses/courses",
                  },
                ].map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className="text-[#e1e1e1] text-[16px] md:text-[18px] font-extralight hover:text-[var(--primary-color)]"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-[22px] md:text-[25px] mb-6">
                Contact Us
              </h4>
              <ul className="space-y-5">

                {/* Address */}
                <li>
                  <Link
                    href={`https://maps.google.com/?q=${encodeURIComponent(contact.location)}`}
                    target="_blank"
                    className="text-[#e1e1e1] text-[18px] md:text-[22px] leading-[1.6] hover:text-[var(--primary-color)]"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                   {contact.location}
                  </Link>
                </li>


                {/* Phone */}
                <li>
                  <Link
                    href={`tel:${contact.phone}`}
                    className="text-[#e1e1e1] text-[18px] md:text-[22px] hover:text-[var(--primary-color)]"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {contact.phone}
                  </Link>
                </li>


                {/* Email */}
                <li>
                  <Link
                    href={`mailto:${contact.email}`}
                    className="text-[#e1e1e1] text-[18px] md:text-[22px] break-all hover:text-[var(--primary-color)]"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                   {contact.email}
                  </Link>
                </li>

              </ul>
            </div>

          </div>
        </div>
        {/* Copyright */}
        <div className="mt-12 md:mt-20 lg:mt-[120px] border-t border-white/20 py-5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

              <p className="text-[#e1e1e1] text-[15px] md:text-[18px] font-extralight">
                © 2026 Alliance Institute. All rights reserved.
              </p>

              <ul className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
                <li>
                  <Link
                    href="/web/cms/privacyPolicy"
                    className="text-[#e1e1e1] text-[15px] md:text-[18px] font-extralight hover:text-[var(--primary-color)] transition-all"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    href="/web/cms/terms"
                    className="text-[#e1e1e1] text-[15px] md:text-[18px] font-extralight hover:text-[var(--primary-color)] transition-all"
                  >
                    Terms of Service
                  </Link>
                </li>


              </ul>

            </div>
          </div>
        </div>
      </section>
    </section>
  );
}