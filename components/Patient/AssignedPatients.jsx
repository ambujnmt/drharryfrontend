import React, { useContext, useEffect, useMemo, useState } from 'react';
import { fetchSocialWorkersWithPatients } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import { FaPen, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from '@heroui/react';

const RECORDS_PER_PAGE = 15;

export default function AssignedPatients() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { locale, translateText } = useContext(LanguageContext);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await fetchSocialWorkersWithPatients();
      if (response.status && Array.isArray(response.data)) {
        const data = response.data
          .filter(worker => worker.user_type === 2) // Social Workers
          .flatMap(worker =>
            (Array.isArray(worker.patients) ? worker.patients : []).map(patient => ({
              workerId: worker.user_id,
              workerName: worker.name,
              patientId: patient.patient_id,
              patientName: patient.name,
            }))
          );
        setAllData(data);
        setFilteredData(data);
      } else {
        setAllData([]);
        setFilteredData([]);
      }
      setLoading(false);
    };

    loadData();
    window.addEventListener('userTypeChanged', loadData);
    return () => window.removeEventListener('userTypeChanged', loadData);
  }, []);

  // Search filter
  useEffect(() => {
    const filtered = allData.filter(item =>
      item.workerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, allData]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / RECORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + RECORDS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{translateText("Assigned Patients")}</h2>
        <input
          type="text"
          placeholder={translateText("Search by Social Worker")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-xl"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : currentData.length === 0 ? (
        <p className="text-center text-gray-500">{translateText("No assigned patients found.")}</p>
      ) : (
        <table className="w-full table-auto border-collapse">
         <thead>
  <tr className="bg-gray-300 text-left">
    <th className="px-4 py-2">S.No.</th>
    <th className="px-4 py-2">{translateText("Social Worker")}</th>
    <th className="px-4 py-2">{translateText("Patient")}</th>
    <th className="px-4 py-2 text-center">{translateText("Action")}</th>
  </tr>
</thead>
<tbody>
  {currentData.map((item, index) => (
    <tr key={index} className="">
      <td className="px-4 py-2">{(currentPage - 1) * RECORDS_PER_PAGE + index + 1}</td>
      <td className="px-4 py-2">{item.workerName}</td>
      <td className="px-4 py-2">{item.patientName}</td>
      <td className="text-center px-4 py-2">
        <Link href="#" className="text-blue-600 hover:text-blue-800">
          <FaPen />
        </Link>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
          >
            <FaAngleLeft />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-full ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white  text-blue-500"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
          >
            <FaAngleRight />
          </button>
        </div>
      )}
    </div>
  );
}
