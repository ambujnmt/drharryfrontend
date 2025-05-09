import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@heroui/react';
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
import { saveSchedulerData, fetchSocialWorkersWithPatients } from '../../utils/fetchApi';

// Function to convert 24-hour time format to AM/PM format
const convertToAMPM = (time24) => {
    let [hour, minute] = time24.split(':');
    hour = parseInt(hour);

    const suffix = hour >= 12 ? 'PM' : 'AM';
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;

    return `${hour.toString().padStart(2, '0')}:${minute} ${suffix}`;
};

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
            const result = await fetchSocialWorkersWithPatients();

            if (result.status && Array.isArray(result.data)) {
                let found = null;
                let socialWorkerId = null;
                for (const sw of result.data) {
                    const match = sw.patients?.find(p => String(p.patient_id) === String(id));
                    if (match) {
                        found = match;
                        socialWorkerId = sw.user_id;
                        break;
                    }
                }

                if (found) {
                    setPatientData({
                        ...found,
                        user_id: socialWorkerId
                    });

                    const daysArray = Array.isArray(found.schedule_day) ? found.schedule_day : [];
                    const timeArray = Array.isArray(found.schedule_time) ? found.schedule_time : [];

                    const timeMap = {};
                    daysArray.forEach((day, index) => {
                        const time = timeArray[index];
                        timeMap[day] = [convertToAMPM(time) || null];  // Convert to AM/PM format
                    });

                    setSelectedDays(daysArray);
                    setTimeSlots(timeMap);
                }
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

    const handleTimeChange = (day, index, value, type) => {
        setTimeSlots(prev => {
            const existing = prev[day] ? [...prev[day]] : [''];
            let currentTime = existing[index] || '12:00 AM';

            let [hour, minuteWithAMPM] = currentTime.split(':');
            let [minute, ampm] = (minuteWithAMPM || '00 AM').split(' ');

            if (type === 'hour') hour = value;
            else if (type === 'minute') minute = value;
            else if (type === 'ampm') ampm = value;

            const newTime = `${hour.padStart(2, '0')}:${minute} ${ampm}`;
            existing[index] = newTime;

            return {
                ...prev,
                [day]: existing
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

        selectedDays.forEach(day => {
            const times = timeSlots[day] || [];
            times.forEach(time => {
                if (time) {
                    schedule_day.push(day);
                    schedule_time.push(time); // Already in AM/PM format
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
                                        <div key={idx} className="flex gap-2">
                                            <select
                                                className="border rounded p-1"
                                                value={(t || '').split(':')[0]?.padStart(2, '0')}
                                                onChange={(e) => handleTimeChange(day, idx, e.target.value, 'hour')}
                                            >
                                                {[...Array(12)].map((_, i) => {
                                                    const hour = (i + 1).toString().padStart(2, '0');
                                                    return <option key={hour} value={hour}>{hour}</option>;
                                                })}
                                            </select>

                                            <select
                                                className="border rounded p-1"
                                                value={(t || '').split(':')[1]?.split(' ')[0] || '00'}
                                                onChange={(e) => handleTimeChange(day, idx, e.target.value, 'minute')}
                                            >
                                                {[...Array(60)].map((_, i) => {
                                                    const min = i.toString().padStart(2, '0');
                                                    return <option key={min} value={min}>{min}</option>;
                                                })}
                                            </select>


                                            <select
                                                className="border rounded p-1"
                                                value={(t || '').split(' ')[1] || 'AM'}
                                                onChange={(e) => handleTimeChange(day, idx, e.target.value, 'ampm')}
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>

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
