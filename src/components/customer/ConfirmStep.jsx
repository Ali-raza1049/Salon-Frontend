// src/components/customer/ConfirmStep.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { createBooking } from "../../redux/slice/BookingSlice";
import { SALON_WHATSAPP } from "../../Api/utils";

// Admin/Salon WhatsApp

const ConfirmStep = ({ bookingData, prevStep }) => {
  const dispatch = useDispatch();
  const { service, stylist, date, time } = bookingData;

  const isComplete = service && stylist && date && time;

  const handleConfirm = async () => {
    if (!isComplete) return;

    // Prepare backend booking payload
    const bookingPayload = {
      service: { _id: service._id, name: service.name, price: service.price },
      stylist: { _id: stylist._id, name: stylist.name, role: stylist.role },
      date,
      time,
      status: "Pending",
    };

    try {
      const resultAction = await dispatch(createBooking(bookingPayload));

      if (createBooking.fulfilled.match(resultAction)) {
        const savedBooking = resultAction.payload;

        // Send WhatsApp message to salon/admin
        const formattedDate = new Date(savedBooking.date).toLocaleDateString();
        const message = `Alshanab & Alsawad Gents Salon

New booking received:

Service: ${savedBooking.service.name}
Stylist: ${savedBooking.stylist.name}
Date: ${formattedDate}
Time: ${savedBooking.time}
Total: $${savedBooking.service.price}


Please confirm this appointment 💇‍♀️`;

        const encodedMessage = encodeURIComponent(message);
        window.open(
          `https://wa.me/${SALON_WHATSAPP}?text=${encodedMessage}`,
          "_blank",
        );
      } else {
        alert("Failed to save booking: " + resultAction.payload);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Confirm Your Booking
      </h2>

      <div className="bg-gray-50 p-6 rounded-2xl space-y-4 shadow-sm border border-gray-100">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Service:</span>
          <span className="text-gray-900">
            {service?.name || "Not selected"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Stylist:</span>
          <span className="text-gray-900">
            {stylist?.name || "Not selected"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Date:</span>
          <span className="text-gray-900">
            {date ? new Date(date).toLocaleDateString() : "Not selected"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Time:</span>
          <span className="text-gray-900">{time || "Not selected"}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-green-500 border-t pt-4">
          <span>Total:</span>
          <span>${service?.price || 0}</span>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <button
          onClick={handleConfirm}
          disabled={!isComplete}
          className={`px-6 py-2 rounded-full font-semibold transition
            ${isComplete ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Confirm Booking 💬
        </button>
      </div>
    </div>
  );
};

export default ConfirmStep;
