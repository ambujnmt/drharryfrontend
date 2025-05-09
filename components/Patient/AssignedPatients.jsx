import React, { useEffect, useState } from 'react';
import { fetchSocialWorkersWithPatients } from '../../utils/fetchApi'; // Adjust path as needed

export default function AssignedPatients() {
  const [socialWorkers, setSocialWorkers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchSocialWorkersWithPatients();
      if (response.status && response.data) {
        setSocialWorkers(response.data);
      }
    };

    loadData();
  }, []);

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-6">Assigned Patients</h2>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Social Worker</th>
            <th className="border px-4 py-2">Assigned Patients</th>
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
    </div>
  );
}
