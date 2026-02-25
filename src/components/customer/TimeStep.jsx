import React from "react";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const TimeStep = ({ nextStep, prevStep, updateData, selected }) => {
  const handleSelect = (time) => {
    updateData("time", time);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Time</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeSlots.map((time, index) => (
          <div
            key={index}
            onClick={() => handleSelect(time)}
            className={`p-4 rounded-xl border text-center cursor-pointer transition
              ${
                selected === time
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-pink-400"
              }`}
          >
            {time}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-2 rounded-full bg-gray-200"
        >
          ← Back
        </button>

        <button
          disabled={!selected}
          onClick={nextStep}
          className={`px-6 py-2 rounded-full font-semibold
            ${
              selected
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
        >
          Confirm →
        </button>
      </div>
    </div>
  );
};

export default TimeStep;
