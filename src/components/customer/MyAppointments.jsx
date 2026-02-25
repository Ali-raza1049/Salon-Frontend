// src/pages/MyAppointments.jsx
import React, { useEffect } from "react";
import { Calendar, Clock, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  updateBookingStatus,
} from "../../redux/slice/BookingSlice";

const MyAppointments = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleCancel = (id) => {
    dispatch(updateBookingStatus({ id, status: "Cancelled" }));
  };

  const statusStyles = {
    Confirmed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
    Completed: "bg-gray-200 text-gray-600",
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>

      {loading && <p className="text-gray-500">Loading appointments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-6">
        {bookings.length === 0 && !loading && (
          <p className="text-gray-500">No appointments found.</p>
        )}

        {bookings.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition hover:shadow-md"
          >
            {/* Left Section */}
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 font-bold text-lg">
                {new Date(appointment.date).getDate()}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {appointment.service?.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  with {appointment.stylist?.name}
                </p>

                <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(appointment.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {appointment.time}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  statusStyles[appointment.status] ||
                  "bg-gray-200 text-gray-600"
                }`}
              >
                {appointment.status}
              </span>

              {appointment.status !== "Completed" &&
                appointment.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancel(appointment._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                  >
                    <X size={18} />
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;