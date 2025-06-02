import React, { useContext, useEffect, useState } from 'react';
import { fetchSocialWorkersWithPatients ,deleteAssignedScheduler} from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import { FaPen, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link, useDisclosure, Button } from '@heroui/react';
import Tmodal from '../Tmodal/Tmodal';
import { MdDelete } from "react-icons/md";

const RECORDS_PER_PAGE = 15;

export default function AssignedPatients() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const { locale, translateText } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await fetchSocialWorkersWithPatients();
      if (response.status && Array.isArray(response.data)) {
        const data = response.data
          .filter(worker => worker.user_type === 2) // Social Workers only
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

  // Filter based on search term
  useEffect(() => {
    const filtered = allData.filter(item =>
      item.workerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, allData]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / RECORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + RECORDS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedWorkerId || !selectedPatientId) return;

    setLoading(true);

    const res = await deleteAssignedScheduler({
      user_id: selectedWorkerId,
      patient_id: selectedPatientId
    });

    setMessage(res.message || "");

    if (res.status) {
      // Remove the deleted patient from allData and filteredData
      setAllData(prev => prev.filter(item => !(item.workerId === selectedWorkerId && item.patientId === selectedPatientId)));
      setFilteredData(prev => prev.filter(item => !(item.workerId === selectedWorkerId && item.patientId === selectedPatientId)));
    }

    setSelectedWorkerId(null);
    setSelectedPatientId(null);
    setLoading(false);
    onClose();

    // Optional: clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
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

      {message && (
        <div className="my-4 text-center font-semibold text-md text-red-500">
          {message}
        </div>
      )}

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
              <tr key={`${item.workerId}-${item.patientId}`}>
                <td className="px-4 py-2">{startIndex + index + 1}</td>
                <td className="px-4 py-2">{item.workerName}</td>
                <td className="px-4 py-2">{item.patientName}</td>
                <td className="flex justify-center text-center px-4 py-2 space-x-2">
                  <Link href="#" className="text-blue-600 hover:text-blue-800">
                    <FaPen />
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedWorkerId(item.workerId);
                      setSelectedPatientId(item.patientId);
                      onOpen();
                    }}
                    aria-label="Delete assigned patient"
                  >
                    <MdDelete className="text-xl text-blue-600 hover:text-blue-800" />
                  </button>
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
              className={`px-3 py-1 rounded-full ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"
              }`}
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

      <Tmodal
        isOpen={isOpen}
        onClose={onClose}
        title={translateText("Are you sure you want to remove this assigned patient?")}
        footer={
          <>
            <Button color="danger" variant="light" onPress={onClose}>
              {translateText("Cancel")}
            </Button>
            <Button disabled={loading} color="primary" onPress={handleDeleteConfirm}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                translateText("Confirm")
              )}
            </Button>
          </>
        }
      />

      
    </div>
  );
}
