import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Tmodal from "../Tmodal/Tmodal";
import { updateClinicSlot, deleteClinicSlot  } from "../../utils/fetchApi";
import { FaPen, FaTrashAlt } from "react-icons/fa";

export default function EditSlot({ slot, doctorId, onSlotUpdated, onSlotDeleted }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false); // separate state
  const [form, setForm] = useState({
    slot_id: slot.id,
    doctor_id: doctorId,
    day_of_week: slot.day_of_week,
    start_time: slot.start_time,
    end_time: slot.end_time,
    slot_duration_minutes: slot.slot_duration_minutes,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setForm({
      slot_id: slot.id,
      doctor_id: doctorId,
      day_of_week: slot.day_of_week,
      start_time: slot.start_time,
      end_time: slot.end_time,
      slot_duration_minutes: slot.slot_duration_minutes,
    });
  }, [slot, doctorId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatTime = (time) => {
    if (!time) return "";
    if (/^\d{2}:\d{2}:\d{2}$/.test(time)) return time;
    if (/^\d{2}:\d{2}$/.test(time)) return `${time}:00`;
    return "";
  };

  // Update Slot
  const handleUpdate = async () => {
    setLoading(true);
    setMessage(null);

    const payload = {
      slot_id: Number(form.slot_id),
      doctor_id: Number(form.doctor_id),
      day_of_week: form.day_of_week.trim(),
      start_time: formatTime(form.start_time),
      end_time: formatTime(form.end_time),
      slot_duration_minutes: Number(form.slot_duration_minutes),
    };

    const res = await updateClinicSlot(payload);
    setLoading(false);

    if (res.status) {
      setMessage({ type: "success", text: res.message });
      if (onSlotUpdated) onSlotUpdated(res.data);
      setTimeout(() => {
        setMessage(null);
        setEditOpen(false);
      }, 3000);
    } else {
      setMessage({ type: "error", text: res.message });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Delete Slot
  const handleDelete = async () => {
    setLoading(true);
    setMessage(null);

    const res = await deleteClinicSlot(slot.id);
    setLoading(false);

    if (res.status) {
      setMessage({ type: "success", text: res.message });
      if (onSlotDeleted) onSlotDeleted(slot.id); // remove slot from parent list
      setTimeout(() => {
        setMessage(null);
        setDeleteOpen(false);
      }, 3000);
    } else {
      setMessage({ type: "error", text: res.message });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="flex gap-2">
      <FaPen className="text-primary cursor-pointer" onClick={() => setEditOpen(true)} />
      <FaTrashAlt className="text-danger cursor-pointer" onClick={() => setDeleteOpen(true)} />

      {/* Edit Modal */}
      <Tmodal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Slot"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Update"}
            </Button>
          </>
        }
      >
        {message && (
          <div className={`p-2 mb-2 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}
        <Form>
          <div className="grid grid-cols-2 gap-3">
            <Form.Group className="mb-3">
              <Form.Label>Day of Week</Form.Label>
              <Form.Select name="day_of_week" value={form.day_of_week} onChange={handleChange}>
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => (
                  <option key={day} value={day}>{day}</option>
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

      {/* Delete Modal */}
      <Tmodal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Are you sure you want to delete this slot?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Delete"}
            </Button>
          </>
        }
      >
        {message && (
          <div className={`p-2 mb-2 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}
      </Tmodal>
    </div>
  );
}
