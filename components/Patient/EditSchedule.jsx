import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@heroui/react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { saveSchedulerData, fetchSocialWorkersWithPatients } from '../../utils/fetchApi';

export default function EditSchedule() {
    const router = useRouter();
    const { id } = router.query;
    const [apiMessage, setApiMessage] = useState({ type: '', text: '' });
    const [patientData, setPatientData] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState({});

    const daysOfWeek = ['Everyday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        if (!router.isReady || !id) return;

        const fetchPatient = async () => {
            console.log("Fetching patient with id:", id);
            const result = await fetchSocialWorkersWithPatients();

            console.log("API result:", result); // Log the full API response

            if (result.status && Array.isArray(result.data)) {
                let found = null;
                let socialWorkerId = null;
                for (const sw of result.data) {
                    // Iterate over patients to find the one with matching patient_id
                    const match = sw.patients?.find(p => String(p.patient_id) === String(id));
                    if (match) {
                        found = match;
                        socialWorkerId = sw.user_id; // Get the user_id of the social worker
                        break;
                    }
                }

                console.log("Found patient:", found); // Log the found patient object
                console.log("Social Worker ID:", socialWorkerId); // Log the user_id of the social worker

                if (found) {
                    setPatientData({
                        ...found, // Spread the existing patient data
                        user_id: socialWorkerId // Add user_id (social worker) to patientData
                    });

                    if (!socialWorkerId) {
                        console.error("user_id (social worker) is missing for the patient");
                    } else {
                        console.log("user_id (social worker):", socialWorkerId);
                        const daysArray = Array.isArray(found.schedule_day) ? found.schedule_day : [];
                        const timeArray = Array.isArray(found.schedule_time) ? found.schedule_time : [];

                        const timeMap = {};
                        daysArray.forEach((day, index) => {
                            const time = timeArray[index];
                            timeMap[day] = [time || null];  // ✅ use null instead of ''
                        });


                        setSelectedDays(daysArray);
                        setTimeSlots(timeMap);
                    }
                } else {
                    console.error("Patient not found in result.");
                }
            } else {
                console.error("API returned error or invalid data format.");
            }
        };

        fetchPatient();
    }, [router.isReady, id]);

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


    const handleUpdate = async () => {
        if (!patientData.user_id) {
            setApiMessage({ type: 'error', text: 'User ID (social worker) is missing. Please try again.' });
            return;
        }

        const schedule_day = [];
        const schedule_time = [];

        // Format function to convert 24-hour time to AM/PM
        const formatTime = (timeStr) => {
            if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return '';

            const [hourStr, minuteStr] = timeStr.split(':');
            const hour = parseInt(hourStr, 10);
            const minute = parseInt(minuteStr, 10);

            if (isNaN(hour) || isNaN(minute)) {
                console.warn(`Invalid time format received: ${timeStr}`);
                return '';
            }

            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
        };


        selectedDays.forEach(day => {
            const times = timeSlots[day] || [];
            times.forEach(time => {
                if (time) {
                    schedule_day.push(day);
                    schedule_time.push(formatTime(time)); // <-- Convert here
                }
            });
        });

        const payload = {
            user_id: patientData.user_id,
            patient_id: patientData.patient_id,
            schedule_day,
            schedule_time
        };

        console.log("Payload being sent to backend (AM/PM format):", payload);

        const response = await saveSchedulerData(payload);

        if (response.status) {
            setApiMessage({ type: 'success', text: response.message });
            setTimeout(() => {
                router.push('/patient/patientScheduling');
            }, 1000);
        } else {
            setApiMessage({ type: 'error', text: response.message });
        }
    };



    if (!patientData) return <div className="flex justify-center items-center py-52">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;

    return (
        <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Edit Patient Schedule</h2>
            {apiMessage.text && (
                <div
                    className={`mb-4 p-3 rounded ${apiMessage.type === 'success' ? ' text-green-500' : 'text-red-500'
                        }`}
                >
                    {apiMessage.text}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-2">
                <Input type="text" value={patientData.name} disabled label="Name" labelPlacement="outside" variant="bordered" />
                <Input type="email" value={patientData.email} disabled label="Email" labelPlacement="outside" variant="bordered" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-2">
                <Input type="number" value={patientData.mobile} disabled label="Mobile" labelPlacement="outside" variant="bordered" />
                <Input type="text" value={patientData.status_value} disabled label="Status" labelPlacement="outside" variant="bordered" />
            </div>

            <div className="gap-4 mb-4">
                {/* Days Selector */}
                <label className="block font-medium mb-2">Patient scheduled day and time</label>
                <div className="flex flex-col border-2 border-gray-200 rounded-xl p-4 gap-3">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="flex items-start gap-4">
                            {/* Day with Checkbox */}
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day)}
                                    disabled={selectedDays.includes('Everyday') && day !== 'Everyday'}
                                    onChange={() => toggleDay(day)}
                                />
                                {day}
                            </label>

                            {/* Show Time Slots only if this day is selected */}
                            {selectedDays.includes(day) && (
                                <div className="flex flex-wrap gap-2">
                                    {(timeSlots[day] || []).map((t, idx) => (
                                        <TimePicker
                                            key={idx}
                                            onChange={(value) => updateTimeSlot(day, idx, value || '')}
                                            value={t || ''}
                                            format="h:mm a"
                                            disableClock
                                            className="w-28"
                                        />
                                    ))}
                                </div>
                            )}
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
