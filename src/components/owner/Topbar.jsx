// src/components/admin/Topbar.jsx
import React from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/admin":
        return "Dashboard";
      case "/admin/manage-service":
        return "Manage Services";
      case "/admin/team":
        return "Manage Staff";
      case "/admin/bookings":
        return "Bookings";
      default:
        return "Admin Panel";
    }
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 md:px-6 py-4 shadow-sm border-b">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Menu size={20} className="cursor-pointer" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          {getTitle()}
        </h1>
      </div>
    </div>
  );
};

export default Topbar;