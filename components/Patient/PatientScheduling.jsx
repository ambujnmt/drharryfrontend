import React, { useContext, useEffect, useState } from 'react';
import { fetchUsers, fetchSocialWorkersWithPatients } from '../../utils/fetchApi';
import { FaPen, FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaSearch, FaPlus } from "react-icons/fa";
import { Link } from '@heroui/react';
import PageTitle from "../Breadcrumb/PageTitle"
import { LanguageContext } from "../../context/LanguageContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";
import { Head } from '../../layouts/head';

export default function PatientScheduling() {
  const [usersByType, setUsersByType] = useState({ socialWorkers: [] });
  const [selected, setSelected] = useState({ socialWorker: '', patients: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  // Fetching social workers and their associated patients
  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchUsers();
    if (data?.data) {
      const socialWorkers = data.data.filter(user => user.user_type === 2);
      setUsersByType({ socialWorkers });
    }
    setLoading(false);
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
    setSelectedDay(''); // Add this line
    await loadPatients(socialWorkerId);
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
    <div className="m-4">
      <Head title="Patient Scheduling" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Patient Scheduling", active: true },
        ]}
        title={translateText("Patient Scheduling")}
      />

      <Card>
        <Card.Body>

          <div className=" mb-8 ">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <FaSearch className="text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-0">
                {translateText("Filter by Social Worker")}
              </h2>
            </div>

            <div className="relative">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={translateText("Search by name")}
                  className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="mt-3 max-h-60 overflow-y-auto bg-gray-50 rounded-xl border border-gray-200">
                {usersByType.socialWorkers
                  .filter(sw => sw.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(socialWorker => (
                    <div key={socialWorker.id} className="group">
                      <div className="flex items-center p-3 hover:bg-white transition-all duration-300 border-b border-gray-100 last:border-b-0">
                        <input
                          type="radio"
                          name="socialWorker"
                          value={String(socialWorker.id)}
                          checked={selected.socialWorker === String(socialWorker.id)}
                          onChange={(e) => handleSocialWorkerSelection(e.target.value)}
                          className="mr-4 w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex items-center gap-3 flex-1 cursor-pointer"
                          onClick={() => handleSocialWorkerSelection(String(socialWorker.id))}>
                          <div className="flex items-center justify-center w-8 h-8  bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold">
                            {socialWorker.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="mb-0 font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {socialWorker.name}
                            </p>
                            <p className="text-sm text-gray-500 mb-0">{translateText("social_worker")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {usersByType.socialWorkers.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="text-gray-400 text-4xl mb-2">👥</div>
                    <p className="text-gray-600">No Social Workers Available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>



      {/* Patients Section */}


      {selected.socialWorker && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden mt-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-0">
                    {translateText("Scheduler for Social Worker")}
                  </h3>
                  <p className="text-blue-100 mb-0">
                    {usersByType.socialWorkers.find(sw => String(sw.id) === selected.socialWorker)?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Day Filter Dropdown */}
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">All Days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>

                <Link
                  href="/patient/patientAssignment"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-3 py-2 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaPlus className="text-sm" />
                  {translateText("New")}
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {selected.patients.length > 0 ? (
              <div className="space-y-4">
                {selected.patients
                  .filter(patient => {
                    if (!selectedDay) return true;
                    const days = Array.isArray(patient.schedule_day)
                      ? patient.schedule_day
                      : (patient.schedule_day || "").split(",");
                    return days.some(day => day.trim() === selectedDay);
                  })
                  .map((patient, index) => {
                    const days = Array.isArray(patient.schedule_day)
                      ? patient.schedule_day
                      : (patient.schedule_day || "").split(",");
                    const times = Array.isArray(patient.schedule_time)
                      ? patient.schedule_time
                      : (patient.schedule_time || "").split(",").filter(Boolean);

                    return (
                      <div key={patient.patient_id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-3 border border-gray-200 hover:shadow-lg transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                          {/* Serial Number */}
                          <div className="lg:col-span-1">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold">
                              {index + 1}
                            </div>
                          </div>

                          {/* Patient Info */}
                          <div className="lg:col-span-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                                <FaUser className="text-blue-600" />
                              </div>
                              <div>
                                <h6 className="font-medium text-md text-gray-800 mb-0">{patient.name}</h6>
                                <p className="text-sm text-gray-500 mb-0">{translateText("patient")}</p>
                              </div>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="lg:col-span-3">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <FaPhone className="text-green-500" />
                                <span className="text-gray-700">{patient.mobile}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <FaEnvelope className="text-blue-500" />
                                <span className="text-gray-700 truncate">{patient.email}</span>
                              </div>
                            </div>
                          </div>

                          {/* Schedule Info */}
                          <div className="lg:col-span-3">
                            <div className="space-y-2">
                              {days.map((day, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <FaCalendarAlt className="text-purple-500" />
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium w-20">
                                      {day}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FaClock className="text-orange-500" />
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium w-20">
                                      {times[i] ? formatTime(times[i]) : "--"}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>


                          {/* Status & Actions */}
                          <div className="lg:col-span-2">
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${patient.status === 1
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}>
                                {patient.status === 1 ? "Active" : "Inactive"}
                              </span>

                              <Link
                                href={`/patient/editSchedule/${patient.patient_id}/${selected.socialWorker}`}
                                className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 hover:shadow-lg"
                              >
                                <FaPen className="text-sm" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Loading patients...</p>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl text-gray-300 mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {selectedDay ? `No Schedules for ${selectedDay}` : 'No Patients Found'}
                </h3>
                <p className="text-gray-500">
                  {selectedDay
                    ? `No patients are scheduled on ${selectedDay}.`
                    : translateText("No patients assigned to this social worker.")
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}