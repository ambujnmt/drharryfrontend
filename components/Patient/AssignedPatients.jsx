import React, { useState, useEffect } from 'react';

export default function AssignedPatients() {
  const [assignedPatients, setAssignedPatients] = useState({});

  useEffect(() => {
    const storedAssignedPatients = localStorage.getItem('assignedPatients');
    if (storedAssignedPatients) {
      setAssignedPatients(JSON.parse(storedAssignedPatients));
    }
  }, []);

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-6">Assigned Patients</h2>

      {/* Table to display assigned patients */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Social Worker</th>
            <th className="border px-4 py-2">Assigned Patients</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(assignedPatients).map(([socialWorkerId, patients]) => {
            const socialWorkerName = patients.length > 0 ? patients[0].socialWorkerName : 'Not Available';
            return (
              <tr key={socialWorkerId}>
                <td className="border px-4 py-2">{socialWorkerName}</td>
                <td className="border px-4 py-2">
                  <ul>
                    {patients.map(patient => (
                      <li key={patient.id}>{patient.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
