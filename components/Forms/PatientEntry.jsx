import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Input, Select, SelectItem, RadioGroup, Radio, Textarea } from "@heroui/react";
import { LanguageContext } from "../../context/LanguageContext";


export default function PatientEntry() {

  const { switchLanguage, locale, translateText } = useContext(LanguageContext);

  const [clientLocale, setClientLocale] = useState("");

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  
    // Re-run validation to update error messages
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
    <div className="w-full bg-gray-100 md:p-6 p-0">
      <div className="w-full space-y-5 bg-white shadow-lg rounded-lg p-4 ">
        <div className="md:p-4">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 text-center">{translateText("patient_entry_form")}</h2>
          <form onSubmit={handleSubmit}>
            <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold my-4">{translateText("patient_information")}</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
              <div className="mb-4">
                <Input
                  type="text"
                  name="name"
                  label={translateText("full_name")}
                  labelPlacement="outside"
                  placeholder={translateText("enter_name")}
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                  // isRequired={true}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <Input
                  type="date"
                  name="dob"
                  label={translateText("date_of_birth")}
                  variant="bordered"
                  labelPlacement="outside"
                  className=" focus:ring-blue-500"
                  value={formData.dob}
                  onChange={handleChange}
                  //  isRequired={true}
                />
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
              <div className="mb-4">
                <Select
                  className="max-w-full"
                  label={translateText("gender")}
                  placeholder={translateText("select_gender")}
                  labelPlacement="outside"
                  variant="bordered"
                  name="gender"
                  selectedKeys={new Set([formData.gender])} // Ensure selectedKeys is a Set
                  onSelectionChange={(keys) =>
                    handleChange({ target: { name: "gender", value: Array.from(keys)[0] || "" } })
                  }
                >
                  {gender.map((g) => (
                    <SelectItem key={g.key} value={g.key}>
                      {g.label}
                    </SelectItem>
                  ))}
                </Select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
              <div className="mb-4">
                <Input
                  type="number"
                  name="number"
                  label={translateText("mobile_number")}
                  placeholder={translateText("enter_number")}
                  labelPlacement="outside"
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.number}
                  onChange={handleChange}
                />
                {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
              <div className="mb-4">
                <Input
                  type="text"
                  name="email"
                  label={translateText("email")}
                  labelPlacement="outside"
                  placeholder={translateText("enter_email")}
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  //  isRequired={true}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="address"
                  label={translateText("address")}
                  placeholder={translateText("enter_address")}
                  labelPlacement="outside"
                  className=" focus:ring-blue-500"
                  value={formData.address}
                  onChange={handleChange}
                  variant="bordered"
                  //  isRequired={true}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
            </div>

            <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold my-4">{translateText("medical_details")}</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
              <div className="mb-4">
                <RadioGroup label={translateText("blood_group")} orientation="horizontal" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                    <Radio key={group} value={group}>{group}</Radio>
                  ))}
                </RadioGroup>
                {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup}</p>}
              </div>
              <div className="mb-4">
                <Select
                  className="max-w-full"
                  label={translateText("allergies")}
                  placeholder={translateText("select")}
                  labelPlacement="outside"
                  variant="bordered"
                  name="allergies"
                  selectedKeys={new Set([formData.allergies])} // Ensure selectedKeys is a Set
                  onSelectionChange={(keys) =>
                    handleChange({ target: { name: "allergies", value: Array.from(keys)[0] || "" } })
                  }
                >
                  <SelectItem key="Yes" value="Yes">
                    {translateText("yes")}
                  </SelectItem>
                  <SelectItem key="No" value="No">
                    {translateText("no")}
                  </SelectItem>
                </Select>

                {formData.allergies === "Yes" && (
                  <Textarea
                    name="allergyDetails"
                    placeholder={translateText("specify_allergies")}
                    className="focus:border-blue-500 mt-2"
                    value={formData.allergyDetails}
                    variant="bordered"
                    onChange={handleChange}
                  />
                )}

                {errors.allergies && <p className="text-red-500 text-sm">{errors.allergies}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
              <div className="mb-4">
                <Input
                  type="text"
                  name="medications"
                  label={translateText("current_medications")}
                  placeholder={translateText("enter_medications")}
                  labelPlacement="outside"
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.medications}
                  onChange={handleChange}
                />
                {errors.medications && <p className="text-red-500 text-sm">{errors.medications}</p>}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="history"
                  label={translateText("past_medical_history")}
                  placeholder={translateText("enter_history")}
                  labelPlacement="outside"
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.history}
                  onChange={handleChange}
                />
                {errors.history && <p className="text-red-500 text-sm">{errors.history}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
              <div className="mb-4">
                <Input
                  type="text"
                  name="doctorName"
                  label={translateText("primary_doctor_name")}
                  labelPlacement="outside"
                  placeholder={translateText("enter_doctor_name")}
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.doctorName}
                  onChange={handleChange}
                />
                {errors.doctorName && <p className="text-red-500 text-sm">{errors.doctorName}</p>}
              </div>
            </div>

            <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold my-4">{translateText("emergencyContact")}</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
              <div className="mb-4">
                <Input
                  type="text"
                  name="emergencyContactName"
                  label={translateText("name")}
                  placeholder={translateText("enterEmergencyContactName")}
                  labelPlacement="outside"
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                />
                {errors.emergencyContactName && <p className="text-red-500 text-sm">{errors.emergencyContactName}</p>}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="emergencyContactRelation"
                  label={translateText("relationship")}
                  placeholder={translateText("enterEmergencyContactRelation")}
                  labelPlacement="outside"
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.emergencyContactRelation}
                  onChange={handleChange}
                />
                {errors.emergencyContactRelation && <p className="text-red-500 text-sm">{errors.emergencyContactRelation}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
              <div className="mb-4">
                <Input
                  type="number"
                  name="emergencyContactNumber"
                  label={translateText("contactNumber")}
                  labelPlacement="outside"
                  placeholder={translateText("enterEmergencyContactNumber")}
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.emergencyContactNumber}
                  onChange={handleChange}
                />
                {errors.emergencyContactNumber && <p className="text-red-500 text-sm">{errors.emergencyContactNumber}</p>}
              </div>
            </div>

            <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold my-4">{translateText("insuranceDetails")}</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
              <div className="mb-4">
                <Input
                  type="text"
                  name="insuranceProviderName"
                  label={translateText("insuranceProvider")}
                  placeholder={translateText("enterInsuranceProvider")}
                  labelPlacement="outside"
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.insuranceProviderName}
                  onChange={handleChange}
                />
                {errors.insuranceProviderName && <p className="text-red-500 text-sm">{errors.insuranceProviderName}</p>}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="policyNumber"
                  label={translateText("policyNumber")}
                  placeholder={translateText("enterPolicyNumber")}
                  labelPlacement="outside"
                  variant="bordered"
                  className=" focus:ring-blue-500"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  //  isRequired={true}
                />
                {errors.policyNumber && <p className="text-red-500 text-sm">{errors.policyNumber}</p>}
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
      </div>
    </div>
  );
}