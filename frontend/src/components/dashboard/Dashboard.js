import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyDetailsModal from "./PropertyDetailsModal";
import UserDropdown from "./UserDropdown";
import AddProperty from "./addProperty/AddProperty";
import EditPropertyModal from "./EditPropertyModal";

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { email, name } = location.state || {};

    useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:8081/api/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property, index) => {
    const ppdId = `PPD${(1000 + index).toString()}`;
    return ppdId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const openPropertyDetails = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setShowModal(true);
  };

  const renderRows = () => {
    return filteredProperties.map((property, index) => (
      <tr key={property._id}>
        <td>PPD{(1000 + index).toString()}</td>
        <td>
          <i className="fa fa-image" style={{ color: "#B4B4C6" }} />
        </td>
        <td>{property.basicInfo?.propertyType || "N/A"}</td>
        <td>{property.generalInfo?.mobile || "N/A"}</td>
        <td>{property.propertyDetails?.totalArea || "N/A"}</td>
        <td>{Math.floor(Math.random() * 10) + 1}</td>
        <td>
          <span className={index % 2 === 0 ? "sold" : "unsold"}>
            {index % 2 === 0 ? "Sold" : "Unsold"}
          </span>
        </td>
        <td>{Math.floor(Math.random() * 40)}</td>
        <td>
          <i
            className="fa fa-eye action-icon"
            onClick={() => openPropertyDetails(property._id)}
          />
          <i
            className="fa fa-pencil action-icon"
            onClick={() => {
              setSelectedPropertyId(property._id);
              setShowEditModal(true);
            }}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">Logo</h2>
        <ul className="nav-links">
          <li className="active">
            <i className="fa fa-home"></i> Property
          </li>
          <li>
            <i className="fa fa-bell"></i> Assistance
          </li>
          <li>
            <i className="fa fa-download"></i> Received Interest
          </li>
          <li>
            <i className="fa fa-upload"></i> Sent Interest
          </li>
          <li>
            <i className="fa fa-eye"></i> Property Views
          </li>
          <li>
            <i className="fa fa-tag"></i> Tariff Plan
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <span className="user-id">USER ID : {email}</span>
          <UserDropdown name={name} email={email} navigate={navigate} />
        </div>
        {showAddProperty ? (
          <AddProperty onClose={() => setShowAddProperty(false)} />
        ) : (
          <>
            <div className="search-bar">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search PPD ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button>
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <button
                className="add-property"
                onClick={() => setShowAddProperty(true)}
              >
                + Add Property
              </button>
            </div>

            <table className="property-table">
              <thead>
                <tr>
                  <th>PPD ID</th>
                  <th>Image</th>
                  <th>Property</th>
                  <th>Contact</th>
                  <th>Area</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Days Left</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderRows()}</tbody>
            </table>
          </>
        )}
      </main>

      {/* {showAddProperty && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddProperty onClose={() => setShowAddProperty(false)} />
          </div>
        </div>
      )} */}

      {showModal && (
        <PropertyDetailsModal
          propertyId={selectedPropertyId}
          onClose={() => setShowModal(false)}
        />
      )}
      {showEditModal && (
        <EditPropertyModal
          propertyId={selectedPropertyId}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
