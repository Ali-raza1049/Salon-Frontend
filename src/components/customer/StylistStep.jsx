// src/components/booking/StylistStep.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff } from "../../redux/slice/TeamSlice";
import { BASE_URL } from "../../Api/utils";



const StylistStep = ({ nextStep, prevStep, updateData, selected }) => {
  const dispatch = useDispatch();
  const { staff, loading, error } = useSelector((state) => state.team);

  // Fetch staff on mount
  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const handleSelect = (stylist) => {
    updateData("stylist", stylist);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Your Stylist</h2>

      {loading && <p className="text-gray-500">Loading stylists...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {staff.map((stylist) => (
          <div
            key={stylist._id}
            onClick={() => handleSelect(stylist)}
            className={`p-6 rounded-2xl border cursor-pointer transition
              ${
                selected?._id === stylist._id
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-pink-400"
              }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  stylist.image
                    ? `${BASE_URL}${stylist.image}`
                    : "https://randomuser.me/api/portraits/lego/1.jpg"
                }
                alt={stylist.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{stylist.name}</h3>
                <p className="text-gray-500 text-sm">{stylist.role}</p>
              </div>
            </div>
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
            ${selected ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-400"}`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StylistStep;