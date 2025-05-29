import React from "react";

function Sidebar() {
  return (
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
  );
}

export default Sidebar;
