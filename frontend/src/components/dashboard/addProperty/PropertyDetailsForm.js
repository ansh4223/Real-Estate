import React, { useState } from 'react';
import './BasicInfoForm.css'; 

const PropertyDetailsForm = ({ data, onNext, onBack }) => {
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
          <label className="label">Length</label>
          <input
            name="length"
            placeholder="Length"
            value={form.length || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Breadth</label>
          <input
            name="breadth"
            placeholder="Breadth"
            value={form.breadth || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Total Area</label>
          <input
            name="totalArea"
            placeholder="Total Area"
            value={form.totalArea || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Area Unit</label>
          <select
            name="areaUnit"
            value={form.areaUnit || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Area Unit</option>
            <option value="sqft">Sq. Ft.</option>
            <option value="sqm">Sq. Meter</option>
            <option value="sqyrd">Sq. Yard</option>
            <option value="acre">Acre</option>
            <option value="hectare">Hectare</option>
          </select>
        </div>

        <div>
          <label className="label">No. of BHK</label>
          <select
            name="bhk"
            value={form.bhk || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select BHK</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4+ BHK">4+ BHK</option>
          </select>
        </div>

        <div>
          <label className="label">No. of Floors</label>
          <select
            name="floors"
            value={form.floors || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Floors</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3+">3+</option>
          </select>
        </div>

        <div>
          <label className="label">Attached</label>
          <select
            name="attached"
            value={form.attached || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="label">Western Toilet</label>
          <select
            name="westernToilet"
            value={form.westernToilet || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="label">Furnished</label>
          <select
            name="furnished"
            value={form.furnished || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Furnishing</option>
            <option value="Fully Furnished">Fully Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        <div>
          <label className="label">Car Parking</label>
          <select
            name="carParking"
            value={form.carParking || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="label">Lift</label>
          <select
            name="lift"
            value={form.lift || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="label">Electricity</label>
          <select
            name="electricity"
            value={form.electricity || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Electricity</option>
            <option value="1 Phase">1 Phase</option>
            <option value="3 Phase">3 Phase</option>
          </select>
        </div>

        <div>
          <label className="label">Facing</label>
          <select
            name="facing"
            value={form.facing || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Direction</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
        </div>
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

export default PropertyDetailsForm;
