import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/fetchApi'; // Adjust path
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from '@heroui/react';


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
                    <div className='flex mt-44 justify-between items-center mb-4'>

                        <h3 className="text-lg font-semibold ">
                            Scheduler for Social Worker:{' '}
                            {
                                usersByType.socialWorkers.find(
                                    sw => String(sw.id) === selected.socialWorker
                                )?.name || 'Selected Social Worker'
                            }
                        </h3>
                        <button><Link href="/patient/patientAssignment" className='text-slate-950 font-semibold bg-blue-100 px-20 py-1.5 rounded-xl'>New</Link></button>
                    </div>

                    {selected.patients.length > 0 ? (
                        <table className="w-full table-auto ">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className=" px-4 py-2">S No.</th>
                                    <th className=" px-4 py-2">Patient Name</th>
                                    <th className=" px-4 py-2">Mobile Number</th>
                                    <th className=" px-4 py-2">Email</th>
                                    <th className=" px-4 py-2">Scheduled Days</th>
                                    <th className=" px-4 py-2">Scheduled Time</th>
                                    <th className=" px-4 py-2">Status</th>
                                    <th className=" px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selected.patients.map((patient, index) => (
                                    <tr key={patient.id}>
                                        <td className=" px-4 py-2">{index + 1}</td>
                                        <td className=" px-4 py-2">{patient.name}</td>
                                        <td className=" px-4 py-2">{patient.mobile}</td>
                                        <td className=" px-4 py-2">{patient.email}</td>
                                        <td className="px-4 py-2">
    {(Array.isArray(patient.days)
        ? patient.days
        : (patient.days || '').split(',')
    ).map((day, i) => (
        <div key={i}>{(day || '').trim()}</div>
    ))}
</td>

<td className="px-4 py-2">
    {(Array.isArray(patient.time)
        ? patient.time
        : (patient.time || '').split(',')
    ).map((time, i) => {
        const trimmed = (time || '').trim();
        let formatted = trimmed;

        // Try converting only if it's in HH:mm format
        if (/^\d{1,2}:\d{2}$/.test(trimmed)) {
            const [h, m] = trimmed.split(':');
            const date = new Date();
            date.setHours(+h, +m);
            formatted = date.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }

        return <div key={i}>{formatted}</div>;
    })}
</td>




                                        <td className=" px-4 py-2">
                                            <span className={`px-2 py-1 text-white rounded-xl ${patient.status === 'active'
                                                ? 'bg-green-500'
                                                : 'bg-red-500'
                                                }`}>
                                                {patient.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className=" px-4 py-2">
                                            <td className=" px-4 py-4 text-blue-500  flex justify-center items-center gap-2">
                                                <Link href={`/patient/editSchedule/${patient.id}`}><FaPen className="text-lg" /></Link>
                                                <Link href="#"><MdDelete className="text-xl" /></Link>
                                            </td>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="mt-4">No patients assigned to this social worker.</p>
                    )}
                </div>
            )}
        </div>
    );
}
