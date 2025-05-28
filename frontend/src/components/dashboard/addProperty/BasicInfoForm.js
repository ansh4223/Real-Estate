import React, { useState } from "react";
import "./BasicInfoForm.css";

const BasicInfoForm = ({ data, onNext, onBack }) => {
  const [form, setForm] = useState(data);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.propertyType)
      newErrors.propertyType = "Property type is required.";
    if (!form.negotiable)
      newErrors.negotiable = "Negotiable field is required.";
    if (!form.price) newErrors.price = "Price is required.";
    else if (isNaN(form.price)) newErrors.price = "Price must be a number.";
    if (!form.ownership) newErrors.ownership = "Ownership is required.";
    if (!form.propertyAge) newErrors.propertyAge = "Property age is required.";
    if (!form.propertyApproved)
      newErrors.propertyApproved = "Approval status is required.";
    if (!form.propertyDescription)
      newErrors.propertyDescription = "Description is required.";
    if (!form.bankLoan) newErrors.bankLoan = "Bank loan field is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(form);
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <div>
          <label className="label">Property Type</label>
          <select
            name="propertyType"
            value={form.propertyType || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Property Type
            </option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
            <option value="Villa">Villa</option>
          </select>
          {errors.propertyType && (
            <p className="error">{errors.propertyType}</p>
          )}
        </div>

        <div>
          <label className="label">Negotiable</label>
          <select
            name="negotiable"
            value={form.negotiable || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Negotiable
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.negotiable && <p className="error">{errors.negotiable}</p>}
        </div>

        <div>
          <label className="label">Price</label>
          <input
            type="text"
            name="price"
            value={form.price || ""}
            onChange={handleChange}
            placeholder="Example: 10000"
            className="input"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label className="label">Ownership</label>
          <select
            name="ownership"
            value={form.ownership || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Ownership
            </option>
            <option value="Freehold">Freehold</option>
            <option value="Leasehold">Leasehold</option>
            <option value="Cooperative">Cooperative</option>
          </select>
          {errors.ownership && <p className="error">{errors.ownership}</p>}
        </div>

        <div>
          <label className="label">Property Age</label>
          <select
            name="propertyAge"
            value={form.propertyAge || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Property Age
            </option>
            <option value="New">New</option>
            <option value="1-5 years">1-5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
          {errors.propertyAge && <p className="error">{errors.propertyAge}</p>}
        </div>

        <div>
          <label className="label">Property Approved</label>
          <select
            name="propertyApproved"
            value={form.propertyApproved || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Approval
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.propertyApproved && (
            <p className="error">{errors.propertyApproved}</p>
          )}
        </div>

        <div>
          <label className="label">Property Description</label>
          <textarea
            name="propertyDescription"
            value={form.propertyDescription || ""}
            onChange={handleChange}
            placeholder="Property Description"
            rows="3"
            className="textarea"
          />
          {errors.propertyDescription && (
            <p className="error">{errors.propertyDescription}</p>
          )}
        </div>

        <div>
          <label className="label">Bank Loan</label>
          <select
            name="bankLoan"
            value={form.bankLoan || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Bank Loan
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.bankLoan && <p className="error">{errors.bankLoan}</p>}
        </div>
      </div>

      <div className="button-container">
        <button onClick={onBack} className="button button-cancel">
          Cancel
        </button>
        <button onClick={handleSubmit} className="button button-save">
          Save &amp; Continue
        </button>
      </div>
    </div>
  );
};

export default BasicInfoForm;
