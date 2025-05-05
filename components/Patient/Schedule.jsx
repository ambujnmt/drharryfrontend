import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUsers } from '../../utils/fetchApi';

export default function Schedule() {
  const [patient, setPatient] = useState(null);
  const [socialWorker, setSocialWorker] = useState(null);
  const [availableDays, setAvailableDays] = useState([
    { day: 'Monday', selected: false },
    { day: 'Tuesday', selected: false },
    { day: 'Wednesday', selected: false },
    { day: 'Thursday', selected: false },
    { day: 'Friday', selected: false },
    { day: 'Saturday', selected: false },
    { day: 'Sunday', selected: false },
  ]);
  const [selectedTime, setSelectedTime] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    socialWorker: '',
    email: '',
    phone: '',
    selectedDays: [],
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const loadData = async () => {
      if (!id) return; // Early return if id is not available yet

      try {
        const data = await fetchUsers();
        console.log('Fetched Data:', data);
  
        if (data?.data) {
          const patientData = data.data.find((user) => user.id === Number(id));
          if (patientData) {
            setPatient(patientData);
            setFormData({
              name: patientData.name,
              email: patientData.email,
              phone: patientData.phone,
            });
  
            const socialWorkerData = data.data.find(
              (user) => user.id === patientData.socialWorkerId
            );
            setSocialWorker(socialWorkerData);
          } else {
            console.error('Patient not found');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  if (!patient || !socialWorker) {
    return <div>Loading...</div>;
  }

  const handleDaySelection = (day) => {
    setAvailableDays((prevDays) =>
      prevDays.map((item) =>
        item.day === day ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleTimeChange = (day, time) => {
    setSelectedTime((prevTime) => ({
      ...prevTime,
      [day]: time,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted successfully');
    console.log('Form Data:', formData); // Log form data on submission
    // You can also log other relevant state values if necessary
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Scheduling for {patient.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Social Worker Name */}
        <div>
          <label className="block font-medium">Social Worker</label>
          <input type="text" value={socialWorker.name} readOnly className="w-full p-2 border rounded" />
        </div>
        {/* Patient Name */}
        <div>
          <label className="block font-medium">Patient Name</label>
          <input type="text" value={patient.name} readOnly className="w-full p-2 border rounded" />
        </div>
        {/* Patient Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" value={patient.email} readOnly className="w-full p-2 border rounded" />
        </div>
        {/* Patient Phone */}
        <div>
          <label className="block font-medium">Phone</label>
          <input type="text" value={patient.phone} readOnly className="w-full p-2 border rounded" />
        </div>
        {/* Days of the Week */}
        <div>
          <label className="block font-medium">Available Days</label>
          {availableDays.map((day) => (
            <div key={day.day} className="flex items-center">
              <input
                type="checkbox"
                checked={day.selected}
                onChange={() => handleDaySelection(day.day)}
                className="mr-2"
              />
              <label>{day.day}</label>
              <input
                type="time"
                value={selectedTime[day.day] || ''}
                onChange={(e) => handleTimeChange(day.day, e.target.value)}
                className="ml-4"
              />
            </div>
          ))}
        </div>
        {/* Submit Button */}
        <div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
