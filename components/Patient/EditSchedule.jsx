
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@heroui/react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { saveSchedulerData, fetchSocialWorkersWithPatients } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";

// Convert 24-hour string to 12-hour format
const convertToAMPM = (time24) => {
    const [hour, minute] = time24.split(':');
    let h = parseInt(hour, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h.toString().padStart(2, '0')}:${minute} ${suffix}`;
};

// Convert 12-hour format to 24-hour for backend
const convertTo24Hour = (time12) => {
    const [time, modifier] = time12.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export default function EditSchedule() {
    const router = useRouter();
const { id, user_id } = router.query;
    const [apiMessage, setApiMessage] = useState({ type: '', text: '' });
    const [patientData, setPatientData] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState({});
    const { locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    const daysOfWeek = ['Everyday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        if (!router.isReady || !id) return;

        // const fetchPatient = async () => {
        //     const result = await fetchSocialWorkersWithPatients();

        //     if (result.status && Array.isArray(result.data)) {
        //         let found = null;
        //         let socialWorkerId = null;
        //         for (const sw of result.data) {
        //             const match = sw.patients?.find(p => String(p.patient_id) === String(id));
        //             if (match) {
        //                 found = match;
        //                 socialWorkerId = sw.user_id;
        //                 break;
        //             }
        //         }

        //         if (found) {
        //             setPatientData({
        //                 ...found,
        //                 user_id: socialWorkerId
        //             });

        //             const daysArray = Array.isArray(found.schedule_day) ? found.schedule_day : [];
        //             const timeArray = Array.isArray(found.schedule_time) ? found.schedule_time : [];

        //             const timeMap = {};
        //             daysArray.forEach((day, index) => {
        //                 const time = timeArray[index];
        //                 if (!timeMap[day]) timeMap[day] = [];
        //                 timeMap[day].push(time); // Keep as 24-hour string for TimePicker
        //             });

        //             setSelectedDays([...new Set(daysArray)]);
        //             setTimeSlots(timeMap);
        //         }
        //     }
        // };
const fetchPatient = async () => {
    const result = await fetchSocialWorkersWithPatients();

    if (result.status && Array.isArray(result.data)) {
        const matches = [];

        for (const sw of result.data) {
            // If user_id is provided, skip irrelevant social workers
            if (user_id && String(sw.user_id) !== String(user_id)) continue;

            sw.patients?.forEach(p => {
                if (String(p.patient_id) === String(id)) {
                    matches.push({
                        ...p,
                        user_id: sw.user_id,
                        sw_name: sw.name,
                        sw_email: sw.email
                    });
                }
            });
        }

        if (matches.length === 0) return;

        // If multiple matches, prefer the one with more scheduled days
        const bestMatch = matches.reduce((prev, current) =>
            (current.schedule_day?.length || 0) > (prev.schedule_day?.length || 0) ? current : prev
        );

        setPatientData(bestMatch);

        const daysArray = Array.isArray(bestMatch.schedule_day) ? bestMatch.schedule_day : [];
        const timeArray = Array.isArray(bestMatch.schedule_time) ? bestMatch.schedule_time : [];

        const timeMap = {};
        daysArray.forEach((day, index) => {
            const time = timeArray[index];
            if (!timeMap[day]) timeMap[day] = [];
            timeMap[day].push(time);
        });

        setSelectedDays([...new Set(daysArray)]);
        setTimeSlots(timeMap);
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

    
const handleUpdate = async () => {
    if (!patientData?.user_id) {
        setApiMessage({ type: 'error', text: 'User ID missing.' });
        return;
    }

    setLoading(true); // Start loader

    const schedule_day = [];
    const schedule_time = [];

    selectedDays.forEach(day => {
        const times = timeSlots[day] || [];
        times.forEach(time => {
            if (time) {
                schedule_day.push(day);
                schedule_time.push(convertTo24Hour(time));
            }
        });
    });

    const payload = {
        user_id: patientData.user_id,
        patient_id: patientData.patient_id,
        schedule_day,
        schedule_time
    };

    try {
        const response = await saveSchedulerData(payload);

        if (response.status) {
            setApiMessage({ type: 'success', text: response.message });

            // Delay navigation to show success message
            setTimeout(() => {
                setLoading(false); // Stop loader
                router.push('/patient/patientScheduling');
            }, 1000);
        } else {
            setApiMessage({ type: 'error', text: response.message });
            setLoading(false); // Stop loader on error
        }
    } catch (error) {
        setApiMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        setLoading(false); // Stop loader on error
    }
};


    if (!patientData) return (
        <div className="flex justify-center items-center py-52">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl text-center font-bold mb-4">{translateText("Edit Patient Schedule")}</h2>

            {apiMessage.text && (
                <div className={`mb-4 p-3 rounded ${apiMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {apiMessage.text}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-2">
                <Input type="text" value={patientData.name} disabled label={translateText("name")} labelPlacement="outside" variant="bordered" />
                <Input type="email" value={patientData.email} disabled label={translateText("email")} labelPlacement="outside" variant="bordered" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-2">
                <Input type="number" value={patientData.mobile || ''} disabled label={translateText("Mobile")} labelPlacement="outside" variant="bordered" />
                <Input type="text" value={patientData.status_value} disabled label={translateText("status")} labelPlacement="outside" variant="bordered" />
            </div>

            <div className="gap-4 mb-4">
                <label className="block font-medium mb-2">{translateText("Patient scheduled day and time")}</label>
                <div className="flex flex-col border-2 border-gray-200 rounded-xl p-4 gap-3">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="flex  gap-2">
                            <label className="flex items-center gap-2 font-medium">
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day)}
                                    disabled={selectedDays.includes('Everyday') && day !== 'Everyday'}
                                    onChange={() => toggleDay(day)}
                                />
                                {day}
                            </label>

                            {selectedDays.includes(day) && (
                                <div className="flex  gap-2 items-center">
                                    {(timeSlots[day] || []).map((t, idx) => (
                                        <TimePicker
                                            key={idx}
                                            onChange={(val) => updateTimeSlot(day, idx, val || '')}
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
                disabled={loading}
                onClick={handleUpdate}
                className="rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition mx-auto block"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                    translateText("Update")
                )}

            </button>
        </div>
    );
}

