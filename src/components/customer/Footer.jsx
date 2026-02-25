import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 text-white p-3 rounded-full text-xl shadow-md">
              ✂️
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Alshanab & Alsawad
              </h2>
              <p className="text-xs text-amber-500 tracking-widest uppercase">
                Gents Salon
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-400">
            Experience world-class grooming tailored for the modern gentleman.
            Where precision meets perfection.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-amber-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/book" className="hover:text-amber-500 transition">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link to="/my-bookings" className="hover:text-amber-500 transition">
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Contact Us
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-amber-500" />
              <span>Riyadh, Saudi Arabia</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-amber-500" />
              <span>+966 500 000 000</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-amber-500" />
              <span>info@gentssalon.com</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Follow Us
          </h3>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-500 transition duration-300"
            >
              <Instagram size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-500 transition duration-300"
            >
              <Facebook size={18} />
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Stay connected for exclusive offers and updates.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Alshanab & Alsawad Gents Salon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
