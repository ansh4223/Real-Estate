import React, { useState } from "react";
import "./BasicInfoForm.css";

const GeneralInfoForm = ({ data, onNext, onBack }) => {
  const [form, setForm] = useState(data);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

    const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, photo: file }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "mobile",
      "postedBy",
      "saleType",
      "featuredPackage",
      "ppdPackage",
    ];

    requiredFields.forEach((field) => {
      if (!form[field] || form[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

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
          <label className="label">Name</label>
          <input
            name="name"
            placeholder="Name"
            value={form.name || ""}
            onChange={handleChange}
            className="input"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label className="label">Mobile</label>
          <input
            name="mobile"
            placeholder="Mobile"
            value={form.mobile || ""}
            onChange={handleChange}
            className="input"
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </div>

        <div>
          <label className="label">Posted By</label>
          <select
            name="postedBy"
            value={form.postedBy || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Poster
            </option>
            <option value="Owner">Owner</option>
            <option value="Dealer">Dealer</option>
            <option value="Builder">Builder</option>
          </select>
          {errors.postedBy && <p className="error">{errors.postedBy}</p>}
        </div>

        <div>
          <label className="label">Sale Type</label>
          <select
            name="saleType"
            value={form.saleType || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Sale Type
            </option>
            <option value="For Sale">For Sale</option>
            <option value="Resale">Resale</option>
            <option value="Rent">Rent</option>
          </select>
          {errors.saleType && <p className="error">{errors.saleType}</p>}
        </div>

        <div>
          <label className="label">Featured Package</label>
          <select
            name="featuredPackage"
            value={form.featuredPackage || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.featuredPackage && (
            <p className="error">{errors.featuredPackage}</p>
          )}
        </div>

        <div>
          <label className="label">PPD Package</label>
          <select
            name="ppdPackage"
            value={form.ppdPackage || ""}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.ppdPackage && <p className="error">{errors.ppdPackage}</p>}
        </div>
      </div>
      <div className="photo-upload">
        <label htmlFor="photo-upload" className="photo-button">
          <div className="photo-icon">
            <i className="fa fa-camera" aria-hidden="true"></i>
          </div>
          <span className="photo-text">Add Photo</span>
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />
      </div>
      <div className="button-container">
        <button onClick={onBack} className="button button-cancel">
          Back
        </button>
        <button onClick={handleSubmit} className="button button-save">
          Save &amp; Continue
        </button>
      </div>
    </div>
  );
};

export default GeneralInfoForm;
