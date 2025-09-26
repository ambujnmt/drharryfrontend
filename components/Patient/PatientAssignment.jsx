import React, { useContext, useEffect, useState } from 'react';
import { fetchUsers, postPatientAssignment, fetchAssignedPatients, fetchSocialWorkersWithPatients } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import PageTitle from '../Breadcrumb/PageTitle';
import { Card, Col, Row, Spinner, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Head } from '../../layouts/head';

export default function PatientAssignment() {
  const [usersByType, setUsersByType] = useState({
    socialWorkers: [],
    patients: [],
  });

  const [selected, setSelected] = useState({
    socialWorker: '',
    patients: [],
  });

  const { locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [assignedPatientIds, setAssignedPatientIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentWorkerAssignedPatients, setCurrentWorkerAssignedPatients] = useState([]);

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

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

  const handleSocialWorkerSelection = async (socialWorkerId) => {
    setSelected({ socialWorker: socialWorkerId, patients: [] });

    try {
      const response = await fetchSocialWorkersWithPatients();
      if (response.status) {
        const selectedWorker = response.data.find(worker => worker.user_id.toString() === socialWorkerId.toString());

        if (selectedWorker) {
          const assignedPatientIds = selectedWorker.patients.map(p => p.patient_id);
          setSelected({ socialWorker: socialWorkerId, patients: assignedPatientIds });
          setCurrentWorkerAssignedPatients(assignedPatientIds);
        }
      }
    } catch (error) {
      console.error("Error fetching social worker's patients:", error);
    }
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
      setLoading(true);
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
        setCurrentWorkerAssignedPatients([]);

        setTimeout(() => {
          setSuccessMessage('');
          setLoading(false);
        }, 1000);
      } else {
        setErrorMessage(response.message);
        setSuccessMessage('');
        setLoading(false);
        setTimeout(() => setErrorMessage(''), 1000);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
      setSuccessMessage('');
      setLoading(false);
      setTimeout(() => setErrorMessage(''), 1000);
    }
  };

  const selectedWorkerName = usersByType.socialWorkers.find(sw => sw.id.toString() === selected.socialWorker.toString())?.name;

  return (
    <div className='m-4'>
       <Head title="Patient Assignment" />
      <style jsx>{`
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .patient-card {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .patient-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .patient-card.selected {
          border-color: #3b82f6;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .patient-card.disabled {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          opacity: 0.6;
        }
        
        .custom-checkbox {
          width: 15px;
          height: 15px;
          border: 2px solid #d1d5db;
          border-radius: 6px;
          position: relative;
          transition: all 0.2s ease;
        }
        
        .custom-checkbox:checked {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-color: #3b82f6;
        }
        
        .custom-checkbox:checked::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        
        .floating-button {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        }
        
        .floating-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
        }
        
        .floating-button:disabled {
          background: #9ca3af;
          box-shadow: none;
          transform: none;
        }
        
        .search-container {
          position: relative;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }
        
        .custom-select {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .custom-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          outline: none;
        }
        
        .stats-card {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 1px solid #bae6fd;
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
      `}</style>

      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Patient Assignment", active: true },
        ]}
        title={translateText("Patient Assignment")}
      />

      <Row>
        <Col lg={8}>
          <Card className="glass-card border-0">
            <Card.Body className="p-4">
              {/* Success/Error Messages */}
              {successMessage && (
                <div className="text-green-500 mb-4 flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-red-500 p-4 rounded-lg mb-4 flex items-center">
                  <span className="text-red-500 mr-2">⚠</span>
                  {errorMessage}
                </div>
              )}

              {/* Social Worker Selection */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-3 text-gray-700">
                  <span className="inline-block w-8 h-8 bg-blue-500 text-white rounded-full text-center leading-8 mr-3">
                    👨‍⚕️
                  </span>
                  {translateText("Select Social Worker")}
                </label>
                <select
                  value={selected.socialWorker}
                  onChange={e => handleSocialWorkerSelection(e.target.value)}
                  className="custom-select w-full p-1.5 rounded-lg text-md"
                >
                  <option value="">{translateText("Choose a social worker...")}</option>
                  {usersByType.socialWorkers.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              {/* Patient Selection */}
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-3 text-gray-700">
                  <span className="inline-block w-8 h-8 bg-green-500 text-white rounded-full text-center leading-8 mr-3">
                    👥
                  </span>
                  {translateText("Select Patients")}
                </label>

                {/* Search Bar */}
                <div className="search-container mb-4">
                  <div className="search-icon">🔍</div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={translateText("Search patients by name...")}
                    className="w-full pl-10 pr-1 py-1.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Patient List */}
                <div className="max-h-44 overflow-y-auto space-y-3 border-2 border-gray-100 rounded-lg p-3">
                  {filteredPatients.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <span className="text-4xl mb-4 block">🔍</span>
                      <p>{translateText("No patients found matching your search")}</p>
                    </div>
                  ) : (
                    filteredPatients.map(patient => {
                      const isAssignedToCurrentWorker = selected.socialWorker
                        ? currentWorkerAssignedPatients.includes(patient.id)
                        : false;
                      const isSelected = selected.patients.includes(patient.id);

                      return (
                        <div
                          key={patient.id}
                          className={`patient-card p-2 rounded-lg cursor-pointer ${isSelected ? 'selected' : ''
                            } ${isAssignedToCurrentWorker ? 'disabled cursor-not-allowed' : ''}`}
                          onClick={() => !isAssignedToCurrentWorker && handlePatientSelection(patient.id)}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="custom-checkbox mr-2"
                              checked={isSelected}
                              onChange={e => {
                                e.stopPropagation(); // prevent div onClick from double-firing
                                if (!isAssignedToCurrentWorker) handlePatientSelection(patient.id);
                              }}
                              onClick={e => e.stopPropagation()} // prevent parent div's onClick
                              disabled={isAssignedToCurrentWorker}
                            />

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800 text-sm">
                                  {patient.name}
                                </span>
                                {isAssignedToCurrentWorker && (
                                  <Badge bg="secondary" className="ml-2">
                                    {translateText("Already Assigned")}
                                  </Badge>
                                )}
                              </div>
                              {isAssignedToCurrentWorker && (
                                <p className="text-sm text-gray-500 mt-0 mb-0">
                                  {translateText("This patient is already assigned to you")}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Assign Button */}
              <div className="text-center">
                <button
                  onClick={handleAssignPatients}
                  className="floating-button text-white px-3 py-2 rounded-lg font-medium text-md transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      {translateText("Assigning...")}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">✨</span>
                      {translateText("Assign Patients")}
                    </div>
                  )}
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Stats Card */}
          <Card className="stats-card border-0 mb-4">
            <Card.Body className="p-6">
              <h5 className="font-bold text-gray-700 mb-4">
                📊 {translateText("Assignment Summary")}
              </h5>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{translateText("Total Social Workers")}</span>
                  <Badge bg="primary" className="text-lg px-3 py-1">
                    {usersByType.socialWorkers.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{translateText("Total Patients")}</span>
                  <Badge bg="success" className="text-lg px-3 py-1">
                    {usersByType.patients.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{translateText("Selected Patients")}</span>
                  <Badge bg="warning" className="text-lg px-3 py-1">
                    {/* {selected.patients.length} */}
                    {selected.patients.filter(
                      (id) => !currentWorkerAssignedPatients.includes(id)
                    ).length}

                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Selected Worker Info */}
          {selectedWorkerName && (
            <Card className="glass-card border-0">
              <Card.Body className="p-6">
                <h5 className="font-bold text-gray-700 mb-3">
                  👨‍⚕️ {translateText("Selected Social Worker")}
                </h5>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-blue-800 text-lg mb-2">
                    {selectedWorkerName}
                  </p>
                  <p className="text-blue-600 text-sm">
                    {translateText("Currently assigned patients")}: {currentWorkerAssignedPatients.length}
                  </p>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}