import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/fetchApi'; // Adjust path
import { Link } from '@heroui/react'; // Assuming correct import

export default function PatientScheduling() {
    const [usersByType, setUsersByType] = useState({
        socialWorkers: [],
        patients: [],
    });

    const [selected, setSelected] = useState({
        socialWorker: '',
        patients: [],
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [assignedPatients, setAssignedPatients] = useState({});

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers();
            if (data?.data) {
                const socialWorkers = data.data.filter(user => user.user_type === 2);
                const patients = data.data.filter(user => user.user_type === 3);
                setUsersByType({ socialWorkers, patients });
            }
        };

        loadUsers();

        const storedAssignedPatients = localStorage.getItem('assignedPatients');
        if (storedAssignedPatients) {
            setAssignedPatients(JSON.parse(storedAssignedPatients));
        }
    }, []);

    const handleSocialWorkerSelection = (socialWorkerId) => {
        setSelected(prev => ({
            ...prev,
            socialWorker: socialWorkerId,
            patients: assignedPatients[socialWorkerId] || [],
        }));
    };

    return (
        <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md pb-44">
            <h2 className="text-xl font-bold mb-6">Patient Scheduling</h2>

            {/* Social Worker Dropdown */}
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
                            .filter(sw =>
                                sw.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map(socialWorker => (
                                <div
                                    key={socialWorker.id}
                                    className="flex items-center p-2 hover:bg-gray-100"
                                >
                                    <input
                                        type="radio"
                                        name="socialWorker"
                                        value={String(socialWorker.id)}
                                        checked={selected.socialWorker === String(socialWorker.id)}
                                        onChange={(e) => handleSocialWorkerSelection(e.target.value)}
                                        className="mr-2"
                                    />
                                    <label className="flex-1 cursor-pointer">
                                        {socialWorker.name}
                                    </label>
                                </div>
                            ))}
                        {usersByType.socialWorkers.length === 0 && (
                            <p className="p-2">No Social Workers Available</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Assigned Patients Table */}
            {selected.socialWorker && (
                <div>
                    <h3 className="text-lg font-semibold mb-2 mt-44">
                        Assigned Patients for{' '}
                        {
                            usersByType.socialWorkers.find(
                                sw => String(sw.id) === selected.socialWorker
                            )?.name || 'Selected Social Worker'
                        }
                    </h3>
                    {selected.patients.length > 0 ? (
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Social Worker</th>
                                    <th className="border px-4 py-2">Patient Name</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selected.patients.map((patient, index) => (
                                    <tr key={patient.id}>
                                        {index === 0 && (
                                            <td
                                                className="border px-4 py-2"
                                                rowSpan={selected.patients.length}
                                            >
                                                {
                                                    usersByType.socialWorkers.find(
                                                        sw => String(sw.id) === selected.socialWorker
                                                    )?.name
                                                }
                                            </td>
                                        )}
                                        <td className="border px-4 py-2">{patient.name}</td>
                                        <td className="border px-4 py-2 text-blue-600 font-medium cursor-pointer">
                                            <Link href={`/patient/schedule/${patient.id}`}> {/* Updated Link */}
                                                Schedule
                                            </Link>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    ) : (
                        <p>No patients assigned to this social worker.</p>
                    )}
                </div>
            )}
        </div>
    );
}
