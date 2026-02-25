// src/pages/admin/Team.jsx
import React, { useEffect, useState } from "react";
import { Phone, Mail, Plus, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AddStaffModal from "../../components/owner/AddStaffModal.jsx";
import {
  fetchStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../../redux/slice/TeamSlice";

import { BASE_URL } from "../../Api/utils";

const Team = () => {
  const dispatch = useDispatch();
  const { staff = [], loading, error } = useSelector((state) => state.team);

  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [staffForm, setStaffForm] = useState({
    name: "",
    role: "",
    image: "",
    imageFile: null,
    status: "Active",
  });

  // Fetch staff
  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const handleEdit = (member) => {
    setEditingStaff(member);
    setStaffForm({
      name: member.name,
      role: member.role,
      status: member.status,
      image: member.image,
      imageFile: null,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      dispatch(deleteStaff(id));
    }
  };

  const handleSave = () => {
    if (!staffForm.name || !staffForm.role) return;

    const formData = new FormData();
    formData.append("name", staffForm.name);
    formData.append("role", staffForm.role);
    formData.append("status", staffForm.status);

    if (staffForm.imageFile) {
      formData.append("image", staffForm.imageFile);
    }

    if (editingStaff) {
      dispatch(updateStaff({ id: editingStaff._id, staffData: formData }));
    } else {
      dispatch(createStaff(formData));
    }

    setStaffForm({
      name: "",
      role: "",
      image: "",
      imageFile: null,
      status: "Active",
    });
    setEditingStaff(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50 p-4 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
          Our Team
        </h2>

        <button
          onClick={() => {
            setEditingStaff(null);
            setStaffForm({
              name: "",
              role: "",
              image: "",
              imageFile: null,
              status: "Active",
            });
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition w-full sm:w-auto"
        >
          <Plus size={18} />
          Add Staff Member
        </button>
      </div>

      {/* Loading & Error */}
      {loading && (
        <p className="text-gray-500 text-center">Loading staff...</p>
      )}
      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}

      {/* Empty State */}
      {!loading && staff.length === 0 && (
        <p className="text-gray-500 text-center">
          No staff members added yet.
        </p>
      )}

      {/* Team Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {staff.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src={
                  member.image
                    ? `${BASE_URL}${member.image}`
                    : "https://randomuser.me/api/portraits/lego/1.jpg"
                }
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="text-center mt-4">
              <h3 className="font-semibold text-lg">
                {member.name}
              </h3>
              <p className="text-pink-500 text-sm">
                {member.role}
              </p>
            </div>

            {/* Contact Icons */}
            <div className="flex justify-center gap-4 mt-4">
              <Phone size={18} className="text-gray-500" />
              <Mail size={18} className="text-gray-500" />
            </div>

            {/* Status + Actions */}
            <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  member.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {member.status}
              </span>

              <button
                onClick={() => handleEdit(member)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => handleDelete(member._id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AddStaffModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingStaff(null);
        }}
        newMember={staffForm}
        setNewMember={setStaffForm}
        onSave={handleSave}
      />
    </div>
  );
};

export default Team;