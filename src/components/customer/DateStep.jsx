import React, { useState } from "react";

const DateStep = ({ nextStep, prevStep, updateData, selected }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelect = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    updateData("date", selectedDate);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysArray = [];
  for (let i = 0; i < firstDayOfMonth; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth(currentMonth, currentYear); i++) daysArray.push(i);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose Date</h2>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-3 py-1 rounded bg-gray-200">←</button>
        <h3 className="text-lg font-semibold">{monthNames[currentMonth]} {currentYear}</h3>
        <button onClick={nextMonth} className="px-3 py-1 rounded bg-gray-200">→</button>
      </div>

      
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {weekdayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      
      <div className="grid grid-cols-7 gap-2">
        {daysArray.map((day, idx) => (
          <div
            key={idx}
            className={`p-3 text-center cursor-pointer rounded
              ${day === null ? "" : "hover:bg-pink-50 hover:border-pink-400 border border-gray-200"}
              ${selected &&
              selected.getDate() === day &&
              selected.getMonth() === currentMonth &&
              selected.getFullYear() === currentYear
                ? "bg-pink-100 border-pink-500 font-semibold"
                : ""
            }`}
            onClick={() => day !== null && handleSelect(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
          ← Back
        </button>
        <button
          disabled={!selected}
          onClick={nextStep}
          className={`px-6 py-2 rounded-full font-semibold transition
            ${selected
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DateStep;
