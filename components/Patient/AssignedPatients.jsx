import React, { useEffect, useState } from 'react';
import { fetchAssignedPatients } from '../../utils/fetchApi'; // Adjust path as needed

export default function AssignedPatients() {
  const [socialWorkerName, setSocialWorkerName] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const loadPatients = async () => {
      const response = await fetchAssignedPatients(1); // Replace 1 with appropriate user_id
      console.log("Raw API response:", response);

      if (response.status && response.data) {
        setSocialWorkerName(response.data.user_details.name);
        setPatients(response.data.patients || []);
      }
    };

    loadPatients();
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
          <tr>
            <td className="border px-4 py-2">{socialWorkerName}</td>
            <td className="border px-4 py-2">
              <ul>
                {patients.map((patient) => (
                  <li key={patient.patient_id}>{patient.name}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
