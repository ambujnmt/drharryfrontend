import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/fetchApi'; // Adjust the path as per your project structure
import { Link } from '@heroui/react'; // Assuming you're using Hero UI for Link

export default function PatientAssignment() {
  const [usersByType, setUsersByType] = useState({
    socialWorkers: [],
    patients: [],
  });

  const [selected, setSelected] = useState({
    socialWorker: '',
    patients: [],
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [assignedPatients, setAssignedPatients] = useState({}); // Track assigned patients for each social worker

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      console.log('Fetched data:', data); // Check the fetched data

      if (data?.data) {
        const socialWorkers = data.data.filter(user => user.user_type === 2); // Social Worker user_type
        const patients = data.data.filter(user => user.user_type === 3); // Patient user_type

        setUsersByType({
          socialWorkers,
          patients,
        });
      }
    };

    loadUsers();

    const storedAssignedPatients = localStorage.getItem('assignedPatients');
    if (storedAssignedPatients) {
      setAssignedPatients(JSON.parse(storedAssignedPatients));
    }
  }, []);
  // Get IDs of all assigned patients
  const assignedPatientIds = Object.values(assignedPatients)
    .flat()
    .map(p => p.id);

  // Filter unassigned patients and apply search filter
  const filteredPatients = usersByType.patients
    .filter(patient => !assignedPatientIds.includes(patient.id))
    .filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Handle the selection of patients
  const handlePatientSelection = (patientId) => {
    setSelected(prev => {
      const updatedPatients = prev.patients.includes(patientId)
        ? prev.patients.filter(id => id !== patientId)
        : [...prev.patients, patientId];
      return { ...prev, patients: updatedPatients };
    });
  };

  // Handle social worker selection
  const handleSocialWorkerSelection = (socialWorkerId) => {
    setSelected(prev => ({ ...prev, socialWorker: socialWorkerId }));
  };

  // Assign patients to a social worker
  const handleAssignPatients = () => {
    if (!selected.socialWorker || selected.patients.length === 0) {
      alert('Please select a social worker and at least one patient');
      return;
    }

    const newAssignedPatients = { ...assignedPatients };
    if (!newAssignedPatients[selected.socialWorker]) {
      newAssignedPatients[selected.socialWorker] = [];
    }

    selected.patients.forEach(patientId => {
      const patient = usersByType.patients.find(p => p.id === patientId);
      const socialWorker = usersByType.socialWorkers.find(worker => worker.id === parseInt(selected.socialWorker));

      // Assign the social worker's name along with the patient details
      newAssignedPatients[selected.socialWorker].push({
        ...patient,
        socialWorkerName: socialWorker ? socialWorker.name : 'Unknown',
      });
    });

    setAssignedPatients(newAssignedPatients);
    localStorage.setItem('assignedPatients', JSON.stringify(newAssignedPatients));
    setSelected(prev => ({ ...prev, patients: [] }));
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-6">Patient Assignment</h2>

      {/* Social Worker Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Social Worker</label>
        <select
          value={selected.socialWorker}
          onChange={e => handleSocialWorkerSelection(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Social Worker --</option>
          {usersByType.socialWorkers.length > 0 ? (
            usersByType.socialWorkers.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))
          ) : (
            <option value="">No Social Workers Available</option>
          )}
        </select>
      </div>

      {/* Patient Dropdown with Search and Checkboxes */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Patients</label>
        <div className="relative">
          {/* Search input inside the dropdown */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name"
            className="w-full p-2 border rounded mb-2"
          />
          <div className="absolute left-0 right-0 max-h-40 overflow-y-auto border border-t-0">
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => {
                const isAssigned = Object.values(assignedPatients).some(
                  (assigned) => assigned.some(p => p.id === patient.id)
                );

                return (
                  <div key={patient.id} className="flex items-center p-2">
                    <input
                      type="checkbox"
                      id={`patient-${patient.id}`}
                      checked={selected.patients.includes(patient.id)}
                      onChange={() => handlePatientSelection(patient.id)}
                      className="mr-2"
                      disabled={isAssigned} // Disable if patient is already assigned
                    />
                    <label htmlFor={`patient-${patient.id}`} className="flex-1">{patient.name}</label>
                  </div>
                );
              })
            ) : (
              <p>No patients found</p>
            )}
          </div>
        </div>
      </div>

      {/* Assign Button */}
      <div className="mt-44">
        <button
          onClick={handleAssignPatients}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Assign Patients
        </button>
      </div>


    </div>
  );
}
