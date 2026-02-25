import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Scissors,
  Users,
  Calendar,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logout } from "../../redux/slice/AuthSlice.jsx"; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition duration-200 ${
      isActive
        ? "bg-yellow-500 text-black font-semibold"
        : "hover:bg-gray-800 text-white"
    }`;

  // 🔹 Frontend-only logout handler (Redux + localStorage)
  const handleLogout = () => {
    // Clear Redux user state
    dispatch(logout());

    // Clear localStorage token if you were using one
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-black text-white px-4 py-3">
        <div>
          <h1 className="text-lg font-bold text-yellow-400">
            Alshanab & Alsawad
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-300">
            Gents Salon
          </p>
        </div>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-black flex flex-col justify-between z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="p-6 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-yellow-400 leading-tight">
                Alshanab & Alsawad
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                Gents Salon
              </p>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 space-y-2 px-4">
            <NavLink to="/admin" className={navClass} onClick={() => setIsOpen(false)}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>

            <NavLink to="/admin/manage-service" className={navClass} onClick={() => setIsOpen(false)}>
              <Scissors size={18} /> Manage Services
            </NavLink>

            <NavLink to="/admin/team" className={navClass} onClick={() => setIsOpen(false)}>
              <Users size={18} /> Manage Staff
            </NavLink>

            <NavLink to="/admin/bookings" className={navClass} onClick={() => setIsOpen(false)}>
              <Calendar size={18} /> Bookings
            </NavLink>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 hover:text-red-400 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;