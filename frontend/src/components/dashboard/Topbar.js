import React from "react";
import UserDropdown from "./UserDropdown";

function Topbar({ email, name, navigate }) {
  return (
    <div className="top-bar">
      <span className="user-id">USER ID : {email}</span>
      <UserDropdown name={name} email={email} navigate={navigate} />
    </div>
  );
}

export default Topbar;
