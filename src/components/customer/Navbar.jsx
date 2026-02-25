import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, User, Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (path) =>
    `flex items-center gap-2 transition duration-200 ${
      location.pathname === path
        ? "text-amber-600 font-semibold"
        : "text-gray-600 hover:text-amber-600"
    }`;

  return (
    <header className="w-full bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-white p-2 rounded-full text-xl shadow-sm">
            ✂️
          </div>

          <div className="leading-tight">
            <h1 className="text-lg md:text-2xl font-bold text-gray-800 tracking-wide">
              Alshanab & Alsawad
            </h1>
            <p className="text-[10px] md:text-xs text-amber-600 tracking-widest uppercase">
              Gents Salon
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className={linkClass("/")}>
            <Home size={18} />
            Home
          </Link>

          <Link to="/book" className={linkClass("/book")}>
            <Calendar size={18} />
            Book Now
          </Link>

          <Link to="/my-bookings" className={linkClass("/my-bookings")}>
            <User size={18} />
            My Bookings
          </Link>

          {/* Contact Button */}
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition"
          >
            <Phone size={16} />
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 border-t border-gray-100">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={linkClass("/")}
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            to="/book"
            onClick={() => setIsOpen(false)}
            className={linkClass("/book")}
          >
            <Calendar size={18} />
            Book Now
          </Link>

          <Link
            to="/my-bookings"
            onClick={() => setIsOpen(false)}
            className={linkClass("/my-bookings")}
          >
            <User size={18} />
            My Bookings
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 bg-amber-500 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-amber-600 transition"
          >
            <Phone size={16} />
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;