// src/pages/booking/ServiceStep.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/slice/ServiceSlice";

const ServiceStep = ({ nextStep, updateData, selected }) => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  // Fetch services on mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSelect = (service) => {
    updateData("service", service);
  };

  if (loading) return <p className="text-gray-500">Loading services...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose a Service</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            onClick={() => handleSelect(service)}
            className={`p-6 rounded-2xl border cursor-pointer transition
              ${
                selected?._id === service._id
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-pink-400"
              }`}
          >
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.duration}</p>
            <p className="text-pink-500 font-bold mt-2">${service.price}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
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
          Next →
        </button>
      </div>
    </div>
  );
};

export default ServiceStep;