import React, { useState } from 'react';
import './BasicInfoForm.css';

const LocationInfoForm = ({ data, onSubmit, onBack }) => {
  const [form, setForm] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = () => onSubmit(form);

  return (
    <div className="container">
      <div className="grid">
        <div>
          <label className="label">Email</label>
          <input
            name="email"
            placeholder="Email"
            value={form.email || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">City</label>
          <select
            name="city"
            value={form.city || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Gurgaon">Gurgaon</option>
          </select>
        </div>

        <div>
          <label className="label">Area</label>
          <select
            name="area"
            value={form.area || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Area</option>
            {form.city === 'Delhi' && (
              <>
                <option value="Dwarka">Dwarka</option>
                <option value="Saket">Saket</option>
                <option value="Rohini">Rohini</option>
              </>
            )}
            {form.city === 'Gurgaon' && (
              <>
                <option value="Cyber City">Cyber City</option>
                <option value="MG Road">MG Road</option>
                <option value="Sohna Road">Sohna Road</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="label">Pincode</label>
          <select
            name="pincode"
            value={form.pincode || ''}
            onChange={handleChange}
            className="select"
          >
            <option value="" disabled>Select Pincode</option>
            {/* Delhi */}
            {form.area === 'Dwarka' && <option value="110075">110075</option>}
            {form.area === 'Saket' && <option value="110017">110017</option>}
            {form.area === 'Rohini' && <option value="110085">110085</option>}
            {/* Gurgaon */}
            {form.area === 'Cyber City' && <option value="122002">122002</option>}
            {form.area === 'MG Road' && <option value="122001">122001</option>}
            {form.area === 'Sohna Road' && <option value="122018">122018</option>}
          </select>
        </div>

        <div>
          <label className="label">Address</label>
          <input
            name="address"
            placeholder="Address"
            value={form.address || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Landmark</label>
          <input
            name="landmark"
            placeholder="Landmark"
            value={form.landmark || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Latitude</label>
          <input
            name="latitude"
            placeholder="Latitude"
            value={form.latitude || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Longitude</label>
          <input
            name="longitude"
            placeholder="Longitude"
            value={form.longitude || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div className="button-container">
        <button onClick={onBack} className="button button-cancel">Back</button>
        <button onClick={handleFinalSubmit} className="button button-save">Add Property</button>
      </div>
    </div>
  );
};

export default LocationInfoForm;
