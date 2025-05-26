import React, { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import PropertyDetailsForm from "./PropertyDetailsForm";
import GeneralInfoForm from "./GeneralInfoForm";
import LocationInfoForm from "./LocationInfoForm";
import "./AddProperty.css";

const AddProperty = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [propertyData, setPropertyData] = useState({
    basicInfo: {},
    propertyDetails: {},
    generalInfo: {},
    locationInfo: {},
  });

  const normalize = (section, data) => {
    switch (section) {
      case "basicInfo":
        return {
          ...data,
          price: Number(data.price),
          negotiable: data.negotiable === "Yes",
          propertyApproved: data.propertyApproved === "Yes",
          bankLoan: data.bankLoan === "Yes",
        };
      case "propertyDetails":
        return {
          ...data,
          length: Number(data.length),
          breadth: Number(data.breadth),
          totalArea: Number(data.totalArea),
          bhk: Number(data.bhk),
          floors: Number(data.floors),
          attached: data.attached === "Yes",
          westernToilet: data.westernToilet === "Yes",
          furnished: data.furnished === "Yes",
          carParking: data.carParking === "Yes",
          lift: data.lift === "Yes",
        };
      case "locationInfo":
        return {
          ...data,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
        };
      default:
        return data;
    }
  };

  const handleNext = (sectionData) => {
    const sections = [
      "basicInfo",
      "propertyDetails",
      "generalInfo",
      "locationInfo",
    ];
    const sectionKey = sections[step - 1];
    const normalizedData = normalize(sectionKey, sectionData);

    setPropertyData((prev) => ({
      ...prev,
      [sectionKey]: normalizedData,
    }));

    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (finalData) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "https://backendreal-lywv.onrender.com/api/properties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalData),
        }
      );
      if (!response.ok) throw new Error("Failed to add property");
      alert("Property added successfully!");
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const StepComponent = () => {
    switch (step) {
      case 1:
        return (
          <BasicInfoForm
            data={propertyData.basicInfo}
            onNext={handleNext}
            onBack={onClose}
          />
        );
      case 2:
        return (
          <PropertyDetailsForm
            data={propertyData.propertyDetails}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <GeneralInfoForm
            data={propertyData.generalInfo}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <LocationInfoForm
            data={propertyData.locationInfo}
            onSubmit={(form) => {
              const normalizedLocationInfo = normalize("locationInfo", form);
              const finalData = {
                ...propertyData,
                locationInfo: normalizedLocationInfo,
              };
              handleSubmit(finalData);
            }}
            onBack={handleBack}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="add-property-container">
      <h2 className="title">Add New Property</h2>
      <div className="steps-nav">
        {["Basic Info", "Property Detail", "General Info", "Location Info"].map(
          (label, idx) => (
            <div
              key={idx}
              className={`step${step === idx + 1 ? " active" : ""}`}
            >
              <div
                className={`circle${step === idx + 1 ? " active-circle" : ""}`}
              >
                {idx + 1}
              </div>
              <span
                className={`step-label${
                  step === idx + 1 ? " active-label" : ""
                }`}
              >
                {label}
              </span>
            </div>
          )
        )}
      </div>
      <div className="form-container">
        <StepComponent />
      </div>
    </div>
  );
};

export default AddProperty;
