import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@heroui/react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export default function EditSchedule() {
    const router = useRouter();
    const { id } = router.query;

    const [patientData, setPatientData] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState({});

    const daysOfWeek = ['Everyday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        if (!id) return;

        const storedAssignedPatients = localStorage.getItem('assignedPatients');
        if (storedAssignedPatients) {
            const assignedPatients = JSON.parse(storedAssignedPatients);
            let found = null;

            Object.values(assignedPatients).forEach(patientList => {
                patientList.forEach(p => {
                    if (String(p.id) === String(id)) {
                        found = p;
                    }
                });
            });

            if (found) {
                setPatientData(found);
                const daysArray = Array.isArray(found.days) ? found.days : [found.days];
                const timeArray = Array.isArray(found.time) ? found.time : [found.time];

                const timeMap = {};
                daysArray.forEach((day, index) => {
                    timeMap[day] = [timeArray[index] || ''];
                });

                setSelectedDays(daysArray);
                setTimeSlots(timeMap);
            }
        }
    }, [id]);

    const toggleDay = (day) => {
        if (day === 'Everyday') {
            if (selectedDays.includes('Everyday')) {
                setSelectedDays([]);
                setTimeSlots({});
            } else {
                setSelectedDays(['Everyday']);
                setTimeSlots({ Everyday: [''] });
            }
        } else {
            const updated = selectedDays.includes(day)
                ? selectedDays.filter(d => d !== day)
                : [...selectedDays.filter(d => d !== 'Everyday'), day];

            setSelectedDays(updated);

            if (!selectedDays.includes(day)) {
                setTimeSlots(prev => ({ ...prev, [day]: [''] }));
            } else {
                setTimeSlots(prev => {
                    const copy = { ...prev };
                    delete copy[day];
                    return copy;
                });
            }
        }
    };

    const addTimeSlot = (day) => {
        setTimeSlots(prev => ({
            ...prev,
            [day]: [...(prev[day] || []), '']
        }));
    };

    const updateTimeSlot = (day, index, value) => {
        setTimeSlots(prev => {
            const updatedDaySlots = [...(prev[day] || [])];
            updatedDaySlots[index] = value;
            return {
                ...prev,
                [day]: updatedDaySlots
            };
        });
    };


    const removeTimeSlot = (day, index) => {
        const updated = [...(timeSlots[day] || [])];
        updated.splice(index, 1);
        setTimeSlots(prev => ({ ...prev, [day]: updated }));
    };

    const handleUpdate = () => {
        const storedAssignedPatients = localStorage.getItem('assignedPatients');
        if (storedAssignedPatients) {
            const assignedPatients = JSON.parse(storedAssignedPatients);

            Object.keys(assignedPatients).forEach(swId => {
                assignedPatients[swId] = assignedPatients[swId].map(p => {
                    if (String(p.id) === String(id)) {
                        return {
                            ...p,
                            days: selectedDays,
                            time: selectedDays.map(d => (timeSlots[d] || [''])[0]) // map each day to its first time slot
                        };
                    }
                    return p;
                });
            });

            localStorage.setItem('assignedPatients', JSON.stringify(assignedPatients));
            router.push('/patient/patientScheduling');
        }
    };

    if (!patientData) return <div className="p-10">Loading...</div>;

    return (
        <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Edit Patient Schedule</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <Input type="text" value={patientData.name} disabled label="Name" labelPlacement="outside" variant="bordered" />
                <Input type="email" value={patientData.email} disabled label="Email" labelPlacement="outside" variant="bordered" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <Input type="number" value={patientData.mobile} disabled label="Mobile" labelPlacement="outside" variant="bordered" />
                <Input type="text" value={patientData.status} disabled label="Status" labelPlacement="outside" variant="bordered" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Days Selector */}
                <div>
                    <label className="block font-medium">Scheduled Days</label>
                    <div className="border-2 border-gray-200 rounded-xl p-2 max-h-40 overflow-y-auto">
                        {daysOfWeek.map(day => (
                            <label key={day} className="block">
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day)}
                                    disabled={selectedDays.includes('Everyday') && day !== 'Everyday'}
                                    onChange={() => toggleDay(day)}
                                    className="mr-2"
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Time Inputs */}
                <div>
                    <label className="block font-medium mb-1">Scheduled Time</label>
                    {selectedDays.map(day => (
                        <div key={day} className="mb-4">
                            <p className="font-semibold mb-1">{day}</p>
                            {(timeSlots[day] || []).map((t, idx) => (
                                <div key={idx} className="flex items-center mb-2">
                                    <TimePicker
                                        onChange={(value) => updateTimeSlot(day, idx, value)}
                                        value={t}
                                        format="h:mm a"
                                        disableClock
                                    />
                                </div>
                            ))}
                         
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handleUpdate}
                className="rounded-xl px-3 py-1 bg-blue-500 text-white mx-auto block"
            >
                Update
            </button>
        </div>
    );
}
