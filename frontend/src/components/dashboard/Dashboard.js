import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import PropertyTable from "./PropertyTable";
import AddProperty from "./addProperty/AddProperty";
import PropertyDetailsModal from "./PropertyDetailsModal";
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
        const response = await fetch(
          "https://backendreal-lywv.onrender.com/api/properties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch properties");

        const data = await response.json();
        const dataWithPPD = data.map((property, index) => ({
          ...property,
          ppdId: `PPD${1000 + index}`,
        }));
        setProperties(dataWithPPD);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Topbar email={email} name={name} navigate={navigate} />
        {showAddProperty ? (
          <AddProperty onClose={() => setShowAddProperty(false)} />
        ) : (
          <PropertyTable
            properties={properties}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openPropertyDetails={(id) => {
              setSelectedPropertyId(id);
              setShowModal(true);
            }}
            openEditModal={(id) => {
              setSelectedPropertyId(id);
              setShowEditModal(true);
            }}
            onAddPropertyClick={() => setShowAddProperty(true)}
          />
        )}
      </main>

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
