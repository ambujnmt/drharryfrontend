import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import PageTitle from "../Breadcrumb/PageTitle";
import { LanguageContext } from "../../context/LanguageContext";
import {
  fetchClinicById,
  updateClinic,
} from "../../utils/fetchApi";
import { getLatLngFromAddress, getTimezone } from "../../utils/googleApi"; // 👈 move your helpers here
import { Spinner } from "@heroui/react";
import { Head } from "../../layouts/head";

export default function ClinicUpdate() {
  const router = useRouter();
  const { id } = router.query;
  const { translateText } = useContext(LanguageContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (!file.type.startsWith("image/")) {
        setStatusMessage("Please upload a valid image.");
        setStatusType("error");
        return;
      }
      setPreviewImg(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    multiple: false,
  });

  // Fetch details
  useEffect(() => {
    const getDetails = async () => {
      if (!id) return;
      setLoading(true);
      const res = await fetchClinicById(id);
      if (res?.status && res.data) {
        setFormData(res.data);
        if (res.data.image) {
          setPreviewImg(res.data.image);
        }
      }
      setLoading(false);
    };
    getDetails();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage("");

    try {
      let payload = new FormData();
      let updatedData = { ...formData };

      // If location changed → fetch lat/lng + timezone
      if (formData.location) {
        try {
          const { lat, lng } = await getLatLngFromAddress(formData.location);
          const { timezone, tz_offset } = await getTimezone(lat, lng);
          updatedData.latitude = lat;
          updatedData.longitude = lng;
          updatedData.timezone = tz_offset; // ✅ send tz_offset only
        } catch (err) {
          console.error("Location update error:", err);
        }
      }

      // Append to FormData
      payload.append("clinic_id", id);
      Object.keys(updatedData).forEach((key) => {
        if (key === "image" && updatedData[key] instanceof File) {
          payload.append("image", updatedData[key]);
        } else if (updatedData[key] !== undefined && updatedData[key] !== null) {
          payload.append(key, updatedData[key]);
        }
      });

      const res = await updateClinic(payload);

      if (res?.status) {
        setStatusMessage(res.message);
        setStatusType("success");
        setTimeout(() => router.replace("/clinic/clinicManagement"), 1500);
      } else {
        setStatusMessage(res?.message);
        setStatusType("error");
      }
    } catch (err) {
      console.error("Update error:", err);
      setStatusMessage("Unexpected error occurred");
      setStatusType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
       <Head title="Clinic Update" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Clinic List", path: "/clinic/clinicManagement" },
          { label: "Update Clinic", active: true },
        ]}
        title={translateText("Update Clinic")}
      />

      <Card>
        <Card.Body>
          {statusMessage && (
            <div
              className={`mb-4 text-center ${statusType === "success" ? "text-success" : "text-danger"
                }`}
            >
              {statusMessage}
            </div>
          )}

          {!loading ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Clinic Name */}
                <div>
                  <Form.Label className="text-sm text-gray-500">
                    {translateText("Clinic Name")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="clinic_name"
                    value={formData.clinic_name}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div>
                  <Form.Label className="text-sm text-gray-500">
                    {translateText("Email")}
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div>
                  <Form.Label className="text-sm text-gray-500">
                    {translateText("Phone")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Location */}
                <div>
                  <Form.Label className="text-sm text-gray-500">
                    {translateText("Location")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <Form.Label className="text-sm text-gray-500">
                    {translateText("Description")}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Image Upload */}
                <div className="col-span-2">
                  <Form.Label className="text-sm text-gray-500">
                    {translateText("Clinic Image")}
                  </Form.Label>
                  {previewImg && (
                    <a
                      href={previewImg}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={previewImg}
                        alt="Clinic Preview"
                        className="h-24 w-24 object-cover border rounded my-2"
                      />
                    </a>
                  )}
                  <div
                    {...getRootProps()}
                    className="border border-dotted rounded p-5 text-center"
                    style={{ cursor: "pointer", background: "#f8f9fa" }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <div>
                        <IoCloudUploadOutline className="block m-auto text-[30px] text-gray-500" />
                        <p className="mt-2 text-[23px] font-medium mb-1">
                          Drop your images here, or click to browse
                        </p>
                        <small className="text-[13px] text-gray-500">
                          (1600 x 1200 recommended. PNG, JPG, GIF allowed)
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-2 mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (
                    translateText("Update")
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/clinic/clinicManagement")}
                  className="btn btn-secondary"
                >
                  {translateText("Cancel")}
                </button>
              </div>
            </form>
          ) : (
  <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
