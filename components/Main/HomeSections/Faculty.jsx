import { Link } from "@heroui/react";
import React from "react";

export default function Faculty() {
  const faculty = [
    {
      image: "/assets/Images/dr-harry-ashitey.webp",
      name: "Dr. Harry Ashitey",
      role: "Founder of Alliance Aesthetic Institute",
      bio:
        "Dr. Harry Ashitey, DDS, is the founder of Alliance Aesthetic Institute, created with a vision to build a progressive, evidence-based educational alliance among dentists. With a strong clinical focus on cosmetic dentistry, dental implants, veneers, full-mouth rehabilitation, digital dentistry, and advanced restorative workflows, Dr. Ashitey is passionate about helping dentists elevate both their clinical confidence and practice success.His mission is to create a collaborative learning environment where dentists can share knowledge, refine techniques, embrace modern technology, and apply proven clinical principles to deliver exceptional patient outcomes. Through Alliance Aesthetic Institute, Dr. Ashitey aims to unite like-minded dental professionals who are committed to excellence, innovation, mentorship, and lifelong growth in modern dentistry.",
      large: true,
    },
    {
      image: "/assets/Images/fred-silva.jpg",
      name: "Dr. Fred Silva,",
      role: "Periodontist",
      bio:
        "Dr. Fred Silva, DDS, MS, is a periodontist with advanced surgical training in oral and maxillofacial surgery, periodontics, and implant dentistry. He received his DDS and completed oral and maxillofacial surgery residency training in Brazil, followed by post-doctoral training in Periodontics at the University of Michigan, an Implant Fellowship, and a Certificate in Periodontics with a Master’s degree from the University of Florida. He has also served as a Clinical Assistant Professor in the Department of Periodontics at Texas A&M College of Dentistry. As faculty of Alliance Aesthetic Institute, Dr.Silva brings deep expertise in periodontal surgery, implant placement, hard- and soft - tissue management, and interdisciplinary surgical treatment planning.His teaching background and surgical experience allow doctors to better understand the biologic foundation behind predictable esthetic and implant outcomes, especially in cases involving implants, grafting, tissue health, and long - term restorative stability.",
      large: false,
    },
    {
      image: "/assets/Images/darya-timin.jpg",
      name: "Dr. Darya Timin",
      role: "Cosmetic and Comprehensive Dentist",
      bio:
        "Dr. Darya Timin is a cosmetic and comprehensive dentist known for her artistic approach to smile transformation, advanced restorative care, and full-mouth rehabilitation. A graduate of NYU College of Dentistry with honors training in aesthetic dentistry, she has also completed advanced education at the Kois Center, giving her a strong foundation in predictable, functional, and beautiful dentistry.  Her clinical passion centers on creating natural-looking esthetic results with porcelain veneers, crowns, and comprehensive smile design. As faculty of Alliance Aesthetic Institute, Dr. Timin brings a refined eye for detail, a commitment to excellence, and a deep understanding of how cosmetic dentistry can restore confidence while improving long-term oral health.",
      large: true,
    },
    {
      image: "/assets/Images/Julio-Rodriguez.avif",
      name: "Dr. Julio Rodriguez",
      role: "Surgical Prosthodontist",
      bio:
        "Dr. Julio Rodriguez, DDS, MS, FACP, is a board-certified surgical prosthodontist and Diplomate of the American Board of Prosthodontics, with advanced expertise in implant surgery, full-mouth rehabilitation, digital prosthodontics, and same-day smile reconstruction. His clinical focus combines surgical precision with prosthodontic design, allowing him to treat complex cases involving missing, failing, or broken-down teeth with a strong emphasis on function, esthetics, and long-term stability.  As faculty of Alliance Aesthetic Institute, Dr. Rodriguez brings exceptional expertise in surgical prosthodontics, full-arch implant rehabilitation, restorative planning, and digital workflows. His passion for teaching helps doctors understand how to connect diagnosis, surgery, provisionalization, and definitive prosthetics into a predictable system for delivering beautiful, functional, and life-changing patient outcomes.",
      large: false,
    },
    {
      image: "/assets/Images/dr-riad-almasri-headshot-img.webp",
      name: "Dr. Riad Almasri",
      role: "Implant-prosthodontic surgeon, prosthodontist, and educator",
      bio:
        "Dr. Riad Almasri is a highly respected implant-prosthodontic surgeon, prosthodontist, and educator with advanced expertise in full-arch implant reconstruction, All-on-X treatment, immediate-load protocols, zygomatic implants, and complex implant rehabilitation. He completed specialty training in Prosthodontics at Nova Southeastern University, where he served as Chief Resident and taught dental implant surgery to residents. He is currently an adjunct faculty member in the postgraduate prosthodontics program at Nova Southeastern University and lectures nationally and internationally on implant dentistry and full-arch treatment concepts.As faculty of Alliance Aesthetic Institute, Dr. Almasri brings world-class surgical and restorative experience in All-on-X dentistry, combining prosthodontic precision, digital planning, implant surgery, and same-day smile transformation. His passion for teaching allows doctors to learn predictable full-arch workflows from diagnosis and treatment planning to surgery, conversion, prosthetics, and long-term success.",
      large: false,
    },

  ];

  return (
    <section className="bg-[#F3F3F3] py-[70px]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <div className="head-sec">
            <h2 className="font-[var(--head-font)] text-[50px]  leading-[105%] text-[var(--secondary-color)] mb-[15px]">
              Learn From the Best
            </h2>

            <h6 className="text-center text-[rgba(0,0,0,0.8)] text-[18px]">
              Our distinguished faculty comprises internationally recognized
            </h6>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-[50px]">
          {faculty.map((member, index) => (
            <div key={index}>
              <div>
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full object-cover rounded-[15px] grayscale-[2] hover:grayscale-0 transition-all duration-500 ${member.large ? "h-[360px]" : "h-[330px]"
                    }`}
                />

                <div className="py-[20px]">
                  <h4 className="text-[24px] font-medium text-[var(--secondary-color)] mb-[10px]">
                    {member.name}
                  </h4>

                  <span className="text-[var(--primary-color)] block mb-[20px]">
                    {member.role}
                  </span>

                  <p className="mt-[6px] mb-0 text-[16px] leading-[138%] text-[var(--text-color3)] w-full overflow-hidden line-clamp-3 break-words">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-[50px]">
          <Link
            href="#"
            className="inline-block border border-[var(--secondary-color)] text-[var(--secondary-color)] px-[32px] py-[15px] rounded-[10px] transition-all duration-500 ease-in-out hover:bg-[var(--secondary-color)] hover:text-white"
          >
            Meet All Faculty
          </Link>
        </div>
      </div>
    </section>
  );
}