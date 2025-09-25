import React, { useState, useEffect } from "react";
import { Button, Spinner, Form } from "react-bootstrap";
import Tmodal from "../Tmodal/Tmodal";
import { fetchClinicSlots, addClinicSlot } from "../../utils/fetchApi";

export default function AddAppointment({ clinicId, onSlotAdded }) {
    const [isOpen, setIsOpen] = useState(false);
    const [clinicSlots, setClinicSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        clinic_id: clinicId,
        day_of_week: "",
        start_time: "",
        end_time: "",
        slot_duration_minutes: "",
    });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (clinicId) setForm(prev => ({ ...prev, clinic_id: clinicId }));
    }, [clinicId]);

    useEffect(() => {
        if (isOpen && clinicId) {
            fetchClinicSlots(clinicId).then(res => {
                if (res.status) setClinicSlots(res.data);
            });
        }
    }, [isOpen, clinicId]);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoading(true);
        setMessage(null);

        const formatTime = time => {
            if (!time) return "";
            if (/^\d{2}:\d{2}$/.test(time)) return `${time}:00`;
            const date = new Date(`1970-01-01T${time}`);
            return isNaN(date.getTime()) ? "" : date.toTimeString().split(" ")[0];
        };

        const payload = {
            clinic_id: form.clinic_id,
            day_of_week: form.day_of_week.trim(),
            start_time: formatTime(form.start_time),
            end_time: formatTime(form.end_time),
            slot_duration_minutes: form.slot_duration_minutes,
        };

        const res = await addClinicSlot(payload);
        setLoading(false);

        if (res.status) {
            setMessage({ type: "success", text: res.message });
            if (onSlotAdded) onSlotAdded(res.data);

            setForm({
                clinic_id: clinicId,
                day_of_week: "",
                start_time: "",
                end_time: "",
                slot_duration_minutes: "",
            });

            setTimeout(() => {
                setMessage(null);
                setIsOpen(false);
            }, 3000);
        } else {
            setMessage({ type: "error", text: res.message });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const isSlotTaken = day => clinicSlots.some(slot => slot.day_of_week === day);

    return (
        <div>
            <Button style={{
                color: "var(--bs-btn-hover-color)",
                backgroundColor: "var(--bs-btn-hover-bg)",
                borderColor: "var(--bs-btn-hover-border-color)"
            }} className="" variant="light" onClick={() => setIsOpen(true)}>
                Add Appointment
            </Button>

            <Tmodal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Add Appointment"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? <Spinner size="sm" /> : "Save"}
                        </Button>
                    </>
                }
            >
                {message && (
                    <div className={`p-2 mb-2 text-sm rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {message.text}
                    </div>
                )}

                <Form>
                    <div className="grid grid-cols-2 gap-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Day of Week</Form.Label>
                            <Form.Select name="day_of_week" value={form.day_of_week} onChange={handleChange}>
                                <option value="">Select Day</option>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                    <option key={day} value={day} disabled={isSlotTaken(day)}>
                                        {day} {isSlotTaken(day) ? "(Already booked)" : ""}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Slot Duration (minutes)</Form.Label>
                            <Form.Control type="number" name="slot_duration_minutes" value={form.slot_duration_minutes} onChange={handleChange} />
                        </Form.Group>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control type="time" name="start_time" value={form.start_time} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control type="time" name="end_time" value={form.end_time} onChange={handleChange} />
                        </Form.Group>
                    </div>
                </Form>
            </Tmodal>
        </div>
    );
}
