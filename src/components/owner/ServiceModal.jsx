// src/components/admin/ServiceModal.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { createService } from "../../redux/slice/ServiceSlice";

const ServiceModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    price: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        category: "",
        duration: "",
        price: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createService({
        ...formData,
        price: Number(formData.price), // convert to number
      })
    );

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 relative shadow-2xl">

        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Service Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold
                       py-3 rounded-2xl shadow-lg transition-all"
          >
            Save Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
