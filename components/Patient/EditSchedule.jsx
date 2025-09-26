import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@heroui/react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { saveSchedulerData, fetchSocialWorkersWithPatients } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import PageTitle from '../Breadcrumb/PageTitle';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";
import { Head } from '../../layouts/head';

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

    // Day icons mapping
    const dayIcons = {
        'Everyday': '🌟',
        'Monday': '🌅',
        'Tuesday': '🔥',
        'Wednesday': '⚡',
        'Thursday': '🌿',
        'Friday': '🎉',
        'Saturday': '🌈',
        'Sunday': '☀️'
    };

    useEffect(() => {
        if (!router.isReady || !id) return;

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

    // const addTimeSlot = (day) => {
    //     setTimeSlots(prev => ({
    //         ...prev,
    //         [day]: [...(prev[day] || []), '']
    //     }));
    // };

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
        setTimeSlots(prev => {
            const updatedDaySlots = [...(prev[day] || [])];
            updatedDaySlots.splice(index, 1);
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
        <div className="flex justify-center items-center text-center py-48">
            <Spinner animation="border" variant="primary" />
        </div>
    );

    return (
        <div className='m-4'>
            <Head title="Edit Schedule" />
            <PageTitle
                breadCrumbItems={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Patient Scheduling", path: "/patient/patientScheduling" },
                    { label: "Edit Patient Schedule", active: true },
                ]}
                title={translateText("Edit Patient Schedule")}
            />

            {/* API Message */}
            {apiMessage.text && (
                <div className={`mb-6 p-4 rounded-xl border-l-4 backdrop-blur-sm shadow-lg transform transition-all duration-300 ${apiMessage.type === 'success'
                    ? 'bg-green-50 border-green-400 text-green-700 shadow-green-200/50'
                    : 'bg-red-50 border-red-400 text-red-700 shadow-red-200/50'
                    }`}>
                    <div className="flex items-center">
                        <span className="text-xl mr-2">
                            {apiMessage.type === 'success' ? '✅' : '❌'}
                        </span>
                        {apiMessage.text}
                    </div>
                </div>
            )}

            {/* Main Content Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">

                <div className="p-6 space-y-6">
                    {/* Patient Information */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="text-xl mr-2">📋</span>
                            Patient Information
                        </h3>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Name */}
  <div className="space-y-2">
    <label className="flex text-sm items-center gap-2 font-medium text-gray-700">
      <span className="text-blue-500">👤</span>
      {translateText("name")}
    </label>
    <Input
      type="text"
      value={patientData.name}
      disabled
      variant="bordered"
      className="bg-white/50"
    />
  </div>

  {/* Email */}
  <div className="space-y-2">
    <label className="flex text-sm items-center gap-2 font-medium text-gray-700">
      <span className="text-blue-500">📧</span>
      {translateText("email")}
    </label>
    <Input
      type="email"
      value={patientData.email}
      disabled
      variant="bordered"
      className="bg-white/50"
    />
  </div>

  {/* Mobile */}
  <div className="space-y-2">
    <label className="flex text-sm items-center gap-2 font-medium text-gray-700">
      <span className="text-blue-500">📱</span>
      {translateText("mobile")}
    </label>
    <Input
      type="number"
      value={patientData.mobile}
      disabled
      variant="bordered"
      className="bg-white/50"
    />
  </div>

  {/* Status */}
  <div className="space-y-2">
    <label className="flex text-sm items-center gap-2 font-medium text-gray-700">
      <span
        className={`w-3 h-3 rounded-full ${
          patientData.status_value === "Active"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      ></span>
      {translateText("status")}
    </label>
    <Input
      type="text"
      value={patientData.status_value}
      disabled
      variant="bordered"
      className="bg-white/50"
    />
  </div>
</div>

                    </div>

                    {/* Schedule Configuration */}
                    <div className="rounded-xl p-6 border border-indigo-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="text-2xl mr-2">📅</span>
                            {translateText("Patient scheduled day and time")}
                        </h3>

                        <div className="space-y-4">
                            {daysOfWeek.map((day) => (
                                <div key={day} className={`
                                        rounded-xl border-2 transition-all duration-300 overflow-hidden
                                        ${selectedDays.includes(day)
                                        ? 'border-blue-300 bg-blue-50 shadow-md'
                                        : 'border-gray-200 bg-white/50 hover:border-gray-300'
                                    }
                                    `}>
                                    <div className="p-2.5">
                                        <label className="flex items-center  cursor-pointer">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative flex justify-center items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedDays.includes(day)}
                                                        disabled={selectedDays.includes('Everyday') && day !== 'Everyday'}
                                                        onChange={() => toggleDay(day)}
                                                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    {selectedDays.includes(day) && (
                                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                            <span className="text-white text-xs">✓</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-xl">{dayIcons[day]}</span>
                                                <span className={`font-medium text-md ${selectedDays.includes(day) ? 'text-blue-700' : 'text-gray-700'
                                                    }`}>
                                                    {day}
                                                </span>
                                            </div>

                                        </label>

                                        {selectedDays.includes(day) && (
                                            <div className="mt-2 space-y-3">
                                                {(timeSlots[day] || []).map((time, idx) => (
                                                    <div key={idx} className="flex items-center space-x-3 bg-white/70 p-3 rounded-lg border border-blue-200">
                                                        <span className="text-blue-600 font-medium">🕐</span>
                                                        <div className="flex-1">
                                                            <TimePicker
                                                                onChange={(val) => updateTimeSlot(day, idx, val || '')}
                                                                value={time || ''}
                                                                format="h:mm a"
                                                                disableClock
                                                                className="w-full"
                                                            />
                                                        </div>
                                                        {(timeSlots[day] || []).length > 1 && (
                                                            <button
                                                                onClick={() => removeTimeSlot(day, idx)}
                                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Remove time slot"
                                                            >
                                                                🗑️
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center ">
                        <button
                            disabled={loading}
                            onClick={handleUpdate}
                            className="group relative px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:shadow-lg"
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl">💾</span>
                                    <span>{translateText("Update")}</span>
                                </div>
                            )}

                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>


            {/* Custom Styles */}
            <style jsx>{`
                .animation-delay-150 {
                    animation-delay: 150ms;
                }
                
                /* Custom TimePicker styling */
                .react-time-picker {
                    width: 100% !important;
                }
                
                .react-time-picker__wrapper {
                    border: 2px solid #e5e7eb !important;
                    border-radius: 8px !important;
                    padding: 8px 12px !important;
                    background: white !important;
                    transition: all 0.3s ease !important;
                }
                
                .react-time-picker__wrapper:focus-within {
                    border-color: #3b82f6 !important;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
                }
                
                .react-time-picker__inputGroup {
                    font-size: 16px !important;
                    font-weight: 500 !important;
                    color: #374151 !important;
                }
                
                .react-time-picker__button {
                    background: #f3f4f6 !important;
                    border: none !important;
                    border-radius: 6px !important;
                    padding: 4px 8px !important;
                    margin-left: 8px !important;
                    transition: all 0.2s ease !important;
                }
                
                .react-time-picker__button:hover {
                    background: #e5e7eb !important;
                }
            `}</style>
        </div>
    );
}