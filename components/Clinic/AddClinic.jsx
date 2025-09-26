import React, { useContext, useEffect, useState, useCallback } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { addClinic } from "../../utils/fetchApi";
import { Card, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../Breadcrumb/PageTitle";
import { getLatLngFromAddress,getTimezone  } from "../../utils/googleApi";
import { Head } from "../../layouts/head";

export default function AddClinic() {
  const { translateText, locale } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");

  const [formData, setFormData] = useState({
    clinic_name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  // Dropzone for file upload
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
      setPreviewImg(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!formData.clinic_name.trim()) newErrors.clinic_name = "Required";
    if (!formData.email) {
      newErrors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.location.trim()) newErrors.location = "Required";
    if (!formData.description.trim()) newErrors.description = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Submit
// Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  setLoading(true);

  try {
    // 1. Get lat/lon from address
    const { lat, lng } = await getLatLngFromAddress(formData.location);

    // 2. Get timezone + offset
    const { timezone, tz_offset } = await getTimezone(lat, lng);

    // 3. Prepare API payload
    const apiData = {
      ...formData,
      timezone: tz_offset, 
      latitude: lat,
      longitude: lng,
      image,
    };

    // console.log("Payload to API:", apiData);

    // 4. Call API
    const result = await addClinic(apiData);

    if (result.status) {
      setShowSuccess(true);
      setSuccessMessage(result.message);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({
        clinic_name: "",
        email: "",
        phone: "",
        location: "",
        description: "",
      });
      setImage(null);
      setPreviewImg(null);
      setErrors({});
    } else {
      if (result.data?.email) {
        setErrors({ email: result.data.email[0] });
      } else {
        setErrors({ api: result.message });
      }
    }
  } catch (error) {
    setErrors({ api: error.message });
  }

  setLoading(false);
};


  return (
    <div className="m-4">
       <Head title="Add Clinic" />
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Add Clinic", active: true },
        ]}
        title={translateText("Add Clinic")}
      />

      <Card>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            {showSuccess && (
              <div className="my-3 text-center text-green-500">
                <span>{successMessage}</span>
              </div>
            )}
            {errors.api && (
              <p className="text-red-500 text-sm text-center">{errors.api}</p>
            )}

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Form.Group>
                <Form.Label className="text-sm text-gray-500">
                  Clinic Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="clinic_name"
                  placeholder="Enter clinic name"
                  value={formData.clinic_name}
                  onChange={handleChange}
                />
                {errors.clinic_name && (
                  <p className="text-red-500 text-sm">{errors.clinic_name}</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-sm text-gray-500">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </Form.Group>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-3">
              <Form.Group>
                <Form.Label className="text-sm text-gray-500">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-sm text-gray-500">
                  Location
                </Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </Form.Group>
            </div>

            <Form.Group className="mt-3">
              <Form.Label className="text-sm text-gray-500">
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </Form.Group>

            {/* File Upload */}
            <div className="mt-4">
              <Form.Group>
                <Form.Label className="text-sm text-gray-500">
                  Clinic Image (Optional)
                </Form.Label>

                {previewImg && (
                  <a
                    href={previewImg}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={previewImg}
                      alt="Preview"
                      className="h-24 w-24 object-cover border rounded-md my-2"
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
                    <p>Drop the file here ...</p>
                  ) : (
                    <div>
                      <IoCloudUploadOutline className="mx-auto text-3xl text-gray-500" />
                      <p className="mt-2 font-medium">
                        Drop your image here, or click to browse
                      </p>
                      <small className="text-gray-500">
                        PNG, JPG, GIF allowed
                      </small>
                    </div>
                  )}
                </div>
              </Form.Group>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                translateText("submit")
              )}
            </button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
