import { useState, useEffect } from "react";
import { getCaseCategories, getCases } from "../../../utils/fetchApi";
import { Link, Spinner } from "@heroui/react";

function CaseCard({ title, img, desc, doctor, weeks }) {
  return (
    <div className="bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.20)] mb-[30px] overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-[200px] object-cover rounded-t-[10px]"
      />
      <div className="p-5">
        <h4 className="text-[28px]">{title}</h4>
        <div
          className="text-[16px] text-black mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
        <span className="text-[16px] text-black/50 font-normal leading-[140%]">
          by&nbsp;{doctor}
        </span>
        <div className="mt-[30px] flex items-center justify-between">
          <p className="text-[16px] text-black/50 font-normal leading-[140%] m-0">
            Treatment:&nbsp;{weeks} weeks
          </p>
          <Link
            href="#"
            className="text-[var(--primary-color)] text-[18px] transition-all duration-500 hover:text-[var(--secondary-color)]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ClinicLibrary() {
  // const [activeTab, setActiveTab] = useState("AllCases");
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCategories();
    fetchCases();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCaseCategories();

      if (res.status) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCases = async () => {
    try {
      setLoading(true);

      const res = await getCases();

      if (res.status) {
        setCases(res.data);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCases =
    activeTab === "all"
      ? cases
      : cases.filter(
        (item) => item.category_id === Number(activeTab)
      );

  return (
    <section className="bg-[#f5f0e8] py-[70px]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-[50px] leading-[105%] text-gray-900 mb-2">
            Clinical Case Library
          </h2>
          <h6 className="text-[20px] leading-[138%] text-[#000] font-normal ">
            Explore our comprehensive collection of <br />
            documented clinical cases
          </h6>
        </div>

        {/* Tab Nav */}
        <div className="flex p-6 bg-white mx-16 rounded-xl shadow-md flex-wrap justify-evenly gap-2 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-full text-[16px] font-medium transition-all duration-300 ${activeTab === "all"
              ? "bg-[var(--primary-color)] text-white"
              : "text-black bg-[#F5F2EC]"
              }`}
          >
            All Cases
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-2.5 rounded-full text-[16px] font-medium transition-all duration-300 ${activeTab === category.id
                ? "bg-[var(--primary-color)] text-white"
                : "text-black bg-[#F5F2EC] hover:bg-[var(--secondary-color)] hover:text-white"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="text-center py-20">
            <h4 className="text-2xl font-semibold text-gray-700">
              No clinical cases found
            </h4>
            <p className="text-gray-500 mt-2">
              There are currently no cases available in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((c) => (
              <CaseCard
                key={c.id}
                title={c.title}
                img={c.image}
                desc={c.description}
                doctor={c.doctor}
                weeks={c.treatment_weeks}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredCases.length > 0 && !loading && (
          <div className="text-center mt-[50px]">
            <Link
              href="#"
              className="inline-block text-[var(--secondary-color)] border border-[var(--secondary-color)] px-8 py-[15px] rounded-[10px] transition-all duration-500 hover:bg-[var(--secondary-color)] hover:text-white"
            >
              Load More Cases
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
