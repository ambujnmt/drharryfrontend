import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchSocialWorkersWithPatients, deleteAssignedScheduler } from '../../utils/fetchApi';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useDisclosure, Button } from '@heroui/react';
import Tmodal from '../Tmodal/Tmodal';

export default function PatientScheduling() {
    const [usersByType, setUsersByType] = useState({ socialWorkers: [] });
    const [selected, setSelected] = useState({ socialWorker: '', patients: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Fetching social workers and their associated patients
    const loadUsers = async () => {
        setLoading(true); // Set loading to true when starting to fetch
        const data = await fetchUsers();
        if (data?.data) {
            const socialWorkers = data.data.filter(user => user.user_type === 2);
            setUsersByType({ socialWorkers });
        }
        setLoading(false); // Set loading to false once data is fetched
    };

    const loadPatients = async (socialWorkerId) => {
        setLoading(true);
        const data = await fetchSocialWorkersWithPatients();
        if (data?.status && Array.isArray(data.data)) {
            const selectedWorker = data.data.find(sw => String(sw.user_id) === String(socialWorkerId));
            if (selectedWorker) {
                setSelected(prev => ({
                    ...prev,
                    patients: selectedWorker.patients || [],
                }));
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleSocialWorkerSelection = async (socialWorkerId) => {
        setSelected({ socialWorker: socialWorkerId, patients: [] });
        await loadPatients(socialWorkerId);
    };

    const handleDeleteConfirm = async () => {
        if (!selected.socialWorker || !selectedPatientId) return;

        setSelected(prev => ({
            ...prev,
            patients: prev.patients.filter(p => p.patient_id !== selectedPatientId)
        }));

        onClose();
        setLoading(true); // Set loading state when performing the delete action

        const res = await deleteAssignedScheduler({
            user_id: selected.socialWorker,
            patient_id: selectedPatientId
        });

        setMessage(res.message);

        if (res.status) {
            // After successful deletion, reload patients
            await loadPatients(selected.socialWorker);
        } else {
            // If there’s an error, handle the failure
            setLoading(false);
        }

        setSelectedPatientId(null);
    };

    const formatTime = (timeStr) => {
        if (!timeStr || typeof timeStr !== 'string') return '';
        const time = timeStr.trim();
        if (/AM|PM/i.test(time)) return time.toUpperCase();

        const [hourStr, minuteStr] = time.split(':');
        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        if (isNaN(hour) || isNaN(minute)) return '';
        const isPM = hour >= 12;
        const formattedHour = ((hour + 11) % 12) + 1;
        const ampm = isPM ? 'PM' : 'AM';
        return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };

    return (
        <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md pb-44">
            <h2 className="text-xl font-bold mb-6">Patient Scheduling</h2>

            {/* Search & Filter */}
            <div className="mb-4">
                <label className="block font-medium mb-2">Filter by Social Worker</label>
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <div className="absolute left-0 right-0 max-h-40 overflow-y-auto border border-t-0 bg-white z-10 mb-40">
                        {usersByType.socialWorkers
                            .filter(sw => sw.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map(socialWorker => (
                                <div key={socialWorker.id} className="flex items-center p-2 hover:bg-gray-100">
                                    <input
                                        type="radio"
                                        name="socialWorker"
                                        value={String(socialWorker.id)}
                                        checked={selected.socialWorker === String(socialWorker.id)}
                                        onChange={(e) => handleSocialWorkerSelection(e.target.value)}
                                        className="mr-2"
                                    />
                                    <label className="flex-1 cursor-pointer">{socialWorker.name}</label>
                                </div>
                            ))}
                        {usersByType.socialWorkers.length === 0 && (
                            <p className="p-2">No Social Workers Available</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800">
                    {message}
                </div>
            )}

            {/* Patients Table */}
            {selected.socialWorker && (
                <div>
                    <div className='flex mt-44 justify-between items-center mb-4'>
                        <h3 className="text-lg font-semibold">
                            Scheduler for Social Worker:{' '}
                            {usersByType.socialWorkers.find(sw => String(sw.id) === selected.socialWorker)?.name}
                        </h3>
                        <Link href="/patient/patientAssignment" className='text-slate-950 font-semibold bg-blue-100 px-20 py-1.5 rounded-xl'>
                            New
                        </Link>
                    </div>

                    {selected.patients.length > 0 ? (
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2">S No.</th>
                                    <th className="px-4 py-2">Patient Name</th>
                                    <th className="px-4 py-2">Mobile Number</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Scheduled Days</th>
                                    <th className="px-4 py-2">Scheduled Time</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selected.patients.map((patient, index) => {
                                    const days = Array.isArray(patient.schedule_day)
                                        ? patient.schedule_day
                                        : (patient.schedule_day || "").split(",");
                                    const times = Array.isArray(patient.schedule_time)
                                        ? patient.schedule_time
                                        : (patient.schedule_time || "").split(",").filter(Boolean);

                                    return (
                                        <tr key={patient.patient_id}>
                                            <td className="px-4 py-2">{index + 1}</td>
                                            <td className="px-4 py-2">{patient.name}</td>
                                            <td className="px-4 py-2">{patient.mobile}</td>
                                            <td className="px-4 py-2">{patient.email}</td>
                                            <td className="px-4 py-2">
                                                {days.map((day, i) => (
                                                    <div key={i}>{day}</div>
                                                ))}
                                            </td>
                                            <td className="px-4 py-2">
                                                {times.map((t, i) => (
                                                    <div key={i}>{formatTime(t)}</div>
                                                ))}
                                            </td>

                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 text-white rounded-xl ${patient.status === 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                                                    {patient.status === 1 ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center items-center gap-2 text-blue-500">
                                                    <Link href={`/patient/editSchedule/${patient.patient_id}`}>
                                                        <FaPen className="text-lg" />
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedPatientId(patient.patient_id);
                                                            onOpen();
                                                        }}
                                                    >
                                                        <MdDelete className="text-xl" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p className="mt-4">No patients assigned to this social worker.</p>
                    )}
                </div>
            )}

            {/* Confirmation Modal */}
            <Tmodal
                isOpen={isOpen}
                onClose={onClose}
                title="Are you sure you want to remove this assigned patient?"
                footer={
                    <>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={handleDeleteConfirm}>
                            Confirm
                        </Button>
                    </>
                }
            />
        </div>
    );
}
