import React, { useState } from 'react';
import './BasicInfoForm.css'; 

const BasicInfoForm = ({ data, onNext, onBack }) => {
  const [form, setForm] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => onNext(form);

  return (
    <div className="container">

      <div className="grid">
        <div>
          <label className="label">Property Type</label>
          <select
            name="propertyType"
            value={form.propertyType || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        <div>
          <label className="label">Negotiable</label>
          <select
            name="negotiable"
            value={form.negotiable || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Negotiable</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="label">Price</label>
          <input
            type="text"
            name="price"
            value={form.price || ''}
            onChange={handleChange}
            placeholder="Example: 10000"
            className="input"
          />
        </div>

        <div>
          <label className="label">Ownership</label>
          <select
            name="ownership"
            value={form.ownership || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Ownership</option>
            <option value="Freehold">Freehold</option>
            <option value="Leasehold">Leasehold</option>
            <option value="Cooperative">Cooperative</option>
          </select>
        </div>

        <div>
          <label className="label">Property Age</label>
          <select
            name="propertyAge"
            value={form.propertyAge || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Property Age</option>
            <option value="New">New</option>
            <option value="1-5 years">1-5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </div>

        <div>
          <label className="label">Property Approved</label>
          <select
            name="propertyApproved"
            value={form.propertyApproved || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Approval</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="label">Property Description</label>
          <textarea
            name="propertyDescription"
            value={form.propertyDescription || ''}
            onChange={handleChange}
            placeholder="Property Description"
            rows="3"
            className="textarea"
          />
        </div>

        <div>
          <label className="label">Bank Loan</label>
          <select
            name="bankLoan"
            value={form.bankLoan || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Bank Loan</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      <div className="button-container">
        <button
          onClick={onBack}
          className="button button-cancel"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="button button-save"
        >
          Save &amp; Continue
        </button>
      </div>
    </div>
  );
};

export default BasicInfoForm;

