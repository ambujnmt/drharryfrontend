import React from 'react';


export default function UpcomingEvents() {
    const events = [
        {
            id: 1,
            doctor: 'Dr. Mario Rossi',
            specialty: 'Cardiologo',
            date: 'Gen 24, 2025',
            time: '13:00 - 14:00',
            icon: 'https://nmtdevserver.com/welli/heartrate%20checker.png',
            phone: 'https://nmtdevserver.com/welli/call.png',
            calendar: 'https://nmtdevserver.com/welli/calender.png',
            clock: 'https://nmtdevserver.com/welli/greyClock.png',
        },
        {
            id: 2,
            doctor: 'Dr. Anna Bianchi',
            specialty: 'Neurologist',
            date: 'Gen 25, 2025',
            time: '10:00 - 11:00',
            icon: 'https://nmtdevserver.com/welli/heartrate%20checker.png',
            phone: 'https://nmtdevserver.com/welli/call.png',
            calendar: 'https://nmtdevserver.com/welli/calender.png',
            clock: 'https://nmtdevserver.com/welli/greyClock.png',
        },
        {
            id: 3,
            doctor: 'Dr. Arti Sharma',
            specialty: 'Dermatologist',
            date: 'Gen 26, 2025',
            time: '15:00 - 16:00',
            icon: 'https://nmtdevserver.com/welli/heartrate%20checker.png',
            phone: 'https://nmtdevserver.com/welli/call.png',
            calendar: 'https://nmtdevserver.com/welli/calender.png',
            clock: 'https://nmtdevserver.com/welli/greyClock.png',
        },
    ];

    return (
        <div className="pt-4">
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-[#5274f6] text-white rounded-2xl px-2 py-3 flex flex-col gap-4 shadow-md"
                    >
                        <div className="flex items-center gap-4">
                            {/* Doctor Icon */}
                            <div className="w-16 h-16 bg-[rgb(126,149,245)] rounded-full flex items-center justify-center">
                                <img src={event.icon} alt="doctor icon" className="w-10 h-10 object-contain" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-semibold text-sm " title={event.doctor}>
                                    {event.doctor}
                                </h3>
                                <p className="text-sm">{event.specialty}</p>
                            </div>

                            {/* Call Icon */}
                            <div className="w-11 h-11 bg-[rgb(126,149,245)] rounded-full flex items-center justify-center">
                                <img src={event.phone} alt="call" className="w-6 h-6 object-contain" />
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="flex justify-between items-center bg-[rgb(126,149,245)] rounded-lg p-2">
                            <div className="flex items-center gap-2">
                                <img src={event.calendar} alt="calendar" className="w-5 h-5 filter invert brightness-0" />
                                <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={event.clock} alt="clock" className="w-5 h-5" />
                                <span className="text-sm">{event.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
