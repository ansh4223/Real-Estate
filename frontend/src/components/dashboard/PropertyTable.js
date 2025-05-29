import React from "react";

function PropertyTable({
  properties,
  searchQuery,
  setSearchQuery,
  openPropertyDetails,
  openEditModal,
  onAddPropertyClick,
}) {
  const filteredProperties = properties.filter((property) =>
    property.ppdId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
        <button className="add-property" onClick={onAddPropertyClick}>
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
        <tbody>
          {filteredProperties.map((property) => (
            <tr key={property._id}>
              <td>{property.ppdId}</td>
              <td>
                <i className="fa fa-image" style={{ color: "#B4B4C6" }} />
              </td>
              <td>{property.basicInfo?.propertyType || "N/A"}</td>
              <td>{property.generalInfo?.mobile || "N/A"}</td>
              <td>{property.propertyDetails?.totalArea || "N/A"}</td>
              <td>{Math.floor(Math.random() * 10) + 1}</td>
              <td>
                <span className={Math.random() > 0.5 ? "sold" : "unsold"}>
                  {Math.random() > 0.5 ? "Sold" : "Unsold"}
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
                  onClick={() => openEditModal(property._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PropertyTable;
