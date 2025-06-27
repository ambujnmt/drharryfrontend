import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import PageTitle from "../Breadcrumb/PageTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form } from "react-bootstrap";

export default function PatientEntry() {

  const { switchLanguage, locale, translateText } = useContext(LanguageContext);

  const [clientLocale, setClientLocale] = useState("");

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
    if (Object.keys(errors).length > 0) {
      validate();
    }
  }, [locale]);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    number: "",
    email: "",
    address: "",
    bloodGroup: "",
    allergies: "",
    allergyDetails: "",
    medications: "",
    history: "",
    doctorName: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactNumber: "",
    insuranceProviderName: "",
    policyNumber: "",

  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = translateText("full_name") + " " + translateText("required_field");
    if (!formData.dob) newErrors.dob = translateText("date_of_birth") + " " + translateText("required_field");
    if (!formData.gender) newErrors.gender = translateText("gender") + " " + translateText("required_field");
    if (!formData.number) {
      newErrors.number = translateText("phone_number") + " " + translateText("required_field");
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = translateText("invalid_phone");
    }
    if (!formData.email) {
      newErrors.email = translateText("emailRequired");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = translateText("invalid_email");
    }
    if (!formData.address.trim()) newErrors.address = translateText("address") + " " + translateText("required_field");
    if (!formData.bloodGroup) newErrors.bloodGroup = translateText("blood_group") + " " + translateText("required_field");
    if (!formData.allergies) newErrors.allergies = translateText("allergies") + " " + translateText("required_field");
    if (formData.allergies === "Yes" && !formData.allergyDetails.trim()) {
      newErrors.allergyDetails = translateText("specify_allergies");
    }
    if (!formData.medications.trim()) newErrors.medications = translateText("medications") + " " + translateText("required_field");
    if (!formData.history.trim()) newErrors.history = translateText("medical_history") + " " + translateText("required_field");
    if (!formData.doctorName.trim()) newErrors.doctorName = translateText("doctor_name") + " " + translateText("required_field");
    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = translateText("emergency_contact_name") + " " + translateText("required_field");
    }
    if (!formData.emergencyContactNumber) {
      newErrors.emergencyContactNumber = translateText("emergency_contact_number") + " " + translateText("required_field");
    } else if (!/^\d{10}$/.test(formData.emergencyContactNumber)) {
      newErrors.emergencyContactNumber = translateText("invalid_phone");
    }
    if (!formData.emergencyContactRelation.trim()) {
      newErrors.emergencyContactRelation = translateText("emergency_contact_relation") + " " + translateText("required_field");
    }
    if (!formData.insuranceProviderName.trim()) {
      newErrors.insuranceProviderName = translateText("insurance_provider") + " " + translateText("required_field");
    }
    if (!formData.policyNumber.trim()) {
      newErrors.policyNumber = translateText("policy_number") + " " + translateText("required_field");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const gender = [
    { key: "male", label: translateText("male") },
    { key: "female", label: translateText("female") },
    { key: "other", label: translateText("other") },
  ];



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setFormData({
        name: "",
        dob: "",
        gender: "",
        number: "",
        email: "",
        address: "",
        bloodGroup: "",
        allergies: "",
        allergyDetails: "",
        medications: "",
        history: "",
        doctorName: "",
        emergencyContactName: "",
        emergencyContactRelation: "",
        emergencyContactNumber: "",
        insuranceProviderName: "",
        policyNumber: "",
      });
      setErrors({});
    }
  };
  return (
    <div className="m-4">
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Add Patient", active: true },
        ]}
        title={translateText("patient_entry_form")}
      />
      <Card>
        <Card.Body>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                <div className="mb-2">
                  <Form.Group>
                    <Form.Label className="text-sm text-gray-500">{translateText("full_name")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder={translateText("enter_name")}
                      value={formData.name}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.name}
                    />
                    {errors.name && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
                <div>
                  <Form.Group className="">
                    <Form.Label className="text-sm text-gray-500">{translateText("date_of_birth")}</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.dob}
                    />
                    {errors.dob && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                <div>
                  <Form.Group controlId="gender">
                    <Form.Label className="text-sm text-gray-500">{translateText("gender")}</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={(e) => handleChange({ target: { name: "gender", value: e.target.value } })}
                      isInvalid={!!errors.gender} 
                    >
                      <option className="text-sm text-gray-500" value="">{translateText("select_gender")}</option> 
                      {gender.map((g) => (
                        <option className="text-sm text-gray-500" key={g.key} value={g.key}>
                          {g.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.gender && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>

                </div>
                <div className="mb-3">
                  <Form.Group className="">
                    <Form.Label className="text-sm text-gray-500">{translateText("mobile_number")}</Form.Label>
                    <Form.Control
                      type="number"
                      name="number"
                      placeholder={translateText("enter_number")}
                      value={formData.number}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.number}
                    />
                    {errors.number && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                <div className="mb-3">
                  <Form.Group className="">
                    <Form.Label className="text-sm text-gray-500">{translateText("email")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder={translateText("enter_email")}
                      value={formData.email}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.email}
                    />
                    {errors.email && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
                <div className="mb-3">
                  <Form.Group className="">
                    <Form.Label className="text-sm text-gray-500">{translateText("address")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder={translateText("enter_address")}
                      value={formData.address}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.address}
                    />
                    {errors.address && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
              </div>

              <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold my-2.5">{translateText("medical_details")}</h3>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                <div className="mb-3">
                  <Form.Group controlId="bloodGroup">
                    <Form.Label className="text-sm text-gray-500">{translateText("blood_group")}</Form.Label>
                    <div className="d-flex flex-wrap gap-2 text-sm text-gray-500">
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                        <Form.Check
                          inline
                          key={group}
                          type="radio"
                          label={group}
                          name="bloodGroup"
                          value={group}
                          checked={formData.bloodGroup === group}
                          onChange={handleChange}
                          isInvalid={!!errors.bloodGroup}
                        />
                      ))}
                    </div>
                    {errors.bloodGroup && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                </div>
                <div className="mb-3">
                  <Form.Group controlId="allergies">
                    <Form.Label className="text-sm text-gray-500">{translateText("allergies")}</Form.Label>
                    <Form.Select
                      name="allergies"
                      value={formData.allergies} 
                      onChange={(e) => handleChange({ target: { name: "allergies", value: e.target.value } })}
                      isInvalid={!!errors.allergies} 
                    >
                      <option className="text-sm text-gray-500" value="">Select</option> 
                      <option className="text-sm text-gray-500" value="Yes">{translateText("yes")}</option> 
                      <option className="text-sm text-gray-500" value="No">{translateText("no")}</option>

                    </Form.Select>
                    {errors.allergies && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>

                  {formData.allergies === "Yes" && (
                    <Form.Group controlId="allergyDetails" className="mt-2">
                      <Form.Label className="text-sm text-gray-500">{translateText("specify_allergies")}</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="allergyDetails"
                        placeholder={translateText("specify_allergies")}
                        value={formData.allergyDetails}
                        onChange={handleChange}
                        isInvalid={!!errors.allergies}
                      />
                      {errors.allergies && (
                        <Form.Control.Feedback type="invalid">
                          {errors.allergies}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                <div className="mb-3">
                    <Form.Group>
                    <Form.Label className="text-sm text-gray-500">{translateText("current_medications")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="medications"
                      placeholder={translateText("enter_medications")}
                      value={formData.medications}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.medications}
                    />
                    {errors.medications && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-sm text-gray-500">{translateText("past_medical_history")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="history"
                      placeholder={translateText("enter_history")}
                      value={formData.history}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.history}
                    />
                    {errors.history && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                <div className="mb-3">
                    <Form.Group>
                    <Form.Label className="text-sm text-gray-500">{translateText("primary_doctor_name")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="doctorName"
                      placeholder={translateText("enter_doctor_name")}
                      value={formData.doctorName}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.doctorName}
                    />
                    {errors.doctorName && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
              </div>

              <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold my-2">{translateText("emergencyContact")}</h3>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                <div className="mb-3">
                   <Form.Group>
                    <Form.Label className="text-sm text-gray-500">{translateText("name")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="emergencyContactName"
                      placeholder={translateText("enterEmergencyContactName")}
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.emergencyContactName}
                    />
                    {errors.emergencyContactName && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
                <div className="mb-3">
                   <Form.Group>
                    <Form.Label className="text-sm text-gray-500">{translateText("relationship")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="emergencyContactRelation"
                      placeholder={translateText("enterEmergencyContactRelation")}
                      value={formData.emergencyContactRelation}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.emergencyContactRelation}
                    />
                    {errors.emergencyContactRelation && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                <div className="mb-3">
                   <Form.Group>
                    <Form.Label className="text-sm text-gray-500">{translateText("contactNumber")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="emergencyContactNumber"
                      placeholder={translateText("enterEmergencyContactNumber")}
                      value={formData.emergencyContactNumber}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.emergencyContactNumber}
                    />
                    {errors.emergencyContactNumber && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
              </div>

              <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold my-2">{translateText("insuranceDetails")}</h3>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-sm text-gray-500">{translateText("insuranceProvider")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="insuranceProviderName"
                      placeholder={translateText("enterInsuranceProvider")}
                      value={formData.insuranceProviderName}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.insuranceProviderName}
                    />
                    {errors.insuranceProviderName && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
                <div className="mb-4">
                     <Form.Group>
                    <Form.Label className="text-sm text-gray-500">{translateText("policyNumber")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="policyNumber"
                      placeholder={translateText("enterPolicyNumber")}
                      value={formData.policyNumber}
                      onChange={handleChange}
                      className="border-1 border-gray-300 rounded-md"
                      isInvalid={!!errors.policyNumber}
                    />
                    {errors.policyNumber && <Form.Control.Feedback type="invalid"></Form.Control.Feedback>}
                  </Form.Group>
                </div>
              </div>

              <button
                type="submit"
                className="w-28 md:mt-4 mt-2 block mx-auto bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {translateText("submit")}
              </button>

              {showSuccess && (
                <div
                  className="bg-green-100 border my-5 text-center border-green-400 text-green-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">{translateText("successMessageTitle")} </strong>
                  <span className="block sm:inline">{translateText("successMessage")}</span>
                </div>
              )}
            </form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}