import React from "react";
import Sidebar from "../components/owner/Sidebar.jsx";
import Topbar from "../components/owner/Topbar.jsx";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Topbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
