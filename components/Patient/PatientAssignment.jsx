import React, { useEffect, useState } from 'react';
import { fetchUsers, postPatientAssignment, fetchAssignedPatients } from '../../utils/fetchApi';

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
  const [assignedPatientIds, setAssignedPatientIds] = useState([]); // Will now be fetched per social worker
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Spinner state

  useEffect(() => {
    const loadData = async () => {
      const usersData = await fetchUsers();

      if (usersData?.data) {
        const socialWorkers = usersData.data.filter(user => user.user_type === 2);
        const patients = usersData.data.filter(user => user.user_type === 3);

        setUsersByType({ socialWorkers, patients });

        const assignedResults = await Promise.all(
          socialWorkers.map(sw => fetchAssignedPatients(sw.id))
        );

        const allAssignedIdsSet = new Set();
        assignedResults.forEach(assignedIds => {
          assignedIds.forEach(id => allAssignedIdsSet.add(id));
        });

        setAssignedPatientIds(Array.from(allAssignedIdsSet));
      }
    };

    loadData();
  }, []);


  const filteredPatients = usersByType.patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientSelection = (patientId) => {
    setSelected(prev => {
      const updatedPatients = prev.patients.includes(patientId)
        ? prev.patients.filter(id => id !== patientId)
        : [...prev.patients, patientId];
      return { ...prev, patients: updatedPatients };
    });
  };

  const handleSocialWorkerSelection = (socialWorkerId) => {
    setSelected({ socialWorker: socialWorkerId, patients: [] });
  };

const handleAssignPatients = async () => {
  setSuccessMessage('');
  setErrorMessage('');

  if (!selected.socialWorker || selected.patients.length === 0) {
    setErrorMessage('Please select a social worker and at least one patient.');
    setTimeout(() => setErrorMessage(''), 1000);
    return;
  }

  try {
    setLoading(true); // start loader
    const existingAssigned = await fetchAssignedPatients(selected.socialWorker);
    const mergedPatientIds = Array.from(new Set([...existingAssigned, ...selected.patients]));

    const payload = {
      user_id: selected.socialWorker,
      patient_ids: mergedPatientIds,
    };

    const response = await postPatientAssignment(payload);

    if (response.status) {
      setSuccessMessage(response.message);
      setErrorMessage('');

      const socialWorkers = usersByType.socialWorkers;
      const allAssignedIdsSet = new Set();

      for (const sw of socialWorkers) {
        const assignedIds = await fetchAssignedPatients(sw.id);
        assignedIds.forEach(id => allAssignedIdsSet.add(id));
      }

      setAssignedPatientIds(Array.from(allAssignedIdsSet));
      setSelected({ socialWorker: '', patients: [] });

      // Wait before hiding success message and stopping the loader
      setTimeout(() => {
        setSuccessMessage('');
        setLoading(false); // stop loader only after success message is shown
      }, 1000);

    } else {
      setErrorMessage(response.message);
      setSuccessMessage('');
      setLoading(false); // stop loader immediately on failure
      setTimeout(() => setErrorMessage(''), 1000);
    }
  } catch (error) {
    setErrorMessage('Something went wrong. Please try again.');
    setSuccessMessage('');
    setLoading(false);
    setTimeout(() => setErrorMessage(''), 1000);
  }
};

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-6">Patient Assignment</h2>

      {successMessage && <div className="text-green-600 font-medium mb-4">{successMessage}</div>}
      {errorMessage && <div className="text-red-600 font-medium mb-4">{errorMessage}</div>}

      {/* Social Worker Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Social Worker</label>
        <select
          value={selected.socialWorker}
          onChange={e => handleSocialWorkerSelection(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Social Worker --</option>
          {usersByType.socialWorkers.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      {/* Patient Search and List */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Patients</label>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="w-full p-2 border rounded mb-2"
        />
        <div className="border max-h-40 overflow-y-auto">
          {filteredPatients.map(patient => {
            const isAssigned = assignedPatientIds.includes(Number(patient.id));
            return (
              <div key={patient.id} className="flex items-center p-2">
                <input
                  type="checkbox"
                  id={`patient-${patient.id}`}
                  checked={selected.patients.includes(patient.id)}
                  onChange={() => handlePatientSelection(patient.id)}
                  className="mr-2"
                  disabled={isAssigned}
                />
                <label htmlFor={`patient-${patient.id}`} className="flex-1">
                  {patient.name} {isAssigned && <span className="text-gray-500">(Already Assigned)</span>}
                </label>
              </div>
            );
          })}

        </div>
      </div>

      {/* Assign Button */}
      <button
        onClick={handleAssignPatients}
        className="rounded-xl p-2 bg-blue-500 text-white mx-auto block"
        disabled={loading}

      >{loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
      ) : (
        'Assign Patients'
      )}

      </button>
    </div>
  );
}
