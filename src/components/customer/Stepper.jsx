import React from "react";

const steps = ["Service", "Stylist", "Date", "Time", "Confirm"];

const Stepper = ({ step }) => {
  const totalSteps = steps.length;
  const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-12">
      {/* Labels */}
      <div className="relative flex justify-between items-center mb-4">
        {steps.map((label, index) => {
          const isActive = step === index + 1;
          const isCompleted = step > index + 1;

          return (
            <div key={index} className="relative flex flex-col items-center flex-1">
              
              {/* Step Label */}
              <span
                className={`text-sm md:text-base transition-all duration-300
                  ${
                    isActive
                      ? "text-pink-500 font-semibold scale-105"
                      : isCompleted
                      ? "text-gray-800 font-medium"
                      : "text-gray-400"
                  }`}
              >
                {label}
              </span>

              {/* Active Dot */}
              <div
                className={`mt-3 w-3 h-3 rounded-full transition-all duration-300
                  ${
                    isActive
                      ? "bg-pink-500 scale-125 shadow-lg shadow-pink-300"
                      : isCompleted
                      ? "bg-pink-400"
                      : "bg-gray-300"
                  }`}
              />
            </div>
          );
        })}
      </div>

      {/* Progress Line */}
      <div className="relative w-full `h-1` bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 `h-1` bg-linear-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};

export default Stepper;
