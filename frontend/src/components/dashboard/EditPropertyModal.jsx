import React, { useEffect, useState } from "react";
import "./PropertyDetailsModal.css"; // reuse same styling

const EditPropertyModal = ({ propertyId, onClose }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:8081/api/properties/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch property details");
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  const handleChange = (section, field, value) => {
    setProperty(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8081/api/properties/${propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(property),
      });

      if (!response.ok) throw new Error("Failed to update property");

      alert("Property updated successfully!");
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!propertyId) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="modal-sections">
            <h2>Edit Property</h2>

            {["basicInfo", "propertyDetails", "generalInfo", "locationInfo"].map((section) => (
              <section key={section}>
                <h3>{section.replace(/([A-Z])/g, " $1")}</h3>
                <table>
                  <tbody>
                    {Object.entries(property[section] || {}).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>
                          <input
                            type={typeof value === "boolean" ? "checkbox" : "text"}
                            checked={typeof value === "boolean" ? value : undefined}
                            value={typeof value === "boolean" ? undefined : value}
                            onChange={(e) =>
                              handleChange(section, key, typeof value === "boolean" ? e.target.checked : e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}

            <button onClick={handleSubmit} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPropertyModal;
