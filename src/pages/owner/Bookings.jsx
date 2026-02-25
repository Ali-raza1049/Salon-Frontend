// src/pages/admin/Bookings.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookings,
  updateBookingStatus,
  deleteBooking,
} from "../../redux/slice/BookingSlice";

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const filteredBookings =
    activeTab === "All"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateBookingStatus({ id, status: newStatus }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBooking(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">Appointments</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Pending", "Confirmed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border hover:bg-gray-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-6 text-center">Loading...</div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">{error}</div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No appointments found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-sm text-gray-600">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Stylist</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{b.customerName}</td>
                    <td className="p-4 text-gray-600">{b.service.name}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(b.date).toLocaleDateString()} - {b.time}
                    </td>
                    <td className="p-4 text-gray-600">{b.stylist.name}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        className="text-sm text-blue-600 hover:underline mr-3"
                        onClick={() =>
                          handleStatusChange(
                            b._id,
                            b.status === "Pending" ? "Confirmed" : "Pending"
                          )
                        }
                      >
                        Toggle
                      </button>
                      <button
                        className="text-sm text-red-500 hover:underline"
                        onClick={() => handleDelete(b._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredBookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-xl shadow p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{b.customerName}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  <strong>Service:</strong> {b.service.name}
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(b.date).toLocaleDateString()} - {b.time}
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Stylist:</strong> {b.stylist.name}
                </p>

                <div className="flex justify-between pt-2">
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() =>
                      handleStatusChange(
                        b._id,
                        b.status === "Pending" ? "Confirmed" : "Pending"
                      )
                    }
                  >
                    Toggle
                  </button>

                  <button
                    className="text-sm text-red-500 hover:underline"
                    onClick={() => handleDelete(b._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookings;