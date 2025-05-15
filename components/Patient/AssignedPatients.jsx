import React, { useContext, useEffect, useState } from 'react';
import { fetchSocialWorkersWithPatients } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";

export default function AssignedPatients() {
  const [socialWorkers, setSocialWorkers] = useState([]);
  const { locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchSocialWorkersWithPatients();
      if (response.status && Array.isArray(response.data)) {
        const filteredWorkers = response.data
          .filter(worker => worker.user_type === 2) // Only Social Workers
          .map(worker => ({
            ...worker,
            patients: Array.isArray(worker.patients)
              ? worker.patients.filter(p => p.user_type === 3) // Only actual patients
              : []
          }))
          .filter(worker => worker.patients.length > 0); // Only if they have patients

        setSocialWorkers(filteredWorkers);
      } else {
        setSocialWorkers([]);
      }
    };

    loadData();

    // 🔁 Listen to user type change events to refresh immediately
    window.addEventListener('userTypeChanged', loadData);

    return () => {
      window.removeEventListener('userTypeChanged', loadData);
    };
  }, []);

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl text-center font-bold mb-6">{translateText("Assigned Patients")}</h2>

      {socialWorkers.length === 0 ? (
        <p className="text-center text-gray-500">{translateText("No assigned patients found.")}</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">{translateText("social_worker")}</th>
              <th className="border px-4 py-2">{translateText("Assigned Patients")}</th>
            </tr>
          </thead>
          <tbody>
            {socialWorkers.map((worker) => (
              <tr key={worker.user_id}>
                <td className="border px-4 py-2">{worker.name}</td>
                <td className="border px-4 py-2">
                  <ul>
                    {worker.patients.map((patient) => (
                      <li key={patient.patient_id}>{patient.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
