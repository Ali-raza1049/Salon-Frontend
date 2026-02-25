// src/components/owner/AddStaffModal.jsx
import React from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { createStaff } from "../../redux/slice/TeamSlice";

const AddStaffModal = ({ show, onClose, newMember, setNewMember }) => {
  const dispatch = useDispatch();

  if (!show) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewMember({
        ...newMember,
        image: previewUrl,
        imageFile: file,
      });
    }
  };

  const handleSave = async () => {
    if (!newMember.name.trim() || !newMember.role.trim()) {
      alert("Name and Role are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", newMember.name);
    formData.append("role", newMember.role);
    formData.append("status", newMember.status || "Active");

    if (newMember.imageFile) {
      formData.append("image", newMember.imageFile);
    }

    try {
      await dispatch(createStaff(formData)).unwrap();

      // Reset form
      setNewMember({
        name: "",
        role: "",
        status: "Active",
        image: "",
        imageFile: null,
      });

      onClose();
    } catch (error) {
      console.error("Add Staff Error:", error);
      alert(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold text-gray-800">
            Add Staff Member
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Role"
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={newMember.role}
            onChange={(e) =>
              setNewMember({ ...newMember, role: e.target.value })
            }
          />

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {/* Preview */}
          {newMember.image && (
            <div className="flex justify-center mt-2">
              <img
                src={newMember.image}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
          )}

          {/* Status */}
          <select
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={newMember.status}
            onChange={(e) =>
              setNewMember({ ...newMember, status: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStaffModal;